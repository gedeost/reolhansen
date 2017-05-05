var rack = {	// create object for rack
	shelf: 0,	// how many shelves
	height: 0,	// total height
	type: 0,	// type: 1=single, 2=double
	parts: [],	// parts: 180cm, 270cm
	length: 0	// length of rack
}

function updateRack(type,value){									// update the rack object
	if (type==='parts'){											// check if we are adding or subtracting parts
		if (value<0){												// subtracting part
			for(var i = rack.parts.length - 1; i >= 0; i--) {		// loop through array
				if(rack.parts[i] === -1*value) {					// find the part we want to partste
					rack.parts.splice(i, 1);						// remove part
					break;											// stop looping (only delete 1 part per click)
				};
			};
		} else {													// adding part
			rack.parts.push(value);									// extend parts array with new value
		};
	} else {
		rack[type] = value;											// set property 'type' to value 'value'
		$('.'+type+'-button').css('background-color','lightgray');	// set all similar buttons to light gray
		$('#'+type+value).css('background-color','darkgray');		// set the active button to dark gray
	}
	rack.length = 0;												// initialize rack length
	for(var i in rack.parts) { rack.length += rack.parts[i]; };		// loop through parts and sum length
	$('#length').text(rack.length+' cm');							// print total length
	plotRack();														// draw the rack
}

function plotRack(){
	document.getElementsByClassName('overlays').remove();		// clear figure
	var image = document.getElementById('myImage');				// get reference image
	l = image.offsetLeft;										// image offset from left
	for (var i1=0; i1<rack.parts.length; i1++){					// loop through rack
		var numParts = rack.parts[i1]/90;						// how many pallets (180=2, 270=3)
		tR = image.offsetTop+60;								// reference image height for struts
		tB = image.offsetTop+rack.height/5+50;					// reference image height for beams
		for (var i2=0; i2<rack.shelf; i2++){					// loop through shelves
			makeImage(['strut'+rack.height],l,tR);				// insert strut
			makeImage(['beam'+rack.parts[i1]],l+5,tB);			// insert beam
			tR += rack.height/5;								// increment strut vertical coordinate
			tB += rack.height/5;								// increment beam vertical coordinate
		}
		l += 5;
		for (var i3=0; i3<numParts; i3++){						// loop through pallets
			t = image.offsetTop+(rack.shelf+1)*rack.height/5;	// reference image height
			for (var i4=0; i4<rack.shelf; i4++){				// loop through shelves
				t -= rack.height/5;								// increment the top offset by some value
				makeImage('pallet',l,t);						// insert pallet
			}
			l += 95;											// increment the left offset by some value
		}
		tR = image.offsetTop+60;								// reference image height for struts
		for (var i2=0; i2<rack.shelf; i2++){					// loop through shelves
			makeImage(['strut'+rack.height],l,tR);				// insert strut
			tR += rack.height/5;								// increment strut vertical coordinate
		}
	}
}

function makeImage(name,l,t){
	var newImage = document.createElement("img");		// create new image
	newImage.setAttribute('src', ['img/'+name+'.png']);	// set source
	newImage.setAttribute('class', 'overlays');			// set class
	newImage.style.left = l + "px";						// image left coordinate
	newImage.style.top = t + "px";						// image top coordinate
	document.body.appendChild(newImage);				// include image
}

function resetRack(){	// resets all values
	rack.shelf  = 0;
	rack.height = 0;
	rack.type   = 0;
	rack.parts  = [];
	rack.length = 0;
	$('.shelf-button').css('background-color','lightgray');		// reset shelf buttons color
	$('.height-button').css('background-color','lightgray');	// reset height buttons color
	$('.type-button').css('background-color','lightgray');		// reset type buttons color
	$('#length').text(rack.length+' cm');						// print length (0)
	document.getElementsByClassName('overlays').remove();		// clear figure
}

Element.prototype.remove = function() {
    this.parentElement.removeChild(this);
}

NodeList.prototype.remove = HTMLCollection.prototype.remove = function() {
    for(var i = this.length - 1; i >= 0; i--) {
        if(this[i] && this[i].parentElement) {
            this[i].parentElement.removeChild(this[i]);
        }
    }
}

/* Hours:
	26/04/2017: 8
*/

