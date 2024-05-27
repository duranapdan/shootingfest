import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CategoryDto } from '../../models/category.dto';
import { PagedList } from 'src/app/models/api-paged-data-result.model';
import { Router } from '@angular/router';
import { CategoryService } from '../../services/category.service';
import { ConfirmationService } from 'src/app/shared/services/confirmation.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  @Input() categoryChilds:CategoryDto[] | undefined;
  @Input() mode: string | undefined;
  @Input() selectedCategory: any | undefined;

  @Output() onSetCategory = new EventEmitter<any>();
  @Output() onDeleteCategory = new EventEmitter<any>()
  @Output() onChildEvent: EventEmitter<any> = new EventEmitter<any>();

  // ...
  
  triggerParentFunction() {
    // Child component'teki işlemler tamamlandığında bu fonksiyonu çağır
    this.onChildEvent.emit();
  }

  private _categories: CategoryDto[] = []
  public get categories(): CategoryDto[] {
      return this._categories;
  }

  constructor(
    private _router: Router,
    private _categoryService: CategoryService,
    private _confirmationService: ConfirmationService
  ) { }

  

  async ngOnInit(): Promise<void> {
  }



  public onEditCategoryClick(category: CategoryDto): void {
    this._router.navigateByUrl(`/apps/ecommerce/categories/edit/${category.id}`);
}
 onSelectCategory(category: any) {
  this.selectedCategory= category
   this.onSetCategory.emit(category);
}

deleteCategory(category: CategoryDto) {
  console.log("clicked")
  this.onDeleteCategory.emit(category);
}

}
