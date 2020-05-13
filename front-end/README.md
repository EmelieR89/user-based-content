## User based content - HerbaScript
Av: Elin Alm, Emelie Rosenlöw och Isabel Blomström

Länk till GitHub-repo: https://github.com/EmelieR89/user-based-content

## Appen HerbaScript

Vi har i vår kurs Dynamisk Webbutveckling fått i uppdrag att skapa en användarbaserad plattform, där användaren har möjlighet att registrera sig, logga in samt skapa innehåll. Appen behandlar både front-end och back-end. Vi har valt att skapa en plattform för veganska recept. Namnet HerbaScript kommer från det latinska ordet för gräs - "herba", och ordet för skrift. Användare som är registrerade ska kunna logga in och se samt redigera eller ta bort sina egna recept. Användare som inte är inloggade ska kunna se alla recept som finns i databasen. 

## Hur vi byggt projektet

Vi har i detta projekt valt att arbeta med React för att lättare kunna sätta upp front-endsidan. Vi har även använt oss av Express och Mongoose. För att sätta upp projektet från start skriver vi ``npm init``, detta ger oss package.json-filen. Därefter installerar vi våra dependencies genom att skriva ``npm i express mongoose``. För att köra projektet startar vi servern med ``node server.js`` eller använder oss utav nodemon. I det senare fallet blir det ``nodemon server.js``.

## Hur du kör projektet 

För att köra projektet, kör först npm install i din terminal: 
``npm install``
Servern ligger på [http://localhost:4000]. För att köra igång servern, kör 
``node server.js``
Front enden ligger på [http://localhost:3000] För att köra igång localhost, kör 
``npm start``

------------------------

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
