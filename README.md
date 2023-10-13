# Project Name: GeniHunt

## Table of Contents

- [Introduction](#introduction)
- [Requirements](#requirements)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Project](#running-the-project)
- [Contributing](#contributing)
- [License](#license)

## Introduction

Genihunt is a joint product of K2x and Vimento (a Denmark-based analytics enterprise). The product envisions being able to generate potential companies/vendor leads both for other businesses and individuals looking for job opportunities. This product is backed by modern technologies like Cloud and Machine Learning.

The product will be able to find relevant sales leads by:

● A user providing one or more companies as input, possibly existing companies

● A user providing a list of desired keywords

## Requirements

- Operating System: Windows, macOS, or Linux
- Required Software: Node.js.
- Required Libraries or Frameworks: React, Express, etc.

## Installation

### Windows

1. Download and install Node.js from the official website: https://nodejs.org/en/download/.
2. Open the Command Prompt or PowerShell and navigate to the directory where you want to install the project.
3. Clone the project repository by running the following command: git clone <repository URL>.
4. Navigate to the project directory by running the following command: cd <project directory>

### macOS

1. Download and install Node.js from the official website: https://nodejs.org/en/download/.
2. Open Terminal and navigate to the directory where you want to install the project.
3. Clone the project repository by running the following command: git clone <repository URL>.
4. Navigate to the project directory by running the following command: cd <project directory>

### Linux

1. Install Node.js by running the following command in the terminal: sudo apt-get install nodejs
2. Install the Node.js package manager npm by running the following command: sudo apt-get install npm.
3. Open the terminal and navigate to the directory where you want to install the project.
4. Clone the project repository by running the following command: git clone <repository URL>
5. Navigate to the project directory by running the following command: cd <project directory>

## Configuration

1. Create a .env file
   In the root directory of your project, create a file named .env. This file will contain your environment variables in the format KEY=VALUE, with one variable per line:

API_KEY=myapikey123
SECRET_KEY=mysecretkey456

2. Add .env file to .gitignore
   Add the .env file to your .gitignore file to prevent it from being committed to the repository. This is important to protect sensitive information from being exposed in the repository. Open or create a .gitignore file in your project root and add the following line:

.env

3. Install dotenv package
   Install the dotenv package in your Node.js project. This package allows you to easily load the environment variables from the .env file into your application. Run the following command to install it:

npm install dotenv

4. Load dotenv in your Node.js application (example)
   In your Node.js application, load the dotenv package and call the config() method at the beginning of your main file (usually app.js or index.js). This will load the environment variables from the .env file:

require('dotenv').config();

5. Access environment variables
   Now you can access the environment variables from the .env file using process.env in your application:

const apiKey = process.env.API_KEY;
const secretKey = process.env.SECRET_KEY;

console.log(`API Key: ${apiKey}`);
console.log(`Secret Key: ${secretKey}`);
By following these steps, you can create a .env file in your project repository and use it to manage environment variables in your Node.js application. Remember to replace the placeholder variable names and values in the .env file with your actual environment variables.

## Running the Project

1. npm install or npm i
2. npm start

```

Or

```

node server | bunyan #install bunyan globally for good formatting of logs

```

Or

```

npm run server (hot reloading)

3. npm run stop

## Contributing

Every Database Table should have a corresponding Model file in `models` folder

- We use `Sequelize` as our ORM
- Use `npx sequelize` to cli for migrations
- The `controllers` and `routes` folder should exactly mimic each other. All routers in `routes` should have their corresponding `controllers` file/folder
- All logging should be done using `req.log`. It's a bunyan logger. For model level logging, `req.log` should be passed to underlying layers

## Demo

http://vimentobackend-env.eba-dmebp3sv.eu-west-1.elasticbeanstalk.com/

## License

This project is licensed under K2X Tech.
