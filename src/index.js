/**
  @author: Daniel Bell
  @version: 1.00

  This is the driver of my technical case study for MasterCard.
  Creating an object based on file-read.js
  The object has 2 methods:
  - readFile(filePath, column, separator) accepts three parameters
    filePath: The path of the file you would like to read.
    column: The name of the column within the dataset that you'd like to perform the calculations on.
    separator: The character the data file is separated by.
  - readXML(filePath, column) accepts two parameters
    filePath: The path of the file you would like to read.
    column: The name of the column within the dataset that you'd like to perform the calculations on.
**/



var App = require('./file-read.js').App;
var app = new App();

app.readXML(__dirname + '/data/' + 'comma4.xml', "pressure");
app.readFile(__dirname + '/data/' + 'comma2.txt', "pressure", ',');
