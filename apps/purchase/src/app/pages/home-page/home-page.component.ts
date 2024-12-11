import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { AccordionModule } from 'primeng/accordion';
@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [ButtonModule, AccordionModule],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent {}
