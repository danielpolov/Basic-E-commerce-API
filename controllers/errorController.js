const AppError = require('./../utils/appError');

const handleCastErrorDB = err => {
	const message = `Invalid ${err.path}: ${err.value}.`;
	return new AppError(message, 400);
}

const handleJWTError = () => new AppError('Ivalid token, Please log in again', 401);

const handleJWTExpiredError = () => new AppError('Your token has expired, please try to log in again', 401);

const handleDuplicateFields = err =>{
	const value = err.keyValue.name;
	const message = `Duplicate field value '${value}', please use another value!`;
	return new AppError(message, 400);
}

const handleValidationErrorDB = err =>{
	const errors = Object.values(err.errors).map(el => el.message);

	const message = `Invalid input data. ${errors.join('. ')}`;
	return new AppError(message, 400);
}

const sendErrorDev = (err, resp) =>{
	resp
	.status(err.statusCode)
	.json({
		status: err.status,
		error: err,
		message: err.message,
		stack: err.stack
	});
}

const sendErrorProd = (err, resp) =>{
	//Operational, trusted error: send message to client
	if(err.isOperational){
		resp
		.status(err.statusCode)
		.json({
			status: err.status,
			message: err.message
		});
	//Programming or other unknown error: don't leak error details
	}else{
		//1) Log error

		console.error('ERROR', err);

		//2) Send generic message
		resp
			.status(500)
			.json({
				status: 'error',
				message: 'Something went very wrong!',
				error: err
			})
	}
}

module.exports = (err, req, resp, next) =>{
	err.statusCode = err.statusCode || 500;
	err.status = err.status || 'error';

	if(process.env.NODE_ENV === 'development'){
		sendErrorDev(err, resp);
	}else if(process.env.NODE_ENV === 'production'){
		
		let error = {...err};
		if(error.kind === 'ObjectId') error = handleCastErrorDB(error);
		if(error.code === 11000) error = handleDuplicateFields(error);
		if(error._message === 'Validation failed') error = handleValidationErrorDB(error);
    if(error.name === 'JsonWebTokenError') error = handleJWTError();
    if(error.name === 'TokenExpiredError') error = handleJWTExpiredError();
		sendErrorProd(error, resp);
	}
}