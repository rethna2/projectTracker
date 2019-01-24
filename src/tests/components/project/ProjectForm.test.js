import 'jest-dom/extend-expect';
import React from 'react';
import { createStore } from 'redux';
import {
  MemoryRouter,
  Link,
  Route,
  Router,
  Switch,
  withRouter
} from 'react-router-dom';
import { Provider, connect } from 'react-redux';
import { render, fireEvent, cleanup } from 'react-testing-library';
import { createMemoryHistory } from 'history';
import ProjectForm from '../../../components/project/ProjectForm';
import store from '../../../store';
import reducer from '../../../reducers';
afterEach(cleanup);

store.dispatch({
  type: 'FETCH_PROJECTS/SUCCESS',
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
        <MemoryRouter initialEntries={[`/projectId`]} history={history}>
          <Route path="/:projectId">{ui}</Route>
        </MemoryRouter>
      </Provider>
    )
  };
}

describe('test ProjectForm', () => {
  test.only('should render', () => {
    const { getByText, container } = renderWithRedux(<ProjectForm />, {});
  });
});
