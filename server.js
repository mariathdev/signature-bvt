console.log("START -> server.js Initialization");

// 0. Initialization
const express = require('express');
const	multer = require("multer");
const	{ spawn } = require("child_process");
const path = require('path');
const app = express();
const upload = multer();
const PORT = 3300

// 1. Uses
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use("/assets", express.static(path.join(__dirname, "assets")));
app.use(express.static("public"));

// 2. Route to serve main index.html
app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// 3. API

app.post("/signaturegenerator", upload.none(), (req, res) => {
	const	{signName, signSector, signEmail, signPhone} = req.body;
	const pythonProcess = spawn("python3", ["signatureGenerator.py", signName, signSector, signEmail, signPhone]);
	pythonProcess.on("error", (err) => {
		console.error("Erro ao executar o script Python:", err);
		res.status(500).send("Erro no servidor");
	});
	let imageBuffer = Buffer.alloc(0);
	pythonProcess.stdout.on('data', (data) => {
		imageBuffer = Buffer.concat([imageBuffer, data]);
	});
	pythonProcess.on('close', (code) => {
		if (code === 0) {
			res.setHeader('Content-Disposition', 'attachment; filename="signature.png"');
			res.setHeader('Content-Type', 'image/png');
			res.send(imageBuffer);
		} else {
			res.status(500).send('Erro ao gerar a imagem');
		}
	})
});

// 4. Start Server
app.listen(PORT, '0.0.0.0', () => {
	console.log(`Main Server running at port: ${PORT}`);
});

console.log("END   -> server.js Initialization");