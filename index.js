const express = require("express");
const router = require("./routers/router.js");
const app = express();
app.use(express.json());
app.use(router);
const port = process.env.PORT || 3000;
app.listen(port);
