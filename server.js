const dotenv = require('dotenv');
const mongoose = require('mongoose');

const app = require('./app');

dotenv.config({path: './config.env'});

mongoose.set('strictQuery', true);
main().catch(err => console.log(err));

async function main() {
  console.log(process.env.DATABASE_LOCAL);
	await mongoose.connect(process.env.DATABASE_LOCAL);
	console.log("Conected to database");
}

const port = process.env.PORT;
app.listen(port, () =>{
	console.log('Server ready and running...');
});