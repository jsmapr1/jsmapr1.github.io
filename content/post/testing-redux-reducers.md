+++
title = "testing redux reducers"
date = "2016-03-25"
slug = "2016/03/25/testing-redux-reducers"
Categories = []
+++

I have a few problems recently testing Redux reducers.
The [documentation](http://redux.js.org/docs/recipes/WritingTests.html) is helpful but doesn't match the rest of the tutorial.

## Simple Test

Consider a basic reducer:

```javascript
export function tagFilter(state = [], action) {
  switch(action.type) {
    case 'TAG_FILTER':
      return [...state, action.tag]
    default:
      return state;
  }
}

```

The test for this is very simple. Call the function. Pass a state and an action. Expect the result:

```javascript
import expect from 'expect';
import {tagFilter} from '../../js/redux/reducers';

describe('reducer tests', () => {
  it('should handle tagFilter', () => {
    const tag = 'foo';
    expect(
        tagFilter([], {
          type: 'TAG_FILTER',
          tag
        })
    ).toEqual(
      [tag]
    )

    expect(
      tagFilter(['bar'], {
          type:'TAG_FILTER',
          tag
        }
      )
    ).toEqual(
          ['bar', tag]
    )
  })
})
```

This is all very simple and explained in the official documentation.

The problem is that this test does not conform to the rest of the documentation.

## Larger Test
The documentation spends a lot of time talking about [splitting reducers](http://redux.js.org/docs/basics/Reducers.html#splitting-reducers) and then combining them into a single reducer.

We now have a test for each split reducer, but we do not have a way to test the combined reducer. In a way, this is better cause it keeps are tests minimal and isolated, but looking at how we can test a combined reducer will help us to better understand the state object.

Here's a slightly larger set of reducers:

```javascript
import { combineReducers } from 'redux';

export function tagFilter(state = [], action) {
  switch(action.type) {
    case 'TAG_FILTER':
      return [...state, action.tag]
    default:
      return state;
  }
}

export function savedItems(state = [], action) {
  switch(action.type) {
    case 'SAVE_ITEM':
      return [...state, action.id]
    case 'REMOVE_ITEM':
        return [
          ...state.slice(0,state.indexOf(action.id)),
          ...state.slice(state.indexOf(action.id)+1)
        ]
    default:
        return state;
  }
}

export const app = combineReducers({
  tagFilter,
  savedItems
})
```
Notice that I am exporting each individual reducer as well as the combined reducer.

If I wanted to test individual reducers, I would proceed as above. If I wanted to test a reducer in the context of a combined reducer,
I would need to slightly change my expectations.

The combined reducer returns an object that consists of the name of the reducer and the state. So my combined reducer would return this:

```javascript
  {
    tagFilter: [],
    savedItems: []
  }
```

If I wanted to test the `tagFilter`, my expect would either have to account for the base and update the object or it would have to pull the correct state from the combined reducer. Here is an example of the first:

```javascript
import expect from 'expect';
import {tagFilter, savedItems, app} from '../../js/redux/reducer';
import * as actions from '../../js/redux/actions';

describe('reducer tests', () => {
  const base = {
    tagFilter: [],
    savedItems: []
  }
  it('should handle tagFilter', () => {
    const tag = 'foo';
    expect(
        app([], {
          type: 'TAG_FILTER',
          tag
        })
    ).toEqual(
      Object.assign(
        base,
        {
          'tagFilter': [tag]
        }
      )
    )

    expect(
      app(
        Object.assign(
          base,
          {
            'tagFilter': ['bar']
          }
        ), {
          type:'TAG_FILTER',
          tag
        }
      )
    ).toEqual(
      Object.assign(
        base,
        {
          'tagFilter': ['bar', tag]
        }
      )
    )
  })
})
```

And here is an example of the second:

```javascript
import expect from 'expect';
import {app} from '../../js/redux/reducer';
import * as actions from '../../js/redux/actions';

describe('reducer tests', () => {
  it('should handle tagFilter', () => {
    const tag = 'foo';
    const base = {
      tagFilter: [],
      savedItems: []
    }

    expect(
        app([], {
          type: 'TAG_FILTER',
          tag
        }).tagFilter
    ).toEqual(
      [tag]
    )

    expect(
      app(
        Object.assign(
          base,
          {
            'tagFilter': ['bar']
          }
        ), {
          type:'TAG_FILTER',
          tag
        }
      ).tagFilter
    ).toEqual(
        ['bar', tag]
    )
  })
})
```

Notice how I still need to include the base object in the second part of the test so that I can set an initial state.
It's not strictly necessary for the first part of the test where we are starting with an empty state, but it is necessary for the second part where we are appending state.

Testing `savedItems` is roughly the same idea.
It's probably best to keep tests minimal and to test each reducer in isolation from the combined reducer, however, that is not the only approach.
