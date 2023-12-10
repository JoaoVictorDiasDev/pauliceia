Feature: Searchbox address validation
    Ensures the regex and logic for validating address input are correct
    

Scenario Outline: Input address is or is not correct 
    Given I am on the home page
    When I search for address "<address>"
    Then I "<expected_should>" receive a Incorrect-Format Warning 

    Examples:
        | address                       | expected_should   | 
        | Av Paulista                   | should            | 
        | Rua 25 de Marco, 200          | should            | 
        | Rua OscarFreire, 80           | should            | 
        | Avenida Sao Luis, 200, 80     | should            | 
        | Av Paulista, 200, 1980        | should not        | 
        | Rua 25 de Marco, 52, 2000     | should not        | 
        | Rua OscarFreire, 10023, 1870  | should not        | 
        | Avenida Sao Luis, 123, 1990   | should not        | 


