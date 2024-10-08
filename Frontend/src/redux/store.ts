import { configureStore } from "@reduxjs/toolkit";
import transactionsReducer from "./transactionsSlice";
import userReducer from "./userSlice";
import userPreferencesReducer from "./userPreferencesSlice";
import formSliceReducer from "./formSlice";
import budgetsSliceReducer from "./budgetsSlice";
import paymentMethodsSliceReducer from "./paymentMethodsSlice";
import accountsSliceReducer from "./accountsSlice";

const store = configureStore({
  reducer: {
    transactionsSlice: transactionsReducer,
    userSlice: userReducer,
    userPreferencesSlice: userPreferencesReducer,
    formSlice: formSliceReducer,
    budgetsSlice: budgetsSliceReducer,
    paymentMethodsSlice: paymentMethodsSliceReducer,
    accountsSlice: accountsSliceReducer,
  },
});

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
