## Introduction
A light weight plugin for adding ICC world cup 2015 real time scores to any webpage like a news-scroller.
Developed using jQuery Boilerplate-v3.3.4 and Yahoo Pipes.





## Getting Started
Add the jquery-wcfeed.js and jquery-wcfeed.css to HTML.





## How To Initialize

##### HTML CODE
```html
<div id="cricfeed"></div>
```

##### JAVASCRIPT
```javascript
$('#cricfeed').wcfeed();
```

##### CSS
```
Check out the internal css in index.html. This css is just for the demo. 
You can customize the style of any element of the plugin to match your website theme.
```




## Plugin Options
* feed_url - String of a valid URL. Currently the plugin supports a fixed URL (specific yahoo pipe) only.
* feed_format - String of required data format. Currently plugin supports JSON data only.
* refresh_frequency - Integer. Time interval in milliseconds for fetching the feed.
* slide_interval - Integer. Time interval in milliseconds for determining how long each news item will be visible.





## Usage
```javascript
$('#cricfeed').wcfeed({
    feed_url: 'http://pipes.yahoo.com/pipes/pipe.run?_id=77f6d817238499a113ec2e7fed114b8a&_render=json',
    feed_format: 'json',
    refresh_frequency: 300000,
    slide_interval: 5000
});
```





## Dependencies
[jQuery core](https://code.jquery.com/jquery-1.11.2.min.js).
Tested with jQuery core v1.11.2, v1.10.2 and v1.8.2





## Yahoo Pipe Used for Feed
[Yahoo Pipe](http://pipes.yahoo.com/pipes/pipe.run?_id=77f6d817238499a113ec2e7fed114b8a).
