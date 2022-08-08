import { Ingredient } from '../../shared/ingredient.model';
import * as ShoppingListActions from './shopping-list.actions';

export interface State {
  ingredients: Ingredient[];
  editedIngredient: Ingredient;
  editedIngredientIndex: number;
}

const initialState: State = {
  ingredients: [new Ingredient('Apples', 5), new Ingredient('Tomatoes', 10)],
  editedIngredient: null,
  editedIngredientIndex: -1,
};

export function shoppingListReducer(
  state: State = initialState,
  action: ShoppingListActions.groupShoppingActions
) {
  console.log('ShoppingList Action => ', action.type);
  console.log('ShoppingList Reducer: Action Payload => ', action.payload);
  console.log('Current State => ', state);

  switch (action.type) {
    case ShoppingListActions.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: [...state.ingredients, action.payload],
      };

    case ShoppingListActions.ADD_INGREDIENTS:
      console.log('Modified state => ', {
        ...state,
        ingredients: [...state.ingredients, ...action.payload],
      });
      return {
        ...state,
        ingredients: [...state.ingredients, ...action.payload],
      };

    case ShoppingListActions.UPDATE_INGREDIENTS:
      const ingredient = state.ingredients[state.editedIngredientIndex];
      const updatedIngredient = {
        ...ingredient,
        ...action.payload,
      };

      const updatedIngredients = [...state.ingredients];
      updatedIngredients[state.editedIngredientIndex] = updatedIngredient;

      console.log('Modified state => ', {
        ...state,
        ingredients: updatedIngredients,
      });

      return {
        ...state,
        ingredients: updatedIngredients,
      };

    case ShoppingListActions.DELETE_INGREDIENT:
      const currentIngredients = state.ingredients;
      const filteredIngredients = currentIngredients.filter(
        (ingredient, index) => index !== state.editedIngredientIndex
      );

      console.log('Modified State => ', filteredIngredients);
      return {
        ...state,
        ingredients: filteredIngredients,
      };

    case ShoppingListActions.START_EDIT:
      return {
        ...state,
        editedIngredientIndex: action.payload,
        editedIngredient: state.ingredients[action.payload],
      };

    case ShoppingListActions.STOP_EDIT:
      return {
        ...state,
        editedIngredient: null,
        editedIngredientIndex: -1,
      };

    default:
      return state;
  }
}


