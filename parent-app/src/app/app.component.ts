import {Component} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {addActionListener, postAction} from '../cross-document-messaging';

const URL_PREFIX = 'http://localhost:3000/#';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  innerHash = 'foo';
  message = '';

  constructor(private sanitizer: DomSanitizer) {
    addActionListener(this);
  }

  dispatchSet(path, value) {
    const type = '@@set ' + path;
    const payload = {path, value};
    postAction(type, payload);
  }

  getInnerUrl() {
    const url = URL_PREFIX + this.innerHash;
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  sendMessage() {
    this.dispatchSet('message', 'Hello from Angular! ' + Date.now());
  }

  swapInner() {
    this.innerHash = this.innerHash === 'foo' ? 'bar' : 'foo';
  }
}
