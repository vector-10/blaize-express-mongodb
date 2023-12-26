#!/usr/bin/env node

const commander = require('commander');
const packageJson = require('../package.json');
const { exec } = require('child_process');
const fs = require('fs');

commander
  .version(packageJson.version)
  .arguments('<app-name>')
  .action((appName) => {
    console.log(`Creating Express app: ${appName}`);

    exec(`express --no-view ${appName}`, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error: ${error.message}`);
        return;
      }

      console.log(`stdout: ${stdout}`);
      console.error(`stderr: ${stderr}`);

      // Change directory to the newly created app
      process.chdir(appName);

    
      // Create custom folders
      const foldersToCreate = ['controllers', 'middleware', 'database', 'models', 'routes', 'utils'];

      foldersToCreate.forEach((folder) => {
        fs.mkdirSync(folder);
        console.log(`Folder created: ${folder}`);
      });

      // Install additional packages
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

      exec(`npm install ${packagesToInstall.join(' ')}`, (installError, installStdout, installStderr) => {
        if (installError) {
          console.error(`Error installing packages: ${installError.message}`);
          return;
        }

        console.log(`Packages installed: ${installStdout}`);
        console.error(`stderr: ${installStderr}`);

        console.log('Express API Setup complete!');
      });
    });
  });

commander.parse(process.argv);
