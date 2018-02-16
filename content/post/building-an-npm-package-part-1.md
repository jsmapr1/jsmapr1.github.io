+++
title = "building an npm package part 1"
date = "2016-05-31"
slug = "2016/05/31/building-an-npm-package-part-1"
published = false
Categories = []
+++

## NPM Packages
At this point, node has become an integral part of web development.
Even though most web developers are not node developers, the suite of command line tools built on node is just too good to ignore.
And at the core of this suite of tools, is the node package manager, NPM.

I recently have been working a bit with gitlab through a project at work and decided to write a small api wrapper as a node project.
This is my attempt to document what it means to write a package for npm in 2016.
I'm sure this will be laughingly out of date in a few months, but that's all the more reason to continue writing simple tutorials to explain
some things that may not be clear from the documentation.

To start, I'll go through somethings I considered while planning the project.

## Who is the package for?
This is an obvious question, but it has some important implications.
A node package, unlike, say, an enterprise application, has the advantage of being code-centric.
It's an opportunity for us to scratch our own itch as they say.
In my case, I wanted to make an interface for the gitlab api so that I could automate the manipulation of certain tickets.

I also knew that I wanted it to to be a front-end application.
There was no particular reason for this other than that's what I happen to be writing a lot of these days, so I could do a lot of the non-gitlab stuff quickly.

I also, admittedly, want to showcase some of my code writing abilities as well as contribute to the open source community.
As a result, I wanted it to be absolutely pristine and a model of well-built code.

## Making Choices
With this in mind, I needed to start making choices. I'll list them out and then consider each in turn:

- Should this be a _javascript_ project or a _node_ project?
- Should I have one entry point or multiple entry points?
- Should it be one large package or a series of smaller packages?
- How much testing/linting/code coverage should I focus on particularly in the early stages?

## Javascript vs. Node
If NPM has one flaw, it is that node packages are mixed in with pure javascript packages.
This doesn't matter too often, but occasionally things just will not work in a pure javascript environment.

In fact, that is where I got the idea for writing this project in the first place.
There were several gitlab api wrappers available on npm, but they all required some node dependencies that were not available for front-end code.
In addition, the file size could be very large.
They included a lot of additional dependencies and covered lots of the interface.

These are great for server-side code, but for me it was overkill.
Not to mention they straight up do not work.

In addition, although it is a little trivial, they were written in mostly es5 syntax, which is all well and good,
but now I have chance to improve on that, and I was happy to seize the opportunity.

## Single Entry Point or Multiple Entry Points?

My next decision was whether to make a single entry point or multiple entry points.
The [gitlab api](https://github.com/gitlabhq/gitlabhq/tree/master/doc/api) is very large.
As a result, any package that covers everything would also be very large.

However, you can't beat the convenience of a single entry point.
Here's an example from a [node version of the gitlab wrapper](https://www.npmjs.com/package/node-gitlab):

```javascript
var gitlab = require('node-gitlab');
 
var client = gitlab.createPromise({
  api: 'https://gitlab.com/api/v3',
  privateToken: 'your private token'
});
 
client.milestones.list({id: 1})
  .then(function (milestones) {
    console.log(milestones);
  })
  .catch(function (err) {
    throw err;
  });
```

Once the client is set up, you have one large object that can fetch anything your heart desires.

However, as someone who has been writing front-end javascript for some time, I'm very sensitive to large dependencies especially if I only need a small subset of the package.

In other words, I want to be able to do this:
```javascript
import {milestones} from gitlab-wrapper;

const miles = milestones({
    api: 'url',
    token: 'token'
});
```

Rather than this:
```javascript
import gitlab from gitlab-wrapper;

const client = gitlab({
    api: 'url',
    token: 'token'
});
...

```

With that option available everything will be much smaller.

Although it seems straightforward, it did cause some confusion. More on that later.

## Should it be one large package or a series of smaller packages?
I am using (redux)[https://github.com/reactjs/redux] as one of my models for what a great package can be.
I was particularly impressed with how the package was broken out into independent entities.

There are separate projects for the (thunk middleware)[https://github.com/gaearon/redux-thunk] and 
the (hot loader)[https://github.com/gaearon/react-hot-loader] and so on.

The big advantage there is that each project has a very specific scope and can be focused on and released independently.
I was attracted to how this would make developing easier (in theory) and, of course, conform to current trends for small independent pieces of code.

However, I ultimately abandoned this idea because this multiple entry points will cover the size issue and the scope of the project seemed clear; it will be a wrapper for the gitlab api.
Breaking it up further just seemed, odd.
It seemed forced, so multiple entry points it will be.

## How much testing/linting/code coverage should I focus on particularly in the early stages?

I've been the victim of premature optimization before.
However, I've more often been the victim of rushed code, so I wanted to make sure everything was clean and tested.

The problem was there was a lot of boilerplate stuff to set up. Here's a partial list (because I can't remember everything):

- Babel
- Babel Presets
- Webpack
- Mocha
- Configuring Mocha to work with Babel
- Code Coverage with Istanbul

Not a huge list, but geez.
I still need to add in linting (mostly because inconsistent styling is one my main vices), but decided I should probably, you know, write some code at some time.

In the end, it is worth it, but what a pain.

## Now to begin

Hurray, decisions have been made, baselines have been established, and now it is time to jump in.
Next step, creating a package.json file and setting up the file structure for multiple entry points.
