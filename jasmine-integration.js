function Iframe() {
  var $iframe = $("iframe#jasmine-iframe");
  if($iframe.length == 0) {
    $iframe = $("<iframe id='jasmine-iframe' style='width:0;height:0'></iframe>");
    $("body").prepend($iframe);
  }

  var ready;

  this.setSrc = function (src) {
    ready = false;
    $iframe[0].onload = function() { ready = true; }
    $iframe.attr("src", src);
  };

  this.click = function(selector) {
    ready = false;
    $iframe[0].onload = function() { ready = true; }
    this.find(selector)[0].dispatchEvent(new Event("click"));
  };

  this.find = function(selector) {
    return $iframe.contents().find(selector);
  };

  this.ready = function(fun) {
    var that = this;
    if(!ready) {
      setTimeout(function() { that.ready(fun) }, 200);
    } else {
      fun();
    }
  };

  this.waitFor = function(condition, fun, _maxTimeout) {
    var that = this;
    var maxTimeout;
    if(_maxTimeout === undefined) {
      maxTimeout = 1000;
    } else {
      maxTimeout = _maxTimeout;
    }

    if(maxTimeout <= 0) {
      return false;
    }

    if(condition()) {
      fun();
    } else {
      setTimeout(function() { that.waitFor(condition, fun, maxTimeout - 100) }, 100);
    }
  };

}

function visit(path) {
  var iframe = new Iframe();
  iframe.setSrc("http://localhost:8888" + path)

  return iframe;
}

function page() {
  return (new Iframe()).find("html");
};


function showIframe() {
  $("iframe#jasmine-iframe").css("width", $(document).width());
  $("iframe#jasmine-iframe").css("height", $(document).height());
}

function hideIframe() {
  $("iframe#jasmine-iframe").css("width", 0);
  $("iframe#jasmine-iframe").css("height", 0);
}