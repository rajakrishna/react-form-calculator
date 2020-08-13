const Transaction = require("../models/Transaction");

// @desc Get all transactions
// @route GET /api/v1/transactions
// @acess Public

exports.getTransactions = async (req, res, next) => {
	try {
		const transactions = await Transaction.find();
		return res.status(200).json({
			sucess: true,
			count: transactions.length,
			data: transactions,
		});
	} catch (error) {
		return res.status(500).json({
			sucess: false,
			error: "Server Error",
		});
	}
};

// @desc ADD transaction
// @route POST /api/v1/transactions
// @acess Public

exports.addTransactions = async (req, res, next) => {
	try {
		const { text } = req.body;

		const transaction = await Transaction.create(req.body);

		return res.status(201).json({
			sucess: true,
			data: transaction,
		});
	} catch (error) {
		if (error.name === "ValidationError") {
			const messages = Object.values(error.errors).map((val) => val.message);
			res.status(400).json({
				sucess: false,
				error: messages,
			});
		} else {
			return res.status(500).json({
				sucess: false,
				error: "Server Error",
			});
		}
	}
};

// @desc Delete transaction
// @route DELETE /api/v1/transactions
// @acess Public

exports.deleteTransactions = async (req, res, next) => {
	try {
		// req.params.id is used to access the id which is passed in
		const transaction = await Transaction.findById(req.params.id);
		if (!transaction) {
			return res.status(404).json({
				sucess: false,
				error: "No Transaction found",
			});
		}
		// once you find the transaction using the id you remove it
		await transaction.remove();

		return res.status(200).json({
			sucess: true,
			data: {},
		});
	} catch (error) {
		return res.status(500).json({
			sucess: false,
			error: "Server Error",
		});
	}
};
