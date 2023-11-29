import {describe, expect, it, test} from 'vitest';
import {render, screen} from '@testing-library/react';
import Register from '../pages/register';

describe('General document structure', () => {
  it('Should contain a form with attribute data-testid set to registerForm', () => {
    render(<Register />);

    const registerForm = screen.getByTestId('registerForm');

    expect(registerForm).toBeInTheDocument();
  });

  it('Should contain a email input with a label containing Email text', () => {
    render(<Register />);

    const emailInput = screen.getByLabelText('Email');

    expect(emailInput).toBeInTheDocument();
  });

  it('Should contain a password input with a label containing Password text', () => {
    render(<Register />);

    const passwordInput = screen.getByLabelText('Password');

    expect(passwordInput).toBeInTheDocument();
  });

  it('Should contain a confirm password input with a label containing Confirm Password text', () => {
    render(<Register />);

    const confirmPassword = screen.getByLabelText('Confirm Password');

    expect(confirmPassword).toBeInTheDocument();
  });

  it('Should have a button with text Register', () => {
    render(<Register />);

    const registerButton = screen.getByRole('button');

    expect(registerButton).toHaveTextContent('Register');
  });
});
