import {Component, Input, OnInit} from '@angular/core';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-iframe',
  template: '<iframe [class]="className" [src]="safeUrl"></iframe>',
  styles: ['iframe {border: none}']
})
export class IframeComponent implements OnInit {
  @Input() className = '';
  @Input() url = '';
  safeUrl: SafeResourceUrl;

  constructor(private route: ActivatedRoute, private sanitizer: DomSanitizer) {
    route.data.subscribe(data => {
      console.log('iframe.component.ts data: data =', data);
      this.className = data.className;
      this.url = data.url;
    });
    route.paramMap.subscribe(map => {
      console.log('iframe.component.ts param: map.params =', map.params);
    });
    route.queryParamMap.subscribe(map => {
      console.log('iframe.component.ts query: map.params =', map.params);
    });
  }

  ngOnInit() {
    this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
  }
}
