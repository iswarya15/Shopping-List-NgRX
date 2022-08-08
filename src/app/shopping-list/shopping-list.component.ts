import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { LoggingService } from '../logging.service';
import { Ingredient } from '../shared/ingredient.model';
import { Store } from '@ngrx/store';
import * as fromShoppingList from './store/shopping-list.reducer';
import * as ShoppingListActions from './store/shopping-list.actions';
@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: any;
  //   private ingredientsChangedSubscription: Subscription;

  constructor(
    private loggingService: LoggingService,
    private store: Store<{ shoppingList: fromShoppingList.AppState }>
  ) {}

  ngOnInit(): void {
    this.ingredients = this.store.select('shoppingList');
    console.log('Shopping List Ingredients =>', this.ingredients);

    this.loggingService.printLog('Hello from ShoppingListComponent ngOnInit!');
  }

  onEdit(id: number) {
    this.store.dispatch(new ShoppingListActions.StartEdit(id));
  }

  ngOnDestroy(): void {
    //  this.ingredientsChangedSubscription.unsubscribe();
  }
}
