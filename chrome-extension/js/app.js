function loadReader(name, url) {
  var $link = $('#gb_32');

  if ($link.length === 1) {
    $link.removeAttr('onclick').unbind('click').attr({
      'href': url,
      'title': name
    });
  } else {
    $('<li class="gbmtc"><a class="gbmt" id="after_reader" href="' + url +'" title="' + name + '">Reader</a></li>').insertAfter($('#gb_30').parent());
  }
}

// sends a request to background.js
chrome.extension.sendRequest({method: "loadReader"}, function(response) {
  if (response.defaultReader !== null) {
    loadReader(response.defaultReader, response.defaultUrl);
  }
});