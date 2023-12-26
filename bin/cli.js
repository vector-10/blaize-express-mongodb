#!/usr/bin/env node
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const foldersToCreate = ['controllers', 'middleware', 'database', 'models', 'routes', 'utils'];
const packagesToInstall = [
  'express',
  'axios',
  'body-parser',
  'dotenv',
  'morgan',
  'mongoose',
  'jsonwebtoken',
  'cors',
  'bcrypt'
];

function createFolders(folders) {
  folders.forEach((folder) => {
    const folderPath = path.join(process.cwd(), folder);
    fs.mkdirSync(folderPath);
    console.log(`Folder created: ${folder}`);
  });
}

function installPackages(packages) {
  console.log('Installing packages...');
  execSync(`npm install ${packages.join(' ')} --save`, { stdio: 'inherit' });
  console.log('Packages installed successfully!');
}

// default setup for the app.js file to be created by default
function createAppJSFile() {
  const appJSContent = `
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// Middleware
app.use(bodyParser.json());

// Routes
app.get('/', (req, res) => {
  res.send('Hello, world!');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(\`Server running on port \${PORT}\`);
});
  `;

  const appJSPath = path.join(process.cwd(), 'app.js');
  fs.writeFileSync(appJSPath, appJSContent);

  console.log('app.js file created successfully!');
}


// Create folders, installs packages and creates an app.js file
createFolders(foldersToCreate);
installPackages(packagesToInstall);
createAppJSFile();

console.log('Express API Setup complete!');
