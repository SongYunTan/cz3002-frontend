import React from "react";
import {render, screen, fireEvent, cleanup } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Review from '../pages/review/review';
import mockAxios from "axios";

const MockReview = () => {
    const username = "admin";
    const groups = ["friends 1"];

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

			test("Review Page render correctly", async () =>{
					expect(screen.getByTestId("search-bar")).toBeTruthy();
					expect(screen.getByTestId("search-movies-btn")).toBeTruthy();
			});
	});

	describe("Input Fields Testing", () => {
		describe("Input Fields", () => {
				test("Should Render Input Element", async () => {
						render(<MockReview />);

						const keyword = "love";
						const inputElement1 = screen.getByPlaceholderText('Search Movies');
						
						fireEvent.change(inputElement1, {target: {value: keyword}});
						expect(inputElement1.value).toBe(keyword);
				});
		});
	});

	describe("Popup Rendering Testing", () => {
		test("Should Render Popup Element", async () => {
				render(<MockReview />);
				const addReviewBtn = screen.getByTestId('addReviewBtn');
				fireEvent.click(addReviewBtn);
				
				const popupElement = screen.getByTestId('review-popup');
				expect(popupElement).toBeInTheDocument();
		});
	});

	describe("Submission Testing", () => {
		describe("Input Fields Submission", () => {
				test("Testing Search Movie", async () => {

						render(<MockReview/>);

						const header = {
								'Content-Type': 'application/json',
								'Accept': 'application/json'}

						const keyword = "love";
						const inputElement1 = screen.getByPlaceholderText('Search Movies');
						
						const buttonElement = screen.getByTestId('search-movies-btn');;
						
						fireEvent.change(inputElement1, {target: {value: keyword}});
						fireEvent.click(buttonElement);

						expect(mockAxios.post).toHaveBeenCalledWith('http://127.0.0.1:5000/search_movie', 
						{movie:keyword}, {headers: header});

						const divElement = screen.getByTestId('movieItem');
            expect(divElement).toBeInTheDocument();
				});

				test("Testing Add Review", async () => {
					window.sessionStorage.setItem('username', 'admin');
          const username = window.sessionStorage.getItem("username");

					render(<MockReview/>);

					const header = {
							'Content-Type': 'application/json',
							'Accept': 'application/json'}
							
					const review = "Great Movie!";
					const star = 4;
					const title = "Fall"
					const inputElement1 = screen.getByPlaceholderText('Review');
					const inputElement2 = screen.getByTestId('star-rating');
					
					const buttonElement = screen.getByTestId('submitReviewButton');
					
					fireEvent.change(inputElement1, {target: {value: review}});
					fireEvent.change(inputElement2, {target: {value: star}});
					fireEvent.click(buttonElement);

					expect(mockAxios.post).toHaveBeenCalledWith('http://127.0.0.1:5000/add_review', 
					{username: username, title: title, star: star, review: review}, {headers: header});
			});
		});
	});
});

