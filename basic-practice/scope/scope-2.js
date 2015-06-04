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

// After the first digest the counter is 1
scope.$digest();
console.assert(scope.counter === 1);

// On the next change the counter becomes two, but our other watch hasn't noticed this yet
scope.firstName = 'Jane';
scope.$digest();
console.assert(scope.counter === 2);
console.assert(scope.counterIsTwo); // false

// Only sometime in the future, when $digest() is called again, does our other watch get run
scope.$digest();
console.assert(scope.counterIsTwo); // true