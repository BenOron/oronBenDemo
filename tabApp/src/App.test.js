import { render, screen } from '@testing-library/react';
import Home from '../src/component/Home';

test('renders home', () => {
  render(<Home />);
  const taboolaAlt = screen.getByTitle('Edit Mode')
  expect(taboolaAlt).toBeInTheDocument();
});

