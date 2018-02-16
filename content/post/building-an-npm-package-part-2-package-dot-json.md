+++
title = "building an npm package part 2 package dot json"
date = "2016-07-27"
slug = "2016/07/27/building-an-npm-package-part-2-package-dot-json"
Categories = []
+++

Anytime I begin to look deeply into an open source project should begin at the package file.
The reason I do this is because it gives a starting point for nearly everything and I can easily get a lot of clues about the project from these points.

Most modern web projects have something like a package file.
Some languages make this easier than others; the package.json file or composer.json file have scripts and dependencies along with other goodies.
Other projects split them out a bit; Ruby has a gemfile, but also a rakefile with various scripts.

Nonetheless, it is a good starting point no matter the language.
And fortunately for us, npm is one of the best, I would say the best, out there.
It's a nice time to be a javascript developer.

#Package.json
With that in mind, let's dive in.
I'm not going to go into detail about every single field.
The [documentation](https://docs.npmjs.com/files/package.json) is actually very good, so there's no reason to duplicate effort.
Instead, I will point out a few particulars that I enjoy using and enjoy seeing others use.

#main
This is the primary entry point for your script.

When a user types:`require('your-package')` or `import yourPackage from your-package` the main file is what that import will refernce.

As [mentioned previously](/blog/2016/05/31/building-an-npm-package-part-1/) this is something to consider if you want a single entry point or multiple entry points.

There can be only one main file, but the rest of the structure of the project will determine how other pieces can be imported.
For example, if you have other chunks of code in the __cool__ directory, than a user can import by referencing that directory (e.g. `import {coolaid} from 'cool-package/cool/superCool'`).
More on this later.

For most projects this will be something like `main.js` or `index.js`.

#bin

I haven't used this on any projects, but this is how you specify a project that should be placed in the PATH.
In other words, this is how you create a command line utility (think mocha or babel or, well, anything you run from the command line).

The syntax is simple. For a command line that is the same as the package name, it is simply: `bin: './path/to/executable'`.
You can also specify a name in an object:
```javascript
"bin": {
  "my": "./path/to/my-package"
}
```

Again, as an example, here is the bin for mocha
```javascript
"bin": {
  "_mocha": "./bin/_mocha",
  "mocha": "./bin/mocha"
}
```

If you are curious, if you want to install a file with a command line interface that is installed only in a project,
you just have to specify the path to the node_modules bin e.g. `node_modules/.bin/mocha`.

You can also reference the module in a npm script and the correct path will be inferred.

Speaking of scripts. . .

#script
This is by far my favorite part of npm (other than packaging dependencies).

I've signed on to the [recent trend](https://medium.freecodecamp.com/why-i-left-gulp-and-grunt-for-npm-scripts-3d6853dd22b8#.fhl757bda) of using [npm scripts in lieu of gulp or grunt or any of those things](http://blog.keithcirkel.co.uk/how-to-use-npm-as-a-build-tool/).

Why? There are two reasons. The first is that it is much easier to play around with scripts at the command line.
That is, it's much easier to experiment with different flags and options from the command line and then, once it is working correctly, I just shove it into an npm script.

Secondly, as I mentioned at the beginning, a package.json file is a great place to get an idea of what a project does and seeing the scripts is a big part of that.

Here's one that I particularly like from [redux-thunk]()
```javascript
"scripts": {
  "clean": "rimraf lib dist es",
  "build": "npm run build:commonjs && npm run build:umd && npm run build:umd:min && npm run build:es",
  "prepublish": "npm run clean && npm run test && npm run build",
  "posttest": "npm run lint",
  "lint": "eslint src test",
  "test": "cross-env BABEL_ENV=commonjs mocha --compilers js:babel-core/register --reporter spec test/*.js",
  "build:commonjs": "cross-env BABEL_ENV=commonjs babel src --out-dir lib",
  "build:es": "cross-env BABEL_ENV=es babel src --out-dir es",
  "build:umd": "cross-env BABEL_ENV=commonjs NODE_ENV=development webpack",
  "build:umd:min": "cross-env BABEL_ENV=commonjs NODE_ENV=production webpack"
},
```
I like this because I can see exactly how a high-quality package is built and maintained.
I can see which testing suite is used. The location of the tests (in this case it would have been obvious, but still).
I can see how the build is implemented and so on.

Finally, as a potential contributor, it's fairly obvious what I need to do to make sure that the integrity of the project is maintained.
I don't need to worry about having gulp globally installed or mocha. It's all packaged and referenced.
I just need to run `npm test` to test and `npm run lint` to lint.
Super easy.

Ok, enough gushing.
There is a [a lot you can do with scripts](https://docs.npmjs.com/misc/scripts), but here are some of the best use cases:

- __test__: Always have tests. This is a reserved script, so you can run it by simply typing `npm test`
- __lint__: Always lint your code. This is not reserved, so you must run `npm run lint`
- __start__: This is another reserved script, add in whatever you need to get a server up and running. If you have a server.js file, you do not need to write the script, but I think you should so it will be clear to future users.
- __prepublish__: This is a script that will run when you publish your project. This matters because you do not need to check in transpiled code.
For example. This script `"prepublish": "npm run build"` will run the build script `"build": "babel src -d ./"` which will compile the es6 code into the root directory.
I also could have it compile to a build directory `"build": "babel src -d ./build",`, but that would make importing from non-main files a little less intuitive.
- __anything__: I have a rule that if I type something more than once a day (in regards to a package) it should go in a script since future users will likely need to do it too. For example, I had a recent project that I would deploy to production.
Since I'm not planning on publishing this as an npm package, I just added a deploy script, so `npm run deploy` would update the server. Sure, it's not a full one CI build (i.e. if tests are breaking, it would still deploy), but it worked in my situation.

Learn to love scripts. Your life will be better.

# All the other things
There's lots, lots, lots more, but those are better explored on a case-by-case basis.
However, there are best practices, so if you are planning on publishing, be sure to add:

- __name__: Obviously.
- __descript__: Obviously.
- __keywords__: Make it easier to be discovered
- __bugs__: Location for issues (usually on github/project/issues)
- __license__: Part of `npm init` so it's easy to remember. Lots of options, though.
- __version__: I prefere Major.Minor.Patch. Change the first number on breaking changes or major new features. The second on new features, but no breaks. And the third for, well, patches to existing features.

Again, the documentation is great, so peruse it occasionally or before you publish to make sure you have everything.

# Putting it together: Making multiple entry points

To return to a goal from the [planning stage](/blog/2016/05/31/building-an-npm-package-part-1/), how can we use our package.json file to create an npm package with multiple entry points?

It's actually fairly simple. The trick is to understand that there will need to be a little structure, but it can be simple and clear.

Let's start with a file structure such as this:

<pre>
-- src/
    -- index.js
    -- components/
        -- cool.js
        -- awesome.js
</pre>

In our package.json file set __main__ to be index.js.
Then in the build script, set the output to the root of the project.

```javascript
  "main": "index.js",
  "scripts": {
    "build": "babel src -d ./",
    "prepublish": "npm run build"
  },
```
That's all there is to it.
Now when a user can import the default along with other components not in the main file:

```javascript
import yourPackage from 'your-package';
import {cool} from 'your-package/components/cool';
```

You can, of course, link everything from your main file:

```javascript
//inside index.js
import {cool, rad} from './components/cool';
import {awesome} from './components/awesome';

export {
  cool,
  rad,
  awesome,
}
```

But that has the downside of growing out of control rather quickly.
Personally, I like have nested, separate functions, but it's a choice every author must make.

So there you have it.
The _package.json_ file is great and there's tons that you can do with it.
I know I just barely scratched the surface.
As a recommendation, when ever you have some time to kill, look up your favorite npm package on github and take a few minutes to explore the package.json file and the project structure.
It will give you many sources for ideas on your own projects.
