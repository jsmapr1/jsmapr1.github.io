+++
title = "building an npm package part 3 testing locally"
date = "2016-08-18"
slug = "2016/08/18/building-an-npm-package-part-3-testing-locally"
Categories = []
+++

## Testing Locally
You have, of course been writing tests the whole time, right?
Of course, well even so you need to test it out in another application.

Fortunately, it's very simple using [npm link](https://docs.npmjs.com/cli/link).

First, in your the project directory, run `npm link` this will create a global symlink.

Then in your test project, run `npm link [package name]`.

In my case, `npm link frontend-gitlab`.

You can combine these into one step by going to the test project and using a relative path: `npm link ../frontend-gitlab`.

The only trick, is that if you need to remember to run the build script every time you make a change because your test project will be looking for those files as if it was being built when added from npm.
That sounds simple, but I kept confusing myself by making a change, but not seeing it reflected in the test project.

That's it. This was simple, but then that's what's great about npm.
