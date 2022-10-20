import React from "react";
import {render, screen, fireEvent, cleanup, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { toHaveLength } from '@testing-library/jest-dom';
import Review from '../pages/review/review';
import { createMemoryHistory } from 'history';
import mockAxios from "axios";

const MockReview = () => {
    return (
        <BrowserRouter>
            <Review/>
        </BrowserRouter>);
}

const MockuserInfo = {
	username: "admin",
	email: 'admin@gmail.com',
	groups: ['friends 1']
}

afterEach(() => {
	mockAxios.reset();
	cleanup();
});

describe("Review Page Component Testing", () =>{
	describe("Review Page Rendering Testing", () =>{
		test("Not Logged In - NeverLogin Page render correctly", async () =>{
				render(<MockReview />);
				expect(screen.getByRole('link',{name:/Login Now!/i})).toBeTruthy();
		});

        test("Error in User ID render incorrectly", async () =>{
            window.sessionStorage.clear();
            window.sessionStorage.setItem('id', null);
            const userid = window.sessionStorage.getItem("id");

            const header = {
                'Content-Type': 'application/json',
                'Accept': 'application/json'}

            render(<MockReview />);

            expect(mockAxios.get).toHaveBeenCalledWith('http://127.0.0.1:5000/profile', 
            {headers: header, params: {id: userid}});
        });

        test("Review page render correctly", async () =>{
            window.sessionStorage.setItem('id', 1);
            const userid = window.sessionStorage.getItem("id");

            const header = {
                'Content-Type': 'application/json',
                'Accept': 'application/json'}

            mockAxios.get.mockResolvedValueOnce({
                data: MockuserInfo });

            render(<MockReview />);

            expect(mockAxios.get).toHaveBeenCalledWith('http://127.0.0.1:5000/profile', 
            {headers: header, params: {id: userid}});

            await waitFor(() => {
                expect(screen.getByTestId(/username-web/i)).toBeTruthy();
                expect(screen.getByTestId(/search-bar/i)).toBeTruthy();
				expect(screen.getByTestId(/search-movies-btn/i)).toBeTruthy();
            });
        });
	});

    describe("Redirection Review View", () => {
        describe("Home Redirection", () => {
            test("Should Go to Home Route", async () => {
                window.sessionStorage.setItem('id', 1);
                const userid = window.sessionStorage.getItem("id");
                const history = createMemoryHistory({ initialEntries: ['/Review'] });

                const header = {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'}

                mockAxios.get.mockResolvedValueOnce({
                        data: MockuserInfo });

                const {getAllByTestId } = render (
                    <BrowserRouter location={history.location} navigator={history}>
                        <Review />
                    </BrowserRouter>);;

                expect(mockAxios.get).toHaveBeenCalledWith('http://127.0.0.1:5000/profile', 
                {headers: header, params: {id: userid}});

                expect(history.location.pathname).toBe('/Review');

                const homeLink = screen.getByTestId(/review-back-button/i);
                fireEvent.click(homeLink);

                await waitFor(() => {
                    history.push("/Home")
                    expect(history.location.pathname).toBe('/Home');
                });
            });
        });
    });

    describe("Submission Testing", () => {

        describe("Input Fields Submission", () => {
			test("Submission Error", async () => {
                window.sessionStorage.setItem('id', 1);
                const userid = window.sessionStorage.getItem("id");

                const headers = {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'}

                mockAxios.get.mockResolvedValueOnce({
                    data: MockuserInfo });

                const { getAllByTestId } = render(<MockReview />);

                expect(mockAxios.get).toHaveBeenCalledWith('http://127.0.0.1:5000/profile', 
                {headers: headers, params: {id: userid}});

				const keyword = "love";

                await waitFor(() => {
                    const inputElement = screen.getByTestId(/search-bar/i);
                    const buttonElement = screen.getByTestId(/search-movies-btn/i);;
                            
                    fireEvent.change(inputElement, {target: {value: keyword}});
                    fireEvent.click(buttonElement);
                });

				expect(mockAxios.post).toHaveBeenCalledWith('http://127.0.0.1:5000/search_movie', 
				{movie:keyword}, {headers: headers});
			});
		});

		describe("Input Fields Submission", () => {
			test("Submitting Review", async () => {
                window.sessionStorage.setItem('id', 1);
                window.sessionStorage.setItem('username', "admin");
                const userid = window.sessionStorage.getItem("id");
                const username = window.sessionStorage.getItem("username");

                const headers = {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'}

                mockAxios.get.mockResolvedValueOnce({
                    data: MockuserInfo });

                const { getAllByTestId } = render(<MockReview />);

                expect(mockAxios.get).toHaveBeenCalledWith('http://127.0.0.1:5000/profile', 
                {headers: headers, params: {id: userid}});

				const keyword = "love";

                mockAxios.post.mockResolvedValueOnce({
                    data: [{title: "thor", url:"hello"}],
                    status: 200 });

                await waitFor(() => {
                    const inputElement = screen.getByTestId(/search-bar/i);
                    const buttonElement = screen.getByTestId(/search-movies-btn/i);;
                            
                    fireEvent.change(inputElement, {target: {value: keyword}});
                    fireEvent.click(buttonElement);
                });

				expect(mockAxios.post).toHaveBeenCalledWith('http://127.0.0.1:5000/search_movie', 
				{movie:keyword}, {headers: headers});

                await waitFor(() => {
                    const movieList = getAllByTestId('movieitem');
                    expect(movieList).toHaveLength(1);
                    expect(movieList[0]).toHaveTextContent('thor');
                    expect(screen.getByTestId(/movieitem-addReview/i)).toBeTruthy();

                    const addReviewBtn = screen.getByTestId(/movieitem-addReview/i);
                    fireEvent.click(addReviewBtn);
                });

                const review = "Bad Movie";
				const star = 0;
				const title = "thor"

                expect(screen.getByText(/Add Review:/i)).toBeTruthy();
                expect(screen.getByTestId(/popup-textarea/i)).toBeTruthy();
                expect(screen.getByTestId(/popup-submit/i)).toBeTruthy();

                mockAxios.post.mockResolvedValueOnce({
                    data: "thor",
                    status: 200 });

                await waitFor (() => {
                    const userInput = screen.getByTestId(/popup-textarea/i);
                    const submitButton = screen.getByTestId(/popup-submit/i);
                    fireEvent.change(userInput, {target: {value: review}});
                    fireEvent.click(submitButton);
                });

                expect(mockAxios.post).toHaveBeenCalledWith('http://127.0.0.1:5000/add_review', 
                {username:username, title:title, star:star, review:review}, {headers: headers});
			});

            test("Submitting Review Error", async () => {
                window.sessionStorage.setItem('id', 1);
                window.sessionStorage.setItem('username', "admin");
                const userid = window.sessionStorage.getItem("id");
                const username = window.sessionStorage.getItem("username");

                const headers = {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'}

                mockAxios.get.mockResolvedValueOnce({
                    data: MockuserInfo });

                const { getAllByTestId } = render(<MockReview />);

                expect(mockAxios.get).toHaveBeenCalledWith('http://127.0.0.1:5000/profile', 
                {headers: headers, params: {id: userid}});

				const keyword = "love";

                mockAxios.post.mockResolvedValueOnce({
                    data: [{title: "thor", url:"hello"}],
                    status: 200 });

                await waitFor(() => {
                    const inputElement = screen.getByTestId(/search-bar/i);
                    const buttonElement = screen.getByTestId(/search-movies-btn/i);;
                            
                    fireEvent.change(inputElement, {target: {value: keyword}});
                    fireEvent.click(buttonElement);
                });

				expect(mockAxios.post).toHaveBeenCalledWith('http://127.0.0.1:5000/search_movie', 
				{movie:keyword}, {headers: headers});

                await waitFor(() => {
                    const movieList = getAllByTestId('movieitem');
                    expect(movieList).toHaveLength(1);
                    expect(movieList[0]).toHaveTextContent('thor');
                    expect(screen.getByTestId(/movieitem-addReview/i)).toBeTruthy();

                    const addReviewBtn = screen.getByTestId(/movieitem-addReview/i);
                    fireEvent.click(addReviewBtn);
                });

                const review = "Bad Movie";
				const star = 0;
				const title = "thor"

                expect(screen.getByText(/Add Review:/i)).toBeTruthy();
                expect(screen.getByTestId(/popup-textarea/i)).toBeTruthy();
                expect(screen.getByTestId(/popup-submit/i)).toBeTruthy();

                await waitFor (() => {
                    const userInput = screen.getByTestId(/popup-textarea/i);
                    const submitButton = screen.getByTestId(/popup-submit/i);
                    fireEvent.change(userInput, {target: {value: review}});
                    fireEvent.click(submitButton);
                });

                expect(mockAxios.post).toHaveBeenCalledWith('http://127.0.0.1:5000/add_review', 
                {username:username, title:title, star:star, review:review}, {headers: headers});
			});
		});
	});
});