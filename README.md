# react-ez-emoji

A light-weight and dependency-free input component with built-in emoji functionality. 

![ez-emoji-example](https://raw.githubusercontent.com/justsilencia/react-ez-emoji/master/ez-emoji-example.jpg)

react-ez-emoji inserts a contenteditable div equipped with a button that opens and closes
an emoji menu modal. Users can choose an emoji, and react-ez-emoji will automatically insert
the emoji on the screen as well as encode the text. An inserted emoji will show on screen
as the image itself, but will be saved in state as an encoded value.

## Emoji encoding

```js
{
  ':smile:': 'smile.png',
  ':sad:': 'sad.png',
  ':angry:': 'angry.png',
  ':expletive:': 'expletive.png',
  ':laughing:': 'laughing.png',
  ':hearteyes:': 'hearteyes.png',
  ':blowkiss:': 'blowkiss.png',
  ':drool:': 'drool.png',
  ':scrutinize:': 'scrutinize.png',
  ':chuckle:': 'chuckle.png',
  ':moneysmile:': 'moneysmile.png',
  ':neckbeard:': 'neckbeard.png'
}
```

## Installation

```shell
npm i react-ez-emoji
```

## Importing

```js
import EzEmoji from 'react-ez-emoji'; // ES6
var EzEmoji = require('react-ez-emoji'); // ES5 with npm
```

## Usage

react-ez-emoji requires two props; setVal and emojiPath. setVal is a method in the parent 
component that updates the state. emojiPath is the path which will point to the emoji .png
images. A folder called "emoji" with included .png emojis is included in the react-ez-emoji module. 
This folder should be copied from the react-ez-emoji module folder and placed in your project wherever your 
resources are made public. The same should be done with the included .css style sheet. If 
you are using sass or less, simply copy the code or change the extension and place in the 
correct location. Styling can be easily customized for the users needs.

```js
import React, {Component} from 'react';
import EzEmoji from './ez-emoji/index';
import './style.css'; 

export default class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      text: ''
    }

    this.setVal = this.setVal.bind(this);
  }

  setVal(val) {
    this.setState({text: val}, () => console.log(this.state.text));
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (this.state.text !== nextState.text);
  }

  render() {
    return (
        <>
          <EzEmoji setVal={this.setVal} emojiPath='/emojis/' />
        </>
      )
  }
}
```

