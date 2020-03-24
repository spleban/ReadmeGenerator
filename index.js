'use strict';
const fs = require('fs');
const inquirer = require('inquirer');
const axios = require('axios');
const pdf = require('html-pdf');

const searchString = 'https://api.github.com/users/'
const colors = ['aqua', 'lightgreen', 'pink', 'orange', 'yellow'];

function generateHTML(color, data) {
    let name = (data.name) ? data.name : data.login;
    let myWork = (data.company) ? `at ${data.company}` : 'Consultant';
    let bio = (data.bio) ? data.bio : "";
    let location = (data.location != null && data.location) ? data.location : 'San Francisco';
    return `
    <!DOCTYPE html>
    <html lang="en">
   <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta http-equiv="X-UA-Compatible" content="ie=edge" />
      <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css"/>
      <link href="https://fonts.googleapis.com/css?family=BioRhyme|Cabin&display=swap" rel="stylesheet">
      <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css">
      <title>Document</title>
      <style>
        body {
           background-color: white;
           font-family: 'Times', sans-serif;
           justify-content: center;
         }

         .row {
           display: flex;
           flex-wrap: wrap;
           justify-content: center;
           margin-top: 20px;
           margin-bottom: 20px;
        }

         .col {
            flex: 1;
            text-align: center;
            justify-content: center;
         }
         
        .ft11{font-size:22px;color:#000000;}
	    .ft12{font-size:38px;color:#000000;}
	    .ft13{font-size:31px;color:#000000;}
	    .ft14{font-size:27px;color:#000000;}
	    .ft15{font-size:24px;color:#ffffff;}
	    .ft16{font-size:20px;color:#000000;}
      </style>
    <body>
        <div class="container mt-3">
            <div class = 'row center-block'>
              <div class = 'col'>
                <img src=${data.avatar_url} alt="my picture" height="100" width="100">
                <p class="ft12">Hi!</p>
                <p class="ft13" id = 'name'>My name is ${name}!</p>
                <p class="ft14">I am Currently ${myWork}</p>
                <span class="ft16"><a class = 'map' href="https://www.google.com/maps/place/${location}">I live in ${location}</a></span>
                <span class="ft15">&#160;</span>
                <span class="ft16"><a class = 'github' href="${data.html_url}">my GitHub</a></span>
              </div>
            </div>
            <div class = 'row'>
                <div class = 'col'>
                    <p class="ft10">${bio}</p>
                </div>
            </div>
            <div class = 'container'>
              <div class = 'row'>
                <div class="col" style="background-color:${color}; border: 10px">
                    <p class="ft10">Public Repositories</p>
                    <p class="ft11" id = 'repositories'>${data.public_repos}</p>
                </div>

                <div class="col" style="background-color:${color};">
                    <p class="ft10">Followers</p>
                    <p class="ft11" id = 'followers'>${data.followers}</p>
                </div>
              </div>

              <div class = 'row'>
                <div class="col" style="background-color:${color};">
                    <p class="ft10">GitHub&#160;Stars</p>
                    <p class="ft11" id = 'stars'>${data.public_gists}</p>
                </div>

                <div class="col" style="background-color:${color}">
                    <p class="ft10">Following</p>
                    <p class="ft11" id = 'following'>${data.following}</p>
                </div>
              </div>
            </div>
        </div>
    </body>
</html>
    `
}

async function writeToFile(fileName, html) {
    fs.writeFile(`${fileName}.html`, html, (err) => {
        if (err) throw err;
        const options = {
            format: "A3",
            orientation: "portrait",
            border: "10mm"
        };
        pdf.create(html, options).toFile(`${fileName}.pdf`, function(err, res) {
            if (err) return console.log(err);
            fs.unlink(`${fileName}.html`, (err) => {
                if (err) throw err;
            })
        });
    });
}

async function getData(name) {
    const url = `${searchString}${name}`;
    return await axios.get(url);
}

async function init() {
    const questions = [{
            type: 'list',
            message: 'What is your favorite color?',
            name: 'color',
            choices: colors
        },
        {
            type: 'input',
            message: 'What is your GitHub User Name?',
            name: 'userName',
        },
        {
            type: 'input',
            message: 'Enter the output PDF file name (no folder, no extension)?',
            name: 'fileName',
        }
    ];
    return await inquirer.prompt(questions)
}

let color;
let fileName;
let html;
init()
    .then(function(answers) {
        color = answers.color;
        fileName = (answers.fileName) ? answers.fileName : answers.userName;
        fileName = `./Output/${fileName}`;
        return getData(answers.userName);
    })
    .then(function(response) {
        html = generateHTML(color, response.data);
        writeToFile(fileName, html)
    })
    .then(function() {
        console.log(`Successfully wrote to ${fileName}.pdf`);
    })
    .catch(function(err) {
        console.log(err);
    });