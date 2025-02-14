console.log("Start")

const inputFields = document.querySelectorAll('input');
inputFields.forEach((inputField, index) => {
	inputField.addEventListener("keydown", function (event) {
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
			return (true);
	})
	if (inputFields[0].value.length > 20) {
		alert("O nome deve ter 20 caracteres ou menos.");	
		return (true);
	}
	if (!inputFields[2].value.includes("@bravante.com.br")) {
		alert("O email não é @bravante.com.br");	
		return (true);
	}
	return (false);
}

async function trySubmit() {
	console.log("Tried submitting");
	if (formHasErrors())
		return (false);
	const signName =   inputFields[0].value;
  const signSector = inputFields[1].value;
  const signEmail =  inputFields[2].value;
  const signPhone =  inputFields[3].value;
	const data = {
		signName,
		signSector,
		signEmail,
		signPhone
	};
	try {
		const response = await fetch("/signaturegenerator", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(data)
		});
		if (!response.ok)
			throw new Error("Erro na solicitação");
		const imageBlob = await response.blob();
		const link = document.createElement('a');
		link.href = URL.createObjectURL(imageBlob);
		link.download = 'signature.png';
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	} catch(error) {
		console.error("Erro ao enviar ou processar solicitação");
	}
	console.log("Submit ended");
}

console.log("End")