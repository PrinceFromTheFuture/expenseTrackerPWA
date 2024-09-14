import { configureStore } from "@reduxjs/toolkit";
import transactionsReducer from "./transactionsSlice";
import userReducer from "./userSlice";
import userPreferencesReducer from "./userPreferencesSlice";

const store = configureStore({
  reducer: {
    transactionsSlice: transactionsReducer,
    userSlice: userReducer,
    userPreferencesSlice: userPreferencesReducer,
  },
});

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
