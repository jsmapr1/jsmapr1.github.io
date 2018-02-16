+++
title = "mocking apis locally with webpack dot environmentplugin and json server"
date = "2016-04-07"
slug = "2016/04/07/mocking-apis-locally-with-webpack-dot-environmentplugin-and-json-server"
Categories = []
+++

I always love the beginning of a new project.
It's a great time to rethink a few basic fundamentals and to improve the overall development experience.

On my most recent project, I decided to give webpack a try.
I've thought about using webpack before, but never pulled the trigger until one blogger deemed it the 'winner' of [dependency management](https://medium.com/javascript-and-opinions/state-of-the-art-javascript-in-2016-ab67fc68eb0b#.qv9ei0f00)
I decided. Why not. Let's give it a go.

I'm not fully converted quite yet, but I did run into an interesting use case today.
I'm building a single page app that will serve as an events page for a week long event. It will be similar to a conference page.

I'll be pulling in a list of events from an api on the base site and then I'll handle filtering, saving, sharing, and all that fun stuff with React.

So far, so normal. The trick is that the api will ultimately be on the same domain as the single page app, but for development purposes, I'm keeping them separate (mostly so the full app can be in a separate git repo, but other reasons as well).
Now I have a problem dealing with [cross-origin resource sharing](https://en.wikipedia.org/wiki/Cross-origin_resource_sharing).
The code I'm working on is on localhost and the api is on the test site for the original site (for purposes of this post, we'll call it foo.app).

I thought about just modifying the headers on foo.app locally, but I want to allow other devs to contribute and everyone has slightly different development set ups (a problem for another day).
Out the window goes that idea.

The problem came to this: How can I make an api server that I can include with the project? And how can I configure the project to use that during development and the actual server in production?

## A simple local server
The answer to the api server was ridiculously simple thanks to a great project called [json-server](https://github.com/typicode/json-server).

The project is hosted on npm, so a simple install pulled it into my codebase `npm install --save-dev json-server`.
The official documentation suggests installing it globally, but I wasn't interested in that. I wanted the project to be dead simple for other developers to jump into, so I added a simple start up script to my package.json.
Make note of the start script, we'll come back to that in a bit.

```javascript
  "scripts": {
    "start": "webpack-dev-server --output-public-path=/public/",
    "api": "json-server --watch db.json --port 3004"
  }
```

After the project is cloned and dependencies installed, future devs just have to run `npm run api` to get the api server up and running.

The second step is to create a db.json file to serve as the mock data.
My api endpoint will be __foo.app/foo-fest__ and I want an array of events, so the db.json file will looks something like this:

```javascript
{
    "foo-fest": {
       "events": [
            {
                "title": "Cool Title",
                "description": "So Cool",
                "event": "Saturday, April 9, 2016, 12 - 1pm",
                "tags": "cool"
            },
            {
                "title": "Awesom Title",
                "description": "So Awesome",
                "event": "Sunday, April 10, 2016, 12 - 1pm",
                "tags": "awesome"
            }
        ]
    }
}
```

At this point, with the server running, a visit to __localhost:3004/foo-fest__ will return an object containing "events" and the array.

Phase one, check.

## Configure API url by environment
With phase one under control, the next step is to query the correct api depending on the environment. This is where webpack enters the picture.

I wanted to be able to use the build in webpack server for development, but needed to pass the environment variable.

Previously, the suggestions was to use [DefinePlugin](https://twitter.com/dan_abramov/status/592692202335301636) to set the NODE_ENV.
However, that lead to some rather [clunky code](http://stackoverflow.com/a/31517695) to allow different variables to be passed.

Fortunately, as was noted later in the Stack Overflow post, webpack introduced a new way to define environment variables called
[EnvironmentPlugin](https://github.com/webpack/docs/wiki/list-of-plugins#environmentplugin).
There are some security benefits, but the main advantage was it cleans everything up.

Here's my webpack.config with an EnvironmentVariable:

```javascript
    plugins: [
      new webpack.EnvironmentPlugin([
          'NODE_ENV'
      ])
    ],
```

With this in place, I can pass the NODE_ENV variable through webpack and into the application.

The next step is to add an config that holds the url for the api by environment.
The config is very basic. I may use it in the future. I may not. For now here, it is:

```javascript
export default {
    "production": {
        "api" : "http://foo.app"
    },
    "dev": {
        "api": "http://localhost:3004"
    }
}
```
I'm use redux to handle state and dispatching of actions. So, I've modified my fetch method to accept a url:

```javascript
export const fetchEvents = (url) => {
  return (dispatch) => {
    return fetch(url, {})
        .then(response => {
            return response.json()
        })
        .then(json => {
          dispatch(receiveEvents(json));
        })
        .catch(err => console.log(err))
  }
}
```

In my application code, I choose the correct url using the environment variable.
Then I pass it to my dispatch method:

```javascript

import configureStore from './redux/configureStore';
import config from './config';
const url = config[process.env.NODE_ENV].api + '/foo-fest';
let store = configureStore();
store.dispatch(fetchEvents(url));
```

Finally, I update my package.json to run the webpack server with dev as the environment:

```javascript
  "scripts": {
    "start": "NODE_ENV=dev webpack-dev-server --output-public-path=/public/",
    "api": "json-server --watch db.json --port 3004"
  }
```

## Wrapping Up
At this point, future developers can just clone the repo and run a few npm scripts to get a working api endpoint.
The clear downside is that since this is not the same as the production api, there is a potential for bugs if the endpoint changes.
In general, I try to avoid premature optimization and this is a clear problem while the api changes are less pressing.
Besides, if the api changes, I just need to update the db.json to reflect the new data structure and I can keep on trucking.

Other benefits to this approach include speed (less latency) and not having to worry about api limits (less of an issue for this particular project, but still worth considering).

I may not be fully bought into Webpack just yet, but this certainly helps.
