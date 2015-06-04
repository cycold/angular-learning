function Scope() {
    this.$$watchers = [];
    this.$$asyncQueue = [];
    this.$$phase = null;
    this.$$postDigestQueue = [];
}

Scope.prototype.$watch = function(watchFn, listenerFn, valueEq) {
    var self = this;
    var watcher = {
        watchFn: watchFn,
        listenerFn: listenerFn || function(){},
        valueEq: !!valueEq
    };
    this.$$watchers.push(watcher);

    return function() {
        var index = self.$$watchers.indexOf(watcher);
        if (index >= 0) {
            self.$$watchers.splice(index,1);
        }
    }
};

Scope.prototype.$$areEqual = function(newValue, oldValue, valueEq) {
    if (valueEq) {
        return _.isEqual(newValue, oldValue);
    } else {
        return newValue === oldValue || (typeof newValue === 'number' && typeof oldValue === 'number' && isNaN(newValue) && isNaN(oldValue));
    }
};

Scope.prototype.$eval = function(expr, locals) {
    return expr(this, locals);
};

Scope.prototype.$apply = function(expr) {
    try {
        this.$beginPhase("$digest");
        return this.$eval(expr);
    } finally {
        this.$clearPhase();
        this.$digest();  //$digest的调用放置于finally块中，以确保即使函数抛出异常，也会执行digest。
    }
};

Scope.prototype.$evalAsync = function(expr) {
    var self = this;
    if (!self.$$phase && !self.$$asyncQueue.length){
        setTimeout(function() {
            if (self.$$asyncQueue.length){
                self.$digest();
            }
        }, 0);
    }
    this.$$asyncQueue.push( {scope: this, expression: expr} );  //显式在放入队列的对象上设置当前作用域，是为了使用作用域的继承
}

Scope.prototype.$beginPhase = function(phase) {
    if (this.$$phase) {
        throw this.$$phase + ' already in progress';
    }
    this.$$phase = phase;
};

Scope.prototype.$clearPhase = function() {
    this.$$phase = null;
};

Scope.prototype.$$postDigest = function(fn) {
    this.$$postDigestQueue.push(fn);
};

Scope.prototype.$$digestOnce = function() {
    var self = this;
    var dirty;

    this.$$watchers.forEach(function(watch) {
        try {
            var newValue = watch.watchFn(self);
            var oldValue = watch.last;
            if (!self.$$areEqual(newValue, oldValue, watch.valueEq)) {
                watch.listenerFn(newValue, oldValue, self);
                dirty = true;
            }
            watch.last = (watch.valueEq ? _.cloneDeep(newValue) : newValue);
        } catch (e) {
            (console.error || console.log)(e);
        }
    });
    return dirty;
};

Scope.prototype.$digest = function() {
    var ttl = 10;
    var dirty;
    this.$beginPhase("$digest");
    do {
        while (this.$$asyncQueue.length) {
            try {
                var asyncTask = this.$$asyncQueue.shift();
                this.$eval(asyncTask.expression);
            } catch (e) {
                (console.error || console.log)(e);
            }
        }

        dirty = this.$$digestOnce();
        if( dirty && !(ttl--) ) {
            this.$clearPhase();
            throw "10 digest iteration reached";
        }
    } while(dirty);
    this.$clearPhase();

    while( this.$$postDigestQueue.length ) {
        try {
            this.$$postDigestQueue.shift()();
        } catch (e) {
            (console.error || console.log)(e);
        }
    }

}

