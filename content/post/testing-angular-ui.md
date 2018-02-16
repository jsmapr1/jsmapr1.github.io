+++
title = "testing angular ui"
date = "2015-02-20"
slug = "2015/02/20/testing-angular-ui"
Categories = []
+++
I recently ran into an issue while testing an modal using [Angular UI Bootstrap](http://angular-ui.github.io/bootstrap/). My goal was to create a directive that will trigger a modal to open when clicked. The directive code is relatively simple:

```javascript

app.directive('modalTrigger', ['$modal', 'sharedData', function($modal, sharedData) {
    return {
        scope : {
            submitUrl : '@'
        },
        link: function(scope, elem, attributes) {
            elem.bind('click', function() {
                $modal.open({
                    template: "<div another-directive></div>",
                    controller: 'AwesomeController as ac',
                    resolve : {
                        submitUrl : function() {
                            return scope.submitUrl;
                        }
                    }
                })
                    .result.then(function() {
                        //Something on close
                    },function() {
                        //Something on dismiss
                    })
            })
        }
    }
}]);
```
The idea is to be able to set any element to trigger a modal (which grabs some content via ajax, but that's a different issue):
``` html
<button modal-trigger submit-url="/somepage">
```

The problem I had was in testing the code (with karma and jasmine) was getting the modal to return a result promise.

Here was the original test:
``` javascript
describe('Directive: modalTrigger', function() {
    var element, scope, $compile, $modal, fakeModal;
    beforeEach(module('my-mod'));
    beforeEach(inject(function(_$compile_, $rootScope, _$modal_) {
        $compile = _$compile_;
        $modal = _$modal_;
        scope = $rootScope.$new();
        spyOn($modal, 'open');
        element = '<a modal-trigger ng-app="some-app" submit-url="/test">';
        element = $compile(element)(scope);
        scope.$digest();
    }))
    it('will open a modal when clicked', function(){
        expect($modal.open).not.toHaveBeenCalled()
        element.triggerHandler('click');
        expect($modal.open).toHaveBeenCalled()
    })
})
```

The problem is the spy. Originally I didn't use the modal result promise. When I explicitly started using it, the tests started failing. The reason is that when a spy is set in jasmine, it stubs out the object, but does not execute it in the code. The fix is easy, I could either create a fake or I can just tell jasmine to use the actual object that I am spying on.

Here's an example of creating a fake object:
``` javascript
    fakeModal = {
        result: {
            then: function() {
            }
        },
        close: function( item ) {
        },
        dismiss: function( type ) {
        }
    };
    spyOn($modal, 'open').andReturn(fakeModal);
```
Ultimately I decided to just call through to the actual object since I wasn't testing the promise and didn't need a mock, but I wanted to keep the test as close as possible to the actual code: 

``` javascript
spyOn($modal, 'open').andCallThrough();
```
Viola. Now I can test that my directive is actually executing as expected. This is all very simple, but a nice way to isolate test code and to check for a call to a promise (or anything really).
