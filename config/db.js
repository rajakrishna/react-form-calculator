const mongoose = require("mongoose");

const connectDB = async () => {
	try {
		const conn = await mongoose.connect(process.env.MONGODB_URI, {
			useCreateIndex: true,
			useUnifiedTopology: true,
			useNewUrlParser: true,
		});

		console.log(
			`MONGO DB connected: ${conn.connection.host}`.cyan.underline.bold
		);
	} catch (error) {
		console.log(error);
		console.log("Error:${error.message}".red);
		process.exit(1);
	}
};

module.exports = connectDB;
