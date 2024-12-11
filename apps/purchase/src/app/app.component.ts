import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ProductListComponent } from './pages/product-list/product-list.component';
import { UiComponent } from '@purchase/ui';
import { BannerComponent } from '../../../../libs/ui/src/lib/banner/banner.component';
@Component({
  standalone: true,
  imports: [
    RouterModule,
    HomePageComponent,
    ProductListComponent,
    HeaderComponent,
    FooterComponent,
    HeaderComponent,
    BannerComponent,
  ],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'purchase';
}
