// So the state, as I mentioned, is one big object.
// The object, of course, is composed of all the smaller reducers, but in the end, it's really just an object that has these key values on them.
export const selectCurrentUser = state => state.user.currentUser;
