+++
title = "php unit mocks"
date = "2015-05-13"
slug = "2015/05/13/php-unit-mocks"
Categories = []
+++

I recently had to do some development with a third party api.
We've worked with several apis in the past and they've always been a huge hassle and, more importantly, we've never bothered to test code so we can isolate problems should there be a change by the api provider (we are always the last to be notified).

##PHP Unit Mocks
The best way to test an api is to set up a mock so we can test our api code against the expected return value (the json or xml or whatever).
Fortunately, PHP Unit [has built in mocks](https://phpunit.de/manual/current/en/test-doubles.html).

Working with other apis, we've abstracted method calls behind a common interface.
In other words, we want to be able to say ```$api->getData();``` and not have to worry about which api we are using or which methods the api is calling.
We just want the data back in a clear, standard way.

Essentially, it looks like this:
```php
$provider = new SomeThirdParty($configs);
$widgets = $provider->getData();
//array of standard group of Widget objects built from the data of any api
```

In the test, we want to do something like this:
```php
class SomeProviderTest extends PHPUnit_Framework_TestCase {
    public function testGetData() {
        $provider = new SomeThirdParty();
        //getData calls fetchData internally
        $widgets = $provider->getData();
        $widget = reset($widget);
        $this->assertEquals(4, $widget->price);
    }
}
```

Here's some example code (assume a Soap client):

```php
    class SomeThirdPary extends ApiBase {
        //Something something connect to api.
        private function fetchData() {
            $client = new SoapClient("https://coolapp.com", array('soap_version' => SOAP_1_2,));
            $data = $client->getWidgets(array(
                'user'      => $this->config['user'],
                'apiKey'    => $this->config['key']
            ))
            return new SimpleXMLElement($data);
        }

        function getData() {
            $widgets =  array();
            $allWidgets = $this->fetchData();
            foreach($allWidgets as $widget) {
                $w = new Widget($widget)
                //Probablly do some more stuff
                $widgets[] = $w;
            }
            return $widgets;
        }
    }
```

The challenge is to mock the response which, in this case, will be an XML element.
Remember, we want to be as close to reality as possible without actually making a live api call.

In the above example, we need to mock out the fetchData method or else a the code will actually try and connect to the api.
And if that happens, beyond being ineffiencent, we won't be able to predict the return results.

Mocks to the rescue!

With mocks, we can set which methods we know will be called and then stipulate a return value.
We don't want to mock all methods; doing so would keep the code from being executed thus rendering the test useless.
The only important method is the api method.

The syntax is pretty straightforward:

```php

        $mock = $this->getMockBuilder('MockedClass');
        //We only want to mock the fetchData method. Because we want getData to execute
        $mock->setMethods(array('fetchData'));

        //Set the return
        $mock->expects($this->once())
             ->method('update')
              ->will($this->returnValue(new \SimpleXMLElement($widgetXML));

```

Alright, let's try it with the code:
```php
class SomeProviderTest extends PHPUnit_Framework_TestCase {
    public function testGetData() {
        $provider = $this->getMockBuilder('SomeThirdParty')
                     ->setMethods(array('fetchData'))
                     ->getMock();

        $widgetXML = <<<EOT
            <Widget>
                <Widget>
                    <Id>54</Id>
                    <Price>34.00</Price>
                    <Length>5.00</Length>
                    <Width>5.00</Width>
                </Widget>
                <Widget>
                    <Id>87</Id>
                    <Price>42.00</Price>
                    <Length>10.00</Length>
                    <Width>5.00</Width>
                </Widget>
            </Widgets>
EOT;
        $provider->expects($this->once())
             ->method('fetchData')
              ->will($this->returnValue(new \SimpleXMLElement($widgetXML));

        //getData calls fetchData internally. We never need to call it.
        $widgets = $provider->getData();
        $widget = reset($widget);
        //For now, we'll just check price. Probably need ot check other things.
        $this->assertEquals(34.00, $widget->price);
    }
}
```

That all there is to it. Now this test will make sure that getData is accurately calling a method, pulling in the data, and performing whatever needs to be done to get the data usable.
In the future if we need change the getData method (maybe get an inventory count for each widget), this test will ensure that a the api will still be called and a price set.
In addition, if getData eventually needs to make more api calls -- for example, maybe it pulls discounts with another method -- we can add those and mock them out in the same way.
Regardless, the test now closely matches the reality the code will experience which will give future developers the security they need to make changes and update code.
