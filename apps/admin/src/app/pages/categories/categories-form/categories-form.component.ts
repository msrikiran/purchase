import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { ToolbarModule } from 'primeng/toolbar';
import { InputTextModule } from 'primeng/inputtext';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule, Location } from '@angular/common';
import { CategoriesService, Category } from '@purchase/products';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { timer } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-categories-form',
  standalone: true,
  imports: [
    CardModule,
    InputTextModule,
    ToolbarModule,
    ButtonModule,
    TableModule,
    ReactiveFormsModule,
    CommonModule,
    ToastModule,
  ],
  templateUrl: './categories-form.component.html',
  styleUrls: ['./categories-form.component.scss'],
})
export class CategoriesFormComponent implements OnInit {
  form!: FormGroup;
  isSubmitted = false;
  editMode = false;
  currentCategoryId: number | undefined;

  constructor(
    private messageService: MessageService,
    private fb: FormBuilder,
    private categoriesService: CategoriesService,
    private location: Location,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      image: ['', Validators.required],
    });

    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.editMode = true; // Set the component to edit mode
        this.currentCategoryId = params['id']; // Store the category ID from the route parameters
        this.categoriesService
          .getCategory(params['id'])
          .subscribe((category) => {
            this.categoryForm['name'].setValue(category.name);
            this.categoryForm['image'].setValue(category.image);
          });
      }
    });
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.form.invalid) {
      return;
    }

    const category: Category = {
      id: this.editMode ? this.currentCategoryId : undefined,
      name: this.categoryForm['name'].value,
      image: this.categoryForm['image'].value,
    };

    if (this.editMode) {
      this._updateCategory(category);
    } else {
      this._creteCategory(category);
    }
  }

  private _updateCategory(category: Category) {
    this.categoriesService.updateCategory(category).subscribe(
      () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Category is updated',
        });
        timer(2000)
          .toPromise()
          .then(() => this.location.back());
      },
      () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Category is not updated',
        });
      }
    );
  }

  private _creteCategory(category: Category) {
    this.categoriesService.createCategory(category).subscribe(
      () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Category is created',
        });
        timer(2000)
          .toPromise()
          .then(() => this.location.back());
      },
      () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Category is not created',
        });
      }
    );
  }

  get categoryForm() {
    return this.form.controls;
  }

  onCancel() {
    this.isSubmitted = false;
    this.form.reset();
  }
}
