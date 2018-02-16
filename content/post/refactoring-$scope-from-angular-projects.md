+++
title = "refactoring $scope from angular projects"
date = "2015-05-19"
slug = "2015/05/19/refactoring-$scope-from-angular-projects"
published = false
Categories = []
+++
I've recently become convinced that Angular code can be significantly improved by eliminating the use of $scope and ng-controller. I started exploring this after a few coders I respect [banned ng-controller from their own code](http://teropa.info/blog/2014/10/24/how-ive-improved-my-angular-apps-by-banning-ng-controller.html).
 I've found the process to be very helpful for a few reasons. First, it will make the inevitable transition to Angular2 easier as they get rid of both ng-controller and $scope, but, even more importantly, it makes better code right now. And, as a bonus, it makes code look more like *gasp* real javascript and not Angular(tm) code.

I won't go into the reasons why this makes for better code. I think the above article by [Tero Parviainen](http://teropa.info/blog/2014/10/24/how-ive-improved-my-angular-apps-by-banning-ng-controller.html) and another by [Todd Motto](http://toddmotto.com/digging-into-angulars-controller-as-syntax/) do a far better than I ever code of explaining the advantages.

Instead I'll just point out that code written in this style:
```javascript
Something.prototype
```
looks much better than Angular(tm) code:
```javascript
$scope.asdf = function(){}
```

I'm a big believer that good code is also visually aesthetically appealing, so after rewiring some of my brain, I was hooked. The problem is old code. Now it looks bad and even a little embarrassing. Now part of this I attribute to the old adage that you should always be a little embarrassed by old code:
<blockquote class="twitter-tweet" lang="en"><p>&quot;If I&#39;m not embarrassed by the code I&#39;ve written a year ago, I&#39;m not learning enough&quot; great, humble insights from <a href="https://twitter.com/helenhousandi">@helenhousandi</a> <a href="https://twitter.com/hashtag/wceu?src=hash">#wceu</a></p>&mdash; WordCamp Europe (@WCEurope) <a href="https://twitter.com/WCEurope/status/515867304283111424">September 27, 2014</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

However, embarrassment aside, when I have to add some new features it is often worth a short refactor to update to best practices. With that in mind, I kept track of my steps and have developed a simple pattern for updating Angular code to remove reliance on $scope.

##Pattern For Banning $scope
Here's a pretty typical bit of code:
```javascript
var app = angular.module('test', []);
app.controller('SomeController', ['$scope', 'util', function($scope, util) {
  $scope.width = util.get_width();
  $scope.length = util.get_length();
  $scope.double_size = function(dimension) {
    $scope[dimension] = $scope[dimension] * 2
  }
}]);

app.factory('util', [function() {
  return {
    get_width: function() {
      return 5;
    },
    get_length: function() {
      return 10;
    }
  }
}])
```

```html
<body ng-app='test'>
  <div ng-controller="SomeController">
    <h1>Hi</h1>
    <div>
      <h2 ng-click="double_size('length')">Length</h2>
       {% raw %}{{length}}{% endraw %}
    </div>
    <div>
      <h2 ng-click="double_size('width')">Width</h2>
       {% raw %}{{width}}{% endraw %}
  </div>
</body>
```
The steps to refactor are pretty simple, but with complex existing code even a little guidance is nice:

1. Create controller function
2. Locally scope dependency injections
3. Move $scope functions to prototype methods
4. Update Template

## Create Controller Function
The first step is to simply make a new controller function.

So this:
```javascript
var app = angular.module('test', []);
app.controller('SomeController', ['$scope', 'util', function($scope, util) {
  $scope.width = util.get_width();
  $scope.length = util.get_length();
  $scope.double_size = function(dimension) {
    $scope[dimension] = $scope[dimension] * 2
  }
}]);
```
Becomes this:

```javascript
var app = angular.module('test', []);
app.controller('SomeController', SomeControllerFunc);

function SomeControllerFunc() {
    this.width = 5;
    this.length = 10;
    this.double_size = function(){}
}
```
Already it's starting to look more like actual javascript code and not angular code.


## Locally scope dependency injections
Dependency injections are a little stranger when a controller is a separate function.
Instead injecting them into the controller, they have to be manually injected with the `$inject` method.
Fortunately, it makes it a little easier to read since everything is nice and isolated.
Instead of injecting them into the controller declaration, we use the $inject method to add them to the controller function and then add them as an argument to the new controller function.
Note, the argument in the controller does not need to be the same as the service name (or whatever);

I'll also take this opportunity to clean up the service a little bit.

```javascript
app.controller('SomeController', SomeControllerFunc);
SomeControllerFunc.$inject = ['utilService']

function SomeControllerFunc(util) {
    this.width = util.get_width();
    this.length = util.get_lenght();
    this.double_size = function(){}
}


app.factory('util', [function() {
  return {
    get_width: function() {
      return 5;
    },
    get_length: function() {
      return 20;
    }
  }
}])

app.service('utilService', utilService);
function utilService() {
}
utilService.prototype.get_width = function() {
    return 5;
}

utilService.prototype.get_length = function() {
    return 10;
}
```
## Move $scope functions to protoype methods
Following the refactor of the service now we just need to add the function to the prototype instead of as part of the object.
This is not strictly necessary, but adding functions to the prototype instead of the object is more efficient since new object instances will not need to recopy the method, but will just use the method on the prototype.

```javascript
app.controller('SomeController', SomeControllerFunc);
SomeControllerFunc.$inject = ['utilService']

function SomeControllerFunc() {
    this.width = 5;
    this.length = 10;
    this.double_size = function(){}
}

```

becomes:  
```javascript
app.controller('SomeController', SomeControllerFunc);
SomeControllerFunc.$inject = ['utilService']

function SomeControllerFunc(util) {
    this.width = util.get_width();
    this.length = util.get_lenght();
}

SomeControllerFunc.prototype.double_size = function(measurement) {
    this[measurement] = this[measurement] * 2
}
```
Easy enough. Again, the best part is the code is looking more and more like standard javascript which is a bonus.


## Update Template
The last part is easiest. Just change the controller to controller as and update with the correct namespace.  

Before:
```html
<body ng-app='test'>
  <div ng-controller="SomeController">
    <h1>Hi</h1>
    <div>
      <h2 ng-click="double_size('length')">Length</h2>
       {% raw %}{{length}}{% endraw %}
    </div>
    <div>
      <h2 ng-click="double_size('width')">Width</h2>
       {% raw %}{{width}}{% endraw %}
  </div>
</body>
```

After:  

```html
<body ng-app='test'>
  <div ng-controller="SomeController as rectangle">
    <h1>Hi</h1>
    <div>
      <h2 ng-click="rectangle.double_size('length')">Length</h2>
       {% raw %}{{rectangle.length}}{% endraw %}
    </div>
    <div>
      <h2 ng-click="rectangle.double_size('width')">Width</h2>
       {% raw %}{{rectangle.width}}{% endraw %}
  </div>
</body>
```

Here's a [code pen](http://codepen.io/jsmapr1/pen/zGYvdj) if you want to try yourselfk
