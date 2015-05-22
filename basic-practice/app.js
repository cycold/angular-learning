angular.module('basic',[])

var dO = {age: '23', hoby: "reading",he:'haha'};
var sO = {name: 'Bob', age: '25', job: 'webDev',nest:{he: "hehe"}};

var dd = angular.extend(dO,sO);
console.log(dd);

//var ae = angular.element('.well');
//console.log(ae);

document.addEventListener('DOMContentLoaded',function(){
	console.log('DomcontentLoaded...')
    var ele = document.querySelector('.well');
    var aes = angular.element(ele);
    //var ae = angular.element('<h3>');
    console.log(aes);

    aes.addClass("test");

    console.log(aes.children());
})

var values = {name: 'misko', gender: 'male'};
var log = [];
angular.forEach(values,function(value,key,obj){
	this.push(key + ':' + value);
    console.log(key);
    console.log(value);
    console.log(obj);
},log);

console.log(log);
