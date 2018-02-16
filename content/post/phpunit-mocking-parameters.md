+++
title = "phpunit mocking parameters"
date = "2015-05-14"
slug = "2015/05/14/phpunit-mocking-parameters"
Categories = []
+++


I recently had to do some development with a third party api.
We've worked with several apis in the past and they've always been a huge hassle and, more importantly, we've never bothered to test code so we can isolate problems should there be a change by the api provider (we are always the last to be notified).

##PHP Unit Mocks
The best way to test is to set up a mock so we can test our api code against an expected return value from the api.
Fortunately, PHP Unit [has built in mocks](https://phpunit.de/manual/current/en/test-doubles.html).

In the code, we want to be able to use the same interface for every api.
In other words, we want to be able to say ```$api->getData();``` and not have to worry about which api we are using or which methods the api is calling.
We just want the data back in a clear, standard way.

Essentially, it looks like this:
```php
$provider = new Provider('SomeThirdParty', $configs);
$data = $provider->getData();
$data->getWidgets();
//array of standard group of Widget objects built from the data of any api
```
The problem is every third party structures their api differently.
Some have one call that will give us what we need.
Others have two or three that need to be used together.
Internally, it is further abstracted so all calls are being made through the same function:

```php
    class SomeThirdPary {
        //Something something connect to api.
        function getData() {
            $widgets =  array();
            $allWidgets = $this->fetchData('allWidgets');
            $widgetDiscounts = $this->fetchData('widgetCoupons');
            foreach($allWidgets as $widget) {
                $w = new Widget($widget);
                if($widgetDiscount)
            }
        }
        function fetchData($method) {
            return $this->connection->$method();
        }
    }
```

In the test, we only need to mock the function, fetchData, that will 
```php
class SomeProviderTest extends PHPUnit_Framework_TestCase {
    public function testGetData() {
        $provider = $this->getMockBuilder('SomeThirdParty')
                     ->setMethods(array('fetchData'))
                     ->getMock();

        $data = $provider->getData();
        $widgets = $data->getWidgets();
        $widget = reset($widget);
        $this->assertEquals(4, $widget->price);
    }
}
```


The challenge is to have the mock similuate the various calls and responses so that we can have consistent, testable data.
Fortunately, PHPUnit provides a way to test this with `returnValueMap`.
This will return different values based on the arguments that are passed in.
In our case, every method is going to have to go through fetchData as an agrument.

Suppose we have this code:

