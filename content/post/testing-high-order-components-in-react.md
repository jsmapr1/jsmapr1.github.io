+++
title = "testing high order components in react"
date = "2017-02-28"
slug = "2017/02/28/testing-high-order-components-in-react"
published = false
Categories = []
+++

## High Order Components
High order components in React are great ways to share functionality and build
new components, but I have found that the information about how to use them is
overly complicated and there is very little information about how to test them.

### HoC Keep It Simple
In short, you should use a high order component when you want to share
functionality between different components and this functionality requires some
form of local state or local config.

There are more reasons to use these, sure, but the majority of the time I
refactor code into a high order component -- notice I said refactor, I almost
never write an HoC to start because I don't like to overcomplicate things until
I need a reason -- I do so because I want to use some functionality in a
different place.

Perhaps you've heard the phrase 'favor composition over inheritance' well, this
is how composition works. We are taking a component and adding the functionality
we want instead of inheriting the functionality and all the other baggage with
it.

Here's an example. We have a component, a button, and we want it to use Redux.
So we use the high order component `connect` we also want it to have a
confirmation, so we use the high order component `withConfirm` which we will
build out in the next section. The resulting code has two added functionality,
but no more than we need:

```javascript
export default connect(stateToProps)(withConfirm(ButtonComponent));
```

If we have another button that only needs a confirmation:

```javascript
export default withConfirm(SimpleButtonComponent);
```

We only add what we need.

### HoC: Example

Let's build a very simple high order component. This component will add
confirmation to anything with a click event. For simplicity sake, we will not
have a pop up or anything like that, just a simple confirm message.

The component will:

- Will wrap a component with a click event
- Hijack the click event and instead pop up a confirmation option when event is
clicked
- If confirmed, it will run the original click event and hide the confirmation
- If not confirmed, it will not execute the click event and hide the
confirmation

## Will Wrap a component

This is pretty much the definition of a high order component. So let's do it.
We'll make a skeletal outline of our HoC.

```javascript
import React, { Component } from 'react';

export default function withConfirm(WrappedComponent) {
  class ConfirmWrapper extends Component {

    constructor() {
      super();
    }

    render() {
      return (
        <div className="confirm">
          <WrappedComponent {...this.props} />
        </div>
      );
    }
  }

  return ConfirmWrapper;
}
```

What we are doing is simple. We are importing the usual react bits.

Then we are exporting a function which takes a component. The function then
creates a class which returns that component from the argument and any props
that component might have.

In other [examples of
HoC](https://facebook.github.io/react/docs/higher-order-components.html) you may
notice they return an anonymous class. In other words, they don't name the class
before returning it: `return class extends React.Component`. We are not going to
do that. Instead we are going to name the class so we can add some PropTypes.

```javascript
ConfirmWrapper.propTypes = {
    handleClick: PropTypes.func.isRequired,
};
```

This will help future developers know exactly what properties the component will
be using (or hijacking) and what we are saving. The final product is only
slightly different:

```javascript
import React, { Component, PropTypes } from 'react';

export default function withConfirm(WrappedComponent) {
  class ConfirmWrapper extends Component {

    constructor() {
      super();
    }

    render() {
      return (
        <div className="confirm">
          <WrappedComponent {...this.props} />
        </div>
      );
    }
  }

  ConfirmWrapper.propTypes = {
    handleClick: PropTypes.func.isRequired,
  };
  return ConfirmWrapper;
}
```

We now have a skeleton of a high order component. At this point, we need to
write our first test.


