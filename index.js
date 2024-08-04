const inquirer = require ('inquirer')
const {Circle, Square, Triangle} = require ('./lib/shapes')
const fs = rewquire ('fs')
const Svg = require('./lib/svg')

const questions = [
    {
        type: "input",
        name: "text",
        message: "Enter three characters",
    },
    
    {
        type: "input",
        name: "textColor",
        message: "Enter text color:",
    },
    
    {
        type: "list",
        name: "shape",
        message: "Select a shape",
        chocies: ["square", "triangle", "circle"]
    },
    
    {
        type: "input",
        name: "shapeColor",
        message: "Select shape color",
    },
    
];

