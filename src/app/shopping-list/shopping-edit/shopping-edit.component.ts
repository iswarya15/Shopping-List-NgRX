import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { Store } from '@ngrx/store';
import * as ShoppingActions from '../store/shopping-list.actions';
import * as fromShoppingList from '../store/shopping-list.reducer';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('editForm') editForm: NgForm;
  subscription: Subscription;
  editMode = false;
  editedIngredient: Ingredient;

  constructor(private store: Store<fromShoppingList.AppState>) {}

  ngOnInit(): void {
    this.store.select('shoppingList').subscribe((stateData) => {
      if (stateData.editedIngredientIndex != -1) {
        this.editMode = true;
        this.editedIngredient = stateData.editedIngredient;

        this.editForm.setValue({
          name: this.editedIngredient?.name,
          amount: this.editedIngredient?.amount,
        });
      }
    });
  }

  public onSubmit() {
    const value = this.editForm.value;
    const ingredient = new Ingredient(value.name, value.amount);

    if (this.editMode) {
      this.store.dispatch(new ShoppingActions.UpdateIngredient(ingredient));
    } else {
      this.store.dispatch(new ShoppingActions.AddIngredient(ingredient));
    }

    this.editMode = false;
    this.editForm.reset();
    this.store.dispatch(new ShoppingActions.StopEdit());
  }

  public onClear() {
    this.editForm.reset();
    this.editMode = false;
  }

  public onDelete() {
    this.store.dispatch(new ShoppingActions.DeleteIngredient());
    this.onClear();
  }

  ngOnDestroy(): void {
    this.store.dispatch(new ShoppingActions.StopEdit());
  }
}
