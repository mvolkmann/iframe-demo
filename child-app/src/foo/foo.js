import React, {Component} from 'react';
import {watch} from 'redux-easy';

import {addActionListener, postAction} from '../cross-document-messaging';
import logo from './logo.svg';
import './foo.css';

class Foo extends Component {
  constructor() {
    super();
    addActionListener();
  }

  sendMessage = () => {
    const msg = 'Hello from React! ' + Date.now();
    postAction('message', msg);
  };

  render() {
    return (
      <div className="foo">
        <header className="header">
          <img src={logo} className="logo" alt="logo" />
          <h1 className="title">Welcome to React</h1>
        </header>
        <div>{this.props.message}</div>
        <button onClick={this.sendMessage}>Send Message</button>
      </div>
    );
  }
}

export default watch(Foo, {message: ''});
