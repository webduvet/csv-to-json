for (var no = 1; no < 101; no++){

	var output = '';

	//((no % 3 > 0) && (no % 5 > 0)) && (output += no);
	//(no % 3 == 0) && (output += 'Fizz');
	//(no % 5 == 0) && (output += 'Buzz');

	//((no%3 == 0) && (output="Bizz", true)) != ((no%5 == 0) && (output +='Buzz',true)) || (output == '' && (output = no));
	

	(no%3==0 && (output +="Fizz")) == (no%5==0 && (output +="Buzz")) && (output == '' && (output = no));


	/*
	((no%15 == 0) && (output += 'FizzBuzz'))
		|| ((no % 3 == 0) && (output += 'Fizz'))
		|| ((no % 5 == 0) && (output += 'Buzz'))
		|| (output += no);
*/
	console.log( output);
}
