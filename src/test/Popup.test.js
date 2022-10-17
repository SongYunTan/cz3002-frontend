import React from "react";
import {render, screen, fireEvent, cleanup } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import Popup from '../components/Popup';

const MockPopup = () => {

    const trigger = true;

    return (
        <BrowserRouter>
            <Popup trigger = {trigger} />
        </BrowserRouter>);
}

afterAll(() => {
    cleanup();
});


describe("Popup Component Testing", () =>{
    test("Popup render correctly", () =>{
        render(<MockPopup />);

        expect(screen.findByRole('button')).toBeTruthy();
    });

    describe("Popup Component Closing Testing", () =>{
        test("Popup Close when cross button clicked", () =>{
            const trigger = true;
            const setTrigger = jest.fn(() => false);

            render (
                <BrowserRouter>
                    <Popup 
                    trigger = {trigger} 
                    setTrigger = {setTrigger} />
                </BrowserRouter>);

            const closeButton = screen.getByRole('button');
            fireEvent.click(closeButton);

            expect(setTrigger(trigger)).not.toBeTruthy();
        });
    });
});

