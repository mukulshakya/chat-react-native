import { atom } from "recoil";

export const userListState = atom({
  key: "userListState",
  default: [],
});

export const todoListFilterState = atom({
  key: "todoListFilterState",
  default: "Show All",
});
