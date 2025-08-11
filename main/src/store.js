import { createStore, combineReducers, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  filmDetailReducer,
  filmTrendingReducer,
  searchFilmsReducer,
} from "./reducers/filmReducers";
import { actorDetailReducer } from "./reducers/actorReducers";
import { directorDetailReducer } from "./reducers/directorReducers";
import {
  userInfoReducer,
  userRegisterReducer,
  userSignInReducer,
} from "./reducers/authenticationReducer";
import { recentReviewsReducer } from "./reducers/reviewReducers";

const rootReducer = combineReducers({
  filmTrending: filmTrendingReducer,
  filmDetail: filmDetailReducer,
  actorDetail: actorDetailReducer,
  directorDetail: directorDetailReducer,
  userRegister: userRegisterReducer,
  userSignIn: userSignInReducer,
  userInfo: userInfoReducer,
  recentReviews: recentReviewsReducer,
  searchFilms: searchFilmsReducer,
});

const middleware = [thunk];

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
