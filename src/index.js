/**
  @author: Daniel Bell
  @version: 1.00

  This is the driver of my technical case study for MasterCard.
  Creating an object based on file-read.js
  The object has 2 methods:
  - readFile: Accepts 3 params:
    First param: The File Path
    Second param: The column within your data set that you would like to receive results based on.
    Third param: The separator for your file. Ex: CSV(,) PSV('|'), TSV('\t')
  - readXML: Accepts 2 params:
    First param: The File Path of the .xml file
    Second param: The column within your data set that you would like to receive results based on.
**/



var App = require('./file-read.js').App;
var app = new App();

// app.readXML(__dirname + '/' + 'comma4.xml', "pressure");
app.readFile(__dirname + '/' + 'comma2.txt', "pressure", ',');
