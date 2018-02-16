+++
title = "creating a dropdown menu in react"
date = "2016-01-05"
slug = "2016/01/05/creating-a-dropdown-menu-in-react"
Categories = []
+++

Here's a quick guide to creating a dropdown menu with React native components.

Just want code? Here's a demo:
<p data-height="268" data-theme-id="0" data-slug-hash="gPmPyr" data-default-tab="result" data-user="jsmapr1" class='codepen'>See the Pen <a href='http://codepen.io/jsmapr1/pen/gPmPyr/'>React CSSTransitionGroup DropDown Menu</a> by Joe Morgan (<a href='http://codepen.io/jsmapr1'>@jsmapr1</a>) on <a href='http://codepen.io'>CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script>

React provides a simple component for [adding animations to items](https://facebook.github.io/react/docs/animation.html).
It can do a few things, but in short, it works with CSS3 transitions by adding classes for a short amount of time to allow the transition to take affect.


To start, some simple markup:

```html
<div id="menuContainer"></div>
<div>
  <p>Body Text</p>
  <p>Body Text</p>
  <p>Body Text</p>
</div>
```

Obviously, we want the menu to replace the menuContainer element.

Now, we need to create a small menu component.
For simplicity sake, I'm leaving state on the component, but I've since delegated state handling to redux, but the idea is similar:
```javascript
let ReactCSSTransitionGroup = React.addons.CSSTransitionGroup

class DropDown extends React.Component {
  constructor(props) {
    super(props);
    this.toggleMenu = this.toggleMenu.bind(this);
    this.state = {
      menuActive: false
    };
  }

  toggleMenu() {
    let menuState = !this.state.menuActive;
    this.setState({
      menuActive: menuState
    });
  }

  render() {
    let menu;
    if(this.state.menuActive) {
      menu = <div>
                <ul>
                  <li>First Item </li>
                  <li>Second Item </li>
                  <li>Third Item </li>
                </ul>
              </div>
    } else {
      menu = "";
    }
    return (
      <div id = "menu">
        <i className = "fa fa-plus" onClick = { this.toggleMenu }/> 
      <ReactCSSTransitionGroup transitionName = "menu" transitionEnterTimeout={1000} transitionLeaveTimeout={1000}> 
        {menu} 
      </ReactCSSTransitionGroup>
    </div>
    )
  }
}

ReactDOM.render(
  <DropDown />,
    document.getElementById('menuContainer')
);

```

Ok, so what's happening here.
I'm creating a simple react element with a state of menuActive.
If we click an icon (I'm using [font awesome](https://fortawesome.github.io/Font-Awesome/)), then the menuActive state should toggle to true and the menu should animate.
That explains state, the toggleMenu function and the _i_ element.

The trick is the ReactCSSTransitionGroup.
I add the transitionName of menu along with a transitionEnterTimeout and a transitionLeaveTimeout.
This tells react to add the class of menu for 1 second when it adds the new child elements (the menu) and to add it for 1 second when it removes the child elements.
This leaves time for the css transitions to do there thing.

Speaking of, the css is rather simple. . .

```css
.menu-enter {
  max-height: 0px;
  -webkit-transition: max-height 1s ease;
  overflow: hidden; 
}

.menu-enter.menu-enter-active {
  height: auto;
  max-height: 100px;
}

.menu-leave {
  max-height: 100px;
  -webkit-transition: max-height 1s ease;
}

.menu-leave.menu-leave-active {
  overflow: hidden;
  max-height: 0px;
}

ul {
  border: #ababab solid 1px;
  width: 70%;
}

```

All we are doing is adding a transition to a max-height of 100px.
Since the menu is dynamically generated, we need max height since I have no idea how big it will be. In production, it will be even larger.

The transitions will take 1 second which is the same as transitionEnterTimeout and transitionLeaveTimeout.

That's pretty much all there is to it. Simple and easy.

The downside is, that CSS3 does not work on ie9 which I do still support, but there are conditional tags for that.
