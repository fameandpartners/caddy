import { compose, createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducers, { initialStates } from '../reducers';


export default (props = {}) => {
  const reducer = combineReducers(reducers);
  const composedStore = compose(composeWithDevTools(applyMiddleware(thunkMiddleware)));

  return composedStore(createStore)(reducer, initialStates);
};
