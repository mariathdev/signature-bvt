console.log("Start")

const inputFields = document.querySelectorAll('input');
inputFields.forEach((inputField, index) => {
	inputField.addEvenstListener("keydown", function (event) {
		if (event.key == "Enter") {
			event.preventDefault();
			const nextTexinputField = inputFields[index + 1];
			if (nextTexinputField != null)
				nextTexinputField.focus();
			else
				trySubmit();
		}
	})
});

const formHasErrors = () => {
	inputFields.forEach((inputField) => {
		if (inputField.value == "")
			alert("Não podem haver campos vazios.");
			return (false);
	})
	if (inputFields[0].value.length > 20) {
		alert("O nome deve ter 20 caracteres ou menos.");	
		return (false);
	}
	if (!inputFields[2].value.includes("@bravante.com.br")) {
		alert("O email não é @bravante.com.br");	
		return (false);
	}
	return (true);
}

const trySubmit = () => {
	console.log("Tried submitting");
	if (formHasErrors())
		return (false);
	
	console.log(inputFields[0].value);
	console.log(inputFields[1].value);
	console.log(inputFields[2].value);
	console.log(inputFields[3].value);

}

console.log("End")