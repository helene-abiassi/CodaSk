import {render, screen} from '@testing-library/react';
import {describe, expect, test} from 'vitest';
import Login from '../pages/login';

describe('Login component', () => {
  test('Should find a Login text somewhere there', () => {
    // *Arrange
    render(<Login />);

    // *Act
    const text = screen.getByText('Login');

    // *Assert
    expect(text).toBeInTheDocument();
  });
});
