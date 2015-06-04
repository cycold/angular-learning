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




var scope = new Scope();

/*scope.$watch(
    function(){console.log('watchFn')},
    function(){console.log('listenFn')}
);
scope.$digest();
scope.$digest();
scope.$digest();*/

scope.firstName = 'joe';
scope.counter = 0;

scope.$watch(
    function(scope){
        return scope.firstName;
    },
    
    function(newValue, oldValue, scope) {
    	scope.counter++;
    }
);

//We haven't run $digaest yet so counter should be untouched
console.assert(scope.counter === 0,"false");

//The first $digest causes the listenFn to run
scope.$digest();
console.assert(scope.counter === 1);

//Futher digest don't call the listenFn...
scope.$digest();
scope.$digest();
console.assert(scope.counter ===  1 );

// ... until the value that the watch function is watching changes again
scope.firstName = "ericky";
scope.$digest();
console.log(scope.counter);
console.assert(scope.counter === 2);




