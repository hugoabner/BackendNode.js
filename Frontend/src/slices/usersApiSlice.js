import {apiSlice } from  './apiSlice'

const USERS_URL = '/users';


export const usersApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		login: builder.mutation({
			query: (data) => ({
				url: `${USERS_URL}/login`,
				method: 'POST',
				body: data,
				credentials: 'include',
			}),
		}),
		register: builder.mutation({
			query: (data) => ({
				url: `${USERS_URL}/registerUser`,
				method: 'POST',
				body: data,
				credentials: 'include',
			}),
		}),
		logout: builder.mutation({
			query: () => ({
				url: `${USERS_URL}/logout`,
				method: 'POST',
				credentials: 'include',
			})
		}),
		updateUser: builder.mutation({
			query: (data) => ({
				url: `${USERS_URL}/profile`,
				method: 'PUT',
				body: data,
				credentials: 'include',
			}),
		}),
	}),
});
export const { 
			useLoginMutation, 
			useLogoutMutation,
			useRegisterMutation,
			useUpdateUserMutation } = usersApiSlice;