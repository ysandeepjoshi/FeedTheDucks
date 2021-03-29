import { render, screen } from '@testing-library/react';
import App from './App';

test('renders login screen', () => {
  render(<App />);
  const linkElement = screen.getByText(/Please Log In/i);
  expect(linkElement).toBeInTheDocument();
});

test('try to login with wrong password',() =>{
  render(<App />);
  const elemUser = screen.getByText('Username');
  const elemPassword = screen.getByText('Password');
})