import React from "react";
import {render, screen, fireEvent, cleanup } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import GroupNavbar from '../components/GroupNavbar';

const MockGroupNavbar = () => {

    return (
        <BrowserRouter>
            <GroupNavbar />
        </BrowserRouter>);
}

describe("GroupNavbar Component Testing", () =>{

    test("Navbar render correctly", () =>{
        render(<MockGroupNavbar />);

        expect(screen.findByTestId(/swipe-web/i)).toBeTruthy();
        expect(screen.findByTestId(/match-web/i)).toBeTruthy();
        expect(screen.findByTestId(/setting-web/i)).toBeTruthy();
        expect(screen.findByTestId(/swipe-mobile/i)).toBeTruthy();
        expect(screen.findByTestId(/match-mobile/i)).toBeTruthy();
        expect(screen.findByTestId(/setting-mobile/i)).toBeTruthy();
    });

    describe("Redirection Testing Web View", () => {
        describe("Swipe Redirection", () => {
            test("Should Go to Swipe Route", async () => {

                const history = createMemoryHistory({ initialEntries: ['/Swipe'] });

                render (
                    <BrowserRouter>
                        <GroupNavbar />
                    </BrowserRouter>);
                expect(history.location.pathname).toBe('/Swipe');

                const swipeLink = screen.getByTestId(/swipe-web/i);
                fireEvent.click(swipeLink);
                history.push("/Swipe")

                expect(history.location.pathname).toBe('/Swipe');
            });
        });

        describe("Matches Redirection", () => {
            test("Should Go to Matches Route", async () => {

                const history = createMemoryHistory({ initialEntries: ['/Swipe'] });

                render (
                    <BrowserRouter>
                        <GroupNavbar />
                    </BrowserRouter>);
                expect(history.location.pathname).toBe('/Swipe');

                const matchLink = screen.getByTestId(/match-web/i);
                fireEvent.click(matchLink);
                history.push("/Matches")

                expect(history.location.pathname).toBe('/Matches');
            });
        });

        describe("Group Settings Redirection", () => {
            test("Should Go to Group Settings Route", async () => {

                const history = createMemoryHistory({ initialEntries: ['/Swipe'] });

                render (
                    <BrowserRouter>
                        <GroupNavbar />
                    </BrowserRouter>);
                expect(history.location.pathname).toBe('/Swipe');

                const settingLink = screen.getByTestId(/setting-web/i);
                fireEvent.click(settingLink);
                history.push("/GroupSetting")

                expect(history.location.pathname).toBe('/GroupSetting');
            });
        });
    });

    describe("Redirection Testing mobile View", () => {
        describe("Swipe Redirection", () => {
            test("Should Go to Swipe Route", async () => {

                const history = createMemoryHistory({ initialEntries: ['/Swipe'] });

                render (
                    <BrowserRouter>
                        <GroupNavbar />
                    </BrowserRouter>);
                expect(history.location.pathname).toBe('/Swipe');

                const swipeLink = screen.getByTestId(/swipe-mobile/i);
                fireEvent.click(swipeLink);
                history.push("/Swipe")

                expect(history.location.pathname).toBe('/Swipe');
            });
        });

        describe("Matches Redirection", () => {
            test("Should Go to Matches Route", async () => {

                const history = createMemoryHistory({ initialEntries: ['/Swipe'] });

                render (
                    <BrowserRouter>
                        <GroupNavbar />
                    </BrowserRouter>);
                expect(history.location.pathname).toBe('/Swipe');

                const matchLink = screen.getByTestId(/match-mobile/i);
                fireEvent.click(matchLink);
                history.push("/Matches")

                expect(history.location.pathname).toBe('/Matches');
            });
        });

        describe("Group Settings Redirection", () => {
            test("Should Go to Group Settings Route", async () => {

                const history = createMemoryHistory({ initialEntries: ['/Swipe'] });

                render (
                    <BrowserRouter>
                        <GroupNavbar />
                    </BrowserRouter>);
                expect(history.location.pathname).toBe('/Swipe');

                const settingLink = screen.getByTestId(/setting-mobile/i);
                fireEvent.click(settingLink);
                history.push("/GroupSetting")

                expect(history.location.pathname).toBe('/GroupSetting');
            });
        });
    });

});

