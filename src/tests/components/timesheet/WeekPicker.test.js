import 'jest-dom/extend-expect';
import React from 'react';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { render, cleanup } from 'react-testing-library';
import { createMemoryHistory } from 'history';
import MomentUtils from '@date-io/moment';
import { MuiPickersUtilsProvider } from 'material-ui-pickers';
import WeekPicker from '../../../components/timesheet/WeekPicker';
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
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <Router history={history}>{ui}</Router>
        </MuiPickersUtilsProvider>
      </Provider>
    )
  };
}

describe('test timesheet > WeekPicker', () => {
  test.only('should render', () => {
    const { getByText, container } = renderWithRedux(
      <WeekPicker
        onDateChange={() => {}}
        date={['2018-11-09T18:30:00.000Z', '2018-11-16T18:30:00.000Z']}
      />,
      {}
    );
  });
});
