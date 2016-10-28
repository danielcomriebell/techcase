# MasterCard Technical Case

Challenge: Data Importation and Analysis

Made using:
* NodeJS
* Fs
* xml2js

## Developing

* `npm install` to resolve dependencies

## Running

* Create an app object in index.js
* The app object has two methods
  * readXML
  * readFile
* readXML(filePath, column) accepts two parameters
  * `filePath` The path of the file you would like to read.
  * `column` The name of the column within the dataset that you'd like to perform the calculations on.
* readFile(filePath, column, separator) accepts three parameters
  * `filePath` The path of the file you would like to read.
  * `column` The name of the column within the dataset that you'd like to perform the calculations on.
  * `separator` The character the data file is separated by.

* `node src/index.js` Run this command in console to receive the mean and standard deviation
