function Scope() {
    //存储注册过的所有监听器
    this.$$watches = [];
}


Scope.prototype.$watch = function(watchFn, listenFn) {
    var watcher = {
        watchFn: watchFn,
        //listenFn: listenFn
        listenFn: listenFn || function(){}
    };

    this.$$watches.push(watcher);
};

Scope.prototype.$digest = function() {
    this.$$watches.forEach(function(watch) {
        console.log(watch);
        watch.listenFn();
        //watch.watchFn();
    });
};

//Angular作用域的本质：添加监听器，在digest里运行它们
Scope.prototype.$digest = function() {
    var _self = this;
    this.$$watches.forEach(function(watch) {
        var newValue = watch.watchFn(_self);
        var oldValue = watch.last;
        if (newValue !== oldValue) {
            watch.listenFn(newValue, oldValue, _self);
        }
        watch.last = newValue;
    });
}


Scope.prototype.$$digestOnce = function() {
    var self = this;
    var dirty;
    this.$$watches.forEach(function(watch) {
        var newValue = watch.watchFn(self);
        console.log(newValue);
        var oldValue = watch.last;
        if (newValue !== oldValue) {
            watch.listenFn(newValue, oldValue, self);
            dirty = true;
        }
        watch.last = newValue;
    });

    return dirty;
}

Scope.prototype.$digest = function() {
    //设置ttl
    var ttl = 10;
    var dirty;
    do {
        dirty = this.$$digestOnce();
        if( dirty && !(ttl--) ) {
            throw "10 digest iteration reached";
        }
    } while(dirty);
}

var scope = new Scope();
scope.firstName = 'joe';
scope.counter1 = 0;
scope.counter2 = 0;

scope.$watch(
    function(scope) {
        return scope.counter1;
    },

    function(newValue, oldValue, scope) {
        scope.counter2++
    }
);

scope.$watch(
    function(scope) {
        return scope.counter2;
    },

    function(newValue, oldValue, scope) {
        scope.counter1++;
    }
);

//循环执行
scope.$digest();
console.log(scope.counter1);
