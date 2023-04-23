import { AnyAction } from "redux";

// 'type predicate' is kind of like a function that verifies whether a specific argument that it receives is going to be a narrower (as in more specific) type or not.
// Matchable type is essentially an extension on actionCreator.
type Matchable<AC extends () => AnyAction> = AC & {
  type: ReturnType<AC>["type"];
  match(action: AnyAction): action is ReturnType<AC>;
};

// receive a action creator that gets no parameters
export function withMatcher<AC extends () => AnyAction & { type: string }>(
  actionCreator: AC
): Matchable<AC>;

// receive a action creator that has parameters
export function withMatcher<
  AC extends (...args: any[]) => AnyAction & { type: string }
>(actionCreator: AC): Matchable<AC>;

export function withMatcher(actionCreator: Function) {
  const type = actionCreator().type;
  return Object.assign(actionCreator, {
    type,
    match(action: AnyAction) {
      return action.type === type;
    },
  });
}

export type ActionWithPayload<T, P> = {
  type: T;
  payload: P;
};

export type Action<T> = {
  type: T;
};

// if createAction gets called with a type and a payload, the return type from this function will be action with payload tap being passed in like so.
export function createAction<T extends string, P>(
  type: T,
  payload: P
): ActionWithPayload<T, P>;

export function createAction<T extends string>(
  type: T,
  payload: void
): Action<T>;

// function overloading provides us this ability to make multiple function type definitions of the same name , so we can have multiple type definitions for create action.
export function createAction<T extends string, P>(type: T, payload: P) {
  return { type, payload };
}
