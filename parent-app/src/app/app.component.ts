import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {addActionListener, postAction} from '../cross-document-messaging';

const allowedDomains = ['http://localhost:3000'];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  message = '';

  constructor(private router: Router) {
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
    const {url} = this.router;
    const nextUrl = url === '/bar' ? '/foo' : '/bar';
    this.router.navigate([nextUrl]);
  }
}
