import 'jest-dom/extend-expect';
import React from 'react';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { render, cleanup } from 'react-testing-library';
import { createMemoryHistory } from 'history';
import TimesheetPopup from '../../../components/timesheet/TimesheetPopup';
import store from '../../../store';

afterEach(cleanup);

store.dispatch({
  type: 'LOGIN/SUCCESS',
  payload: {
    emailId: 'r@g.com'
  }
});

store.dispatch({
  type: 'FETCH_TASK_TIME/SUCCESS',
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

let timesheetData = {
  people: {
    id: 'r@g.com',
    name: 'Dummy User'
  },
  project: {
    id: '5bf56d153bdba22a7bac9d21',
    name: 'my project name'
  },
  status: 'approved',
  _id: '5c01281aacab401d195c005b',
  startDate: '2018-11-09T18:30:00.000Z',
  endDate: '2018-11-16T18:30:00.000Z',
  comments: 'Not done any work for the week',
  createdAt: '2018-11-30T12:07:54.112Z',
  updatedAt: '2018-11-30T12:09:22.335Z'
};

describe('test timesheet > TimesheetPopup', () => {
  test.only('should render', () => {
    const { getByText, container } = renderWithRedux(
      <TimesheetPopup
        isReviewer={false}
        timesheetData={timesheetData}
        updating={false}
        onClose={() => {}}
        onSubmit={() => {}}
      />,
      {}
    );
  });
});
