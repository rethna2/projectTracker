import React from 'react';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { render, cleanup } from 'react-testing-library';
import { createMemoryHistory } from 'history';
import Task from '../../containers/Task';
import store from '../../store';

afterEach(cleanup);

store.dispatch({
  type: 'FETCH_TASKS/SUCCESS',
  payload: []
});

function renderWithRedux(
  ui,
  {
    route = '/',
    history = createMemoryHistory({ initialEntries: [route] })
  } = {}
) {
  return {
    ...render(
      <Provider store={store}>
        <Router history={history}>{ui}</Router>
      </Provider>
    )
  };
}

describe('test Task', () => {
  test.only('should render', () => {
    const { getByText, container } = renderWithRedux(<Task />, {});
  });
});
