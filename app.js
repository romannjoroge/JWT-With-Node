import express from "express";
import auth from "./routes/auth.js";
import posts from "./routes/posts.js"

const app = express();
const port = 5000;

app.use(express.json());
app.use('/auth', auth);
app.use('/posts', posts);

app.get('/test', (req, res) => {
    res.send("Server can be reached")
})

app.listen(port, () => {
    console.log(`Server has started at port ${port}...`);
})