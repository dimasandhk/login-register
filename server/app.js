const express = require("express");
const app = express();
require("./db");

const port = process.env.PORT || 3000;

app.use(express.json());
app.use("/api/user", require("./routes/user"));

if (process.env.NODE_ENV === "production") {
	app.use(express.static(`${__dirname}/public`));
	app.get(/.*/, (req, res) => res.sendFile(`${__dirname}/public/index.html`));
}

app.listen(port, () => {
	console.log(`Up on port ${port}`);
});
