#!/usr/bin/env node
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Array containing folder to be created on setup automatically
const foldersToCreate = ['controllers', 'middleware', 'database', 'models', 'routes', 'utils'];

// call the functions before their declarations(hoisting) to enable readability and collaboration.
createFolders(foldersToCreate);
createPackageJSON();
installPackages();
createAppJSFile();
createSampleController();
createSampleRouter();
createConnectToDBFile();
createGitIgnoreFile();
createDotEnvFile();

console.log('Express API Setup complete!');

// function that handles the creation of folders during the setup
function createFolders(folders) {
  folders.forEach((folder) => {
    const folderPath = path.join(process.cwd(), folder);
    fs.mkdirSync(folderPath);
    console.log(`Folder created: ${folder}`);
  });
}

// function that automatically creates the package.json function
function createPackageJSON() {
  // Run npm init -y to generate a default package.json
  execSync('npm init -y', { stdio: 'inherit' });
  console.log('package.json file created successfully!');
}

// function to handle npm packages installation
function installPackages() {
  const packagesToInstall = [
    'express',
    'axios',
    'body-parser',
    'dotenv',
    'morgan',
    'mongoose',
    'jsonwebtoken',
    'nodemon',
    'cors',
    'bcrypt'
  ];

  console.log('Installing packages...');
  execSync(`npm install ${packagesToInstall.join(' ')} --save`, { stdio: 'inherit' });
  console.log('Packages installed successfully!');
}

// function incharge of creating of creating files, it takes two arguments. The file path and the content of the file
function createFile(filePath, content) {
  const fullPath = path.join(process.cwd(), filePath);
  fs.writeFileSync(fullPath, content);

  if (fs.existsSync(fullPath)) {
    console.log(`${filePath} file created successfully`);
  } else {
    console.error(`Failed to create ${filePath} file `);
  }
}

//function to create app.js file
function createAppJSFile() {
  const appJSContent = `
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const sampleDataRoute = require('./routes/sampleRoute');

// Middleware
app.use(bodyParser.json());

// Routes
app.get('/', (req, res) => {
  res.send('Hello, world!');
});

app.get('/api/v1', sampleDataRoute);


// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(\`Server running on port \${PORT}\`);
});
  `;

  createFile('app.js', appJSContent);
}

//function to create sample controller file
function createSampleController() {
  const sampleControllerContent = 
  ` const getSampleData = (req, res) => {
    res.json({ message: " Hello from sample controller " })

    module.exports = { getSampleData }
  }`

  createFile('controllers/sampleController.js', sampleControllerContent);
}

//function to create sample router file
function createSampleRouter() {
  const sampleRouterContent = 
  `const express = require('express');
   const router = express.Router();
   const { sampleController } = require('../controllers/sampleController')
   
   //Define routes
   router.route('/sample').get(sampleController.getSampleData).post().put().delete()
   
   module.exports = router;`;

   createFile('routes/sampleRoute.js', sampleRouterContent);
}

//function to create connect.js file
function createConnectToDBFile() {
  const connectToDBContent = 
  ` const mongoose = require("mongoose");

    const connectDB = () => {
      mongoose.connect()
        .then((result) => {
          console.log(
            \`MongoDB database connected with HOST: \${result.connection.host}\`
          );
        });
    };
  
  module.exports = connectDB;`

  createFile('database/connect.js', connectToDBContent)
}

//function to create gitignore file
function createGitIgnoreFile() {
  const gitIgnoreContent = `node_modules/ *.env`;

  createFile('.gitignore', gitIgnoreContent);
}

//function to create dotenv file
function createDotEnvFile() {
  const dotEnvContent = `PORT=5000`;

  createFile('.env', dotEnvContent);
}
