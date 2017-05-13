# Illawara Business Chamber Client Relations Management System
The IBC CRM is a web based system for business chambers to manage their members
throughout the Illawarra region. The system allows for business chambers to push
notices, events and surveys to participating businesses so as to provide and
receive useful information. Chamber executives are also able to manage event
calendars, store files and use send emails to multiple recipients from within
the webpage.

## Installing Dependencies
The node_modules folder is not included in the repository as it will grow quite
large, as such you will need to install the dependencies after downloading.
To install the missing dependencies clone the repository, and run
```
npm install
```
## Running Tests
If you are using XAMPP as the test environment you will need to update PHPUnit
as the XAMPP version is outdated, follow [this](http://stackoverflow.com/questions/43188374/update-phpunit-xampp) guide to do so:

## Making Changes in React
If you would like to change the React.js code to do anything you will need to
install webpack to do so.
```
npm install webpack -g
```
After you have installed it you will need to rebuild the JavaScript code
index.js file by running.
```
webpack
```
All the components of the React.js app are in the directory /app. The final
transpiled application will be stored as index.js in the directory
/www/html/js. Changing the files in /app will not change what is rendered on
the server unless you first run webpack to update index.js.
