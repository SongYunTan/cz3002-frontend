import React from "react";
import {render, screen, fireEvent, waitFor, act, cleanup, getByTestId } from '@testing-library/react';
import { toHaveLength } from '@testing-library/jest-dom';
import mockAxios from "axios";
import {BrowserRouter} from 'react-router-dom';
import { createMemoryHistory } from 'history';
import Uprofile from '../pages/Uprofile/Uprofile';

const MockUprofile = () => {
    return (<BrowserRouter>
            <Uprofile />
            </BrowserRouter>);
}

const MockuserInfo = {
    username: "admin",
    email: 'admin@gmail.com',
    groups: ['friends 1']
}

afterEach(() => {
    window.sessionStorage.clear();
    jest.restoreAllMocks();
    mockAxios.reset();
    cleanup();
});

describe("User Profile Page Component Testing", () =>{

    describe("User Profile Page Rendering Testing", () =>{
        test("Not Logged In - NeverLogin Page render correctly", async () =>{

            render(<MockUprofile />);
            expect(screen.getByRole('link',{name:/Login Now!/i})).toBeTruthy();
        });

        test("Error in User ID render incorrectly", async () =>{
            window.sessionStorage.clear();
            window.sessionStorage.setItem('id', null);
            const userid = window.sessionStorage.getItem("id");

            const header = {
                'Content-Type': 'application/json',
                'Accept': 'application/json'}

            render(<MockUprofile />);

            expect(mockAxios.get).toHaveBeenCalledWith('http://127.0.0.1:5000/profile', 
            {headers: header, params: {id: userid}});
        });

        test("Home page render correctly", async () =>{
            window.sessionStorage.setItem('id', 1);
            const userid = window.sessionStorage.getItem("id");

            const header = {
                'Content-Type': 'application/json',
                'Accept': 'application/json'}

            mockAxios.get.mockResolvedValueOnce({
                data: MockuserInfo });

            const { getAllByTestId } = render(<MockUprofile />);

            expect(mockAxios.get).toHaveBeenCalledWith('http://127.0.0.1:5000/profile', 
            {headers: header, params: {id: userid}});

            await waitFor(() => {
                expect(screen.getByTestId(/profilelogout-web/i)).toBeTruthy();
                expect(screen.getByTestId(/profileuser-web/i)).toBeTruthy();
                expect(screen.getByTestId(/profileemail-web/i)).toBeTruthy();
                expect(screen.getByTestId(/profilepassword-web/i)).toBeTruthy();
                expect(screen.getByTestId(/edit-username/i)).toBeTruthy();
                expect(screen.getByTestId(/edit-email/i)).toBeTruthy();
                expect(screen.getByTestId(/edit-password/i)).toBeTruthy();
            })
        });
    });

    describe("Edit Button Open Pop Up", () => {

        describe("Open Username popup", () => {
            test("Should open username popup", async () =>{
                window.sessionStorage.setItem('id', 1);
                const userid = window.sessionStorage.getItem("id");
        
                const header = {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'}
        
                mockAxios.get.mockResolvedValueOnce({
                    data: MockuserInfo });
        
                const { getAllByTestId } = render(<MockUprofile />);
        
                expect(mockAxios.get).toHaveBeenCalledWith('http://127.0.0.1:5000/profile', 
                {headers: header, params: {id: userid}});
        
                const editUsername = screen.getByTestId(/edit-username/i);
                fireEvent.click(editUsername);
        
                await waitFor(() => {
                    expect(screen.getByText(/Enter New Username:/i)).toBeTruthy();
                })
            });
        });

        describe("Open Email popup", () => {
            test("Should open email popup", async () =>{
                window.sessionStorage.setItem('id', 1);
                const userid = window.sessionStorage.getItem("id");
        
                const header = {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'}
        
                mockAxios.get.mockResolvedValueOnce({
                    data: MockuserInfo });
        
                const { getAllByTestId } = render(<MockUprofile />);
        
                expect(mockAxios.get).toHaveBeenCalledWith('http://127.0.0.1:5000/profile', 
                {headers: header, params: {id: userid}});
        
                const editEmail = screen.getByTestId(/edit-email/i);
                fireEvent.click(editEmail);
        
                await waitFor(() => {
                    expect(screen.getByText(/Enter New Email:/i)).toBeTruthy();
                })
            });
        });

        describe("Open Password popup", () => {
            test("Should open password popup", async () =>{
                window.sessionStorage.setItem('id', 1);
                const userid = window.sessionStorage.getItem("id");
        
                const header = {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'}
        
                mockAxios.get.mockResolvedValueOnce({
                    data: MockuserInfo });
        
                const { getAllByTestId } = render(<MockUprofile />);
        
                expect(mockAxios.get).toHaveBeenCalledWith('http://127.0.0.1:5000/profile', 
                {headers: header, params: {id: userid}});
        
                const editPassword = screen.getByTestId(/edit-password/i);
                fireEvent.click(editPassword);
        
                await waitFor(() => {
                    expect(screen.getByText(/Enter New Password:/i)).toBeTruthy();
                })
            });
        });
    });

    describe("User Log out", () =>{
        test("Redirect to Login Page", async () =>{
            window.sessionStorage.setItem('id', 1);
            const userid = window.sessionStorage.getItem("id");
            const history = createMemoryHistory({ initialEntries: ['/Uprofile'] });

            const header = {
                'Content-Type': 'application/json',
                'Accept': 'application/json'}

            mockAxios.get.mockResolvedValueOnce({
                data: MockuserInfo });

            const { getAllByTestId } = render (
                <BrowserRouter location={history.location} navigator={history}>
                    <Uprofile />
                </BrowserRouter>);

            expect(mockAxios.get).toHaveBeenCalledWith('http://127.0.0.1:5000/profile', 
            {headers: header, params: {id: userid}});

            expect(history.location.pathname).toBe('/Uprofile');
            
            const logoutLink = screen.getByTestId(/profilelogout-web/i);
            fireEvent.click(logoutLink);

            await waitFor(() => {
                history.push("/")
                expect(history.location.pathname).toBe('/');
            })
        });
    });
    
    /*describe("Redirection Home View", () => {
        describe("Create Redirection", () => {
            test("Should Go to  Create Route", async () => {
                window.sessionStorage.setItem('id', 1);
                const userid = window.sessionStorage.getItem("id");
                const history = createMemoryHistory({ initialEntries: ['/Home'] });

                const header = {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'}

                mockAxios.get.mockResolvedValueOnce({
                        data: MockuserInfo });

                const {getAllByTestId } = render (
                    <BrowserRouter location={history.location} navigator={history}>
                        <Home />
                    </BrowserRouter>);;

                expect(mockAxios.get).toHaveBeenCalledWith('http://127.0.0.1:5000/profile', 
                {headers: header, params: {id: userid}});

                expect(history.location.pathname).toBe('/Home');

                const createLink = screen.getByText(/Create Group/i);
                fireEvent.click(createLink);

                await waitFor(() => {
                    const groupList = getAllByTestId('listitem');
                    expect(groupList).toHaveLength(1);
                    expect(groupList[0]).toHaveTextContent('friends 1');
                    history.push("/Create")
                    expect(history.location.pathname).toBe('/Create');
                })
            });
        });

        describe("Review Redirection", () => {
            test("Should Go to Review Route", async () => {
                window.sessionStorage.setItem('id', 1);
                const userid = window.sessionStorage.getItem("id");
                const history = createMemoryHistory({ initialEntries: ['/Home'] });

                const header = {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'}

                mockAxios.get.mockResolvedValueOnce({
                        data: MockuserInfo });

                const {getAllByTestId } = render (
                    <BrowserRouter location={history.location} navigator={history}>
                        <Home />
                    </BrowserRouter>);;

                expect(mockAxios.get).toHaveBeenCalledWith('http://127.0.0.1:5000/profile', 
                {headers: header, params: {id: userid}});

                expect(history.location.pathname).toBe('/Home');

                const reviewLink = screen.getByText(/Leave Reviews/i);
                fireEvent.click(reviewLink);

                await waitFor(() => {
                    const groupList = getAllByTestId('listitem');
                    expect(groupList).toHaveLength(1);
                    expect(groupList[0]).toHaveTextContent('friends 1');
                    history.push("/Review")
                    expect(history.location.pathname).toBe('/Review');
                })
            });
        });

        describe("Group Redirection", () => {
            test("Should Go to Group Route", async () => {
                window.sessionStorage.setItem('id', 1);
                const userid = window.sessionStorage.getItem("id");
                const history = createMemoryHistory({ initialEntries: ['/Home'] });

                const header = {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'}

                mockAxios.get.mockResolvedValueOnce({
                        data: MockuserInfo });

                const {getByText, getAllByTestId } = render (
                    <BrowserRouter location={history.location} navigator={history}>
                        <Home />
                    </BrowserRouter>);;

                expect(mockAxios.get).toHaveBeenCalledWith('http://127.0.0.1:5000/profile', 
                {headers: header, params: {id: userid}});

                expect(history.location.pathname).toBe('/Home');

                await waitFor(() => {
                    const groupList = getAllByTestId('listitem');
                    expect(groupList).toHaveLength(1);
                    expect(groupList[0]).toHaveTextContent('friends 1');
                    
                    act(() =>{

                        const groupLink = screen.getByText(/F1/i);
                        fireEvent.click(groupLink);
                    })

                    history.push("/Swipe")
                    expect(history.location.pathname).toBe('/Swipe');
                })
            });
        });
    });*/
});