+++
title = "javascript generators a practical example"
date = "2017-01-17"
slug = "2017/01/17/javascript-generators-a-practical-example"
Categories = []
+++

## Generators: Who Cares

Generators may be the most misunderstood feature of ES6.
Personally, I've read at least half a dozen articles purporting to explain them and all I can ever think is "but why would I use them?"

Turns out I'm not alone. No one uses them.

{% img /images/generatorSurvey.png %}

However, that doesn't mean they don't matter.
It's possible that soon we will love them and use them all the time.
We just need to understand the problem they solve and see how they add value.

## A Practical Example

I spend a lot of time reading code.
And recently I decided to find someone, anyone, who used generators.

Well, I found it!
[Khan Academy](https://github.com/Khan) has a few projects that use generators.
Specifically, their project [Algebra Tool](https://github.com/Khan/algebra-tool) uses generators in a way that makes a lot of sense.

It'll take awhile to show what they are doing, but I'll go ahead and give the take away.
Khan Academy, or rather the developers at Khan Academy, are using generators to turn objects and complex data structures into iterables.
In other words, they are using generators to treat objects like arrays.

This makes a lot of sense to me. As I'll show, they have a rather complex data structure, but they keep the complexity hidden behind a simple interface.
This gives them the ability to leverage value from the data structure without requiring other parts of the program to understand the structure.

Now a quick caveat: This is not live production production code.
It's code that resulted from a day-long hack-a-thon.
However, I wouldn't be surprised if something similar exists in prodution.
And even if it doesn't, it easily could.
So we'll dive into it as if it were highly polished and live.

## Project Design

First, here's a look at the project.

{% img /images/algebraTool.png %}

They are creating an online tool for students to manipulate and work with algebraic expressions.

The expression in this calculator is built with a class called, wait for it, `Expression`.

Here's a sample of the [Expression Class](https://github.com/Khan/algebra-tool/blob/master/src/ast/expression.js)

```javascript

export default class Expression extends Node {
    constructor(...nodes) {
        super();
        this.type = 'Expression';
        this.children = new List(this, ...nodes);
    }

    toString() {
        return `${this.type}:${this.children.toString()}`;
    }

    toJSON() {
        return {
            ...super.toJSON(),
            children: [...f(this.children).map(child => child.toJSON())],
        };
    }

    clone(uniqueId = false) {
        ...
```

We won't go through this code line-by-line.
All we need to know is that `Expression` takes a series of nodes and creates a new instance of a `List`.

## Data Structure

For simplicity, we'll ignore the implementation details, all we need to know is that `List` will create a data structure known as a [linked list](https://code.tutsplus.com/articles/data-structures-with-javascript-singly-linked-list-and-doubly-linked-list--cms-23392).

When you create an instance of a new instance of `Expression` it will look similar to this:

```javascript
const e = new Expression({id:1}, {id:2}, {id:3})
e = {
    children: {
        first: {
            id: 1,
            next: {
                id: 2,
                next: {
                    id: 3
                }
            } 
        },
        last: {
            id: 3
        }
    }
}
```

The trick is that every node knows what node is after it. (It also knows the previous node, but we are leaving that out for simplicity).

Now, this is important because a mathematical expression needs to know what symbols are surrounding it.
For example, `3 • x + 5` makes sense and is a valid algebraic expression while `3 • + x 5` is not valid and does not make sense.

We can seen, then, why the developers would use this data structure.
The problem is that now they are locked into certain language constraints.
Since they are using an object, and a deeply nested object at that, they cannot utilize certain methods that they could have on, say, an array.

As a demonstration, let's return to the `toString` method on the `Expression` class.

```
toString() {
    return `${this.type}:${this.children.toString()}`;
}
```

Nothing exciting here. Notice, though, that it calls the `children.toString` method.
Since children are an instance of the `List` class, let's look at that method.

```javascript
export default class List extends Node {
...
  toString() {
    let first = true;
    for (let node of this) {
      if (!first) {
        result += ", ";
      } else {
        first = false;
      }
      result += node.id;
    }
    return result;
  }
}
```

There's no need to really understand what's going on.
The trick is in this line: `for (let node of this)`.

Sure. It seems normal.
The problem is that line should not work.
The [for...of loop](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...of) does not work on objects.

## Objects and Iterators

Here's an example of a simple `for ... of` loop:

```javascript
const presentation = [
  'ES6 Patterns in the Wild',
  'Joe Morgan',
]

for(let metadata of presentation) {
  console.log(metadata);
}

// ES 6 Patterns in the Wild
// Joe Morgan
```

It's so simple it's almost not worth exploring.
It iterates over each property in the array and logs it.

What happens if we were to try the same loop on an object?
Well, it won't work.

```javascript
const presentation = {
title = "javascript generators a practical example"
}

for(let metadata of presentation) {
  console.log(metadata);
}

> TypeError: presentation[Symbol.iterator] is not a function
```

So what is that mysterious `Sybmol.iterator`.

Well, according to [mdn](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/iterator):
_The Symbol.iterator well-known symbol specifies the default iterator for an object. Used by for...of._

If that explains seems circular to you. Don't worry. It is.

Suffice it to say, the `Symbol.iterator` tells a for loop how to work.
It's defined for you on arrays (and strings and a couple other things), but not on objects.

However, that's not a problem. We can define our own!
And that's were generators come in.

## Symbols and Generators

Ok. Now we get to the good part.

Let's look at how a generator is used in Khan Academy:

```javascript
export default class List {
  ...
    *[Symbol.iterator]() {
      let node = this.first;
      while (node != this.last) {
        let current = node;
        node = node.next;
        yield current;
      }
      if (this.last) {
        yield this.last;
      }
    }
}
```

We'll step through this more thoroughly in a moment.
For now, notice that they are defining their own `Symbol.iterator` for the list.
That's how they were able to loop through it at all.

Next, notice the `*` in front of the function name and the `yield` keyword.
That's a clue that this is a generator.

Now that we've established that it is, in fact, a generator, how does a generator work?
There are essentially two ways to use a generator.

1) We can step through it incrementally.

2) We loop through it.

By example:
```javascript
function*simple() {
    yield: 1;
    yield: 2;
    yield: 3;
}
```

1) Step through it:

```javascript
const y = simple();
y.next();
// { value: 1, done: false }

y.next();
// { value: 2, done: false }

y.next();
// { value: 3, done: false }

y.next();
// { value: undefined, done: true }
```

2) Loop through it:
```javascript
for(x of simple()) {
  console.log(x);
}
// 1
// 2
// 3
```

As a bonus. Loops are used by the [spread operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_operator), so whenver we define something that can use a `for...of` loop we also get the spread operator as a bonus.

```javascript
const z = simple();
[...z];
// [1, 2, 3]
```

Pretty neat, huh?

Back to our example.

```javascript
*[Symbol.iterator]() {
  let node = this.first;
  while (node != this.last) {
    let current = node;
    node = node.next;
    yield current;
  }
  if (this.last) {
    yield this.last;
  }
}
```

You do not need to define every single `yield` statement, as long as there is something to yield.
The generator will return it.

Looking back at our original data structure:
```javascript
const e = new Expression({id:1}, {id:2}, {id:3})
e = {
    children: {
        first: {
            id: 1,
            next: {
                id: 2,
                next: {
                    id: 3
                }
            } 
        },
        last: {
            id: 3
        }
    }
}
```

The generator will yield the first node and the `toString` method will grab the id.

```javascript
{
    id: 1,
    next: {
        id: 2,
        next: {
            id: 3
        }
    } 
}
```

Then it will yield the next node and the `toString` method will grab the id.
```javascript
{
    id: 2,
    next: {
        id: 3
    }
}
```

Next, it will grab the next node which is the same as the last node.
At this point the `while` loop is resolved.
Finally, the last node is yielded and the generator is resolved.


```javascript
{
    id: 3
}
```

In essence, the generator turned the linked list into an array.

```javascript
const e = new Expression({id:1}, {id:2}, {id:3})

// Kinda sorta
e = [{id:1}, {id:2}, {id:3}]
```

## What's the point?

Now we can see how the generator worked in this example.
But that doesn't resolve the question of why?

Really, it comes down to crafting quality code.
Khan Academy wanted to use a particular data structure, but they didn't want to burden the rest of the app with knowledge of the data structure.
The generator allows them to utilize the advantages of a data structure while allowing other parts of the app to merely assume it is an array.
They can do whatever they might want with the data:
loop through it, spread it, and so on.

In other words. The code is as complicated as it needs to be while be as simple as it can be.

And isn't that the point of any language feature or library?
It allows us to do the most work with the most elegance.

As for me, I have read many articles about generators, but it wasn't until I dug into this example that I really could envision a use case.

If you're curious, no I haven't used one in production.
I wrote one at one point, but ended up taking it out because there was a simpler and clearer way to do the same thing.
So that's the direction I went.
