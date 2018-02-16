+++
title = "react component 3 ways"
date = "2015-11-16"
slug = "2015/11/16/react-component-3-ways"
Categories = []
+++
# React Components 3 ways

I've been building a small react app as part of a larger project.
I've also recently been trying to create a culture of pull requests and code reviews in the team.
A few people are interested. Most aren't.
However, for the few that have been interested, I've faced an interesting challenge. Nearly no one is a javascript developer.

Sure, they've written some jquery here and added a plugin there, but no one has really taken the time to learn about the language.
I'm not saying that to be critical, many are better PHP and Python developers than I am, but it's a fact that a lot of javascript
looks a little strange to them.

So, we I first committed this code, a standard React component taken almost verbatim from the documentation, I got a lot of confused responses:

```javascript
var Menu = React.createClass({
    getInitialState: function() {
      return {
        data: [],
        filterTag: '',
      };
    },
    componentDidMount: function() {
      $.ajax({
        url: 'http://someapiendpoint.com/api',
        dataType: 'jsonp',
        cache: false,
        jsonpCallback: 'callback',
        success: function(data) {
          this.setState({data: data.stories});
        }.bind(this),
      });
    },
    handleTagClick : function(tag) {
      this.setState({
        filterTag: tag
      })
    },
    render: function() {
      return(
        <div>
        <TagList tags={getTags(this.state.data)} onTagClick={this.handleTagClick}/>
        <FilterableList items={this.state.data} filterTag={this.state.filterTag}/>
        <div>{this.data}</div>
        </div>
      );
    }
})

```


One code reviewer asked me to break it into functions to make it more readable.
I wasn't sure how to respond and finally said, "but it is broken into functions. I'm passing an object with defined functions into a factory."

He responded, that was fine and I admitted he didn't know much about React or javascript.
However, that didn't feel right to me. 
He is a good developer and I've always told code reviewers that saying that code is too confusing is perfectly good feedback.

I decided, therefore, to try again. This time, I explicitly built the object before passing it to the factory:

```javascript
var Menu = {};

Menu.getInitialState = function() {
  return {
    data: [],
    filterTag: '',
  };
};

Menu.componentDidMount = function() {
  $.ajax({
    url: 'http://someapiendpoint.com/api',
    dataType: 'jsonp',
    cache: false,
    jsonpCallback: 'callback',
    success: function(data) {
      this.setState({data: data.stories});
    }.bind(this),
  });
}

Menu.handleTagClick = function(tag) {
  this.setState({
    filterTag: tag
  })
}

Menu.render = function() {
  return(
    <div>
    <TagList tags={getTags(this.state.data)} onTagClick={this.handleTagClick}/>
    <FilterableList items={this.state.data} filterTag={this.state.filterTag}/>
    <div>{this.data}</div>
    </div>
  );
}

export default React.createClass(Menu);
```

I'll admit, I liked this way a lot better. It's much more clean and easier to skim.
The code reviewer also preferred the new way.

Again, I could have left it at that, but I decided to go one step further.
I've already been writing most of the code using es6, but thus far I have avoided the `class` keyword.
Maybe I'm just an old crotchety javascript dev, or maybe I'm too easily influenced by other  [old](https://vimeo.com/97419177) and [crotchety](https://medium.com/javascript-scene/how-to-fix-the-es6-class-keyword-2d42bb3f4caf) javascript developers, but I don't particularly like the `class` keyword.

Nonetheless, in the name of reusability and team cohesion, I decided to give it a try. Plus, a lot of [good style guides](https://github.com/airbnb/javascript#constructors) say to use it.
So, I made a third example:

```javascript
class Menu extends React.Component {
  constructor(props) {
    super(props);
    /*
     * React components using ES6 classes no longer autobind this to non React methods.
     * https://github.com/goatslacker/alt/issues/283
     */
    this.handleTagClick = this.handleTagClick.bind(this);
    this.state = {
      data: [],
      filterTag: '',
    }
  }

  componentDidMount() {
    $.ajax({
      url: 'http://someapiendpoint.com/api',
      dataType: 'jsonp',
      cache: false,
      jsonpCallback: 'callback',
      success: function(data) {
        this.setState({data: data.stories});
      }.bind(this),
    });
  }

  handleTagClick(tag) {
    this.setState({
      filterTag: tag
    })
  }

  render() {
    return(
      <div>
      <TagList tags={getTags(this.state.data)} onTagClick={this.handleTagClick}/>
      <FilterableList items={this.state.data} filterTag={this.state.filterTag}/>
      <div>{this.data}</div>
      </div>
    );
  }
}
export default Menu
```

By this point, the reviewer was thrilled. And I'll admit, for people coming from other OO languages, and particularly PHP, this will be a lot more familiar.
Personally, I like the second version best. Although, really that's just because it looks like "real" javascript to me (whatever that means).

However, writing good code is about compormise. We compromise abstractions for the sake of time. We compromise cohesion for the sake of (visual) design.
And sometimes we need to check our own preferences for the sake of the team.
Each version works perfectly fine, but one will have a much greater chance of being used by others in the future. And really, that's the most important thing.
