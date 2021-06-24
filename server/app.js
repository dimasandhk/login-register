const express = require("express");
const app = express();
require("./db");

const port = process.env.PORT || 3000;

app.use(express.json());
app.use("/api/user", require("./routes/user"));

app.listen(port, () => {
	console.log(`Up on port ${port}`);
});
