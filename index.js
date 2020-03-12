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
    return `<!DOCTYPE html>
<html lang="en">
   <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta http-equiv="X-UA-Compatible" content="ie=edge" />
      <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css"/>
      <link href="https://fonts.googleapis.com/css?family=BioRhyme|Cabin&display=swap" rel="stylesheet">
      <title>Document</title>
      <style>
          @page {
            margin: 0;
          }
         *,
         *::after,
         *::before {
         box-sizing: border-box;
         }
         html, body {
         padding: 0;
         margin: 0;
         }
         html, body, .wrapper {
         height: 100%;
         }
         .wrapper {
         background-color: ${style.wrapperBackground};
         padding-top: 100px;
         }
         body {
         background-color: white;
         -webkit-print-color-adjust: exact !important;
         font-family: 'Cabin', sans-serif;
         }
         main {
         background-color: #E9EDEE;
         height: auto;
         padding-top: 30px;
         }
         h1, h2, h3, h4, h5, h6 {
         font-family: 'BioRhyme', serif;
         margin: 0;
         }
         h1 {
         font-size: 3em;
         }
         h2 {
         font-size: 2.5em;
         }
         h3 {
         font-size: 2em;
         }
         h4 {
         font-size: 1.5em;
         }
         h5 {
         font-size: 1.3em;
         }
         h6 {
         font-size: 1.2em;
         }
         .photo-header {
         position: relative;
         margin: 0 auto;
         margin-bottom: -50px;
         display: flex;
         justify-content: center;
         flex-wrap: wrap;
         background-color: ${style.headerBackground};
         color: ${style.headerColor};
         padding: 10px;
         width: 95%;
         border-radius: 6px;
         }
         .photo-header img {
         width: 250px;
         height: 250px;
         border-radius: 50%;
         object-fit: cover;
         margin-top: -75px;
         border: 6px solid ${style.photoBorderColor};
         box-shadow: rgba(0, 0, 0, 0.3) 4px 1px 20px 4px;
         }
         .photo-header h1, .photo-header h2 {
         width: 100%;
         text-align: center;
         }
         .photo-header h1 {
         margin-top: 10px;
         }
         .links-nav {
         width: 100%;
         text-align: center;
         padding: 20px 0;
         font-size: 1.1em;
         }
         .nav-link {
         display: inline-block;
         margin: 5px 10px;
         }
         .workExp-date {
         font-style: italic;
         font-size: .7em;
         text-align: right;
         margin-top: 10px;
         }
         .container {
         padding: 50px;
         padding-left: 100px;
         padding-right: 100px;
         }

         .row {
           display: flex;
           flex-wrap: wrap;
           justify-content: space-between;
           margin-top: 20px;
           margin-bottom: 20px;
         }

         .card {
           padding: 20px;
           border-radius: 6px;
           background-color: ${style.headerBackground};
           color: ${style.headerColor};
           margin: 20px;
         }
         
         .col {
         flex: 1;
         text-align: center;
         }

         a, a:hover {
         text-decoration: none;
         color: inherit;
         font-weight: bold;
         }

         @media print { 
          body { 
            zoom: .75; 
          } 
         }
      </style>
      
      <body>
        <div class="jumbotron jumbotron-fluid">
            <div class="container">
                <h1 class="display-4">Hi! My name is MY-NAME</h1>
                <p class="lead">I am from MY LOCATION.</p>
                <h3>Example heading <span class="badge badge-secondary">Contact Me</span></h3>
                <ul class="list-group">
                    <li class="list-group-item">My GitHub username is MY GITHUB</li>
                    <li class="list-group-item">LinkedIn: MY LINKEDIN</li>
                </ul>
            </div>
        </div>
      </body>
</html>`
}






const searchString = 'https://api.github.com/users/'

const colorChoices = Object.getOwnPropertyNames(colors);

async function writeToFile(fileName, html) {
    console.log(html);
    const options = { format: 'Letter' };
    pdf.create(html, options).toFile(fileName, function(err, res) {
        if (err) return console.log(err);
        console.log(res); // { filename: '/app/businesscard.pdf' }
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
    .then(function(answers) {
        style = `colors.${answers.color}`;
        fileName = `./Output/${answers.fileName}.pdf`;
        return getData(answers.userName);
    })
    .then(function(response) {
        html = generateHTML(style, response);
        writeToFile(fileName, html)
    })
    .then(function(response) {
        html = generateHTML(style);
        writeToFile(fileName, html)
    })
    .then(function() {
        console.log("Successfully wrote to index.html");
    })
    .catch(function(err) {
        console.log(err);
    });