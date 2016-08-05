
var front2backConnection = chrome.runtime.connect({
    name: "front2backConnection"
});

function injectGlobalFlag(window) {
    window.__REGULAR_DEVTOOLS_SIDEBAR_GLOBAL_HOOK__ = true;

}


// inject the global flag
var script = document.createElement('script');
script.textContent = ';(' + injectGlobalFlag.toString() + ')(window)';
document.documentElement.appendChild(script);
script.parentNode.removeChild(script);
