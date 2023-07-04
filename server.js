const express = require("express")
const path = require("path");
let cors = require("cors");

const { errorHandler } = require("./middleware/errorMiddleware");

const connectDB = require("./config/db");
const corsOptions = require("./config/corsOptions")

const port = process.env.PORT || 3000;

const dotenv = require("dotenv")
dotenv.config();

const userRoutes = require("./routes/userRoutes");
const urlRoutes = require("./routes/urlRoutes");
const authRoutes = require("./routes/authRoutes");


connectDB();
const app = express();
app.use(cors());
app.use(express.static(path.resolve(__dirname, "../frontend/build")));

app.get("/", function (request, response) {
    
    response.send('<h1>hello world</h1>')
});

// app.use(cors({ credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/users", userRoutes);
app.use("/api/urls", urlRoutes);
app.use("/api/auth", authRoutes);

app.use(errorHandler);

app.listen(port, () => console.log(`Server on port ${port}`));
