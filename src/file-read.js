/**
  @author: Daniel Bell
  @version: 1.00

  This is the Application file.
  Creates a App Object that contains readFile and readXML methods

  Created using the fs, and xml2js libraries
**/

var fs = require('fs');
var xml2js = require('xml2js');
var parser = new xml2js.Parser();

//calculates the mean
function calculateMean(sum, count){
  //rounding the average down to a whole number
  return (sum / count);
}

//calculates the Geometric Mean
function calculateGeoMean(sum, count){
  return Math.pow(sum, 1/count);
}

function calculateHarmoicMean(arr){
  var sum = 0;
  var result;
  for(var i = 0; i < arr.length; i++){
    sum += (1 / arr[i]);
  }

  result = arr.length/sum;
  return result;
}


//calculates the Standard Deviation
function calculateStdD(mean, arr){
  //an array of the differences between each column value and the mean squared
  var sqarr = [];
  //variable to keep track of the sum
  var sum = 0;
  //the value that will be returned
  var final_val;
  //function to push the difference between each column value and the mean squared
  for(var i = 0; i < arr.length; i++){
    sqarr.push(Math.pow(arr[i] - mean, 2));
  }
  //function to get the sum
  for(var j = 0; j < sqarr.length; j++){
    sum += sqarr[j];
  }
  //assigning final_val with the square root of the mean
  final_val = Math.sqrt(calculateMean(sum, sqarr.length-1));
  return final_val;
}

function App(){

  this.readFile = function(fileName, findthis, file_type){

    fs.readFile(fileName, {encoding: 'utf-8'}, function(err,data){

      if(err){
        console.log(err.message);
      }
      else{
        //each line within the data
        var line = data.split("\n");
        //all the header values of the data set
        var header = line[0].split(file_type);
        var obj = {};

        //an array of objects
        var objArr = [];
        //the array to be passed into the stddeviation function
        var valArr = [];
        var sum = 0;
        var sum2 = 1;
        var count = 0;
        //flag to see if the object has the property specified
        var calcboolean = false;

        for(var i=1; i < line.length-1; i++){
          obj = {};
          var data = line[i].split(file_type);
            for(var j=0; j< header.length; j++){
              obj[header[j]] = data[j];
            }
            objArr.push(obj);
        }

        for(var i = 0; i < objArr.length; i++){
          if(objArr[i].hasOwnProperty(findthis)){
            calcboolean = true;
            sum += parseFloat(objArr[i][findthis]);
            sum2 *= parseFloat(objArr[i][findthis]);
            valArr.push(parseFloat(objArr[i][findthis]));
            count++;
          }
          else{
            calcboolean = false;
          }
        }

        if(calcboolean){
          console.log("The mean of the " + findthis + " is: " + calculateMean(sum, count));
          console.log("The geometric mean of the " + findthis + " is: " + calculateGeoMean(sum2, count));
          console.log("The harmonic mean of the " + findthis + " is: " + calculateHarmoicMean(valArr));
          console.log("The standard deviation of the " + findthis + " is: " + calculateStdD(calculateMean(sum, count), valArr));
        }
        else{
          console.log("Can't perform calculation based on sample given");
        }
      }
    })
  }
  this.readXML = function(fileName, findthis){

    fs.readFile(fileName, {encoding: 'utf-8'}, function(err,data){

      if(err){
        console.log(err.message);
      }
      else{
        //each row
        var rowArr = [];
        //the data obj within each row
        var rowDataArr = [];
        //the data within each row
        var dataArr = [];
        //splitting my data array into chunks based on the length of the header
        var chunkArr = [];
        //an array of all the objects created based on the file
        var objArr = [];
        //the array to be passed into the stddeviation function
        var valArr = [];
        //calculating the summation
        var sum =0;

        //calculating the summation for geometric mean
        var sum2 = 1;
        //count for calculating the mean
        var count =0;
        //flag to see if the object has the property specified
        var calcboolean = false;
        var obj = {};


        //using a XML parser to faciliate the data processing
        parser.parseString(data, function(err,result){
          if(err){
            console.log(err.message);
          }

          else{
            // console.log(result);
            //number of rows
            var len = result.Workbook.Worksheet[0].Table[0].Row.length;

            for(var i = 0; i < len; i++){
              rowArr.push(result.Workbook.Worksheet[0].Table[0].Row[i]);
            }

            for(var w = 0; w < len; w++){
              for(var j = 0; j < len; j++){
                rowDataArr.push(rowArr[w].Cell[j].Data);
              }
            }

            for(var k = 0; k < rowDataArr.length; k++){
              dataArr.push(rowDataArr[k][0]._);
            }

            for(var one = 0; one < dataArr.length; one+=len){
              chunkArr.push(dataArr.slice(one, one+len));
            }


            var headerArr = chunkArr[0];

            for(var a = 1; a < chunkArr.length; a++){
              obj = {};
              var data = chunkArr[a];
              for(var b = 0; b < headerArr.length; b++ ){
                obj[headerArr[b]] = data[b];
              }

              objArr.push(obj);
            }


            for(var c = 0; c < objArr.length; c++){
              if(objArr[c].hasOwnProperty(findthis)){
                calcboolean = true;
                sum += parseFloat(objArr[c][findthis]);
                sum2 *= parseFloat(objArr[c][findthis]);
                valArr.push(parseFloat(objArr[c][findthis]));
                count++;
              }
              else{
                calcboolean = false;
              }
            }

            if(calcboolean){
              console.log("The mean of the " + findthis + " is: " + calculateMean(sum, count));
              console.log("The geometric mean of the " + findthis + " is: " + calculateGeoMean(sum2, count));
              console.log("The harmonic mean of the " + findthis + " is: " + calculateHarmoicMean(valArr));
              console.log("The standard deviation of the " + findthis + " is: " + calculateStdD(calculateMean(sum, count), valArr));
            }
            else{
              console.log("Can't perform calculation based on sample given");
            }
          }
        })
      }
    })
  }
}

module.exports = {
  App: App
}
