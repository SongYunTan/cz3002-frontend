import React, { useEffect } from "react";
import {render, screen, fireEvent, waitFor, act, cleanup } from '@testing-library/react';
import { toBeInTheDocument } from '@testing-library/jest-dom';
import mockAxios from "axios";
import {MemoryRouter,BrowserRouter, useLocation } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import Verify from '../pages/Verify/Verify';

const MockVerify = () => {
    return (<MemoryRouter initialEntries={[{ pathname: '/Verify', state: {
        id: 1,
        username: "admin",
        email: "admin@gmail.com",
        password: "hello"
    }}]}>
        <Verify />
        </MemoryRouter>);
}

afterEach(() => {
    mockAxios.reset();
    cleanup();
});

describe("Verify Page Component Testing", () =>{

    test("Verify page render correctly", () =>{
        render( <MockVerify />);

        expect(screen.getByRole('heading',{name:/We sent a code to your email, please key in the code here to verify your email and complete your sign up./i})).toBeTruthy();
        expect(screen.getByRole('textbox')).toBeTruthy();
    });

    describe("Testing code input" , () => {
        test("Code should change when user enter input", () => {
            
            render( <MockVerify />);

            const code = "123456"

            const inputElement = screen.getByRole("textbox")
            fireEvent.change(inputElement, {target: {value: code}});
        });
    });

    describe("Testing Verify Code", () => {
        test("Should Be Successful Verification", async () => {
            
            const headers = {
                'Content-Type': 'application/json',
                'Accept': 'application/json'}

            mockAxios.post.mockResolvedValueOnce({
                status: 200 });  

            const code = "123456";
            
            render(<MockVerify />);

            await waitFor (() => {
                const inputElement = screen.getByRole("textbox")
                fireEvent.change(inputElement, {target: {value: code}});
            });

            expect(mockAxios.post).toHaveBeenCalledWith('http://127.0.0.1:5000/verify-code', 
            {code: code, id: 1}, {headers});
        });
    });
});