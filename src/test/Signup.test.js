import React from "react";
import {render, screen, fireEvent, cleanup } from '@testing-library/react';
import { toBeInTheDocument } from '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event';
import mockAxios from "axios";
import {BrowserRouter} from 'react-router-dom';
import SignUp from '../pages/SignUp/SignUp';

const MockSignUp = () => {
    return (<BrowserRouter>
            <SignUp />
            </BrowserRouter>);
}

afterAll(() => {
    mockAxios.reset();
    cleanup();
});

describe("Sign up Page Component Testing", () =>{

    test("Sign Up page render correctly", () =>{

        render(<MockSignUp />);
    
        expect(screen.getByPlaceholderText('Email')).toBeTruthy();
        expect(screen.getByPlaceholderText('Username')).toBeTruthy();
        expect(screen.getByPlaceholderText('Password')).toBeTruthy();
        expect(screen.getByPlaceholderText('Confirm Password')).toBeTruthy();
        expect(screen.findByRole('button', /sign up/i)).toBeTruthy();
        expect(screen.findByRole('link', /back to login/i)).toBeTruthy();
    });

    describe("Input Fields Testing", () => {
        describe("Input Fields", () => {
            test("Should Render Input Element", async () => {

                render(<MockSignUp />);

                const username = "admin";
                const email = "admin@gmail.com";
                const pass1 = "hello";
                const pass2 = "hello";

                const inputElement1 = screen.getByPlaceholderText('Email');
                const inputElement2 = screen.getByPlaceholderText('Username');
                const inputElement3 = screen.getByPlaceholderText('Password');
                const inputElement4 = screen.getByPlaceholderText('Confirm Password');
                
                fireEvent.change(inputElement1, {target: {value: email}});
                expect(inputElement1.value).toBe(email);
                fireEvent.change(inputElement2, {target: {value: username}});
                expect(inputElement2.value).toBe(username);
                fireEvent.change(inputElement3, {target: {value: pass1}});
                expect(inputElement3.value).toBe(pass1);
                fireEvent.change(inputElement4, {target: {value: pass2}});
                expect(inputElement4.value).toBe(pass2);
            });
        });

        describe("Password Fields Testing", () => {
            test("Testing ifferent Password", () => {
                
                render(<MockSignUp />);
            
                const username = "admin";
                const email = "admin@gmail.com";
                const pass1 = "hello";
                const pass2 = "helo";
            
                userEvent.type(screen.getByPlaceholderText('Email'), email);
                userEvent.type(screen.getByPlaceholderText('Username'), username);
                userEvent.type(screen.getByPlaceholderText('Password'), pass1);
                userEvent.type(screen.getByPlaceholderText('Confirm Password'), pass2);
            
                expect(screen.queryByTestId('pwSame')).toBeTruthy();
            });
            
            test("Testing Same Password", () => {
                render(<MockSignUp />);
    
                const username = "admin";
                const email = "admin@gmail.com";
                const pass1 = "hello";
                const pass2 = "hello";
            
                userEvent.type(screen.getByPlaceholderText('Email'), email);
                userEvent.type(screen.getByPlaceholderText('Username'), username);
                userEvent.type(screen.getByPlaceholderText('Password'), pass1);
                userEvent.type(screen.getByPlaceholderText('Confirm Password'), pass2);
            
                expect(screen.queryByTestId('pwSame')).not.toBeTruthy();
            });
        });
    });


    describe("Submission Testing", () => {
        describe("Input Fields Submission", () => {
            test("Successful Sign Up", async () => {
                render(<MockSignUp />);

                const username = "admin";
                const email = "admin@gmail.com";
                const pass1 = "hello";
                const pass2 = "hello";

                const inputElement1 = screen.getByPlaceholderText('Email');
                const inputElement2 = screen.getByPlaceholderText('Username');
                const inputElement3 = screen.getByPlaceholderText('Password');
                const inputElement4 = screen.getByPlaceholderText('Confirm Password');
                const buttonElement = screen.getByRole('button', {name:/SIGN UP/i});
                
                fireEvent.change(inputElement1, {target: {value: email}});
                fireEvent.change(inputElement2, {target: {value: username}});
                fireEvent.change(inputElement3, {target: {value: pass1}});
                fireEvent.change(inputElement4, {target: {value: pass2}});
                fireEvent.click(buttonElement);

                const divElement = screen.getByText(/The username is taken. Please try again./i);
                expect(divElement).toBeInTheDocument();
            });

            test("Testing Register API call", async () => {
                render(<MockSignUp />);
                

                const header = {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'}

                const username = "admin";
                const email = "admin@gmail.com";
                const pass1 = "hello";
                const pass2 = "hello";

                const inputElement1 = screen.getByPlaceholderText('Email');
                const inputElement2 = screen.getByPlaceholderText('Username');
                const inputElement3 = screen.getByPlaceholderText('Password');
                const inputElement4 = screen.getByPlaceholderText('Confirm Password');
                const buttonElement = screen.getByRole('button', {name:/SIGN UP/i});
                
                fireEvent.change(inputElement1, {target: {value: email}});
                fireEvent.change(inputElement2, {target: {value: username}});
                fireEvent.change(inputElement3, {target: {value: pass1}});
                fireEvent.change(inputElement4, {target: {value: pass2}});
                fireEvent.click(buttonElement);

                expect(mockAxios.post).toHaveBeenCalledWith('http://127.0.0.1:5000/register', 
                {email: email,
                 password: pass1,
                 username:username}, {headers: header});
            });
        });
    });
});