import React from "react";
import {render, screen, fireEvent, cleanup } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import App from '../App';

const MockApp = () => {

    return (
        <BrowserRouter>
            <App />
        </BrowserRouter>);
}

describe("App Testing", () =>{

    test("App render correctly", () =>{
        render(<MockApp />);
        expect(screen.getByTestId(/tindflix-app/i)).toBeTruthy();
    });
});