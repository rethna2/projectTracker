import ReactDOM from 'react-dom';
import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import { render, fireEvent, cleanup } from 'react-testing-library';

describe('dummy test', () => {
  test('goes here', () => {
    //expect(2 + 4).toBe(6);
    if (2 + 4 != 6) {
      throw new Error('rethna error');
    }
  });
});

const Counter = ({ count, onIncrement }) => (
  <div>
    <label>{count}</label>
    <button onClick={onIncrement}>+</button>
  </div>
);

test('test Counter component', () => {
  const container = document.createElement('div');
  ReactDOM.render(<Counter count={5} onIncrement={() => {}} />, container);
  const incrementBtn = container.querySelector('button');
  expect(incrementBtn.textContent).toBe('+');
  const countDom = container.querySelector('label');
  expect(countDom.textContent).toBe('5');
});

test('test with react-testing-library', () => {
  let count = 5;
  const onIncrement = jest.fn(() => {
    count++;
  });
  const { getByText, container, rerender } = render(
    <Counter count={count} onIncrement={onIncrement} />
  );
  fireEvent.click(getByText(/\+/));
  expect(onIncrement).toHaveBeenCalledTimes(1);
  let label = container.querySelector('label');
  expect(label.textContent).toBe('5');
  rerender(<Counter count={count} onIncrement={onIncrement} />);
  expect(label.textContent).toBe('6');
});

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
