import { all, call } from "redux-saga/effects";

import { categoriesSaga } from "./categories/category.saga";

// export out a generator function. And that generator function is distinguished by this function signature word and then the star, that is a ES6 generator function.
export function* rootSaga() {
  yield all([call(categoriesSaga)]);
}
