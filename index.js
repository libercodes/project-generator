#!/usr/bin/env node
const inquirer = require('inquirer')
const fs = require('fs')
const exec = require('await-exec')

const choices = fs.readdirSync(`${__dirname}/templates`)

const questions = [
    {
      name: 'project-choice',
      type: 'list',
      message: 'Which project template would you like to generate?',
      choices: choices
    },
    {
      name: 'project-name',
      type: 'input',
      message: 'Project name:',
      validate: function (input) {
        if (/^([A-Za-z\-\_\d])+$/.test(input)) return true;
        else return 'Project name may only include letters, numbers, underscores and hashes.';
      }
  },
  {
    name: 'install-dependencies',
    type: 'input',
    message: 'Automatically install dependencies? (y/n):',
    validate: function (input) {
      if (input.toLowerCase() === 'y' || input.toLowerCase() === 'n') return true;
      else return 'Invalid answer. Please try again (y/n)';
    }
  }
];

const currentDirectory = process.cwd()

const createDirectoryContents = (templatePath, newProjectPath) => {
  const filesToCreate = fs.readdirSync(templatePath);

  filesToCreate.forEach(file => {
      const origFilePath = `${templatePath}/${file}`;
      
  const stats = fs.statSync(origFilePath);

  if (stats.isFile()) {
    const contents = fs.readFileSync(origFilePath, 'utf8');
    
    if (file === '.npmignore') file = '.gitignore';

    const writePath = `${currentDirectory}/${newProjectPath}/${file}`;
    fs.writeFileSync(writePath, contents, 'utf8');

  } else if (stats.isDirectory()) {
    if (file === 'node_modules') {
      console.log('Excluded node modules from template')
    } else {
      fs.mkdirSync(`${currentDirectory}/${newProjectPath}/${file}`);
      createDirectoryContents(`${templatePath}/${file}`, `${newProjectPath}/${file}`);
    }
  } 
});
}


inquirer.prompt(questions).then(async answers => {
  const projectChoice = answers['project-choice']
  const projectName = answers['project-name']
  const shouldInstallDependencies = answers['install-dependencies']
  const templatePath = `${__dirname}/templates/${projectChoice}`

  console.log('Creating project...')
  fs.mkdirSync(`${currentDirectory}/${projectName}`)
  
  createDirectoryContents(templatePath, projectName)

  if (shouldInstallDependencies.toLowerCase() === 'y') {
    console.log('Installing dependencies...')
    await exec(`cd ${projectName}/ && npm install`)
  }
  console.log(`Project created. Happy hacking!`)
})

