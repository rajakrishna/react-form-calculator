const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema({
	text: {
		type: String,
		trim: true,
		required: [true, "Please add some text"],
	},
});

module.exports = mongoose.model("Transactions", TransactionSchema);
