let profileData = require("./modules/dataMod");
let flGenerator = require("./modules/flGeneratorMod");
let XLSX = require("xlsx");

async function dlGenerator (array, fn) {
    
    let result = [];

    for (let i = 0; i < array.length; i++) {
        let r = await fn (array[i]);

        result.push(r);
    }

    return result; // Will be resolved value of promise
}

// Calling the asyncronous function defined above
dlGenerator(profileData, flGenerator).then(function(results){
    
    // Verify JSON program results
    console.log(profileData);

    // Converst the JSON to sheets and store in variable newWS
    newWS = XLSX.utils.json_to_sheet(profileData);

    // Verify that the New Worksheet has been converted to sheets
    //console.log(newWS);

    // Create new workbook and store in variable newWB
    let newWB = XLSX.utils.book_new();

    // Append the new worksheet (newWS) to the new workbook(newWB) and name the tab "New Data"  
    XLSX.utils.book_append_sheet(newWB, newWS, "New Data");

    // Write the new workbook (newWB) to the 'data' folder 
    XLSX.writeFile(newWB, "data/newData.xlsx");
        
    // all done here
    // array of data here in result

}, function(reason) {

    // rejection happened
    console.log("Something is wrong with the program. Contact the Author.");
});
