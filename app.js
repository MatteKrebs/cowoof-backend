require("dotenv").config();
const { isAuthenticated } = require("./middleware/jwt.middleware")
const connectDb = require("./db");

connectDb();

const express = require("express");

const app = express();

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);

// Authenticate middleware
app.use(isAuthenticated.unless({ path: ['/auth/signup', '/auth/login'] }));
app.use(function (err, req, res, next) {
    if (err.name === "UnauthorizedError") {
        res.status(401).json({"message": "Server error"});
    } else {
        next(err);
    }
});

// 👇 Start handling routes here
const indexRoutes = require("./routes/index.routes");
app.use("/", indexRoutes);

const authRoutes = require("./routes/auth.routes");
app.use("/auth", authRoutes);

const groupRoutes = require("./routes/group.routes");
app.use("/groups", groupRoutes);

const petRoutes = require("./routes/pet.routes");
app.use("/pets", petRoutes);

const ownerRoutes = require("./routes/owners.routes");
app.use("/owners", ownerRoutes);

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;
