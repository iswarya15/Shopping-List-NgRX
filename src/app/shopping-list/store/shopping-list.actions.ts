import { Action } from '@ngrx/store';
import { Ingredient } from 'src/app/shared/ingredient.model';
export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const ADD_INGREDIENTS = 'ADD_INGREDIENTS';

export class AddIngredient implements Action {
  // Type => Identifier of Action
  readonly type = ADD_INGREDIENT;
  //   payload: Ingredient;

  constructor(public payload: Ingredient) {} //payload is public since it is used in ShoppingListReducer
}

export class AddIngredients implements Action {
  readonly type = ADD_INGREDIENTS;

  constructor(public payload: Ingredient[]) {}
}

// Union of all Actions
export type groupShoppingActions = AddIngredient | AddIngredients;
