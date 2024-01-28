// sum.test.js
import { expect, test } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import DynamicForm from './index';
import store from '../../store';
import { Provider } from 'react-redux';
import formConfig from '../../fieldset.ts';
import ResultsModal from '../ResultsModal/index.tsx';

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

test('submits form with valid fields', () => {
  render(
    <Provider store={store}>
      <DynamicForm />
      <ResultsModal />
    </Provider>
  )

  const emailInput = screen.getByLabelText('Email') as HTMLInputElement;
  fireEvent.change(emailInput, {target: {value: 'someemail@gmail.com'}})
  expect(emailInput.value).toBe('someemail@gmail.com')

  const firstName = screen.getByLabelText('First name') as HTMLInputElement;
  fireEvent.change(firstName, {target: {value: 'Asad'}})
  expect(firstName.value).toBe('Asad')
  
  const lastName = screen.getByLabelText('Last name') as HTMLInputElement;
  fireEvent.change(lastName, {target: {value: 'Kamran'}})
  expect(lastName.value).toBe('Kamran')

  const phone = screen.getByLabelText('Phone') as HTMLInputElement;
  fireEvent.change(phone, {target: {value: '3164222121'}})
  expect(phone.value).toBe('3164222121')

  screen.getByRole('button', {name: 'Submit'}).click();
})