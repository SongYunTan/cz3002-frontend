import React from "react";
import {render, screen, fireEvent, waitFor, act, cleanup, getAllByTestId } from '@testing-library/react';
import { toHaveLength } from '@testing-library/jest-dom';
import mockAxios from "axios";
import {BrowserRouter} from 'react-router-dom';
import { createMemoryHistory } from 'history';
import Matches from '../pages/Matches/Matches';

const MockMatches = () => {
    return (<BrowserRouter>
            <Matches />
            </BrowserRouter>);
}

const MockUserInfo = {
    username: "admin",
    email: 'admin@gmail.com',
    groups: ['friends 1']
}

const MockMovieInfo = [{
	title: "Thor",
	movie_id: 123456,
	url: 'https://google.com'
}, {
	title: "Thor 2",
	movie_id: 123457,
	url: 'https://google.com'
}]

afterEach(() => {
    mockAxios.reset();
    cleanup();
});

describe("Matches Page Component Testing", () =>{
    describe("Matches Page Rendering Testing", () =>{
        test("Not Logged In - NeverLogin Page render correctly", async () =>{

            render(<MockMatches />);
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

            render(<MockMatches />);
						
						expect(mockAxios.get).toHaveBeenCalledTimes(1);
						expect(mockAxios.get).toHaveBeenCalledWith('http://127.0.0.1:5000/match_movie',
						{headers: header, params: {groupName: groupName}})
						await waitFor(() => {
							expect(mockAxios.get).toHaveBeenCalledTimes(2);
							expect(mockAxios.get).toHaveBeenCalledWith('http://127.0.0.1:5000/profile', 
							{headers: header, params: {id: userid}});
						})
        });

        test("Matches page render correctly", async () =>{
            window.sessionStorage.setItem('id', 1);
            const userid = window.sessionStorage.getItem("id");
						window.sessionStorage.setItem('groupname', "Friends");
						const groupName = window.sessionStorage.getItem('groupname');

            const header = {
                'Content-Type': 'application/json',
                'Accept': 'application/json'}
						
						mockAxios.get.mockResolvedValueOnce({data: MockMovieInfo,status: 200 })
						.mockResolvedValueOnce({data: MockUserInfo,status: 200 });

						const {getAllByTestId } = render(<MockMatches />);

						expect(mockAxios.get).toHaveBeenCalledTimes(1);
						expect(mockAxios.get).toHaveBeenCalledWith('http://127.0.0.1:5000/match_movie',
						{headers: header, params: {groupName: groupName}});
						
						await waitFor(() => {
							expect(mockAxios.get).toHaveBeenCalledTimes(2);
							expect(mockAxios.get).toHaveBeenCalledWith('http://127.0.0.1:5000/profile', 
							{headers: header, params: {id: userid}});
            })
						
						await waitFor(() => {
							const movieList = getAllByTestId('matchedmovieitem');
							expect(movieList).toHaveLength(2);
							expect(movieList[0]).toBeTruthy();
							// toHaveTextContent('Thor');
						})
						
        });
    });
});