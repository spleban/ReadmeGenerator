'use strict';
const fs = require('fs');
const inquirer = require('inquirer');
const axios = require('axios');


const searchString1 = 'https://api.github.com/search/users?q=user:';
const searchString2 = 'https://api.github.com/users/'

const colors = ['white', 'silver', 'gray', 'black', 'maroon',
    'yellow', 'olive', 'lime', 'green', 'aqua', 'teal', 'blue', 'navy', 'fuchia', 'purple'
];





async function getGitHubProfileAsync(name) {
    const url = `${searchString2}${name}`;
    const response = await axios.get(url);
    console.log(response.data);
    return response.data;
}


const questions = [{
        type: 'list',
        message: 'What is your favorite color?',
        name: 'color',
        choices: colors
    },
    {
        type: 'input',
        message: 'What is your GitHub User Name?',
        name: 'username',
    }
];

function writeToFile(fileName, data) {}






async function getGitHubProfile(name) {
    const url = `${searchString2}${name}`;
    axios.get(url)
        .then(function(response) {
            console.log(response.data);
        })
        .catch(function(error) {
            console.log(error);
            //    console.log(`Error: code-${error.error.status} text-${error.error.statusText}`);
        })

}


async function getData(name) {
    const profile = await getGitHubProfile(name);
}

function init() {
    inquirer.prompt(questions).then(answers => {
        //    console.log(JSON.stringify(answers, null, '  '));
        getData(answers.username);
    })
}



init();