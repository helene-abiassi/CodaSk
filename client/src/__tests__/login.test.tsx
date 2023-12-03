import {describe, expect, it, test} from 'vitest';
import Login from '../pages/user/login';
import {fireEvent, render, screen} from '@testing-library/react';

describe('General document structure', () => {
  it('Should contain a form with attribute data-testid set to loginForm', () => {
    render(<Login />);

    const loginForm = screen.getByTestId('loginFrom');

    expect(loginForm).toBeInTheDocument();
  });

  it('Should contain a email input with a label containing Email text', () => {
    render(<Login />);

    const emailInput = screen.getByLabelText('Email');

    expect(emailInput).toBeInTheDocument();
  });

  it('Should contain a password input with a label containing Password text', () => {
    render(<Login />);

    const passwordInput = screen.getByLabelText('Password');

    expect(passwordInput).toBeInTheDocument();
  });

  it('Should have a button with text Login', () => {
    render(<Login />);

    const loginButton = screen.getByRole('button');

    expect(loginButton).toHaveTextContent('Login');
  });
});

describe('Testing inputs and a button', () => {
  test('Email input should have a value attribute', () => {
    render(<Login />);

    const emailInput = screen.getByLabelText('Email');

    expect(emailInput).toHaveAttribute('value');
  });

  test('Password input should have a value attribute', () => {
    render(<Login />);

    const passwordInput = screen.getByLabelText('Password');

    expect(passwordInput).toHaveAttribute('value');
  });

  test('Email input should be initialized with an empty string', () => {
    render(<Login />);

    const emailInput = screen.getByLabelText('Email');

    expect(emailInput).toHaveValue('');
  });

  test('Password input should be initialized with an empty string', () => {
    render(<Login />);

    const passwordInput = screen.getByLabelText('Password');

    expect(passwordInput).toHaveValue('');
  });

  test('Email input should be able to receive data', () => {
    render(<Login />);

    const emailInput = screen.getByLabelText('Email');
    const testEmail = 'kowalski@gmail.com';

    fireEvent.change(emailInput, {target: {value: testEmail}});

    expect(emailInput).toHaveValue(testEmail);
  });

  test('Password input should be able to receive data', () => {
    render(<Login />);

    const passwordInput = screen.getByLabelText('Password');
    const testPassword = '123';

    fireEvent.change(passwordInput, {target: {value: testPassword}});

    expect(passwordInput).toHaveValue(testPassword);
  });
});
