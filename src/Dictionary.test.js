import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Dictionary from './Dictionary'

const original = window.location;

  beforeAll(() => {
    Object.defineProperty(window, 'location', {
      configurable: true,
      value: { reload: jest.fn() },
    });
  });

  afterAll(() => {
    Object.defineProperty(window, 'location', { configurable: true, value: original });
  });


  it('clears dictionary if clicked', () => {
    render(<Dictionary GALACTIC_ROMAN_DICTIONARY={{glob : 1}} RESOURCE_EXCHANGE_RATES={{Silver:17}}/>);
    
    const button = screen.getByText(/Clear/i);
    userEvent.click(button)
    expect(jest.isMockFunction(window.location.reload)).toBe(true);

  });

