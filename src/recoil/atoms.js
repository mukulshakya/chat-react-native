import { atom } from "recoil";

export const userListState = atom({
  key: "userListState",
  default: [],
});

export const postListState = atom({
  key: "postListState",
  default: [],
});

export const todoListFilterState = atom({
  key: "todoListFilterState",
  default: "Show All",
});
