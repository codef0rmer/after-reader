function loadReader(name, url) {
  var $pluslink = $('a[data-ved="0CAIQwi4oAA"]');

  $('<div class="gb_g gb_i gb_Rc" style="display:block"><a id="after_reader" class="gb_f gb_h" href="' + url +'" title="' + name + '" target="_blank">Reader</a></div>').insertAfter($pluslink.parent());
}

// sends a request to background.js
chrome.extension.sendRequest({method: "loadReader"}, function(response) {
  if (response.defaultReader !== null) {
    window.setTimeout(function() {
     loadReader(response.defaultReader, response.defaultUrl);      
    }, 2000);
  }
});