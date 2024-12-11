import { Component } from '@angular/core';
import { BannerComponent } from './banner/banner.component';

@Component({
  selector: 'lib-ui',
  standalone: true,
  imports: [BannerComponent],
  template: ` <p>ui works!</p> `,
  styles: ``,
})
export class UiComponent {}
