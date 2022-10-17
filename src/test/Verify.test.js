import React from "react";
import {render, screen, fireEvent, waitFor, act, cleanup } from '@testing-library/react';
import { toBeInTheDocument } from '@testing-library/jest-dom';
import mockAxios from "axios";
import {BrowserRouter} from 'react-router-dom';
import { createMemoryHistory } from 'history';
import Verify from '../pages/Verify/Verify';

const MockVerify = () => {
    return (<BrowserRouter>
        <Verify />
        </BrowserRouter>);
}

MockVerifyPost = () => {
    return ({ id: 1, code: 123456});
}

afterEach(() => {
    mockAxios.reset();
    cleanup();
});

describe("Verify Page Component Testing", () =>{

    test("Verify page render correctly", () =>{

        render(<MockVerify />);

        screen.getAllByRole('');
    
        //expect(screen.getByPlaceholderText('Username')).toBeTruthy();
        //expect(screen.getByPlaceholderText('Password')).toBeTruthy();
        //expect(screen.getByRole('button', {name:/LOG IN/i})).toBeTruthy();
        //expect(screen.getByRole('link', {name:/Sign Up/i})).toBeTruthy();
    });
});