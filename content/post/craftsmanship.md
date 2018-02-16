+++
title = "craftsmanship"
date = "2016-08-22"
slug = "2016/08/22/craftsmanship"
Categories = []
+++

About 6 months into my first full-time coding job I was called into my boss's office.
I had been working on a project that was at least a month overdue.
I exhausted and suffering constant [impostor syndrome](https://en.wikipedia.org/wiki/Impostor_syndrome).
Despite all that, the project was ready to ship and I was happy and feeling like maybe I could do this.

That feeling slipped away very quickly.
My boss was sitting with the engineering director and they had a bunch of my code open on the screen.
Despite all that he was in a good mood and invited me to sit down.

"Feel pretty good to be finished?" he asked.

I nodded.
"We were looking through the commits" he continued.
"And it looks like you have a little more to do."

I'm sure my face dropped at that point.
I was worn out and ready to move on.

"Have you looked at the style guide?"

Again I nodded.

"Well, most of your code is not meeting the style requirements."

He clicked to the first section. "This is indented out for no reason. This variable name doesn't make any sense."
As he continued he clicked through more code.
"You name this function and then never use it. There's supposed to be space between these parentheses."

After a few minutes he stopped.
"I know you are ready to be finished, but you need to go back and get it right.
We all know parts of the code base are better or worse than others, but everything you touch should be better than it was before."

He paused and finished by saying, "It's about craftsmanship."

That was probably the best coding advice I ever got.

## Coding is more than control statements and loops

For many beginners, the biggest struggle is getting things to work.
I would go further, that struggle never goes away.

Nearly everything is prototyped in some form.
Either, I sketch something out in the code itself, or I try an idea in a REPL, or, if I'm being very good, I write a test and then go from there.
However, mature coders will go back and rework that prototype until it is something coherent and beautiful.
One of the best parts of testing code is that once it is passing you can change it as much as you want and you know whether that getting things to work part is still taken care of.

Probably the most unfortunate part of coding is that poorly crafted code that works, works.

If a carpenter does a poor job of crafting a piece of furniture, that furniture will not work.
The joints will snap.
The hanging nails will cut someone sitting down.
The upholstery will come apart.
It won't work.

Bad code that works will still work.
As a result, it takes a step of maturity to reach a level of craftsmanship, to make things that are beautiful.

Now I know that bad code has technical debt and in a sense does not work in that it will be harder to extend or have a difficult time handling change, but that's not always the case.
Bad code can run for years.

The reason this is a problem is that becoming a craftsman is hard work. Very hard work.
It's way harder than learning to make working things, because there are no cues when things are wrong.
It's an intuition, an aesthetic.

Linters can help, but they can only handle very small clear rules.
They cannot account for taste.
They cannot say a function could be simpler or that a class is poorly constructed.

## Building an Intuition
They key to being a craftsman, then, is building that intuition.
Unfortunately, I don't hear many people talking about how to do that.
Traditionally, coders become masters of their craft in the same way it's been done for generations.
They work with other masters of their craft that give continual feedback and push them to higher standards.

Another way is to read.

We live in a time where lots of wonderful code is open source.
And just as a novelist would spend time studying the works of other novelists, we do not spend nearly enough time reading code by other people.

At this point, I have a budding intuition.
When I write some code I may get a feeling like it could be better.
I can't say why or how, but I just know something is off.

When I get that feeling that something is not quite right, I first try to find something similar.
Usually this involves some Stack Overflow, but that's not a perfect solution.
Instead, I like to browse through some open source code by people (or projects) I feel are great.
Even if I do not find an exact solution, I get a slightly different sense of style and often that is enough to spark an idea.

[Dan Abramov](https://twitter.com/dan_abramov) is a great one for me.
React and Babel source code are good too.
Sometimes I do a search in NPM for something that might be similar and then I browse a few of those projects.

Browsing these projects may not solve the specific problem, but high quality code will give you ideas of how to craft a solution.
Stack Overflow gives you a set of tools and construction materials, but open source code gives you a plan.
It's like seeing an architect's blue print.

And that is the best part.

All of this helps the intuition grow because I see more and more code with more and more ideas and I start to learn what good code looks like, so when I do write something that can be much better, it practically had a warning sign attached.


##Continual Improvement
Here are recommendations.

Look at everything you write a second time. The first time you are too consumed with function that you miss aesthetics.

Read more. If you find something that you like (a blog post, an NPM package, a tutorial), look up the code for the author.
Nearly everyone has something on github.
It will give you an better perspective on what's possible.
But be more strategic in what you read.
Articles and tutorials are fine, but they are by nature tightly controlled.
There's a lot more insight in projects that grow and evolve in complexity.

Write aesthetically pleasing code.
If you can look at a page and it seems simple and clean and neat, you will feel the need to keep that high quality level.
If you see code that looks ugly, take some time to refactor.
It's amazing how many bugs are prevented by keeping things neat.

Write code that makes you feel good.
I'll admit sometimes I use a slightly complex one-liner when an more verbose loop would do, but those just don't feel the same.
And when I write something that I enjoy seeing it makes my day better.
If it's too ridiculous, call me out during a code review.
For now, I want to write code that makes me smile.

##Craftsmanship and Life
Writing well crafted code won't necessarily make you a genius.
I would argue though that it will help you enjoy the process a lot more.
And anyone who reads your code will see the extra care.

A good craftsman brings their high standards to all projects big and small.

Take a look at [a piece of shaker furniture](https://en.wikipedia.org/wiki/Shaker_furniture).
It's not a skyscraper.
It wasn't built to be in a museum (although some ended up there).
It was created to serve a purpose.
But the woodworkers didn't care.
They only wanted to make the best piece of furniture they could.
And their commitment is evident.

Code should be no different.

