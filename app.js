import express from "express";
import auth from "./routes/auth.js";

const app = express();
const port = 5000;

app.use(express.json());
app.use('/auth', auth);

app.listen(port, () => {
    console.log(`Server has started at port ${port}...`);
})