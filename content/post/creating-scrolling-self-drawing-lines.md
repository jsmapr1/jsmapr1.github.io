+++
title = "creating scrolling self drawing lines"
date = "2015-09-03"
slug = "2015/09/03/creating-scrolling-self-drawing-lines"
published = false
Categories = []
+++
First of all here's a demo. Scroll inside the codepen to view: 
<p data-height="268" data-theme-id="0" data-slug-hash="QjNbgz" data-default-tab="result" data-user="jsmapr1" class='codepen'>See the Pen <a href='http://codepen.io/jsmapr1/pen/QjNbgz/'>QjNbgz</a> by Joe Morgan (<a href='http://codepen.io/jsmapr1'>@jsmapr1</a>) on <a href='http://codepen.io'>CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script>

My office recently designed a campaign to encourage student applications as a deadline neared.
Our goal was to create a very unique and engaging page for potential students and the designers settled on a theme of motion and inertia.
Translating that into an experience on the web was a little more difficult.
We needed something that pulled the viewer along, that interacted with them, but did not try to control the pace.
After taking inspiration from a few sites ([particularly this one](http://pitchfork.com/features/cover-story/reader/streaming/)) we created a design that would generate a self drawing line that responded to the user as they scrolled.
When a user scrolled down the page, the line drawing would be built. If they scrolled backwards, it would undo itself.

The concept was simple and effective. It was unique enough to create an experience that would engage the viewer and set us apart from the noise.
The best part was that the JavaScript ended up being surprisingly simple. Here are the steps in brief:

1.  Calculate the length of an SVG
2.  Create a dash the length of the SVG (making it appear invisible)
3.  Set a start point and an end point relative to the top and bottom of the svg (could also be relative to another element)
4.  Calculate the distance between the top and the bottom
5.  Calculate the amount of pixels that must be added per pixel of vertical scroll
6.  Attach an method to the scroll event that adds pixels (removes the dash)

Not bad, huh?

## Calculate the length of an SVG
This is actually pretty straight forward. The key is having an SVG that is only a path:
```html
<svg  enable-background="new 0 0 612 792" version="1.1" viewBox="0 0 612 792" x="0px" y="0px">
    <path d="M133.7-2.2l157.1,368V792" fill="none"    id="line" stroke="#E11837" stroke-miterlimit="10" stroke-width="2" ></path> 
</svg>
```

Now we can easily get the length of the path using a [path method](https://developer.mozilla.org/en-US/docs/Web/API/SVGPathElement):

```javascript
var path = document.getElementById('line');
svg.getTotalLength();
//826.331
```

## Create a dash the length of the SVG
With the length of the path calculated, make dash on the path that is the exact same lenght.
This will make the path invisible:
```javascript
path.style.strokeDasharray = svg.getTotalLength();
```
##Set a start point and an end point relative to the top and bottom of the SVG
The next step is where it gets a little tricky.
There needs to be a starting and a stopping point on the screen to trigger the beginning (or end) of the animation.
This will be determined by calculating the distance of the start point from the top of the page.
To determine this, I used the [getBoundClinetRect method](https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRec://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect).
This works on any html element and returns a nice object giving the location of the element's bounds _relative to the viewPort_.

The result looks like this:
```javascript
path.getBoundingClientRect();
//
{
    bottom: 2455.22607421875
    height: 1816.79736328125
    left: 215.84967041015625
    right: 575.228759765625
    top: 638.4287109375
    width: 359.3790893554687
}
```
From that we need to find the absolute position.
To do that, get the top position of the body tag.
```javascript
document.body.getBoundingClientRect().top;
//-427
```
Since this is relative to the view port, it will almost certainly be a negative number.
To get the start point relative to the top of the body, just subtract the top of the body from the top of the element.
From above, this would be 638 - -427. So the start of the element is 1065 pixels from the top of the page.
Now this will all be fine except for that would start the animation when the top of the element is at the top of the viewPort.
The result is that the animation would always be just barely out of view.
That is less than ideal and wouldn't create the desired effect.

The last step is subtracting the distance from the top of the viewPort that we want the effect to start resulting in a start point start point _above_ the top of the SVG.
In other words, if an SVG starts 1000px from the top of the body and the viewport is 100px high (why not) and we want it to start when the top of the SVG is in the middle of the viewport, then the animation _really_ needs to start 950px from the top of the body.
The ability to set the start and stopping point is one of the best ways to control the speed and visual affect of an SVG.
If we want the SVG to coming shooting out of the top of the screen, we can set it to start after the page has past it's starting point (make it a negative number, -2).
If we want the SVG to begin before we hit a visible area, all we need to do is set the start number higher than 1 (1.2) for example.

The end point is pretty much the same, except we get the bottom of the SVG bounding container. Everything else is the same.

## Calculate the distance between the top and the bottom
With the start and the end points set, the distance is a simple subtraction.
```javascript
this.verticalDistance = this.start - this.end;
```
However, we need to be able to recalculate this on the fly.
So we really need to know both the total distance and  the remaining distance.
This can be figured out using [window.pageYOffset/window.scrollY](https://developer.mozilla.org/en-US/docs/Web/API/Window/scrollY).

```javascript
\\Defined in the animate line function
this.currentVisiblePosition = window.pageYOffset;

Scroller.prototype.distanceRemaining = function () {
  return this.end - this.currentVisiblePosition;
};
```

## Calculate the amount of pixels that must be added per pixel of vertical scroll
With the SVG length and starting and stopping points established, all that's left is to figure out how much to add reveal as the user scrolls down.
That is easily accomplished with a simple function:

```javascript
\\ Add to the prototype
Scroller.prototype.pixelsPerVerticalScroll = function () {
  this.verticalDistance = this.end - this.start;
  return this.svgLength / this.verticalDistance;
};
```

## Attach an method to the scroll event that adds pixels (removes the dash)
Finally, we just need to attach a method to the scroll event so that the line will be continually updated.
It's going to have three parts:

1.  If we are before the start point: Show nothing.
2.  If we are after the end poing: Show everything. 
3.  If we are between the start and the end point: Show the correct percentage.

```javascript
\\ Attach the scroll even during the init function
window.addEventListener('scroll', this.animateLine.bind(this));

Scroller.prototype.animateLine = function () {
  this.currentVisiblePosition = window.pageYOffset;
  if (this.currentVisiblePosition < this.start) {
    this.svg.style.strokeDashoffset = this.svgLength;
  }

  if (this.currentVisiblePosition > this.end) {
    this.svg.style.strokeDashoffset = '0px';
  }

  if (this.currentVisiblePosition > this.start && this.currentVisiblePosition < this.end) {
    this.svg.style.strokeDashoffset = this.distanceRemaining() * this.pixelsPerVerticalScroll() + 'px';
  }
};
```

## Initializing
The initialization will set most of the values:
```javascript
function Scroller(options) {
  this.svg = options.el;
  //Animation will end when the end is at which point of othe page. .9 is at about 90% down the page/
  // .1 is 10% from the top of the page. Default is middle of the page.
  this.animationBounds = {};
  this.animationBounds.top = options.startPoint || .5;
  this.animationBounds.bottom = options.endPoint || .5;
  this.animationBounds.containerBounds = this.svg.getBoundingClientRect();
  this.start = this.getPagePosition('top');
  this.end = this.getPagePosition('bottom');
  this.svgLength = this.svg.getTotalLength();
  this.svg.style.strokeDasharray = this.svgLength;
  this.animateLine();
  window.addEventListener('scroll', this.animateLine.bind(this));
}
```

From there, we can easily add as many as we want. All we need is an ID on the SVG
```javascript
new Scroller({
  'el': document.getElementById('mySvg'),
  'startPoint': startPoint,
  'endPoint': endPoint
})
```

There were a few other ideas I played with. I considered adding a stop and start to a container element rather than the SVG itself.
This wouldn't be too hard, the only change would be to specify the startPoint and endPoint belong to a different element.
I also considered adding a pause point, but that required too many extra considerations that would depend on screen width and such.
For now, I left it simple and it worked out very well.
