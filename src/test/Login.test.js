import React from "react";
import {render, screen, fireEvent, waitFor, act, cleanup } from '@testing-library/react';
import { toBeInTheDocument } from '@testing-library/jest-dom';
import mockAxios from "axios";
import {BrowserRouter} from 'react-router-dom';
import { createMemoryHistory } from 'history';
import Login from '../pages/Login/Login';

const MockLogin = () => {
    return (<BrowserRouter>
            <Login />
            </BrowserRouter>);
}

afterEach(() => {
    mockAxios.reset();
    cleanup();
});

describe("Login Page Component Testing", () =>{

    test("Login page render correctly", () =>{

        render(<MockLogin />);
    
        expect(screen.getByPlaceholderText('Username')).toBeTruthy();
        expect(screen.getByPlaceholderText('Password')).toBeTruthy();
        expect(screen.getByRole('button', {name:/LOG IN/i})).toBeTruthy();
        expect(screen.getByRole('link', {name:/Sign Up/i})).toBeTruthy();
    });

    test('Redirect to Sign Up Page', async () => {
        const history = createMemoryHistory({ initialEntries: ['/'] });
        
        render(
          <BrowserRouter location={history.location} navigator={history}>
            <Login />
          </BrowserRouter>
        );
        expect(history.location.pathname).toBe('/');

        const signUpLink = screen.getByRole('link', {name:/Sign Up/i});
        fireEvent.click(signUpLink);
        history.push("/SignUp")

        expect(history.location.pathname).toBe('/SignUp');
    });

    describe("Input Fields Testing", () => {
        describe("Input Fields", () => {
            test("Should Render Input Element", async () => {

                render(<MockLogin />);

                const username = "admin";
                const pass = "hello";

                const inputElement1 = screen.getByPlaceholderText('Username');
                const inputElement2 = screen.getByPlaceholderText('Password');
                
                fireEvent.change(inputElement1, {target: {value: username}});
                expect(inputElement1.value).toBe(username);
                fireEvent.change(inputElement2, {target: {value: pass}});
                expect(inputElement2.value).toBe(pass);
            });
        });

        describe("Password Field Toggle", () => {
            test("Passord should toggle to text on click", async () => {

                render(<MockLogin />);

                const pass = "hello";
                const inputElement1 = screen.getByPlaceholderText('Password');
                const togglePassword = screen.getByTestId('password-toggle');

                fireEvent.change(inputElement1, {target: {value: pass}});
                expect(inputElement1.value).toBe(pass);
                fireEvent.click(togglePassword);
            });
        });
    });

    describe("Submission Testing", () => {

        describe("Fields Testing", () => {
            test("Invalid Credentials", () => {
                
                render(<MockLogin />);
            
                const username = "admin";
                const pass = "";

                const inputElement1 = screen.getByPlaceholderText('Username');
                const inputElement2 = screen.getByPlaceholderText('Password');
                const buttonElement = screen.getByRole('button', {name:/LOG IN/i});

                fireEvent.change(inputElement1, {target: {value: username}});
                fireEvent.change(inputElement2, {target: {value: pass}});
                fireEvent.click(buttonElement);

                const divElement = screen.getByText(/The username and password is incorrect. Please try again./i);
                expect(divElement).toBeInTheDocument();
            });
        });

        describe("Input Fields Submission", () => {
            test("Testing User Login and Redirection to Home", async () => {
                const history = createMemoryHistory({ initialEntries: ['/'] });
                
                render(
                  <BrowserRouter location={history.location} navigator={history}>
                    <Login />
                  </BrowserRouter>
                );

                expect(history.location.pathname).toBe('/');
                
                const header = {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'}

                const username = "admin";
                const pass = "hello";

                mockAxios.post.mockResolvedValueOnce({
                    data: {username: 'admin', password: 'hello'},
                    status: 200 });
                
                await waitFor (() => {
                    const inputElement1 = screen.getByPlaceholderText('Username');
                    const inputElement2 = screen.getByPlaceholderText('Password');
                    const buttonElement = screen.getByRole('button', {name:/LOG IN/i});
                    
                    fireEvent.change(inputElement1, {target: {value: username}});
                    fireEvent.change(inputElement2, {target: {value: pass}});
                    fireEvent.click(buttonElement);
                });

                expect(mockAxios.post).toHaveBeenCalledWith('http://127.0.0.1:5000/login', 
                {username:username,
                 password: pass}, {headers: header});

                history.push("/Home");
                expect(history.location.pathname).toBe('/Home'); 
            });
        });
    });
});