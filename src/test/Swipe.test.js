import React from "react";
import {render, screen, fireEvent, waitFor, cleanup, getAllByTestId } from '@testing-library/react';
import { toHaveLength } from '@testing-library/jest-dom';
import mockAxios from "axios";
import {BrowserRouter} from 'react-router-dom';
import { createMemoryHistory } from 'history';
import Swipe from '../pages/Swipe/Swipe';

const MockSwipe = () => {
    return (<BrowserRouter>
            <Swipe />
            </BrowserRouter>);
}

const MockUserInfo = {
    username: "admin",
    email: 'admin@gmail.com',
    groups: ['friends 1']
}

const MockTitleInfo = {
	random_title: "Thor",
	image_url: "https://google.com",
	review: [],
	movie_id: 123456
}

const MockTitleInfoWithReviews = {
	random_title: "Thor",
	image_url: "https://google.com",
	review: [["alice","great movie","4"]],
	movie_id: 123456
}

const MockInterestInfo = {
	groupName: "Friends",
	username: "alice",
	title: "Thor",
	interest: "yes"
}

afterEach(() => {
    mockAxios.reset();
    cleanup();
});

describe("Swipe Page Component Testing", () =>{
    describe("Swipe Page Rendering Testing", () =>{
        test("Not Logged In - NeverLogin Page render correctly", async () =>{

            render(<MockSwipe/>);
            expect(screen.getByRole('link',{name:/Login Now!/i})).toBeTruthy();
        });

        test("Error in User ID render incorrectly", async () =>{
            window.sessionStorage.clear();
            window.sessionStorage.setItem('id', null);
            const userid = window.sessionStorage.getItem("id");
						window.sessionStorage.setItem('groupname', "Friends");
						const groupName = window.sessionStorage.getItem('groupname');

            const header = {
                'Content-Type': 'application/json',
                'Accept': 'application/json'}

            render(<MockSwipe />);
						
						expect(mockAxios.get).toHaveBeenCalledTimes(1);
						expect(mockAxios.get).toHaveBeenCalledWith('http://127.0.0.1:5000/profile',
						{headers: header, params: {id: userid}})
						await waitFor(() => {
							expect(mockAxios.get).toHaveBeenCalledTimes(2);
							expect(mockAxios.get).toHaveBeenCalledWith('http://127.0.0.1:5000/get_title', 
							{headers: header, params: {id: userid, groupName: groupName}});
						})
        });

        test("Swipe page render correctly with no reviews", async () =>{
            window.sessionStorage.setItem('id', 1);
            const userid = window.sessionStorage.getItem("id");
						window.sessionStorage.setItem('groupname', "Friends");
						const groupName = window.sessionStorage.getItem('groupname');

            const header = {
                'Content-Type': 'application/json',
                'Accept': 'application/json'}
						
						mockAxios.get.mockResolvedValueOnce({data: MockUserInfo,status: 200 })
						.mockResolvedValueOnce({data: MockTitleInfo,status: 200 });

						mockAxios.all.mockResolvedValue([{data: MockUserInfo,status: 200 }, {data: MockTitleInfo,status: 200 }])
						// const mockAxiosSpreadResult = jest.fn()
						// mockAxios.spread.mockReturnValueOnce(mockAxiosSpreadResult);

						const {getAllByTestId } = render(<MockSwipe />);

						expect(mockAxios.get).toHaveBeenCalledTimes(1);
						expect(mockAxios.get).toHaveBeenCalledWith('http://127.0.0.1:5000/profile',
						{headers: header, params: {id: userid}})
						
						await waitFor(() => {
							expect(mockAxios.get).toHaveBeenCalledTimes(2);
							expect(mockAxios.get).toHaveBeenCalledWith('http://127.0.0.1:5000/get_title', 
							{headers: header, params: {id: userid, groupName: groupName}});
            })

						await waitFor(() => {
							expect(mockAxios.all).toHaveBeenCalledWith([{data: MockUserInfo,status: 200 }, {data: MockTitleInfo,status: 200 }]);
						})

						// await waitFor(() => {
						// 	expect(mockAxiosSpreadResult).toHaveBeenCalledWith([{data: MockUserInfo,status: 200 }, {data: MockTitleInfo,status: 200 }]);
						// })
						
						await waitFor(() => {
							expect(screen.getByTestId("movieposter")).toBeInTheDocument();
							expect(screen.getByTestId("interestbuttons")).toBeInTheDocument();
							expect(getAllByTestId('reviewitem')[0]).toHaveTextContent("");
						})
						
        });

				test("Swipe page render correctly with reviews", async () =>{
					window.sessionStorage.setItem('id', 1);
					const userid = window.sessionStorage.getItem("id");
					window.sessionStorage.setItem('groupname', "Friends");
					const groupName = window.sessionStorage.getItem('groupname');

					const header = {
							'Content-Type': 'application/json',
							'Accept': 'application/json'}
					
					mockAxios.get.mockResolvedValueOnce({data: MockUserInfo,status: 200 })
					.mockResolvedValueOnce({data: MockTitleInfoWithReviews,status: 200 });

					const {getAllByTestId } = render(<MockSwipe />);

					expect(mockAxios.get).toHaveBeenCalledTimes(1);
					expect(mockAxios.get).toHaveBeenCalledWith('http://127.0.0.1:5000/profile',
					{headers: header, params: {id: userid}})
					
					await waitFor(() => {
						expect(mockAxios.get).toHaveBeenCalledTimes(2);
						expect(mockAxios.get).toHaveBeenCalledWith('http://127.0.0.1:5000/get_title', 
						{headers: header, params: {id: userid, groupName: groupName}});
					})
					
					await waitFor(() => {
						expect(screen.getByTestId("movieposter")).toBeInTheDocument();
						expect(screen.getByTestId("interestbuttons")).toBeInTheDocument();
						const reviewList = getAllByTestId('reviewitem');
						expect(reviewList).toHaveLength(1);
					})
					
			});
    });

		describe("Swipe Page Submission Testing", () =>{
			test("Indicate Interest by Clicking Yes", async () =>{
				window.sessionStorage.setItem('id', 1);
				const userid = window.sessionStorage.getItem("id");
				window.sessionStorage.setItem('groupname', "Friends");
				const groupName = window.sessionStorage.getItem('groupname');

				const header = {
						'Content-Type': 'application/json',
						'Accept': 'application/json'}
				
				mockAxios.get.mockResolvedValueOnce({data: MockUserInfo,status: 200 })
				.mockResolvedValueOnce({data: MockTitleInfoWithReviews,status: 200 });
				
				const {getAllByTestId } = render(<MockSwipe />);
				
				expect(mockAxios.get).toHaveBeenCalledTimes(1);
				expect(mockAxios.get).toHaveBeenCalledWith('http://127.0.0.1:5000/profile',
				{headers: header, params: {id: userid}})
				
				await waitFor(() => {
					expect(mockAxios.get).toHaveBeenCalledTimes(2);
					expect(mockAxios.get).toHaveBeenCalledWith('http://127.0.0.1:5000/get_title', 
					{headers: header, params: {id: userid, groupName: groupName}});
				})

				mockAxios.post.mockResolvedValueOnce({data: MockInterestInfo})

				mockAxios.get.mockResolvedValueOnce({data: MockTitleInfoWithReviews,status: 200 })
				
				await waitFor(() => {
					expect(screen.getByTestId("movieposter")).toBeInTheDocument();
					expect(screen.getByTestId("yesbutton")).toBeInTheDocument();
					
					fireEvent.click(screen.getByTestId("yesbutton"));
				})

				const username = "";
				const title = undefined;
				const movie_id = "";

				expect(mockAxios.post).toHaveBeenCalledWith('http://127.0.0.1:5000/indicate_interest', 
				{username: username, groupName: groupName, title: title, interest: "yes", movie_id: movie_id }, {headers: header});

				await waitFor(() => {
					expect(mockAxios.get).toHaveBeenCalledWith('http://127.0.0.1:5000/get_title', 
					{headers: header, params: {id: userid, groupName: groupName}});
				})

			});

		});
});