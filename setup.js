// require all modules needed for the build
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');


// Now to specify the particular packages and folders that I want created
const folders = ["controlers", "middleware", "database.js", "models", "routes", "utils"];
const packagesToInstall = ["express", "body-parser", "dotenv","morgan", "mongodb", "mongoose", "nodemailer", "passport.js", "jsonwebtoken"];

// to create folders
folders.forEach((folder) => {
    const folderPath = path.join(process.cwd(), folder);
    fs.mkdirSync(folderPath);
});

//To install packages
packagesToInstall.forEach((pkg) => {
    console.log(`Installing${pkg}...`);
    execSync(`npm install ${pkg}`);
})

console.log('REST API Project setup Complete');