import 'jest-dom/extend-expect';
import React from 'react';
import { MemoryRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { render, cleanup } from 'react-testing-library';
import { createMemoryHistory } from 'history';
import TaskForm from '../../../components/task/TaskForm';
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
        <MemoryRouter initialEntries={[`/taskId`]} history={history}>
          <Route path="/:taskId">{ui}</Route>
        </MemoryRouter>
      </Provider>
    )
  };
}

describe('test task > TaskForm', () => {
  test.only('should render', () => {
    const { getByText, container } = renderWithRedux(
      <TaskForm handleClose={() => {}} />,
      {}
    );
  });
});
