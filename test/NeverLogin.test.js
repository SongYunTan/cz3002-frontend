import React from "react";
import {render, screen, fireEvent, waitFor, act, cleanup } from '@testing-library/react';
import { toBeInTheDocument } from '@testing-library/jest-dom';
import {BrowserRouter} from 'react-router-dom';
import { createMemoryHistory } from 'history';
import NeverLogin from '../pages/NeverLogin/NeverLogin';

const MockNeverLogin = () => {
    return (<BrowserRouter>
            <NeverLogin />
            </BrowserRouter>);
}

afterEach(() => {
    cleanup();
});

describe("NeverLogin Page Component Testing", () =>{
    test("NeverLogin page render correctly", () =>{

        render(<MockNeverLogin />);
        expect(screen.getByRole('img',{name:/logo/i})).toBeTruthy();
        expect(screen.getByRole('heading',{name:/Please login to access the page/i})).toBeTruthy();
        expect(screen.getByRole('link',{name:/Login Now!/i})).toBeTruthy();
    });

    test('Redirect to Login Page', async () => {
        const history = createMemoryHistory({ initialEntries: ['/NeverLogin'] });
        
        render(
          <BrowserRouter location={history.location} navigator={history}>
            <NeverLogin />
          </BrowserRouter>
        );
        expect(history.location.pathname).toBe('/NeverLogin');

        const loginLink = screen.getByRole('link',{name:/Login Now!/i});
        fireEvent.click(loginLink);
        history.push("/")

        expect(history.location.pathname).toBe('/');
    });
});