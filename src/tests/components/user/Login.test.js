import 'jest-dom/extend-expect';
import React from 'react';
import { createStore } from 'redux';
import { Link, Route, Router, Switch, withRouter } from 'react-router-dom';
import { Provider, connect } from 'react-redux';
import {
  render,
  fireEvent,
  cleanup,
  waitForElement
} from 'react-testing-library';
import { createMemoryHistory } from 'history';
import Login from '../../../components/user/Login';
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

/*
var mockObj = {
  loginHandler: jest.fn()
};
jest.mock('../../../routines', () => mockObj);
*/

describe('test Login Form', () => {
  test.only('should render', async () => {
    const { getByText, container, getByLabelText } = renderWithRedux(
      <Login />,
      {}
    );
    let emailId = container.querySelector('input[type=text]');
    let password = container.querySelector('input[type=password]');
    expect(emailId.value).toBeFalsy();
    expect(password.value).toBeFalsy();
    await fireEvent.change(emailId, { target: { value: 'r@g.com' } });
    await fireEvent.click(container.querySelector('button'));
    const element = await waitForElement(() =>
      getByText(/password is a required field/i)
    );
    expect(element).toBeDefined();
  });
});

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
