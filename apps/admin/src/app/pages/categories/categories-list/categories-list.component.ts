import { Component, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { Category } from '@purchase/products';
import { CategoriesService } from '@purchase/products';
import { Router, RouterModule } from '@angular/router';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-categories-list',
  standalone: true,
  imports: [
    CardModule,
    InputTextareaModule,
    ToolbarModule,
    ButtonModule,
    TableModule,
    RouterModule,
    ToastModule,
    ConfirmDialogModule,
  ],
  providers: [ConfirmationService],
  templateUrl: './categories-list.component.html',
  styleUrl: './categories-list.component.scss',
})
export class CategoriesListComponent implements OnInit {
  public categories: Category[] = [];
  categoryId = 1;

  constructor(
    private messageService: MessageService,
    private categoriesService: CategoriesService,
    private confirmationService: ConfirmationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this._getCategories();
  }

  private _getCategories() {
    this.categoriesService.getCategories().subscribe((data: Category[]) => {
      this.categories = data;
    });
  }

  public confirmDeleteCategory(catId: number): void {
    this.confirmationService.confirm({
      message: 'Do you want to delete this category?',
      header: 'Delete Category',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.deleteCategory(catId);
      },
    });
  }

  deleteCategory(catId: number): void {
    this.categoriesService.deleteCategory(catId).subscribe(
      // (data) => {
      // this.categories = this.categories.filter((cat) => cat.id !== catId);
      // });
      (response: Category) => {
        this._getCategories();
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Category deleted successfully',
        });
      },
      () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Category could not be deleted',
        });
      }
    );
  }

  onUpdateCategory(catId: number) {
    this.router.navigateByUrl(`categories/form/${catId}`);
  }

  navigateToCategoryForm() {
    this.router.navigateByUrl('categories/form');
  }
}
