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

// Create folders and install packages
createFolders(foldersToCreate);
installPackages(packagesToInstall);

console.log('Express API Setup complete!');
