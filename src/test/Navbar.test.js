import React from "react";
import {render, screen, fireEvent, cleanup } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import Navbar from '../components/Navbar';

const MockNavbar = () => {
    const username = "admin";
    const groups = ["friends 1"];

    return (
        <BrowserRouter>
            <Navbar
            username = {username}
            groups = {groups}
            />
        </BrowserRouter>);
}

const resizeWindow = (x) => {
    window.innerWidth = x;
    window.dispatchEvent(new Event('resize'));
}

afterAll(() => {
    cleanup();
});

describe("Navbar Component Testing", () =>{

    test("Navbar render correctly", () =>{
        render(<MockNavbar />);

        expect(screen.findByRole('link', /logo/i)).toBeTruthy();
        expect(screen.findByRole('link', /Profile admin/i)).toBeTruthy();
        expect(screen.findByRole('link', /Home/i)).toBeTruthy();
        expect(screen.findByRole('link', /friends 1/i)).toBeTruthy();
        expect(screen.findByRole('link', /Create/i)).toBeTruthy();
        expect(screen.findByRole('link', /Add Review/i)).toBeTruthy();
        expect(screen.findByRole('link', /Logout/i)).toBeTruthy();
        expect(screen.findByRole('img', /logo/i)).toBeTruthy();
        expect(screen.findByRole('img', /profile/i)).toBeTruthy();
    });

    describe("Redirection Testing Web View", () => {
        describe("Home Redirection", () => {
            test("Home Link - Should Go to Home Route", async () => {

                const history = createMemoryHistory({ initialEntries: ['/Home'] });
                const username = "admin";
                const groups = ["friends 1"];

                render (
                    <BrowserRouter location={history.location} navigator={history}>
                        <Navbar
                        username = {username}
                        groups = {groups}
                        />
                    </BrowserRouter>);
                expect(history.location.pathname).toBe('/Home');

                const homeLink = screen.getByText(/Home/i);
                fireEvent.click(homeLink);
                history.push("/Home")

                expect(history.location.pathname).toBe('/Home');
            });

            test("Home Link - Should Go to Home Route", async () => {

                const history = createMemoryHistory({ initialEntries: ['/Home'] });
                const username = "admin";
                const groups = ["friends 1"];

                render (
                    <BrowserRouter location={history.location} navigator={history}>
                        <Navbar
                        username = {username}
                        groups = {groups}
                        />
                    </BrowserRouter>);
                expect(history.location.pathname).toBe('/Home');

                const homeLink = screen.getByTestId(/image-logo/i);
                fireEvent.click(homeLink);
                history.push("/Home")

                expect(history.location.pathname).toBe('/Home');
            });
        });

        describe("Group Redirection", () => {
            test("Should Go to Group Route", async () => {

                const history = createMemoryHistory({ initialEntries: ['/Home'] });
                const username = "admin";
                const groups = ["friends 1"];

                render (
                    <BrowserRouter location={history.location} navigator={history}>
                        <Navbar
                        username = {username}
                        groups = {groups}
                        />
                    </BrowserRouter>);
                expect(history.location.pathname).toBe('/Home');

                const groupLink = screen.getByText(/friends 1/i);
                fireEvent.click(groupLink);
                history.push("/Swipe")

                expect(history.location.pathname).toBe('/Swipe');
            });
        });

        describe("Create Redirection", () => {
            test("Should Go to Create Route", async () => {

                const history = createMemoryHistory({ initialEntries: ['/Home'] });
                const username = "admin";
                const groups = ["friends 1"];

                render (
                    <BrowserRouter location={history.location} navigator={history}>
                        <Navbar
                        username = {username}
                        groups = {groups}
                        />
                    </BrowserRouter>);
                expect(history.location.pathname).toBe('/Home');

                const createLink = screen.getByText(/Create/i);
                fireEvent.click(createLink);
                history.push("/Create")

                expect(history.location.pathname).toBe('/Create');
            });
        });

        describe("Review Redirection", () => {
            test("Should Go to Review Route", async () => {

                const history = createMemoryHistory({ initialEntries: ['/Home'] });
                const username = "admin";
                const groups = ["friends 1"];

                render (
                    <BrowserRouter location={history.location} navigator={history}>
                        <Navbar
                        username = {username}
                        groups = {groups}
                        />
                    </BrowserRouter>);
                expect(history.location.pathname).toBe('/Home');

                const reviewLink = screen.getByText(/Review/i);
                fireEvent.click(reviewLink);
                history.push("/Review")

                expect(history.location.pathname).toBe('/Review');
            });
        });

        describe("Profile Redirection", () => {
            test("Should Go to Profile Route", async () => {

                const history = createMemoryHistory({ initialEntries: ['/Home'] });
                const username = "admin";
                const groups = ["friends 1"];

                render (
                    <BrowserRouter location={history.location} navigator={history}>
                        <Navbar
                        username = {username}
                        groups = {groups}
                        />
                    </BrowserRouter>);
                expect(history.location.pathname).toBe('/Home');

                const profileLink = screen.getByTestId(/username-web/i);
                fireEvent.click(profileLink);
                history.push("/Uprofile")

                expect(history.location.pathname).toBe('/Uprofile');
            });
        });
    });

    describe("Redirection Testing Mobile View", () => {
        describe("Profile Redirection", () => {
            test("Should Go to Profile Route", async () => {

                const history = createMemoryHistory({ initialEntries: ['/Home'] });
                const username = "admin";
                const groups = ["friends 1"];

                render (
                    <BrowserRouter location={history.location} navigator={history}>
                        <Navbar
                        username = {username}
                        groups = {groups}
                        />
                    </BrowserRouter>);
                expect(history.location.pathname).toBe('/Home');
                
                resizeWindow(900);
                const profileLink = screen.getByTestId(/username-mobile/i);
                fireEvent.click(profileLink);
                history.push("/Uprofile")

                expect(history.location.pathname).toBe('/Uprofile');
            });
        });

        describe("Logout Redirection", () => {
            test("Should Go to Logout Route", async () => {

                const history = createMemoryHistory({ initialEntries: ['/Home'] });
                const username = "admin";
                const groups = ["friends 1"];

                render (
                    <BrowserRouter location={history.location} navigator={history}>
                        <Navbar
                        username = {username}
                        groups = {groups}
                        />
                    </BrowserRouter>);
                expect(history.location.pathname).toBe('/Home');
                
                resizeWindow(900);
                const profileLink = screen.getByText(/Logout/i);
                fireEvent.click(profileLink);
                history.push("/")

                expect(history.location.pathname).toBe('/');
            });
        });
    });
});

