function onRequest(request, sender, sendResponse) {
    chrome.pageAction.show(sender.tab.id);

    if (request.method === "loadReader") {
      sendResponse({
        defaultReader : localStorage.getItem('defaultReader') || 'Feedly',
        defaultUrl    : localStorage.getItem('defaultUrl') || 'http://www.feedly.com/home'
      });
    }
}
chrome.extension.onRequest.addListener(onRequest);
