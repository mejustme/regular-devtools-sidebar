
var front2backConnection = chrome.runtime.connect({
    name: "front2backConnection"
});

window.addEventListener("message", function(event) { // userPage -> front

    if (event.data && (event.data.type == "FROM_USER_PAGE")) {
        console.log(event.data.data)
        front2backConnection.postMessage(event.data.data); // font -> back
    }
}, false);


function injectGlobalFlag(window) {
    window.__REGULAR_DEVTOOLS_SIDEBAR_GLOBAL_HOOK__ = true;

    setTimeout(function(){
        window.postMessage({   // userPage -> front
            type: "FROM_USER_PAGE",
            data: {
                action: 'update_data'
            }
        }, "*");
    },2000);

}


// inject the global flag
var script = document.createElement('script');
script.textContent = ';(' + injectGlobalFlag.toString() + ')(window)';
document.documentElement.appendChild(script);
script.parentNode.removeChild(script);
