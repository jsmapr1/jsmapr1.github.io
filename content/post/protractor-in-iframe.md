+++
title = "protractor in iframe"
date = "2015-01-08"
slug = "2015/01/08/protractor-in-iframe"
Categories = []
+++
#Working With Iframes in Protractor
One of the hardest parts of legacy system is finding the confidence to refactor code. It's not a matter of if one will have to refactor code, but rather the question is when and how much.

If you happen to be lucky enough to inherit a well documented and well tested system, then good for you. If only we were all so lucky. Most of us inherit systems that are not so easy, but again, the need to refactor will present itself eventually.

When I started building tests into the system, I did what many do and focused on unit test first. I even wrote tests for some of the more important code (or some of the code that had a bad habit of being broken). However, this didn't help much with refactoring because a lot of the code was tangled spaghetti code that needed to be refactored before tests could even be written. Enter end-to-end testing.

#End to End Tests
In our particular case, the largest problem is that nearly every feature has customizations for clients. Some customizations are used by only one person and are so obscured by the code that it's hard to notice until it's too late. Previously, we have been bad developers and either checked a sampling of clients by hand (always missing one or two exceptions) or, more likely, relying on QA to check a sampling of clients by hand (still missing at least one edge case).  

Hoping to find a better way, we have started using protractor for end-to-end testing. Currently, we have just been using it for refactoring, but eventually we will use it to keep better track of different client specific code alterations. Eventually, as code coverage of unit tests expand this may be less necessary, but for now it serves both as a test and as a form of documentation. 

#Use Case

Protractor is pretty simple and the documentation has been pretty good, so I won't go through the set up and all that. I did however have a problem with capturing information in iframes. The refactoring project is converting modals from jquery-ui, which uses iframes, to angular-ui which uses bootstrap and ajax. 

With protractor generally, you just select the xpath and use that to run the test. However, when an iframe is involved, we need to first switch contexts. This is all modified from this [great stackoverflow answer.](http://stackoverflow.com/questions/20425909/protractor-testing-angular-app-in-an-iframe)
``` javascript
describe('angularjs homepage', function() {
    var prot, driver;

    beforeEach(function() {
        prot = protractor.getInstance();
        driver = prot.driver;
        browser.ignoreSynchronization = true;
    });

    it('should open reservation modal', function() {
      // First load the client
      browser.get('http://someclient.localhost/reserver');
      // Then click to open the modal. Don't care which one, so click the first button.
      element(by.css('.reserve_button')).click();
      // Now, switch to the iframe
      prot.switchTo().frame(driver.findElement(protractor.By.xpath('//*[@id="reservation_dialog"]/iframe')));
      // Then get the element by xpath
      var modal = driver.findElement(protractor.By.xpath('/html/body'));
      expect(modal.getText()).toMatch(/Reserve Now/);
    })})
})
```
It's all pretty simple, but not well covered in documentation. So here it is for all eternity.
