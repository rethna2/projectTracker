import 'jest-dom/extend-expect';
import React from 'react';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import MomentUtils from '@date-io/moment';
import { MuiPickersUtilsProvider } from 'material-ui-pickers';
import { render, cleanup } from 'react-testing-library';
import { createMemoryHistory } from 'history';
import LogWork from '../../../components/task/LogWork';
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

describe('test task > LogWork', () => {
  test.only('should render', () => {
    const { getByText, container } = renderWithRedux(
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <LogWork
          projectId="projectId"
          timeId="timeId"
          task={{}}
          handleClose={() => {}}
          onCancel={() => {}}
        />
      </MuiPickersUtilsProvider>,
      {}
    );
  });
});
