+++
title = "react animations"
date = "2016-09-23"
slug = "2016/09/23/react-animations"
Categories = []
+++

Previously, I wrote about React animations for creating a [dropdown menu](/blog/2016/01/05/creating-a-dropdown-menu-in-react/),
but after spending more and more time working with them, I decided to explore exactly how animations fit into the React lifecycle.

## Two Animations
There are two kinds of component animations in React.

1. The component is already in the DOM
2. The component is entering the DOM

The first kind are not that hard to deal with.
In the past, I've added a CSS class to trigger a transition.
There are also React specific libraries like [radium](https://github.com/FormidableLabs/radium).

The second kind of component requires a bit more work.

To understand why, consider the React lifecycle.

## React Lifecycle

In React, you create a series of components that become part of a the virtual DOM:

```json
"PotatoHead": {
    "head": {
        "peg": null
    },
    "body": {
        "topPeg": "eyes",
        "middlePeg": null,
        "bottomPeg": null
    },
    "bottom": {
        "peg": "shoes"
    }
}
```

The virtual DOM renders into the DOM as seen in the browser:


{% img /images/empty.png %}

Eventually something happens in the app and that triggers an action:

```javascript
dispatch(existentialCrisis());
```

This changes the virtual DOM:

```json
"PotatoHead": {
  "head": {
    "peg": null
  },
  "body": {
    "topPeg": "eyes",
    "middlePeg": null,
    "bottomPeg": "mouth"
  },
  "bottom": {
    "peg": "shoes"
  }
}
```

Which updates the actual DOM:

{% img /images/crisis.png %}

The thing that makes React animations difficult is that there is no point in the lifecycle that they fit in.

Think about the lifecycle hooks:

<svg width="263px" height="69px" viewBox="250 180 263 69" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <defs>
        <rect id="path-1" x="250" y="180" width="263" height="69" rx="8"></rect>
        <mask id="mask-2" maskContentUnits="userSpaceOnUse" maskUnits="objectBoundingBox" x="0" y="0" width="263" height="69" fill="white">
            <use xlink:href="#path-1"></use>
        </mask>
    </defs>
    <use id="Rectangle" stroke="#000000" mask="url(#mask-2)" stroke-width="4" fill="#FFFFFF" fill-rule="evenodd" xlink:href="#path-1"></use>
    <text id="componentWillMount" stroke="none" fill="none" font-family="Helvetica" font-size="20" font-weight="normal">
        <tspan x="288" y="220" fill="#000000">componentWillMount</tspan>
    </text>
</svg>  
<svg width="263px" height="69px" viewBox="250 180 263 69" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <defs>
        <rect id="path-1" x="250" y="180" width="263" height="69" rx="8"></rect>
        <mask id="mask-2" maskContentUnits="userSpaceOnUse" maskUnits="objectBoundingBox" x="0" y="0" width="263" height="69" fill="white">
            <use xlink:href="#path-1"></use>
        </mask>
    </defs>
    <use id="Rectangle" stroke="#000000" mask="url(#mask-2)" stroke-width="4" fill="#FFFFFF" fill-rule="evenodd" xlink:href="#path-1"></use>
    <text id="render" stroke="none" fill="none" font-family="Helvetica" font-size="20" font-weight="normal">
        <tspan x="353" y="220" fill="#000000">render</tspan>
    </text>
</svg>  
<svg width="263px" height="69px" viewBox="250 180 263 69" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <defs>
        <rect id="path-1" x="250" y="180" width="263" height="69" rx="8"></rect>
        <mask id="mask-2" maskContentUnits="userSpaceOnUse" maskUnits="objectBoundingBox" x="0" y="0" width="263" height="69" fill="white">
            <use xlink:href="#path-1"></use>
        </mask>
    </defs>
    <use id="Rectangle" stroke="#000000" mask="url(#mask-2)" stroke-width="4" fill="#FFFFFF" fill-rule="evenodd" xlink:href="#path-1"></use>
    <text id="componentDidMount" stroke="none" fill="none" font-family="Helvetica" font-size="20" font-weight="normal">
        <tspan x="289" y="220" fill="#000000">componentDidMount</tspan>
    </text>
</svg>

Where are animations supposed to fit in?

You can't use the `componentWillMount` hook because there is no DOM element to animate.

{% img /images/willMount.png %}

And you can't use the `componentDidMount` hook because the element is already there, so you would have to rerender it (causing a potential loop)
and you may see a jump as the component gets an orientation change after being added to the DOM.

{% img /images/didMount.png %}

## Solution: More Lifecycle Hooks

The React team recognized this problem and created a higher level component called *ReactTransitionGroups* that can wrap
additional components giving them more lifecycle hooks.

<svg width="263px" height="246px" viewBox="250 180 263 246" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <defs>
        <rect id="path-1" x="250" y="180" width="263" height="69" rx="8"></rect>
        <mask id="mask-2" maskContentUnits="userSpaceOnUse" maskUnits="objectBoundingBox" x="0" y="0" width="263" height="69" fill="white">
            <use xlink:href="#path-1"></use>
        </mask>
        <rect id="path-3" x="250" y="269" width="263" height="69" rx="8"></rect>
        <mask id="mask-4" maskContentUnits="userSpaceOnUse" maskUnits="objectBoundingBox" x="0" y="0" width="263" height="69" fill="white">
            <use xlink:href="#path-3"></use>
        </mask>
        <rect id="path-5" x="250" y="357" width="263" height="69" rx="8"></rect>
        <mask id="mask-6" maskContentUnits="userSpaceOnUse" maskUnits="objectBoundingBox" x="0" y="0" width="263" height="69" fill="white">
            <use xlink:href="#path-5"></use>
        </mask>
    </defs>
    <use id="Rectangle" stroke="#000000" mask="url(#mask-2)" stroke-width="4" fill="#FFFFFF" fill-rule="evenodd" xlink:href="#path-1"></use>
    <use id="Rectangle" stroke="#000000" mask="url(#mask-4)" stroke-width="4" fill="#FFFFFF" fill-rule="evenodd" xlink:href="#path-3"></use>
    <use id="Rectangle" stroke="#000000" mask="url(#mask-6)" stroke-width="4" fill="#FFFFFF" fill-rule="evenodd" xlink:href="#path-5"></use>
    <text id="componentWillMount" stroke="none" fill="none" font-family="Helvetica" font-size="20" font-weight="normal">
        <tspan x="288" y="220" fill="#000000">componentWillMount</tspan>
    </text>
    <text id="render" stroke="none" fill="none" font-family="Helvetica" font-size="20" font-weight="normal">
        <tspan x="353" y="311" fill="#000000">render</tspan>
    </text>
    <text id="componentDidMount" stroke="none" fill="none" font-family="Helvetica" font-size="20" font-weight="normal">
        <tspan x="289" y="399" fill="#000000">componentDidMount</tspan>
    </text>
</svg>

Any component that is wrapped within a *ReactTransitionGroup* component will get a couple new lifecycle hooks.
One of the most relevant is `componentWillEnter` which will be fired as soon as the component is mounted (the same time as componentDidMount).

<svg width="351px" height="334px" viewBox="141 61 351 334" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <defs>
        <rect id="path-10" x="141" y="141" width="170" height="52" rx="6"></rect>
        <mask id="mask-20" maskContentUnits="userSpaceOnUse" maskUnits="objectBoundingBox" x="0" y="0" width="170" height="52" fill="white">
            <use xlink:href="#path-10"></use>
        </mask>
        <rect id="path-30" x="141" y="61" width="226" height="69" rx="8"></rect>
        <mask id="mask-40" maskContentUnits="userSpaceOnUse" maskUnits="objectBoundingBox" x="0" y="0" width="226" height="69" fill="white">
            <use xlink:href="#path-30"></use>
        </mask>
        <path d="M141,333.999471 C141,329.581485 144.582815,326 149.001933,326 L295.121094,326 L358.998463,326 C363.41759,326 367,329.588481 367,333.999471 L367,387.000529 C367,391.418515 363.427298,395 359.006351,395 L148.993649,395 C144.578879,395 141,391.411519 141,387.000529 L141,333.999471 Z" id="path-50"></path>
        <mask id="mask-60" maskContentUnits="userSpaceOnUse" maskUnits="objectBoundingBox" x="0" y="0" width="226" height="69" fill="white">
            <use xlink:href="#path-50"></use>
        </mask>
        <rect id="path-70" x="141" y="203" width="170" height="52" rx="6"></rect>
        <mask id="mask-80" maskContentUnits="userSpaceOnUse" maskUnits="objectBoundingBox" x="0" y="0" width="170" height="52" fill="white">
            <use xlink:href="#path-70"></use>
        </mask>
        <rect id="path-90" x="141" y="264" width="170" height="52" rx="6"></rect>
        <mask id="mask-100" maskContentUnits="userSpaceOnUse" maskUnits="objectBoundingBox" x="0" y="0" width="170" height="52" fill="white">
            <use xlink:href="#path-90"></use>
        </mask>
        <rect id="path-101" x="322" y="264" width="170" height="52" rx="6"></rect>
        <mask id="mask-102" maskContentUnits="userSpaceOnUse" maskUnits="objectBoundingBox" x="0" y="0" width="170" height="52" fill="white">
            <use xlink:href="#path-101"></use>
        </mask>
    </defs>
    <use id="Rectangle" stroke="#000000" mask="url(#mask-20)" stroke-width="3" fill="none" xlink:href="#path-10"></use>
    <use id="Rectangle" stroke="#000000" mask="url(#mask-40)" stroke-width="4" fill="none" xlink:href="#path-30"></use>
    <use id="Rectangle" stroke="#000000" mask="url(#mask-60)" stroke-width="4" fill="none" xlink:href="#path-50"></use>
    <use id="Rectangle" stroke="#000000" mask="url(#mask-80)" stroke-width="3" fill="none" xlink:href="#path-70"></use>
    <use id="Rectangle" stroke="#000000" mask="url(#mask-100)" stroke-width="3" fill="none" xlink:href="#path-90"></use>
    <text id="ReactTransitionGroup" stroke="none" fill="none" font-family="Helvetica" font-size="20" font-weight="normal">
        <tspan x="156" y="103" fill="#000000">ReactTransitionGroup</tspan>
    </text>
    <text id="ReactTransitionGroup" stroke="none" fill="none" font-family="Helvetica" font-size="20" font-weight="normal">
        <tspan x="156" y="368" fill="#000000">ReactTransitionGroup</tspan>
    </text>
    <text id="componentWillMount" stroke="none" fill="none" font-family="Helvetica" font-size="14" font-weight="normal">
        <tspan x="161" y="173" fill="#000000">componentWillMount</tspan>
    </text>
    <text id="componentDidMount" stroke="none" fill="none" font-family="Helvetica" font-size="14" font-weight="normal">
        <tspan x="161" y="296" fill="#000000">componentDidMount</tspan>
    </text>
    <use id="Rectangle" stroke="#000000" mask="url(#mask-102)" stroke-width="3" fill="none" xlink:href="#path-101"></use>
    <text id="componentWillEnter" stroke="none" fill="none" font-family="Helvetica" font-size="14" font-weight="normal">
        <tspan x="342" y="296" fill="#000000">componentWillEnter</tspan>
    </text>
    <text id="render" stroke="none" fill="none" font-family="Helvetica" font-size="14" font-weight="normal">
        <tspan x="206" y="235" fill="#000000">render</tspan>
    </text>
</svg>

`componentWillEnter` creates a lifecycle hook that we can use to animate an components we want.
All other animations will be blocked until a callback is called.

Chang Wang has an excellent example of how to build an animation with Tween using [ReactTransitionGroups](https://medium.com/@cheapsteak/animations-with-reacttransitiongroup-4972ad7da286#.6r1fat121).
If you need fine grained control or want to use a specific library, than `ReactTransitionGroups` are the way to go.

If you need something even easier, React made a further abstraction called `ReactCSSTransitionGroups` that [utilize transition](https://github.com/facebook/react/blob/master/src/addons/transitions/ReactCSSTransitionGroupChild.js) groups but allow the developer to use CSS transitions to handle any animations.

## ReactCSSTransitionGroups

`ReactCSSTransitionGroups` work by wrapping components and then adding specific classes to child components for a designated amount of time.

Here's an example of how you would set it up:

```javascript
const ShapeContainer = ({elements}) => (
  <div id = "shapes">
    <ReactCSSTransitionGroup
      transitionName = "shape"
      transitionEnterTimeout={2000}
      transitionLeaveTimeout={2000}
     >
      {elements}
    </ReactCSSTransitionGroup>
  </div>
)
```

Notice a few things.
I gave the transition name of shape and a transition enter timeout of 2000 milliseconds and the same for the transition leave.

This means that a few classes with the base name *shape* will be added to every child component for 2 seconds before they are automatically removed.

To take advantage of any transitions, we need to define them with CSS:

```css
.shape-enter {
  transform: scale(0);
}

.shape-enter.shape-enter-active {
  transform: scale(1);
  transition: all 2s ease-in;
}
```

Rendered code will look like this.
The `span` tag is the `ReactCSSTransitionGroup` (although you can specify other tags like `div` or `ul`).

```html
<div id="shapes">
  <span data-reactid="0.1">
  </span>
</div>
```

Any child componenent that is added will receive that `shape-enter` class.
This sets up the initial styling that will be animated (in this example it is effectively hidden).

```html
<div id="shapes">
  <span data-reactid="0.1">
      <svg data-reactid=".0.2"
           class="shape-enter">
        <circle data-reactid=".0.2"></circle>
      </svg>
  </span>
</div>
```

In the next tick, the component will receive the `shape-enter-active` class which will trigger the CSS transition.
In this example, it will scale it up to full size.
The timing for the transition should match the timeout on CSS transition group.

```html
<div id="shapes">
  <span data-reactid="0.1">
      <svg data-reactid=".0.2"
           class="shape-enter shape-enter-active">
        <circle data-reactid=".0.2"></circle>
      </svg>
  </span>
</div>
```

After the timeout is reached, the classes are removed from the component. 

```html
<div id="shapes">
  <span data-reactid="0.1">
      <svg data-reactid=".0.2"
           class="">
        <circle data-reactid=".0.2"></circle>
      </svg>
  </span>
</div>
```

Any subsequent children will go through the same process.

Animating a component leaving is even more important.
Without transition groups, a component will disappear before anything can happen to it.
However, with `ReactCSSTransitionGroups` the whole process happens in reverse.

Let's start with the leaving css.
We'll start at full size and shrink to nothing.

```css
.shape-leave {
  transform: scale(1);
}

.shape-leave.shape-leave-active {
  transform: scale(0);
  transition: all 2s ease-in;
}
```
A component in the DOM will first receive the `shape-leave` class:
```html
<div id="shapes">
  <span data-reactid="0.1">
      <svg data-reactid=".0.2"
           class="shape-leave">
        <circle data-reactid=".0.2"></circle>
      </svg>
  </span>
</div>
```

After that, it will receive the `shape-leave-active` class:

```html
<div id="shapes">
  <span data-reactid="0.1">
      <svg data-reactid=".0.2"
           class="shape-leave shape-leave-active">
        <circle data-reactid=".0.2"></circle>
      </svg>
  </span>
</div>
```

And when the timeout set on the `ReactCSSTransitionGroup` component is reached, the element is removed.
Note: The element is not removed after the animation is complete, but when the timeout is reached.
So if the CSS transition is longer than the timeout it will just disappear.

```html
<div id="shapes">
  <span data-reactid="0.1">
  </span>
</div>
```

And that's all it takes.

Here's a full demo you can try:

<p data-height="450" data-theme-id="0" data-slug-hash="KgdNWy" data-default-tab="js,result" data-user="jsmapr1" data-embed-version="2" class="codepen">See the Pen <a href="http://codepen.io/jsmapr1/pen/KgdNWy/">ReactCSSTransitionGroup</a> by Joe Morgan (<a href="http://codepen.io/jsmapr1">@jsmapr1</a>) on <a href="http://codepen.io">CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script>
