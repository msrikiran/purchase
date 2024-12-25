import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ShellComponent } from './shared/shell/shell.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { CategoriesService } from '@purchase/products';
import { MessageService } from 'primeng/api';

@Component({
  standalone: true,
  imports: [RouterModule, DashboardComponent, ShellComponent, SidebarComponent],
  providers: [CategoriesService, MessageService],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'adminPurchase';
}
