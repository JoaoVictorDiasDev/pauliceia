Feature: Layers Tab In Home Page 
    Ensures that layers tab on the home page is working properly. 
    This test is especific for the layers tab functionalities. It DOES NOT verify if the activated layer is correctly reflected on the map

Scenario: Adding 10 simultaneous layers
    Given I am on the home page with the layers tab expanded
    When I click the Add Layer button
    When I activate the first 10 layers on the listing
    When I close the Add Layer Pop-up
    Then I should have 10 active layers

Scenario: Zoom button should change the indicated zoom
    Given I am on the home page with the layers tab expanded
    When I change the zoom to 100000000 km 
    When I click the Add Layer button
    When I activate the first 1 layers on the listing
    When I close the Add Layer Pop-up
    When I click the gear icon of the added layer 
    When I click the zoom button of the added layer
    Then I should see that the zoom is different than 100000000 km
