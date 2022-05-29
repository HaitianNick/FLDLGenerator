const {Builder, By, Key} = require("selenium-webdriver");
const profileData = require("./dataMod");

let flGenerator = async function (profiles) {    

    // Destructure profileData to load variables    
    let {"firstName": fn, "lastName": ln, Year: yr, Month: mo, Day: day } = profiles; 

    // Launch browser
    let webdriver = await new Builder().forBrowser("chrome").build();

    // navigate to our application
    await webdriver.get("http://www.highprogrammer.com/cgi-bin/uniqueid/dl_fl");

    // fill out form
    await webdriver.findElement(By.name("first")).sendKeys(`${fn}`);
    await webdriver.findElement(By.name("last")).sendKeys(`${ln}`);
    await webdriver.findElement(By.xpath("/html/body/div[2]/div/form/table/tbody/tr[4]/td[2]/label[2]")).click();
    await webdriver.findElement(By.name("y")).sendKeys(`${yr}`);
    await webdriver.findElement(By.name("m")).sendKeys(`${mo}`);
    await webdriver.findElement(By.name("d")).sendKeys(`${day}`);
    await webdriver.findElement(By.xpath("/html/body/div[2]/div/form/input[3]")).click()

    //assert
    let fLMsg = await webdriver.findElement(By.className("resultsareaoutputinner")).getText().then(function (fLMsg) {
        return fLMsg
    });

    // Split flMsg into string-array using 'space' as delimeter and results into a flMsgSplit
    let flMsgSplit = fLMsg.split(" ");

    // Extract the DL number from the index[3] of the dlMsgSplit, then split by 'dash', then concatenate without extra characters
    let fLNumber = flMsgSplit[3].split('-').splice(0, 4).join('');

    // add the zero to the end of the result
    fLNumber = fLNumber + 0;

    // Console.log the fLNumber
    //console.log(fLNumber);

    // Push the FL Number to the object in profile. data
    profiles.Lisence = fLNumber;

    // Close the browser
    await webdriver.quit();

};

module.exports = flGenerator;
