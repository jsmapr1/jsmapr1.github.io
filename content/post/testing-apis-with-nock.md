+++
title = "testing apis with nock"
date = "2016-05-18"
slug = "2016/05/18/testing-apis-with-nock"
Categories = []
+++

I [recently wrote](/blog/2016/04/07/mocking-apis-locally-with-webpack-dot-environmentplugin-and-json-server/) about how to use json-server to mock api calls when writing web apps.
And that is very useful when you want write code and not have to worry about latency or api limits.
However, it is still an extra dependency and may not make sense in all projects.

Testing needs to be self contained and have minimal external dependencies (for now, I will just talk about unit testing).
In addition, I want to be able to test things that may have a security component that I do not want publicly exposed (an api key, for example).
Allowing mocking in tests prevents them from exposing secure information while still ensuring that all the code is tested (that's the goal at least).
For this reason, I have taken a liking to [nock](https://github.com/node-nock/nock) for mocking out expected api calls.
I've recently been using it heavily as I build an [api wrapper library](https://github.com/jsmapr1/frontend-gitlab/) and I become more impressed with the project each time I use it.

## Basic Example

What makes nock so great is its simplicity.

Here's a very basic example using mocha:

```javascript
import expect from 'expect';
import nock from 'nock';

describe('fetch test', ()=> {
    before(() => {
        nock('http://foo.com')
            .get('/api/events')
            .reply(200, { events: ['foo'] })
    })

    after(() => {
      nock.cleanAll()
    })

    it('should get events', () => {
        return fetch('http://foo.com/api/events')
            .then(response => {
              return response.json()
            })
            .then(json => {
                expect(json.events).toEqual(['foo'])
            })
    })
})

```

As with most examples, this is very contrived; it doesn't seem like I'm testing much.
Still, it shows the beauty and simplicity of nock.

To break it down: 

1. We set a url to capture

2. We set a REST request on a particular path

3. We give a return value

Each piece is small and clearly defined and allows nice chaining.

The power of nock is that the chaining allows us to add additional elements to our test.

Here's a slightly more complicated example from a [gitlab wrapper package](https://github.com/jsmapr1/frontend-gitlab/blob/a704f8f5fc2bc6165811ba31da8fbe401c37fd25/test/requests/issues--test.js) I'm writing:

```javascript
    import expect from 'expect';
    import nock from 'nock';
    import fetch from 'isomorphic-fetch';
    import {getIssues} from '../../src/requests/Issues';

    describe('issues', () => {
      const issue =  {
        "id": 0,
        "iid": 0,
        "project_id": 0,
        "title": "foo",
        "description": "",
        "state": "opened",
        "created_at": "2016-05-12T08:16:27.337-05:00",
        "updated_at": "2016-05-12T08:16:27.337-05:00",
        "labels": [0],
        "milestone": null,
        "assignee": null,
        "author": {
          "name": "bar",
          "username": "var",
          "id": 1,
          "state": "active",
          "avatar_url": null,
          "web_url": null,
        },
        "subscribed": true,
      }
      before(() => {
        nock('http://foo.gitlab.com/api/v3', {
            reqheaders: {
              'PRIVATE-TOKEN': 'abc123'
            }
          })
          .persist()
          .get('/issues')
          .reply(200, [issue])
      });

      after (() => {
        nock.cleanAll()
      });

      it('will return issues', () => {
        return getIssues({url:'http://foo.gitlab.com', token:'abc123'})().then(json => {
          expect(json).toEqual([issue])
        });
      })

      it('can take authentication separate', () => {
        const issues = getIssues({url:'http://foo.gitlab.com', token:'abc123'});
        return issues().then(json => {
          expect(json).toEqual([issue])
        });
      })
    })
```

This is nearly identical to the first examples with a few differences:

1. I'm adding in some request headers. This will ensure that the function I'm calling is passed a PRIVATE-TOKEN.
2. I'm calling an additional method `persist()`. This ensures that the same mock will be avaialable for subsequent tests.
In this case, I want to test a curried and an uncurried version. This allows the same mock to be used for both.

The beauty part is that it still retains the simplicity of the first example.
It's short, readable, and most importantly, it just works.

I'm just starting to scratch the surface, so be on the lookout for more as I go forward.
