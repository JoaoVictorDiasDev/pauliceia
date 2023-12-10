const { Given, When, Then, AfterAll } = require('@cucumber/cucumber');
const { Builder, By, Capabilities, Key } = require('selenium-webdriver');
const { expect } = require('chai');
const { BASE_URL } = require ('../test-constants')

require("chromedriver");

// driver setup
const capabilities = Capabilities.chrome();
capabilities.set('chromeoptions', { "w3c": false });
const driver = new Builder().withCapabilities(capabilities).build();

Given("I am on the home page", {timout: 5 * 5000}, async function () {
    await driver.get(`${BASE_URL}/portal/explore`);
});

When("I search for address {string}", async function (incorrect_address) {
    const input = await driver.findElement(By.className('el-input__inner'));
    input.sendKeys(incorrect_address, Key.RETURN);
});

Then('I {string} receive a Incorrect-Format Warning', async function (expected_should) {
    await driver.sleep(200);
    const input = await driver.findElements(By.className('el-message-box__status el-icon-warning'));
    if(expected_should === 'should') expect(input.length).to.equal(1);
    else if(expected_should === 'should not') expect(input.length).to.equal(0);
});


AfterAll(async function(){
    await driver.quit();
});
