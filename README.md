# App

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.0.6.

## Ngrx - Flow

![NgRX Flow](https://github.com/iswarya15/NgRX-Starter/src/assets/ngrx-flow.png)

### Reducer

`Reducers` in NgRx are responsible for handling `transitions` from **one state to the next state** in your application. `Reducer functions` handle these transitions by determining which actions to handle based on the `action's type`.

`Reducer` takes 2 arguments - **Current State**, **Action**

(state = initialState) is the Default State for the Reducer

`NgRX` automatically passes _current State, action Invoked to the Reducer_. Reducer only has `synchronous` code.

### Reducer Syntax

```
export function shoppingListReducer(state = initialState, action: ShoppingListAction) {
   switch(action.type) {
      case 'ADD_INGREDIENT':
         state.ingredients.push();
   }
}
```

### Copy Current State

We should _not directly modify the state_ like above using push, pop, etc. Instead _return a new Object by copying the properties of old State._. .`..state` copies the old state. We can attach the property we want to modify in 2nd param.

```
   case ADD_INGREDIENT:
      return {
         ...state, //Always copy the old state
         <!-- Copy all the previous ingredients -->
            ingredients: [...state.ingredients, action.payload]
      }
```

## Action

`Action` is an `Object` which can be created using the `Action Class` created for each type.

### Define Action Type

```
export const ADD_INGREDIENT = 'ADD_INGREDIENT';
```

### Define Action Class

```
export class AddIngredient implements Action {
  readonly type = ADD_INGREDIENT;
  payload: Ingredient;
}

```

- type => Identifier of action
- readonly => TS feature. Errors when tried to modify
- payload => Data that is passed to Reducer

## Store Module

`StoreModule.forRoot()` takes in a `Action-ReducerMap` which is a JS Object.
JS Object within forRoot consists of an `Identifier` as `key` and `Reducer Function` as `value`.

```
StoreModule.forRoot({
   shoppingList: ShoppingListReducer
})
```

### Injectable Store Service

`NgRX` allows us to `inject` Store within `Components` and `Services` to access _Current State of the Application_.

`shopping-list.component.ts`

```
import { store } from '@ngrx/store';
constructor() {
   private store: Store<{shoppingList: { ingredients: Ingredients[] }}>
}
```

Type of the Store is the `ActionReducerMap` we set up in AppModule. JS Object with `key` as `Identifier` for the `data` but the _type of this Identifier is not the `Reducer Function`_ but the _`value` this Reducer Function yields._

`Injected Store Service` provides a method `select()` which allows us to access a `slice` of our Store.

```
ingredients: Observable<{ingredients: Ingredient[]}>

this.ingredients = this.store.select('shoppingList');
```

The output of the above method is an `Observable` Object. Replace ingredients Array to `Observable`.

```
ngFor="let ingredient of (ingredients | async).ingredients"
```

## Dispatching Action

`Inject Store Service` within component where we want to dispatch the `Action`. Use the Action `Class name` as `argument`

```
this.store.dispatch(new ShoppingListActions.AddIngredient(ingredient));
```

### Flow

Action Dispatched -> Store finds appropriate reducer which has the dispatched action defined -> Reducer modifies current state based on Action payload -> Reducer returns new State.

### Group Actions

```
export type groupActions = AddIngredients | UpdateIngredients | DeleteIngredients;
```

## Expanding the state - AppState Interface

- When our `app state` grows, we might have more than one `reducer` in our `state`. Whenever the `AppState` is modified, we _need to modify the `store definition`_ throughout the `components` where we have `Injected` the Store service. This process is clumsy.

- Hence we export an `Interface`, which describes how _State looks like_ for this `Reducer`. Below is the **Interface for state of ShoppingListReducer**.

```
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
```

- We can also create an `Interface` for the `AppState` - in future, we might have more than one `Reducer`.

```
export interface AppState {
   shoppingList: State
}
```

`shopping-list.component.ts`

```
private store: Store<fromShoppingList.AppState>
```
