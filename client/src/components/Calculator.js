import React, { useState, useContext, useEffect } from "react";
import "./Calculator.css";
import { Button } from "./Button";
import { Input } from "./Input";
import { ClearButton } from "./ClearButton";
import * as math from "mathjs";
import { GlobalContext } from "../context/GlobalState";

export const Calculator = () => {
	const [input, setInput] = useState("");
	const [text, setText] = useState("");

	const {
		transactions,
		getTransactions,
		addTransaction,
		deleteTransaction,
	} = useContext(GlobalContext);

	useEffect(() => {
		getTransactions();
		addTransaction();
		//eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const addToInput = (val) => {
		setText(input + val);
		setInput(input + val);
	};

	const handleEqual = () => {
		let totaltext = math.eval(input);
		setInput(totaltext);
		setText(text + "=" + totaltext);
	};

	const handleMultiply = (val) => {
		if (val === "x") {
			setInput(input + val.replace("x", "*"));
		}
	};
	const onSubmit = () => {
		console.log(text);
		const newTransaction = {
			id: Math.floor(Math.random() * 100000000),
			text,
		};
		addTransaction(newTransaction);

		if (Object.keys(transactions).length > 10) {
			var condo = transactions.shift();
			deleteTransaction(condo._id);
		}
		setText("");
		setInput("");
	};

	return (
		<div className="app">
			<div className="calculator-wrapper">
				<Input input={input}></Input>
				<div className="row">
					<Button handleClick={addToInput}>7</Button>
					<Button handleClick={addToInput}>8</Button>
					<Button handleClick={addToInput}>9</Button>
					<Button handleClick={handleMultiply}>x</Button>
				</div>
				<div className="row">
					<Button handleClick={addToInput}>4</Button>
					<Button handleClick={addToInput}>5</Button>
					<Button handleClick={addToInput}>6</Button>
					<Button handleClick={addToInput}>-</Button>
				</div>
				<div className="row">
					<Button handleClick={addToInput}>1</Button>
					<Button handleClick={addToInput}>2</Button>
					<Button handleClick={addToInput}>3</Button>
					<Button handleClick={addToInput}>+</Button>
				</div>
				<div className="row">
					<Button handleClick={addToInput}>0</Button>
					<Button handleClick={addToInput}>.</Button>
					<Button
						handleClick={() => {
							handleEqual();
						}}
					>
						=
					</Button>
					<Button handleClick={addToInput}>/</Button>
				</div>
				<div className="row">
					<ClearButton handleClear={() => setInput("")}>clear</ClearButton>
				</div>
				<div className="row">
					<ClearButton handleClear={() => onSubmit()}>Submit</ClearButton>
				</div>

				{/* <div class="transactions"> */}
				<div class="t-text">Transactions</div>
				<ul>
					{transactions
						.slice(Math.max(Object.keys(transactions).length - 10, 0))
						.reverse()
						.map((transaction) => (
							<li key={transaction.id}>{transaction.text}</li>
						))}
				</ul>
				{/* </div> */}
			</div>
		</div>
	);
};
