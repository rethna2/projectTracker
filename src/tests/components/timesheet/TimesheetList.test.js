import 'jest-dom/extend-expect';
import React from 'react';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { render, cleanup } from 'react-testing-library';
import { createMemoryHistory } from 'history';
import TimesheetList from '../../../components/timesheet/TimesheetList';
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

describe('test timesheet > TimesheetList', () => {
  test.only('should render', () => {
    const { getByText, container } = renderWithRedux(
      <TimesheetList list={[]} onEdit={() => {}} />,
      {}
    );
  });
});
