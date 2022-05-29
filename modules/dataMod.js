// Import dependencies
const jsontoxml = require("jsontoxml");
const XLSX = require("xlsx");

// Read the file into memory (into the variable) 
// for the readFile method, pass in the JavaScript Dates options in an object as the second argument to set the cellDates Option. 
let wb = XLSX.readFile("data/dummyData.xlsx", {cellDates:true});

// Verify the Sheet names of your workbook
// console.log(wb.SheetNames);

// store the desired sheet into a variable
let ws = wb.Sheets["Profiles"];

// read this worksheet data into an array (object array) saved into profileData for export
let profileData = XLSX.utils.sheet_to_json (ws);

//console.log(profileData);
module.exports = profileData;
