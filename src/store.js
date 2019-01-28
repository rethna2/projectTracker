import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import { routinePromiseWatcherSaga } from 'redux-saga-routines';

import { createBrowserHistory } from 'history';
import createSagaMiddleware from 'redux-saga';
import reducer from './reducers';
import rootSaga from './sagas';

const sagaMiddleware = createSagaMiddleware();

const history = createBrowserHistory();

const finalCreateStore = compose(
  applyMiddleware(sagaMiddleware, routerMiddleware(history)),
  process.env.NODE_ENV === 'production' && window.__REDUX_DEVTOOLS_EXTENSION__
    ? window.__REDUX_DEVTOOLS_EXTENSION__()
    : f => f
)(createStore);

const store = finalCreateStore(reducer(history));

const sagas = [rootSaga, routinePromiseWatcherSaga];
sagas.forEach(sagaMiddleware.run);
//sagaMiddleware.run(rootSaga);
export { history };

export default store;
