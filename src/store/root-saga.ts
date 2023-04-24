import { all, call } from "typed-redux-saga/macro";

import { categoriesSaga } from "./categories/category.saga";
import { userSagas } from "./user/user.saga";

// export out a generator function. And that generator function is distinguished by this function signature word and then the star, that is a ES6 generator function.
export function* rootSaga() {
  yield* all([call(categoriesSaga), call(userSagas)]);
}
