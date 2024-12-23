import { Component, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { Category } from '@purchase/products';
import { CategoriesService } from '@purchase/products';

@Component({
  selector: 'app-categories-list',
  standalone: true,
  imports: [CardModule, ToolbarModule, ButtonModule, TableModule],
  templateUrl: './categories-list.component.html',
  styleUrl: './categories-list.component.scss',
})
export class CategoriesListComponent implements OnInit {
  public categories: Category[] = [];

  constructor(private categoriesService: CategoriesService) {}

  ngOnInit(): void {
    this.categoriesService.getCategories().subscribe((data: Category[]) => {
      this.categories = data;
    });
  }
}
