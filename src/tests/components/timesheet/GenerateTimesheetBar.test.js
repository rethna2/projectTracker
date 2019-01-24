import 'jest-dom/extend-expect';
import React from 'react';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { render, cleanup } from 'react-testing-library';
import MomentUtils from '@date-io/moment';
import { MuiPickersUtilsProvider } from 'material-ui-pickers';
import { createMemoryHistory } from 'history';
import GenerateTimesheetBar from '../../../components/timesheet/GenerateTimesheetBar';
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

describe('test timesheet > GenerateTimesheetBar', () => {
  test.only('should render', () => {
    const { getByText, container } = renderWithRedux(
      <GenerateTimesheetBar onGenerate={() => {}} onCloseBar={() => {}} />,
      {}
    );
  });
});
