import 'jest-dom/extend-expect';
import React from 'react';
import { createStore } from 'redux';
import { Link, Route, Router, Switch, withRouter } from 'react-router-dom';
import { Provider, connect } from 'react-redux';
import { render, fireEvent, cleanup } from 'react-testing-library';
import { createMemoryHistory } from 'history';
import ProjectNotification from '../../../components/project/ProjectNotification';
import store from '../../../store';

afterEach(cleanup);

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

describe('test Login Form', () => {
  test.only('should render', () => {
    const { getByText, container } = renderWithRedux(
      <ProjectNotification />,
      {}
    );
  });
});
