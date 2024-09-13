import { configureStore } from "@reduxjs/toolkit";
import transactionsReducer from "./transactionsSlice";
import { useDispatch, useSelector, useStore } from "react-redux";

const store = configureStore({ reducer: { transactionsSlice: transactionsReducer } });

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
