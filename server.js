console.log("START -> server.js Initialization");

// 0. Initialization
const express = require('express');
const path = require('path');
const app = express();
const PORT = 3300

// 1. Uses
app.use(express.static(path.join(__dirname, "public")));
app.use("/assets", express.static(path.join(__dirname, "assets")));
app.use(express.static("public"));

// 2. Route to serve main index.html
app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// 3. API

/*

const signatureGenerator = () => {
	const pythonProcess = spawn("python3", ["signatureGenerator.py", inputFields[0], inputFields[1], inputFields[2], inputFields[3]]);
	let imageData = Buffer.alloc(0);
	pythonProcess.stdout.on("data", (data) => {
		imageData = Buffer.concat([imageData, data]);
	});
	pythonProcess.on("close", () => {
		callback(null, imageData);
	});
	pythonProcess.stderr.on("data", (data) => {
		console.error("Erro no Python:", data.toString());
		callback(new Error("Erro ao gerar a imagem"));
	});
};

signatureGenerator("Mariacci", "Dev", "Mariacci@bravante.com.br", "14125116114")
*/
// 4. Start Server
app.listen(PORT, '0.0.0.0', () => {
	console.log(`Main Server running at port: ${PORT}`);
});

console.log("END   -> server.js Initialization");