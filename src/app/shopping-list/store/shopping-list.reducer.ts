import { Ingredient } from '../../shared/ingredient.model';
import * as ShoppingListActions from './shopping-list.actions';

// Reducer takes 2 arguments - Current State, Action
const initialState = {
  ingredients: [new Ingredient('Apples', 5), new Ingredient('Tomatoes', 10)],
};
// state = initialState (Default value)
export function shoppingListReducer(
  state = initialState,
  action: ShoppingListActions.groupShoppingActions
) {
  console.log('From ShoppingList Reducer: ');

  switch (action.type) {
    case ShoppingListActions.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: [...state.ingredients, action.payload],
      };

    case ShoppingListActions.ADD_INGREDIENTS:
      return {
        ...state,
        ingredient: [...state.ingredients, ...action.payload],
      };

    default:
      return state;
  }
}
