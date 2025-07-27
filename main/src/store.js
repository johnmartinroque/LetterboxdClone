import { createStore, combineReducers, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  filmDetailReducer,
  filmTrendingReducer,
} from "./reducers/filmReducers";
import { actorDetailReducer } from "./reducers/actorReducers";

const rootReducer = combineReducers({
  filmTrending: filmTrendingReducer,
  filmDetail: filmDetailReducer,
  actorDetail: actorDetailReducer,
});

const middleware = [thunk];

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
