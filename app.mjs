import { config } from "dotenv";
import express from "express";
import expressEjsLayouts from "express-ejs-layouts";
import mainRoute from "./server/routes/index.mjs";
import dashboardRoute from "./server/routes/dashboard.mjs";
import connectDB from "./server/config/db.mjs";
import session from "express-session";
import passport from "passport";
import MongoStore from "connect-mongo";
import authRoute from "./server/routes/auth.mjs";
import methodeOverride from "method-override";



// Load environment variables from .env file
config();


const app = express();


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodeOverride("_method"));

//Connect to database


const port = 5000 || process.env.PORT;

app.use(session({
    secret: "hello world",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGODB_URI }),
    cookie: { maxAge: 1000 * 60 * 60 * 24 }
}));
app.use(passport.initialize());
app.use(passport.session());


connectDB();

app.use(express.static("public"));
app.use(expressEjsLayouts);
app.set("layout", "./layouts/main");
app.set("view engine", "ejs");

app.use("/", mainRoute);
app.use("/", dashboardRoute);
app.use("/", authRoute);
app.get("*", (req, res) => {
    res.status(404)
    res.render("notFound", { title: "Page not found", description: "Page not found" });

});
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});