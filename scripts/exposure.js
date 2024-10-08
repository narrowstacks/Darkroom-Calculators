document.addEventListener("DOMContentLoaded", function () {
	// Initialize the necessary functions and event listeners
	initialize();

	// Display the results based on initial values in the HTML
	const initialTime =
		parseFloat(document.getElementById("initial-time").value) || 0;
	const stopChange =
		parseFloat(document.getElementById("stop-change").value) || 0;
	calculateAndDisplayResults(initialTime, stopChange);
});

function initialize() {
	// Add event listener for form submission
	const exposureForm = document.getElementById("exposureForm");
	if (exposureForm) {
		exposureForm.addEventListener("submit", function (event) {
			event.preventDefault();
			calculateExposure();
		});
	} else {
		console.error(
			'Form element not found. Ensure that the form with id "exposureForm" exists in the HTML.'
		);
	}
}

function addRemoveStop(stopValue) {
    const stopChangeInput = document.getElementById("stop-change");
    let currentValue = parseFloat(stopChangeInput.value) || 0;
    
    currentValue += stopValue;
    
    // Round up if the value ends with .999
    if (Math.abs(currentValue % 1).toFixed(3) === '0.999') {
        currentValue = Math.round(currentValue);
    }
	// Round down if the value ends with .499
	let decimal = Math.abs(currentValue % 1).toFixed(3);
	if (decimal === '0.499') {
		currentValue = Math.floor(currentValue) + 0.5;
	} 
	else if (decimal === '0.667') {
		currentValue = Math.floor(currentValue) + 0.666;
	}
	else if (decimal === '0.334') {
		currentValue = Math.floor(currentValue) + 0.333;
	}
	else if (decimal === '0.501') {
		currentValue = Math.floor(currentValue) + 0.5;
    }


	// Round down if the value ends with .01
	if (Math.abs(currentValue % 1).toFixed(3) === '0.001') {
        currentValue = Math.floor(currentValue);
    }
    
    stopChangeInput.value = currentValue.toFixed(3)
    
    // Trigger the calculation to update results
    calculateExposure();
}

function calculateExposure() {
	// Get the input values
	const initialTime = parseFloat(document.getElementById("initial-time").value);
	const stopChange = parseFloat(document.getElementById("stop-change").value);

	// Validate inputs
	if (isNaN(initialTime) || isNaN(stopChange)) {
		alert("Please enter valid numerical values for all fields.");
		return;
	}

	calculateAndDisplayResults(initialTime, stopChange);
}

function calculateAndDisplayResults(initialTime, stopChange) {
	// Calculate the factor to multiply the initial time by
	const factor = Math.pow(2, stopChange);

	// Calculate the new exposure time
	const newTime = initialTime * factor;

	// Round the new exposure time to the nearest tenth of a second
	const roundedTime = Math.round(newTime * 10) / 10;

	// Calculate the difference between the new time and the initial time
	const timeDifference = roundedTime - initialTime;
	const roundedDifference = Math.round(timeDifference * 10) / 10;

	// Determine whether to add or remove time
	const differenceText = roundedDifference > 0 ? "add" : "remove";
	const absoluteDifference = Math.abs(roundedDifference);

	// Display the results
	displayResults(roundedTime, absoluteDifference, differenceText);
}

function displayResults(newTime, absoluteDifference, differenceText = "add") {
	// Format the output to hide decimals if the number is an integer
	const formatNumber = (number) => {
		return Number.isInteger(number) ? number.toString() : number.toFixed(1);
	};

	// Display the new exposure time
	const newTimeElement = document.getElementById("new-time");
	const timeDifferenceElement = document.getElementById("time-difference");

	if (newTimeElement && timeDifferenceElement) {
		newTimeElement.textContent = formatNumber(newTime);
		timeDifferenceElement.textContent = `${differenceText} ${formatNumber(
			absoluteDifference
		)}`;

		// Show the new exposure time and time difference containers
		document.getElementById("new-time-container").classList.remove("hidden");
		document
			.getElementById("time-difference-container")
			.classList.remove("hidden");
	} else {
		console.error(
			'Result display elements not found. Ensure that the elements with ids "new-time" and "time-difference" exist in the HTML.'
		);
	}
}
