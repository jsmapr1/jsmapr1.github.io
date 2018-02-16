+++
title = "building an npm package part 4"
date = "2016-08-26"
slug = "2016/08/26/building-an-npm-package-part-4"
Categories = []
+++

Well, all the hard work is done it's time to deploy.

Fortunately, this is one of the easiest parts of npm.
Deploying is a [simple process](https://docs.npmjs.com/getting-started/publishing-npm-packages), so I will limit myself
to summarizing.

## Have An Account
Head over to [npm](https://www.npmjs.com/signup) and establish a user.

Connect the project to your account with `npm login`;

Piece of cake. Nothing else to see here.

## Update .npmignore
This file is for anything you want to ignore when the file is published.

Recall from the discussion on [package.json](/blog/2016/07/27/building-an-npm-package-part-2-package-dot-json/) that you
should have a script called `prepublish` that will do any fancy compiling that needs to be done.

Now that we are compiling all the things down, there is no need to include the uncompiled files.
Test files too do not need to be included.
These all add extra weight to your package.

So add those to your .npmignore.
Here's a simple one:
```
test/
src/
.babelrc
```

Remember npm handles all the dependencies, so ignore node_modules either here or (preferably) in your .gitignore file.

## Publishing and Updating

Now all you have to do is run `npm publish` and your package is live.

Congratulations!

If you're anything like me, you'll immediately notice some mistakes.
So, you'll need to be able to update and version.

Make whatever changes you want. The update the version with `npm version` e.g. `npm version 1.0.1`.
This will change the package.json version number and add a tag to your git repo.

Now all you have to do is run `npm publish` again and everything is up to date.
Very easy.

## All Done

Now go forth and make many more commits.

