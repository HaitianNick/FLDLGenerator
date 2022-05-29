let profileData = require("./modules/dataMod");
let flGenerator = require("./modules/flGeneratorMod");

async function dlGenerator (array, fn) {
    
    let results = [];

    for (let i = 0; i < array.length; i++) {
        let r = await fn (array[i]);
        results.push(r);
    }

    return results; //will be resolved value of promise

}
// Calling the asyncronous function defined above
dlGenerator(profileData, flGenerator).then(function(result){

    // all done here
    // array of data here in result
}, function(reason) {

    // rejection happened
    console.log("Something is wrong with the program. Contact the Author");
});
