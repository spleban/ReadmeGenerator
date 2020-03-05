'use strict';
const searchString1 = 'https://api.github.com/search/users?q=user:';
const searchString2 = 'https://api.github.com/users/'
const fs = require('fs');
const inquirer = require('inquirer');
const colors = ['white', 'silver', 'gray', 'black', 'maroon',
    'yellow', 'olive', 'lime', 'green', 'aqua', 'teal', 'blue', 'navy', 'fuchia', 'purple'
];
let profile;


async function getGitHubProfileAsync(name) {
    let response = await fetch(`${searchstring1}${name}`);
    let profile = await response.json();
    return profile;
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
        validate: function(input) {
            var done = this.async();
            setTimeout(function() {
                const profile = getGitHubProfileAsync(input);
                if (profile.message !== undefined) {
                    // Pass the return value in the done callback
                    done('You need to provide a valid GitHub User Name.');
                    return;
                }
                done(null, true);
            }, 3000);
        }
    }
];






function writeToFile(fileName, data) {}

function handleResponse(response) {
    console.log(`${response.name}  ${response.color}`);
}

function init() {
    inquirer.prompt(questions).then(answers => {
        console.log(JSON.stringify(answers, null, '  '));
    })
}

async function getUserAsync(name) {
    let response = await fetch(`https://api.github.com/users/${name}`);
    let data = await response.json()
    return data;
}

const x = getUserAsync('spleban');
console.log(x);
// init();

// if (response.name === undefined || response.name === '') {
//     console.log('You must enter your GitHub name!')
// } else if (response.color === undefined || response.name === '') {
//     console.log('You must enter a color!')
// } else {
//     writeToFile();
// }