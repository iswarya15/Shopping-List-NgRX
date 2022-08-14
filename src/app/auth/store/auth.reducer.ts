import { User } from '../user.model';
import * as AuthActions from '../store/auth.actions';
export interface State {
  user: User;
}

const initialState = {
  user: null,
};

export function authReducer(state: State = initialState, action: AuthActions.AuthActions) {
  console.log('Auth Current State => ', state);

  switch (action.type) {
    case AuthActions.LOGIN:
      const user = new User(action.payload.email, action.payload.userId, action.payload.token, action.payload.expirationDate);
      console.log('Modified User State => ', {
        ...state,
        user: user,
      });
      return {
        ...state,
        user: user,
      };
    case AuthActions.LOGOUT:
      return {
        ...state,
        user: null,
      };

    default:
      return state;
  }
}
