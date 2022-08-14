import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { LoggingService } from '../logging.service';
import { Store } from '@ngrx/store';
import * as ShoppingListActions from './store/shopping-list.actions';
import * as fromApp from '../../app/store/app.reducer';
@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: any;
  //   private ingredientsChangedSubscription: Subscription;

  constructor(private loggingService: LoggingService, private store: Store<fromApp.AppState>) {}

  ngOnInit(): void {
    console.log('shopping list store => ', this.store);
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
