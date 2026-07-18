import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import React from 'react';
import App from './App';

describe('Counter Unit Tests', () => {
  it('should render the default count value 0', () => {
    render(<App />);
    const countDisplay = screen.getByTestId('count-display');
    expect(countDisplay).toHaveTextContent('0');
  });

  it('should increment the count upon clicking increment button', () => {
    render(<App />);
    const incBtn = screen.getByTestId('inc-btn');
    const countDisplay = screen.getByTestId('count-display');
    
    fireEvent.click(incBtn);
    expect(countDisplay).toHaveTextContent('1');
  });

  it('should decrement the count upon clicking decrement button', () => {
    render(<App />);
    const decBtn = screen.getByTestId('dec-btn');
    const countDisplay = screen.getByTestId('count-display');
    
    fireEvent.click(decBtn);
    expect(countDisplay).toHaveTextContent('-1');
  });
});
