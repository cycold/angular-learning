function Scope() {
    this.$$watchers = [];
}

Scope.prototype.$watch = function(watchFn, listenerFn, valueEq) {
    var watcher = {
        watchFn: watchFn,
        listenerFn: listenerFn || function() { },
        valueEq: !!valueEq
    };
    this.$$watchers.push(watcher);
};

Scope.prototype.$$areEqual = function(newValue, oldValue, valueEq) {
    if (valueEq) {
        return _.isEqual(newValue, oldValue);
    } else {
        return newValue === oldValue;
    }
};

Scope.prototype.$$digestOnce = function() {
    var self  = this;
    var dirty;
    _.forEach(this.$$watchers, function(watch) {
        var newValue = watch.watchFn(self);
        var oldValue = watch.last;
        if (!self.$$areEqual(newValue, oldValue, watch.valueEq)) {
            watch.listenerFn(newValue, oldValue, self);
            dirty = true;
        }
        watch.last = (watch.valueEq ? _.cloneDeep(newValue) : newValue);
    });
    return dirty;
};

Scope.prototype.$digest = function(){
    var ttl = 10;
    var dirty;
    do {
        dirty = this.$$digestOnce();
        if (dirty && !(ttl--)) {
            throw "10 digest iterations reached";
        }
    } while (dirty);
};

var scope = new Scope();
scope.counterByRef = 0;
scope.counterByValue = 0;
scope.value = [1, 2, {three: [4, 5]}];

// Set up two watches for value. One checks references, the other by value.
scope.$watch(
    function(scope) {
        return scope.value;
    },
    function(newValue, oldValue, scope) {
        scope.counterByRef++;
    }
);
scope.$watch(
    function(scope) {
        return scope.value;
    },
    function(newValue, oldValue, scope) {
        scope.counterByValue++;
    },
    true
);


scope.$digest();
console.assert(scope.counterByRef === 1);
console.log(scope.counterByRef === 1);
console.assert(scope.counterByValue === 1);
console.log(scope.counterByValue === 1);

// When changes are made within the value, the by-reference watcher does not notice, but the by-value watcher does.
scope.value[2].three.push(6);
scope.$digest();
console.assert(scope.counterByRef === 1);
console.log(scope.counterByRef === 1);
console.assert(scope.counterByValue === 2);
console.log(scope.counterByValue === 2);

// Both watches notice when the reference changes.
scope.value = {aNew: "value"};
scope.$digest();
console.assert(scope.counterByRef === 2);
console.log(scope.counterByRef === 2);
console.assert(scope.counterByValue === 3);
console.log(scope.counterByValue === 3);

delete scope.value;
scope.$digest();
console.assert(scope.counterByRef === 3);
console.log(scope.counterByRef === 3);
console.assert(scope.counterByValue === 4);
console.log(scope.counterByValue === 4);
