// sum.test.js
import { test } from 'vitest'
import { render } from '@testing-library/react'
import ResultsModal from './index';
import store from '../../store';
import { Provider } from 'react-redux';

test('renders without crashing', () => {
  render(
    <Provider store={store}>
        <ResultsModal />
    </Provider>
    )
})