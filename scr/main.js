var myImage = document.querySelector('img');

myImage.onclick = function(){	// change image by clicking
	var mySrc = myImage.getAttribute('src');	// retrieve image source
	if (mySrc === 'img/reol1.jpg'){	// check which image is there
		myImage.setAttribute('src','img/reol2.jpg');	// replace with other image
	} else {
		myImage.setAttribute('src','img/reol1.jpg');	// replace with other image
	}
}

var myButton = document.querySelector('button'); // create a button
var myHeading = document.querySelector('h1'); // set which part of the page to edit

function setUserName(){	//set a new username
	var myName = prompt('Please enter your name: ');
	localStorage.setItem('name',myName);	// save username to website
	myHeading.textContent = 'Mozilla is cool, ' + myName;	// display message in header
}

if (!localStorage.getItem('name')){	// check for existing username
	setUserName();	// if none, call function to set username
} else {
	var storedName = localStorage.getItem('name');	// load stored username
	myHeading.textContent = 'Welcome back, ' + storedName;	// display message in header
}

myButton.onclick = function(){	// clicking button prompts new username
	setUserName();
}