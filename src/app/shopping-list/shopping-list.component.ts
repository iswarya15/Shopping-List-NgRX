import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { LoggingService } from '../logging.service';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Observable<{ ingredients: Ingredient[] }>;
  //   private ingredientsChangedSubscription: Subscription;

  constructor(
    private shoppingListService: ShoppingListService,
    private loggingService: LoggingService,
    private store: Store<{ shoppingList: { ingredients: Ingredient[] } }>
  ) {}

  ngOnInit(): void {
    this.ingredients = this.store.select('shoppingList');
    //  this.ingredients = this.shoppingListService.Ingredients;
    //  this.ingredientsChangedSubscription =
    //    this.shoppingListService.ingredientsChanged.subscribe(
    //      (ingredients: Ingredient[]) => {
    //        this.ingredients = ingredients;
    //      }
    //    );

    this.loggingService.printLog('Hello from ShoppingListComponent ngOnInit!');
  }

  onEdit(id: number) {
    this.shoppingListService.startedEditing.next(id);
  }

  ngOnDestroy(): void {
    //  this.ingredientsChangedSubscription.unsubscribe();
  }
}
