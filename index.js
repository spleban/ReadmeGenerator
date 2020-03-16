'use strict';
const fs = require('fs');
const inquirer = require('inquirer');
const axios = require('axios');
const util = require("util");
var pdf = require('html-pdf');
const colors = {
    green: {
        wrapperBackground: "#E6E1C3",
        headerBackground: "#C1C72C",
        headerColor: "black",
        photoBorderColor: "#black"
    },
    blue: {
        wrapperBackground: "#5F64D3",
        headerBackground: "#26175A",
        headerColor: "white",
        photoBorderColor: "#73448C"
    },
    pink: {
        wrapperBackground: "#879CDF",
        headerBackground: "#FF8374",
        headerColor: "white",
        photoBorderColor: "#FEE24C"
    },
    red: {
        wrapperBackground: "#DE9967",
        headerBackground: "#870603",
        headerColor: "white",
        photoBorderColor: "white"
    }
}


function generateHTML(style) {
    console.log(style);
    return `
    !DOCTYPE html>
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
           background-color: red;
         }

         .col {
            flex: 1;
            text-align: center;
         }
         
        .ft11{font-size:18px;color:#000000;}
	    .ft12{font-size:38px;color:#000000;}
	    .ft13{font-size:31px;color:#000000;}
	    .ft14{font-size:15px;color:#000000;}
	    .ft15{font-size:12px;color:#ffffff;}
	    .ft16{font-size:12px;color:#000000;}
      </style>
    <body>
        <div class="container mt-3">
            <div class = 'row'>
                <div class = 'col'>
                <p class="ft12">Hi!</p>
                <p class="ft13" id = 'name'>My&#160;name&#160;is&#160;Christian&#160;Eckenrode!</p>
                <p class="ft14">Currently&#160;@&#160;Trilogy&#160;Education&#160;Services</p>
                <span class="ft15"><a class = 'map' href="https://www.google.com/maps/place/Richmond,%20Virginia"></a></span>
                <span class="ft16"><a class = 'map' href="https://www.google.com/maps/place/Richmond,%20Virginia">&#160;Richmond,&#160;Virginia</a></span>
                <span class="ft15">&#160;</span>
                <span class="ft16"><a class = 'github' href="https://github.com/ceckenrode"></a></span>
                <span class="ft16"><a class = 'github' href="https://github.com/ceckenrode">&#160;GitHub</a></span>
                <span class="ft15">&#160;&#160;<a class = 'twitter' href="https://eck.im/twitter"></a></span>
                <span class="ft16"><a class = 'twitter' href="https://eck.im/twitter">&#160;Blog</a></span>
                </div>
            </div>
            <div class = 'row'>
                <div class = 'col'>
                    <p class="ft10">I&#160;build&#160;things&#160;and&#160;teach&#160;people&#160;to&#160;code.</p>
                </div>
            </div>

            <div class = 'row'>
                <div class="col-md-6" style="background-color:yellow; border: 10px">
                    <p class="ft10">Public&#160;Repositories</p>
                    <p class="ft11" id = 'repositorIes'>135</p>
                </div>

                <div class="col-md-6" style="background-color:green;">
                    <p class="ft10">Followers</p>
                    <p class="ft11" id = 'followers'>92</p>
                </div>
                
            </div>

            <div class = 'row'>
                <div class="col-md-6" style="background-color:aqua;">
                    <p class="ft10">GitHub&#160;Stars</p>
                    <p class="ft11" id = 'stars'>65</p>
                </div>

                <div class="col-md-6" style="background-color:lightblue">
                    <p class="ft10">Following</p>
                    <p class="ft11" id = 'following'>65</p>
                </div>
            </div>
        </div>
    </body>
</html>
    `
}






const searchString = 'https://api.github.com/users/'

const colorChoices = Object.getOwnPropertyNames(colors);

async function writeToFile(fileName, html) {
    console.log(html);
    fs.writeFile(`${fileName}.html`, html, (err) => {
        if (err) throw err;
        const options = {
            format: "A3",
            orientation: "portrait",
            border: "10mm"
        };
        pdf.create(html, options).toFile(`${fileName}.pdf`, function (err, res) {
            if (err) return console.log(err);
            console.log(res);

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
                choices: colorChoices
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

let style;
    let fileName;
    let html;
    init()
        .then(function (answers) {
            style = `colors.${answers.color}`;
            fileName = `./Output/${answers.fileName}`;
            return getData(answers.userName);
        })
        .then(function (response) {
            html = generateHTML(style, response);
            writeToFile(fileName, html)
        })
        .then(function () {
            console.log("Successfully wrote to index.html");
        })
        .catch(function (err) {
            console.log(err);
        });