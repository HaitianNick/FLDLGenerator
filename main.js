let profileData = require("./modules/dataMod");
let flGenerator = require("./modules/flGeneratorMod");
let XLSX = require("xlsx");
let wb = require("./modules/dataMod");
let fs = require("fs");

async function dlGenerator (array, fn) {
    
    let result = [];

    for (let i = 0; i < array.length; i++) {
        let r = await fn (array[i]);
        
        result.push(r);
    }

    return result; //will be resolved value of promise
}

// Calling the asyncronous function defined above
dlGenerator(profileData, flGenerator).then(function(results){
    
    console.log(profileData);
    newWS = XLSX.utils.json_to_sheet(profileData);
    console.log(newWS);
    let newWB = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(newWB, newWS, "New Data");
    XLSX.writeFile(newWB, "data/newData.xlsx");
    //XLSX.write(fs.writeFileSync(data/"NewNumbers.xlsx", newWB));
    
    // all done here
    // array of data here in result
}, function(reason) {

    // rejection happened
    console.log("Something is wrong with the program. Contact the Author.");
});
