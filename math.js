const myCalculate = (method, x, y) => {

  if(method.toLowerCase() == 'add'){
	return { operation: '+', result: x + y };  
  }
  else if(method.toLowerCase() == 'subtract'){
	return { operation: '-', result: x - y };  
  }
  else if(method.toLowerCase() == 'multiply'){
	return { operation: 'x', result: x * y }; 
  }
  else if(method.toLowerCase() == 'divide'){
	return { operation: '/', result: x / y };
  }
  else{
	return 'This is not a valid option'; 
  }
};

const myOptions = ['add', 'subtract', 'multiply', 'divide'];

const myCalRoute = (request, response) => {
  request.query.x = parseInt(request.query.x); // Parse string value of x into an integer
  request.query.y = parseInt(request.query.y); // Parse string value of y into an integer

  const { method, x, y } = request.query; // Destructure out method, x, y from request.query

  // if y and x is Not a Number - tell them it has to be a number
  if (isNaN(y) || isNaN(x)) {
    return response.send('Both X and Y must be a number');
  }

  // If method is not in our valid options - tell them it has to be and display them
  if (!myOptions.includes(method.toLowerCase())) {
    return response.send(
      `Method must include one of the following: ${myOptions.join(', ')}`
    );
  }

  // Get Operation and Result from simple calculate function
  const { operation, result } = myCalculate(method, x, y);

  response.send(`${x} ${operation} ${y} = ${result}`); // Print out value of calculation
};

module.exports = myCalRoute; // Export out function
