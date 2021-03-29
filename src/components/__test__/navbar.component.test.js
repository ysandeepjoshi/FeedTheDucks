import { cleanup, render, screen } from '@testing-library/react';
import Navbar from '../navbar.component';
import  {BrowserRouter as Router } from "react-router-dom";

test('renders Navigation Menu and check for links', () => {
    render(<Router><Navbar /></Router>);
    const linkElement = screen.getByText(/Duck Feed List/i);
    expect(linkElement).toBeInTheDocument();
    });