import React from 'react';
import { createMemoryHistory } from 'history';
import {
  render, fireEvent, cleanup,
} from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { Router } from 'react-router-dom';
import axios from 'axios';
import App from '../App';

jest.mock('axios');
const obj = {
  token: '1212fsdfsdfsd', name: 'User', email: 'user@test.com', role: 'user',
};

const renderWithRouter = (component) => {
  const history = createMemoryHistory();
  return {
    ...render(<Router history={ history }>{component}</Router>), history,
  };
};

describe('testing Login', () => {
  afterEach(cleanup);

  test('renders the login page', () => {
    const { getByText, getByTestId } = renderWithRouter(<App />);
    const email = getByText(/email/i);
    const password = getByText(/password/i);
    const signIn = getByTestId('signin-btn');
    const noAccount = getByTestId('no-account-btn');
    expect(email).toBeInTheDocument();
    expect(password).toBeInTheDocument();
    expect(signIn).toBeInTheDocument();
    expect(noAccount).toBeInTheDocument();
  });

  test('render the Register Page when choosing so', () => {
    const { getByText, getByTestId, history } = renderWithRouter(<App />);
    const noAccount = getByTestId('no-account-btn');
    expect(noAccount).toBeInTheDocument();
    fireEvent.click(noAccount);
    const { pathname } = history.location;
    expect(pathname).toBe('/register');
    const register = getByText(/cadastro/i);
    expect(register).toBeInTheDocument();
  });

  test('renders the product page after login', async () => {
    axios.post.mockImplementationOnce(() => Promise.resolve({ data: obj }));
    const { getByTestId } = renderWithRouter(<App />);
    const emailInput = getByTestId('email-input');
    const passwordInput = getByTestId('password-input');
    const signIn = getByTestId('signin-btn');
    fireEvent.change(emailInput, { target: { value: 'user@test2.com' } });
    fireEvent.change(passwordInput, { target: { value: 'test123' } });
    act(() => {
      fireEvent.change(emailInput, { target: { value: 'user@test.com' } });
      fireEvent.change(passwordInput, { target: { value: 'test123' } });
      fireEvent.click(signIn);
    });
    // await waitForDomChange();
    // axios.get.mockImplementationOnce(() => Promise.resolve({data: obj}));

    // console.log(passwordInput);
    // console.log(document.body.innerHTML)
    // axios.post.mockResolvedValue(obj)
    // mockAxios.post.mockImplementationOnce(() => Promise.resolve(obj));
    // expect(mockAxios.post).toHaveBeenCalledTimes(1);
    // console.log(axios.post.mockImplementationOnce(() => Promise.resolve(obj)));
    // expect(signIn.disabled).toBe(true);
    // console.log(signIn)
    // mockAxios.mockResponseFor({url: '/get'}, {data: obj});
    // console.log(window.localStorage);
    // const skol = getByText(/skol/i);
    // expect(skol).toBeInTheDocument();
    // const register = getByText(/cadastro/i);
    // expect(register).toBeInTheDocument();
    // fireEvent.click(signIn);
    // const skol = getByText(/skol/i);
    // expect(skol).toBeInTheDocument();
  });
});
