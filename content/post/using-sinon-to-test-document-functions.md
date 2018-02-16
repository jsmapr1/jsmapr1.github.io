+++
title = "using sinon to test document functions"
date = "2016-07-05"
slug = "2016/07/05/using-sinon-to-test-document-functions"
Categories = []
+++

## That Sweet, Sweet Code Coverage
On my most recent React project, I've really been trying to get that 100% code coverage.
It hasn't been bad for the most part, but I hit a wall when a few functions needed to query the DOM.

For the most part, I isolated the DOM as much as possible and as a result most functions were very easy to test.
Still, I got to the point that the functionality required knowing exactly where elements were on the page.

Here's an example:

```javascript
export class Details extends React.Component {

  scrollIntoView(info) {
    if(!info) {
      return document.querySelector('.details').scrollIntoView();
    }
    const el = document.getElementById(info.id);
    if(this.isElementInViewport(el)) {
      return false;
    }
    return el.scrollIntoView();
  }

  isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return rect.top >= 0 && rect.bottom <= window.innerHeight;
  }

}
```

Here's the background. There is a large list of events.
When an event is clicked, a sidebar slides out with information.
Usually when you click on the event, it is visible, right?

Well, since I'm using react-router, whenever the event details are visible, there is a route to that state.
A user can copy the url, there is a case where the sidebar is open, but the event that is related to it is off page which is confusing to visitors.
The fix is easy, if the related event (located with the info.id) is not in viewport, then scroll down to it.

Here's the hard part: How do I unit test that function?

I don't want to go the PhantomJS route and render the whole page.
I want it to be fast and part of the, well, unit tests.

## Wait, A Second

After puzzling through it for a couple of weeks, and soliciting suggestions from a few other devs, it finally hit me, `document` is just an object like everything else.
In other words, when we are doing this:
```javascript
document.querySelector('.events');
```
We are merely calling a method on an object.
It seems so painfully obvious now that I don't know what took so long, but here we are.

Now, if I had told myself that a week ago, I wouldn't have been too impressed.
My problem is getting elements into the DOM, not the query part.

What I didn't get was that I wasn't looking at the problem the right way.
The problem wasn't getting elements into the DOM (virtual or otherwise), the problem was getting elements _from_ the DOM.

So, now we have two facts:

1. `document` is just an object with methods
2. To make our tests work, we need `document.querySelector` to return something predictable

At this point, it was clear that the solution was to mock out the return of `document.querySelector`


```javascript

describe('<Details> In View', () => {

  it('will scroll to event details if no info', () => {
    const selector = sinon.stub(document, 'querySelector');
    selector.returns({
      getBoundingClientRect: () => {
        return {
          top: -10,
          bottom: 100
        }
      },
      scrollIntoView: () => {
        return 'scroll to selector';
      }
    })
    expect(Details.prototype.scrollIntoView(null)).toEqual('scroll to selector');
    selector.restore();
  })
})
```

In this test we will just create an object with just enough properties and methods to allow a good test of the method.

We happen to be passing null and so we are hitting the first control structure.
Testing the other methods is very simple.
We can stub out getElementById to check that situation.

A key point is to restore the standard behavior at the end with `stub.restore()` otherwise other tests will not be able to mock the same method.
The downside to this approach is that if there is an error in that test it will never restore the stub and then any other attempts to mock the same method will also throw an error causing a domino affect where a single error results in 10 more failed tests.

As a final note, I found a lot of value in specifying specific arguments. Doing so looks like this:

```javascript
describe(('Some Test') => {
    const mockEl = {
      getBoundingClientRect: () => {
        return {
          top: -10,
          bottom: 100
        }
      },
      scrollIntoView: () => {
        return 'scroll to id';
      }
    }

    const mockElInViewport = {
      getBoundingClientRect: () => {
        return {
          top: 0,
          bottom: 10
        }
      },
      scrollIntoView: () => {
        return 'scroll to id';
      }
    }

    let stub;
    before(() => {
        stub = sinon.stub(document, 'getElementById');
        stub.withArgs(10).returns(mockEl);
        stub.withArgs(11).returns(mockElInViewport);
    })

    after(() => {
        stub.restore();
    })
});
```

Leaving out the actual tests because the point seems clear that you can stub a method and return different results by argument.

## Repeat

Once I had a method for stubbing out document queries, all sorts of problems faded away.

I could test how to act if something is visible.

I could test how much spacing needed to be added for cases of inline styles.

I could test how elements hight on the page differ from elements lower on the page.

All in all, another great tool for the toolbox.
