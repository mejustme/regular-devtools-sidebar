
var dev2backConnection, front2backConnection;
chrome.runtime.onConnect.addListener(function(connection) {

  if (connection.name == "dev2backConnection") {
    dev2backConnection = connection;
    dev2backConnection.onMessage.addListener(function(message, sender, sendResponse){ // dev -> back

    });
    return;


  if (connection.name === "front2backConnection") {
    front2backConnection = connection;
    front2backConnection.onMessage.addListener(function(request, sender, sendResponse) { // front -> back
      dev2backConnection.postMessage(request); // front -> back -> dev
      return;
    });
  }

});