
const express = require("express");
const cors = require('cors')
const app = express();
const PORT = 3000
const rootRouter = require("./routes/index");


app.use(cors())
app.use(express.json());

app.use("/api/v1", rootRouter);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});