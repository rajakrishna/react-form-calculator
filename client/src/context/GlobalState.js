import React, { createContext, useReducer } from "react";
import AppReducer from "./AppReducer";
import axios from "axios";

// Initial State
const initialState = {
	transactions: [],
	// we are making async calls to backend
	error: null,
	loading: true,
};

// Create context

export const GlobalContext = createContext(initialState);

// Provider component
export const GlobalProvider = ({ children }) => {
	const [state, dispatch] = useReducer(AppReducer, initialState);
	// Actions
	async function getTransactions() {
		try {
			// res will give us the whole json response
			const res = await axios.get("/api/v1/transactions");

			dispatch({
				type: "GET_TRANSACTIONS",
				payload: res.data.data,
			});
		} catch (error) {
			dispatch({
				type: "TRANSACTION_ERROR",
				// Check postman on how we got this
				payload: error.response.data.error,
			});
		}
	}

	async function addTransaction(transaction) {
		const config = {
			header: {
				"Content-Type": "application/json",
			},
		};
		try {
			await axios
				.post("/api/v1/transactions", transaction, config)
				.then((res) => {
					dispatch({
						type: "ADD_TRANSACTION",
						payload: res.data.data,
					});
				});
		} catch (error) {
			dispatch({
				type: "TRANSACTION_ERROR",
				// Check postman on how we got this
				payload: error.response.data.error,
			});
		}
	}
	async function deleteTransaction(id) {
		try {
			await axios.delete(`/api/v1/transactions/${id}`);
			dispatch({
				type: "DELETE_TRANSACTION",
				payload: id,
			});
		} catch (error) {
			dispatch({
				type: "TRANSACTION_ERROR",
				// Check postman on how we got this
				payload: error.response.data.error,
			});
		}
	}
	// Wrapping App.js in a provider
	return (
		<GlobalContext.Provider
			value={{
				transactions: state.transactions,
				error: state.error,
				loading: state.loading,
				getTransactions,
				addTransaction,
				deleteTransaction,
			}}
		>
			{children}
		</GlobalContext.Provider>
	);
};
