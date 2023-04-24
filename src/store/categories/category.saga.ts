import { takeLatest, all, call, put } from "typed-redux-saga/macro";

import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.utils";

import {
  fetchCategoriesSuccess,
  fetchCategoriesFailed,
} from "./category.action";

import { CATEGORIES_ACTION_TYPES } from "./category.types";

export function* fetchCategoriesAsync() {
  try {
    // this is an asynchronous event that happens and a wait is saying, Hey, I want you to wait until this comes back with something.
    // Anywhere you have a function and you want to turn it into an effect. You essentially use the call keyword.
    const categoriesArray = yield* call(getCategoriesAndDocuments);
    yield* put(fetchCategoriesSuccess(categoriesArray));
  } catch (error) {
    yield* put(fetchCategoriesFailed(error as Error));
  }
}

export function* onFetchCategories() {
  // 'take' is where we receive actions. takeLatest means if you hear a bunch of the same action, give me the latest one.
  yield* takeLatest(
    CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START,
    fetchCategoriesAsync
  );
}

export function* categoriesSaga() {
  // 'all()' is essentially an effect that says, Hey, run everything inside and only complete when 'all' of it is done
  yield* all([call(onFetchCategories)]);
}
