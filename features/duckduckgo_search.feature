Feature: DuckDuckGo Search

  @search
  Scenario Outline: Search <term> and verify link
    Given I open the browser and go to DuckDuckGo
    When I search for "<term>"
    Then I should see "<expected>" in the results

    Examples:
      | term      | expected        |
      | mercadona | mercadona.es    |
      | openai    | openai.com      |
