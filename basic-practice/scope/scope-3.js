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
    var dirty;
    do {
        dirty = this.$$digestOnce();
    } while(dirty);
}

var scope = new Scope();
scope.firstName = 'joe';
scope.counter = 0;

scope.$watch(
    function(scope) {
        return scope.counter;
    },

    function(newValue, oldValue, scope) {
        scope.counterIsTwo = (newValue === 2);
    }
);

scope.$watch(
    function(scope) {
    	return scope.firstName;
    },

    function(newValue, oldValue, scope) {
    	scope.counter++;
    }
);

//After the first digest the counter is 1
scope.$digest();
console.log(scope.counter === 1);

//On the next change the counter becomes two, and the other watch listener is also run because of the dirty check
scope.firstName = "ericky";
scope.$digest();
console.log(scope.counter === 2);
console.log(scope.counterIsTwo);