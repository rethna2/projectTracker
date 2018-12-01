import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import createSagaMiddleware from 'redux-saga';
import reducer from './reducers';
import rootSaga from './sagas';
import formActionSaga from 'redux-form-saga';

const sagaMiddleware = createSagaMiddleware();

const history = createBrowserHistory();

const finalCreateStore = compose(
  applyMiddleware(sagaMiddleware, routerMiddleware(history)),
  window.devToolsExtension ? window.devToolsExtension() : f => f
)(createStore);

const store = finalCreateStore(reducer(history));

const sagas = [formActionSaga, rootSaga];
sagas.forEach(saga => sagaMiddleware.run(saga));

export { history };

export default store;
