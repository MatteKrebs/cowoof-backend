const User = require("../models/User.model");
const Pet = require("../models/Pet.model");
const bcrypt = require("bcrypt");

const salt = bcrypt.genSaltSync(10);

const connectDb = require("../db");
const db = connectDb();

db.on("error", console.error.bind(console, "connection error:"));

const usersCities = ["Barcelona", "New York"];
const usersCountries = ["Spain", "USA"];
const usersPostalCodes = ["08001", "10001"];
const DEFAULT_PASSWORD = "Password123";
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
db.once("open", async function () {
    console.log("Connected to database");
    console.log("Dropping database...");
    User.collection.drop();
    Pet.collection.drop();

    console.log("Creating users...");

    for (let i = 0; i < MAX_USERS; i++) {
        const pet = new Pet({
            petName: `Pet ${i + 1}`,
            petAge: "2",
            petAbout: "I am good boy",
            petImage: "https://i.pravatar.cc/300",
        });
        const petCreated = await pet.save()
        console.log(`Created pet ${petCreated._id}`)

        const { locationCity, locationCountry, locationPostalCode } = getUserLocation();
        const user = new User({
            userEmail: `user${i + 1}@example.com`,
            password: bcrypt.hashSync(DEFAULT_PASSWORD, salt),
            userName: `User ${i + 1}`,
            locationCountry: locationCountry,
            locationCity: locationCity,
            locationPostalCode: locationPostalCode,
            availabilityNeeded: ["Morning", "Afternoon"],
            availabilityToHelp: ["Evening", "Night"],
            userImage: "https://i.pravatar.cc/300",
            userDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            usersPetId: [petCreated._id],
        });

        const createdUser = await user.save()
        console.log(`Created user ${createdUser.userEmail}`)   
    }

    // Test user
    const testPet = new Pet({
        petName: "Sam",
        petAge: "2",
        petAbout: "I am good boy",
        petImage: "https://i.pravatar.cc/300",
    });
    const testCreatedPet = await testPet.save()
    console.log(`Created pet ${testPet.petName}`);

    const user = new User({
        userEmail: "mattekrebs@gmail.com",
        password: bcrypt.hashSync(DEFAULT_PASSWORD, salt),
        userName: "Matte",
        locationCountry: "Spain",
        locationCity: "Barcelona",
        locationPostalCode: "08001",
        availabilityNeeded: ["Morning", "Afternoon"],
        availabilityToHelp: ["Evening"],
        userImage: "https://i.pravatar.cc/300",
        userDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        usersPetId: [testCreatedPet._id],
    });

    const testUserCreated = await user.save()
    console.log(`Created user ${testUserCreated.userEmail}`)

    exitMe();
});