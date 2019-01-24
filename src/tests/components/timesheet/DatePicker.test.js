import 'jest-dom/extend-expect';
import React from 'react';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { render, cleanup } from 'react-testing-library';
import { createMemoryHistory } from 'history';
import MomentUtils from '@date-io/moment';
import { MuiPickersUtilsProvider } from 'material-ui-pickers';
import DatePicker from '../../../components/timesheet/DatePicker';
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

describe('test timesheet > DatePicker', () => {
  test.only('should render', () => {
    const { getByText, container } = renderWithRedux(
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <DatePicker onDateChange={e => {}} />
      </MuiPickersUtilsProvider>,
      {}
    );
  });
});
