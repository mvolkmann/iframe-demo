import {Component} from '@angular/core';
import {addActionListener, postAction} from '../cross-document-messaging';

const allowedDomains = ['http://localhost:3000'];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  innerHash = 'foo';
  message = '';

  constructor() {
    addActionListener(this, allowedDomains);
  }

  dispatchSet(path, value) {
    const type = '@@set ' + path;
    const payload = {path, value};
    postAction(type, payload);
  }

  sendMessage() {
    this.dispatchSet('message', 'Hello from Angular! ' + Date.now());
  }

  swapInner() {
    this.innerHash = this.innerHash === 'foo' ? 'bar' : 'foo';
  }
}
