var massahHelper = require('massah/helper')
  , helper = massahHelper.application.helper

module.exports = (function() {
    var library = massahHelper.getLibrary()
        .when('I open the user name modal', function() {
            var driver = this.driver
            var selector = 'a[href="#set-name-modal"]'
            driver.element('a[title="Settings"]').click()
            driver.wait(function() {
                return driver.element(selector).isDisplayed(function(displayed) {
                    return displayed
                })
            }, 5000, 'Waiting for settings panel to open')
            driver.element('a[href="#set-name-modal"]').click()
        })
        .when('I change the user\'s name to \'(.*)\'', function(title) {
            var driver = this.driver
            var params = this.params
            var selector = 'div#set-name-modal input[type=text]'
            driver.wait(function() {
                return driver.element(selector).isDisplayed(function(displayed) {
                    if (false === displayed) return false
                    driver.input(selector).enter(title)
                    params.userName = title
                    return true
                })
            }, 5000, 'Waiting for user name form')
        })
        .when('I close the user name modal', function() {
            this.driver.element('#close-set-name-modal').click()
        })
        .then('the user\'s name is (.*)updated', function(not) {
            var params = this.params
            this.driver.element('#user-list li.user-me span').html(function(title) {
                if (not) {
                    title.should.not.equal(params.userName)
                } else {
                    title.should.equal(params.userName)
                }
            })
        })
    
    return library
})()
