/*  
 *  These functions let change the app state
 *
 */

// Load the corresponding figure, divided into three sections 
function loadFigure(num, randomizeParts=false){
	createNarrowVersionHeader("sliderFigure", num);
	figureType = num;
	currentFigure = possible_figures[num];

	poblateMainBackground("horizontalSections_view", 
		[['desc','17'],['head','24'],['body','24'],['feet','24'],['kind_rotulos','11']]
	);

	if (num < 2){
		figures = 'petroglyph';
	}
	else{
		figures = 'rockPainting';
		document.getElementById("main-background").style.backgroundImage = "url('img/art/fondo_pintura.png')";
	}

	if (quiz && randomizeParts){
		head_body_feet_forQuiz = [getRandomInt(0,3), getRandomInt(0,3), getRandomInt(0,3)];             
	} else {
		getDescription();       
	}
	buildFigure();
}

// Get description of the current image according to which combination the user has stablished
function getDescription(){
	resetDiv("kind_rotulos");
	kindNotClicked = true;

	let color = ((figures == 'petroglyph') ? 'white' : 'black');
	let object = images_combinations_descriptions[language][head_body_feet[0]][head_body_feet[1]][head_body_feet[2]];

	document.getElementById("desc").innerHTML = 
		`<p id="figureDesc" class="centered_FontRupes" style='color:` + color +`; visibility:hidden'>`+ object.description + `</p>`;

	let div = document.getElementById("kind_rotulos");
	div.innerHTML = `<p id="figureKind" class="centered_FontSub" style="z-index:1; text-decoration:underline; color:` + color +`"
						onmouseover="if (kindNotClicked){
										this.style.cursor='pointer';
										this.style.boxShadow='inset -2px -3px 10px -0.5px `+ color + 
														`, inset 2px 3px 10px -0.5px ` + color + `'
									}"
						onmouseout="this.style.boxShadow='none'"
						onclick="document.getElementById('figureDesc').style.visibility='visible';
								this.style.boxShadow='none'; kindNotClicked=false; this.style.cursor='auto'; this.style.textDecoration='none'">`
						+ object.kind + 
					`</p>`;

	if ((object.rotulos!= null) && (object.rotulos[figureType] != null)){
		div.innerHTML += 
			`<p id="figureRotulo" style="position:absolute; text-align:left; font-family:'Century Gothic'; color:` + color + `">` 
				+ object.rotulos[figureType] 
			+ `</p>
			</div>`;
	}
}

// Build the three sections of the figure
function buildFigure(){
	//let hbf = quiz ? head_body_feet_forQuiz : head_body_feet;
	let sections = ["head", "body", "feet"], str, imageSrc;

	for (let i=0; i<3; i++){
		str = loadArrow(i, "left") + `<div name="` + i + `"class="carousel whole">` 
		let possibleKinds = currentFigure[0].length; // Currently this is always 3: antro, geo and zoo

		for (let k=0; k < possibleKinds+2; k++){
			// To make the carousel circular, we make the trick of adding the last image at the beginning
			// of it, and the first image at the end of it, so we slide to them momentaneously, but then
			// we instantaneously (the user does not notice it) slide to the real ones.
			if (k == 0){
				imageSrc = currentFigure[i][possibleKinds-1];
			}
			else if (k == possibleKinds+1){
				imageSrc = currentFigure[i][0];
			}
			else {
				imageSrc = currentFigure[i][k-1];
			}
			str += `<img name="` + k + `" class="whole" src=` + imageSrc + ` alt="img" draggable="false" style="user-select:none">`  
		}
		str += `</div>` + loadArrow(i, "right");
		document.getElementById(sections[i]).innerHTML = str;
	}
	establishSliderListeners();
}

// Arrows that let the user slide the sections of the figures
function loadArrow(carouselNumber, direction){
	let str = 
		`<div class="arrowContainer centeredFlex"; style="height:100%">
			<img onclick="updateSlidingFigureArray({carouselNumber: ` + carouselNumber + `, direction: '` + direction + `'})"` +
				`src="img/art/arrow_` + direction + ((figures == 'petroglyph') ? `` : `_pint`) + `.png"
			>
		</div>`;
	return str;
}

// Source: https://www.codingnepalweb.com/draggable-image-slider-html-css-javascript/
function establishSliderListeners(){
	document.querySelectorAll(".carousel").forEach(carousel => {
		const carouselNumber = parseInt(carousel.getAttribute("name"));
		let isDragStart = false, isDragging = false, prevPageX, prevScrollLeft, positionDiff;

		const hbf = quiz ? head_body_feet_forQuiz : head_body_feet;

		// At the start, since the first element of the carousel is a fake image, we need to scroll it to the second one
		// This is the same as to put "carousel.querySelector('img[name="1"]').scrollIntoView()"
		carousel.scrollLeft = carousel.clientWidth;

		// This is what allows that if the user has only slided part of the image, it ends sliding the rest
		const approveSliding = () => {
			positionDiff = Math.abs(positionDiff); // Making positionDiff value to positive

			// We don't move the carousel to the next image if the drag was lower than a certain threshold.
			// Otherwise, we return the same image to its original position
			if (positionDiff <= carousel.clientWidth/4.5){
				slideFigure({carouselObject: carousel, carouselNumber, smoothBehavior: true, boolGetDescription: false});
			}
			else {
				updateSlidingFigureArray({
					carouselObject: carousel, 
					carouselNumber,
					direction: ((carousel.scrollLeft <= prevScrollLeft) ? "left" : "right"),
				});
			}
		}

		// Updatating variables values on mouse down or touch start event
		const dragStart = (e) => {
			if (draggingAvailable){
				isDragStart = true;
				prevPageX = e.pageX || e.touches[0].pageX;
				prevScrollLeft = carousel.scrollLeft;
			}
		}

		// Scrolling images/carousel to left according to mouse pointer
		const dragging = (e) => {	
			if(isDragStart){
				e.preventDefault();
				isDragging = true;
				carousel.classList.add("dragging");
				positionDiff = (e.pageX || e.touches[0].pageX) - prevPageX;
				carousel.scrollLeft = prevScrollLeft - positionDiff;
			}
		}

		const dragStop = () => {
			isDragStart = false;
			carousel.classList.remove("dragging");

			if(!isDragging) return;
			isDragging = false;
			approveSliding();
		}

		// This is necessary because since the sliding causes the scrollLeft property change
		// according to the size of the image, if the user changes the screen dimensions that
		// scrollLeft will be inappropiate. Part of the nearby images will be seen
		const adjustCarouselToResize = () => {
			const factor = (hbf[carouselNumber]+1); // The +1 is due to the first fake image
			carousel.scrollLeft = carousel.clientWidth * factor;

			// We need to wait a bit and do the same again for the case in which we change the stylesheet,
			// like from wide to medium. If we don't add this, the image may not be updated correctly
			setTimeout(function() {
				carousel.scrollLeft = carousel.clientWidth * factor;
			}, 50);
		}

		carousel.addEventListener("mousedown", dragStart);
		carousel.addEventListener("touchstart", dragStart);

		document.addEventListener("mousemove", dragging);
		carousel.addEventListener("touchmove", dragging);

		document.addEventListener("mouseup", dragStop);
		carousel.addEventListener("touchend", dragStop);

		window.addEventListener("resize", adjustCarouselToResize);
		// Store the function "adjustCarouselToResize" in the global scope to be able to remove that listener later
		// But remember that we need to store oen function for each carousel, so we append the number to the property name
		window["adjustCarouselToResize_"+carouselNumber] = adjustCarouselToResize;
	})
}

// Here we update the appropiate "head_body_feet" array, and then invoke the slideFigure function
// to slide the figure according to the new value of the array
function updateSlidingFigureArray({carouselObject=null, carouselNumber, direction} = {}){
	if (!draggingAvailable) return;

	const hbf = quiz ? head_body_feet_forQuiz : head_body_feet;
	const possibleKinds = currentFigure[0].length; // Currently this is always 3: antro, geo and zoo

	carouselObject = (null!=carouselObject) ? carouselObject : document.querySelector(`.carousel[name="`+ carouselNumber + `"]`);

	// In the extremes, we need to make an instantanious slide, as explained before,
	// so we store here to which element we will slide
	let elementToSlideInto = null;

	if (direction == "left"){ // Slide to the left
		hbf[carouselNumber] -= 1;
		if (hbf[carouselNumber] < 0){
			hbf[carouselNumber] = possibleKinds - 1;
			elementToSlideInto = carouselObject.querySelector('img[name="0"]');
		}
	} else { // Slide to the right
		hbf[carouselNumber] += 1;
		if (hbf[carouselNumber] > possibleKinds - 1){
			hbf[carouselNumber] = 0;
			elementToSlideInto = carouselObject.querySelector('img[name="'+ (possibleKinds+1) +'"]');
		}               
	}

	// Case in which we must slide to an extreme, and then make an imperceptible sliding
	if (null != elementToSlideInto){
		// Slide to the extreme image (but just for a moment)
		elementToSlideInto.scrollIntoView({behavior:"smooth"});
		draggingAvailable = false;
		// Instantaneous sliding to the real image that will be shown, nut we must wait
		// for the previous scroll to have ended
		setTimeout(function() {
			slideFigure({carouselObject, carouselNumber, smoothBehavior:false});
			draggingAvailable = true;
		}, 450);
		
	}
	// Case when the sliding is normal
	else{
		slideFigure({carouselObject, carouselNumber});
	}
}

// Here is where we really slide the figure of a specific carousel
function slideFigure({carouselObject=null, carouselNumber, smoothBehavior=true, boolGetDescription=true} = {}){
	const hbf = quiz ? head_body_feet_forQuiz : head_body_feet;
	carouselObject = (null!=carouselObject) ? carouselObject : document.querySelector(`.carousel[name="`+ carouselNumber + `"]`);

	//The smooth behavior does not work in Google Chrome and neither in Microsoft Edge to this date: 10/12/2022
	carouselObject.querySelector('img[name="'+ (hbf[carouselNumber]+1) +'"]').scrollIntoView({
		behavior: smoothBehavior ? "smooth" : "auto"
	});

	// In the quiz we never get the description, it does not matter what the variable "boolGetDescription" says
	if (boolGetDescription && !quiz){
		getDescription();
	}
}
