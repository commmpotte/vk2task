# Quick VK test task 

This project is a React application developed according to the given task requirements.

## Task Overview

The main task was to develop a React application consisting of several parts:

Cat Fact Block: This block includes a button and a text field. Upon clicking the button, the application makes a request to https://catfact.ninja/fact to fetch a random cat fact. The retrieved fact is then displayed in the text field, with the cursor positioned after the first word.

Age Form: This form contains a text field and a submit button. Users enter their name in the text field. After 3 seconds of name input or upon form submission, the application sends a request to https://api.agify.io/ with the entered name as a path parameter. The response contains the estimated age of the person based on their name, which is displayed below the text field.

### Features
Prevent duplicate requests by avoiding sending a request with the same name.
Allow sending the next request before the current one is processed by interrupting unnecessary requests, especially in cases of slow internet connection.

## Installation
To install the necessary dependencies, run:
### `npm install`

## Usage
To start the development server, run:
### `npm start`
