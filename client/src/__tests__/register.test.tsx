import {render, screen} from '@testing-library/react';
import {describe, expect, test} from 'vitest';
import Register from '../pages/register';

describe('Register component', () => {
  test('Should find a Login text somewhere there', () => {
    // *Arrange
    render(<Register />);

    // *Act
    const text = screen.getByText('Signup');

    // *Assert
    expect(text).toBeInTheDocument();
  });
});
