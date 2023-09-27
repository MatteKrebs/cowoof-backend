const User = require("../models/User.model");

const connectDb = require("../db");
const db = connectDb();

db.on("error", console.error.bind(console, "connection error:"));

const usersCities = ["Barcelona", "New York"];
const usersCountries = ["Spain", "USA"];
const usersPostalCodes = ["08001", "10001"];
const MAX_USERS = 25;

const getRandomInt = () => {
    return Math.round(Math.random());
}

const getUserLocation = () => {
    const randomInt = getRandomInt();
    return {
        "locationCity": usersCities[randomInt],
        "locationCountry": usersCountries[randomInt],
        "locationPostalCode": usersPostalCodes[randomInt]
    }
}

function exitMe() {
    db.close();
    process.exit();
}

/** 
 * Loop and generate 25 users from random two possible locations
 */
db.once("open", function () {
    console.log("Connected to database");

    for (let i = 0; i < MAX_USERS; i++) {
        const { locationCity, locationCountry, locationPostalCode } = getUserLocation();

        const user = new User({
            userEmail: `user${i + 1}@example.com`,
            password: "password123",
            userName: `User ${i + 1}`,
            locationCountry: locationCountry,
            locationCity: locationCity,
            locationPostalCode: locationPostalCode,
            availabilityNeeded: ["Morning", "Afternoon"],
            availabilityToHelp: ["Evening", "Night"],
            userImage: "https://i.pravatar.cc/300",
            userDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        });

        user.save().then((user) => console.log(`Created user ${user.userEmail}`)).catch((err) => console.log(err));
    }

    exitMe();
});