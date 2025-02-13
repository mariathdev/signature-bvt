console.log("Start")

const textAreas = document.querySelectorAll('input');
textAreas.forEach((tArea, index) => {
	tArea.addEventListener("keydown", function (event) {
		if (event.key == "Enter") {
			event.preventDefault();
			const nextTextArea = textAreas[index + 1];
			if (nextTextArea != null)
				nextTextArea.focus();
			else
				trySubmit();
		}
	})
});

const trySubmit = () => {
	console.log("Tried submitting");
}

console.log("End")