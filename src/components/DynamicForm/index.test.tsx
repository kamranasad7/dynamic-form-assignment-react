// sum.test.js
import { expect, test } from 'vitest'
import { render, screen } from '@testing-library/react'
import DynamicForm from './index';
import store from '../../store';
import { Provider } from 'react-redux';
import formConfig from '../../fieldset.ts';

test('renders without crashing', () => {
  render(
    <Provider store={store}>
      <DynamicForm />
    </Provider>
  )
})


test('renders all fields', () => {
  render(
    <Provider store={store}>
      <DynamicForm />
    </Provider>
  )

  for (const field of formConfig) {
    if (Array.isArray(field)) {
      for (const nested of field) {
        expect(screen.getByLabelText(nested.placeholder)).toBeInTheDocument();
      }
    }
    else {
      expect(screen.getByLabelText(field.placeholder)).toBeInTheDocument();
    }
  }
})