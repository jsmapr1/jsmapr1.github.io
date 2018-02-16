+++
title = "that feeling of beautiful code"
date = "2016-04-08"
slug = "2016/04/08/that-feeling-of-beautiful-code"
Categories = []
+++

Here's a trivial post, but a great example of why I like writing code.

I consider myself an aesthetic programmer.
I want my code to be visibly appealing and I will sometimes write code in a certain way just because I think it looks better.

Every now and then I write something and I enjoy what I've written so much that I just sit and savor the moment.
Here's what brought on that feeling today.

```javascript
export const TagReducer = (todos, todo) => {
  return todos.indexOf(todo.tag) < 0 ? [...todos, todo.tag] : todos;
}
```

It's merely a simple method to reduce an array of objects down to an array of the unique values of one of the object properties.
There is nothing exciting. I'm sure I've written it before.

And to get to that point, I started with a simple test. And let it run below my text editor while I worked out the details.
``` javascript
it("creates an array of tags", function() {
  const events = [
    {
title = "that feeling of beautiful code"
      tag: 'foo'
    },
    {
title = "that feeling of beautiful code"
      tag: 'foo'
    },
    {
title = "that feeling of beautiful code"
      tag: 'bar'
    },
  ]
  expect(events.reduce(TagReducer,[])).toEqual(['foo', 'bar']);
})

```

I just loved that reducer function.
It's simple, yet elegant. Just like Audrey Hepburn.

What made it even more satisfying is that several years ago I would've written something like this:

```javascript
function getTags(events) {
    var res = [];
    for(var i=0; i<events.length; i++) {
      var index = res.indexOf(events[i]['tag']);
      if(index < 0) {
        res.push(events[i]['tag']);
      }
    }
    return res;
}
```

There would have been, of course, no test.
I would've refreshed the browser a dozen times and had to look up the index function.
And the best part is, I would've congratulated myself for writing a function that has a single responsibility with a clear name.
I probably would've sat back and enjoyed the same feeling I enjoy now.

The code works perfectly well. There's no particular reason to be hard on it, but it just doesn't feel as good now.
Part of the elegance in the new code is thanks to the improvements of  javascript with es6.
However, part of it is just that I put more focus on the craftsmanship.

The beauty part of writing code, is that there is both the satisfying pursuit of craftsmanship along with the intellectual challenge of solving problems and the boundless opportunities to learn new paradigms, languages, patterns, frameworks, and so on.
It's a journey. And like most journey, it can either be miserable, if one feels rushed, or
it can be deeply meaningful if we can take a moment to appreciate the process.

Coding is great.
