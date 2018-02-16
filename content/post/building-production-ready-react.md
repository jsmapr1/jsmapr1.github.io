+++
title = "building production ready react"
date = "2015-12-02"
slug = "2015/12/02/building-production-ready-react"
Categories = []
+++

##Production Ready React
React is still an evolving project.
Add to that complications of needing to transpile any javascript with ES6 syntax and you have best practices that are, at best, a moving target.
After running into a few issues, I wanted to get all the information I have together in one accessible place.

Here are my goals for the current project:

- Write code in ES6 syntax (but compiled so that it can be cross-browser compatible)
- Make production code as small as possible including all dependencies
- Make the project easy to deploy and hand off to other developers

This list seemed fairly simple, but there were a few surprises that I did not anticipate.

### ES6 Syntax
Writing in ES6 (ES2015, whatever) is practically required at this point for a javascript developer.
I, like most, opted for one of the most popular transpilers: [babel](https://babeljs.io/).
This set up is pretty standard (note: I'll be using browserify):

`npm install --save-dev babelify`

Most tutorials stop here, but there have been some changes to the project in the last 6 months.
In addition to the base transpiler, we have to install presets so that babelify will work with the various syntax oddities:

`npm install --save-dev babel-preset-es2015 babel-preset-react`

One of the big advantages of ES6 and modern javascript development is the ability to create modules so that code can be broken up and included in different files.
The two big contenders for handling this are [browserify](http://browserify.org/) and [webpack](https://webpack.github.io/).
Honestly, they seem equally good for me, so I went with browserify for absolutely no specific reason.

Anyway, install that: `npm install --save-dev browserify`.

After that to build we just need to run:

`browserify js/app.js -t [ babelify --presets [ es2015 react ] ] > public/js/app.js`

Again, the secret is to make sure the presets are listed otherwise it won't work and you will receive a very unhelpful error message:

`ParseError: 'import' and 'export' may appear only with 'sourceType: module'`

I burned a lot of time trying to figure out what was causing the error.
Turns out it I merely had not included the presets.

## Small Size
The next step is to pipe everything through [uglify](https://github.com/mishoo/UglifyJS2) to get it nice and minimized:

`npm install --save-dev uglify`

and then:

`browserify js/app.js -t [ babelify --presets [ es2015 react ] ]| uglifyjs -c -m > public/js/app.js`

As an example, the first transformation (browserify + babelify) made my code usable in a browser and it weighed in at 950 kb.
Minification made it much smaller at 314 kb. However, that wasn't quite small enough for me.

After looking at the [react documentation] (https://facebook.github.io/react/downloads.html#npm) I noticed that there was a production and a development mode for React.
The instructions are not very clear on how to achieve production mode, but after a little experimentation, I found the key is to use envify (as suggested in the documentation).

`npm install --save-dev envify`

And then add that to the browserify command:

`browserify js/app.js -g [envify --NODE_ENV 'production'] -t [ babelify --presets [ es2015 react ] ]| uglifyjs -c -m > public/js/app.js`

The `-g` flag is a global transform that applies to all files after the babelify transforms run. The result is 260 kb file.

### Easy To Give to Other Developers
To make things even easier, I added that all to my package.json file so that it can be run from the command line:
```javascript
  "scripts": {
    "build": "browserify js/app.js -g [envify --NODE_ENV 'production'] -t [ babelify --presets [ es2015 react ] ]| uglifyjs -c -m > public/js/app.js",
  },
```

This can be run with the command: `npm run build`

### Small Enough?
The one thing that bothered me, was the code still seemed very large compared to using the official minified version of React.

The minified version of react is only 145 kb and jquery (which I'm using mostly for ajax) is only 34 kb. So where does the extra size come from?

As an experiment to get the smallest size, I used [browserify-shim](https://github.com/thlorenz/browserify-shim). This allows me to set global variables so that I can both include them in the script, but not combine the library into the final minified file.

For example, I can begin a script with this:
```javascript
import React from 'react';
import $ from 'jquery';
import DropDown from './DropDown.jsx';
import FilterableList from './FilterableList.jsx';
```
but browserify-shim knows that React and Jquery will be global variables, so it creates a reference to the global
rather than packaging the React object in the final file.

To make this work, all we need to do is add browserify-shim to our node modules: `npm install --save-dev browserify-shim`.
And then in our package.json, we update the script to use browserify-shim and we specify which imports should be ignored.

```javascript

  "scripts": {
    "build": "browserify js/app.js -g [envify --NODE_ENV 'production'] -t [ babelify --presets [ es2015 react ] ]  -t browserify-shim | uglifyjs -c -m > public/js/app.js",
  },

  "browserify-shim": {
    "react": "global:React",
    "react-dom": "global:ReactDOM",
    "jquery": "global:$"
  }
```

And, of course, now the minified versions must be included in the page:

```html
<script src="https://fb.me/react-with-addons-0.14.5.min.js"></script>
<script src="https://fb.me/react-dom-0.14.5.min.js"></script>
<script src="https://code.jquery.com/jquery-2.1.4.min.js"></script>
<script src="public/js/app.js"></script>
```

The final result is a combined total of 195 kb. Why it gets so much smaller, I'm not quite sure.
Honestly, I still haven't decided if the extra size is worth the latency of fetching that many more files, but a drop of over 33% is nothing to walk away from.
For now, I like having the option. Some throttled and mobile testing later will help decide if it is worth it.
