const { Given, When, Then, AfterAll } = require('@cucumber/cucumber');
const { Builder, By, Capabilities, Key } = require('selenium-webdriver');
const { expect } = require('chai');
const { BASE_URL } = require ('../test-constants');

require("chromedriver");

const capabilities = Capabilities.chrome();
capabilities.set('chromeOptions', { "w3c": false });
const driver = new Builder().withCapabilities(capabilities).build();

Given("I am on the home page with the layers tab expanded", async function () {
    await driver.get(`${BASE_URL}/portal/explore`);
    let layersButton = await driver.findElement(By.className('btn_sidebar')) ;
    layersButton.click()
});

When('I click the Add Layer button', async function () {
    await driver.sleep(1000);
    let addLayerButton = await driver.findElement(By.className('md-button md-icon-button md-dense el-tooltip md-theme-default')) ;
    addLayerButton.click();
    await driver.sleep(1000);
});

When('I activate the first {int} layers on the listing', {timeout: 10 * 5000}, async function (amountOfLayers) {
    await driver.sleep(1000);
    for(i = 0; i < amountOfLayers; i++) {
        let activateLayerButton = await driver.findElement(By.className('el-button el-button--success is-round')) ;
        activateLayerButton.click();
        await driver.sleep(1000);
    }
});

When('I close the Add Layer Pop-up', async function () {
    let closeLayersPopupButton = await driver.findElement(By.className('close')) ;
    closeLayersPopupButton.click();
    await driver.sleep(200);
});

Then('I should have {int} active layers', async function (amountOfLayers) {
    let addedLayers = await driver.findElements(By.className('el-icon-sort handle')) ;
    expect(addedLayers.length).to.equal(amountOfLayers);
});

When('I change the zoom to 100000000 km', { timeout: 10 * 5000 }, async function() {
    let value = await driver.findElement(By.className('ol-scale-line-inner')).getText();
    let decreaseZoomButton = await driver.findElement(By.className('ol-zoom-out'));
    while(value !== "100000000 km") {
        decreaseZoomButton.click();
        value = await driver.findElement(By.className('ol-scale-line-inner')).getText();
    }

    await driver.sleep(200);
})

When('I click the gear icon of the added layer', async function () {
    let layerSettingsIcon = await driver.findElement(By.className('btn-view'));
    layerSettingsIcon.click();
});

When('I click the zoom button of the added layer', async function () {
    let layerButtons = await driver.findElements(By.className('md-icon md-icon-font el-tooltip md-theme-default'));

    for(i = 0; i < layerButtons.length; i++) {
        let layerButtonText = await layerButtons[i].getText();
        if (layerButtonText === 'center_focus_strong') {
            await layerButtons[i].click();
        }
    }
});

Then('I should see that the zoom is different than 100000000 km', async function () {
    let value = await driver.findElement(By.className('ol-scale-line-inner')).getText();
    expect(value).to.not.equal("100000000 km");
});


When('I click the Layer Informations Button', async function () {
    let layerButtons = await driver.findElements(By.className('md-icon md-icon-font el-tooltip md-theme-default'));

    for(i = 0; i < layerButtons.length; i++) {
        let layerButtonText = await layerButtons[i].getText();
        if (layerButtonText === 'assignment') {
            await layerButtons[i].click();
        }
    }
});

Then('I should see a informations pop-up open with a title that matches the name of the layer', async function () {
    await driver.sleep(1000);

    let name = await driver.findElement(By.className('box-layers'));
    let layerName = await name.findElement(By.css('b')).getText();

    let count = 0;
    let index = 0;

    let mainString = await driver.getPageSource();
    let subString = layerName;

    while ((index = mainString.indexOf(subString, index)) !== -1) {
        count++;
        index += subString.length;
    }
     
    expect(count).to.equal(3);
});

AfterAll(async function(){
    await driver.quit();
});