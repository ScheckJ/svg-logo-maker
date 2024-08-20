const fs = require('fs');
const inquirer = require('inquirer');
const { Circle, Triangle, Square } = require('./lib/shapes');

async function getUserInputs() {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'text',
            message: 'Enter text for the logo (up to 3 characters):',
            validate: input => input.length <= 3 || 'Text must be 3 characters or less'
        },
        {
            type: 'input',
            name: 'textColor',
            message: 'Enter text color (keyword or hexadecimal):'
        },
        {
            type: 'list',
            name: 'shape',
            message: 'Choose a shape for the logo:',
            choices: ['Circle', 'Triangle', 'Square']
        },
        {
            type: 'input',
            name: 'shapeColor',
            message: 'Enter shape color (keyword or hexadecimal):'
        }
    ]);
}

function createShape(shapeType, color) {
    let shape;
    switch (shapeType) {
        case 'Circle':
            shape = new Circle();
            break;
        case 'Triangle':
            shape = new Triangle();
            break;
        case 'Square':
            shape = new Square();
            break;
        default:
            throw new Error('Invalid shape type');
    }
    shape.setColor(color);
    return shape;
}

function generateSVG(shape, text, textColor) {
    return `
<svg width="300" height="200" xmlns="http://www.w3.org/2000/svg">
    ${shape.render()}
    <text x="150" y="125" font-size="60" text-anchor="middle" fill="${textColor}">${text}</text>
</svg>`;
}

async function generateLogo() {
    try {
        const answers = await getUserInputs();
        const shape = createShape(answers.shape, answers.shapeColor);
        const svgContent = generateSVG(shape, answers.text, answers.textColor);

        fs.writeFileSync('logo.svg', svgContent);
        console.log('Generated logo.svg');
    } catch (error) {
        console.error('Error generating logo:', error.message);
    }
}

generateLogo();
