import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';


export const store = configureStore({
  reducer: {
    
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

//Should item from graphql store to state: tldr- no;
// https://github.com/trojanowski/react-apollo-hooks/issues/158