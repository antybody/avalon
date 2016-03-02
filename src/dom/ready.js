/*********************************************************************
 *                           DOMReady                               *
 **********************************************************************/
var builtin = require("../base/builtin")
var document = builtin.document
var window = builtin.window
var root = builtin.root
var W3C = builtin.W3C

var readyList = [], isReady
var fireReady = function(fn) {
    isReady = true
   
    while(fn = readyList.shift()){
        fn(avalon)
    }
}

function doScrollCheck() {
    try { //IE下通过doScrollCheck检测DOM树是否建完
        root.doScroll("left")
        fireReady()
    } catch (e) {
        setTimeout(doScrollCheck)
    }
}

if (document.readyState === "complete") {
    setTimeout(fireReady) //如果在domReady之外加载
} else if (W3C) {
    document.addEventListener("DOMContentLoaded", fireReady)
} else {
    document.attachEvent("onreadystatechange", function() {
        if (document.readyState === "complete") {
            fireReady()
        }
    })
    try {
        var isTop = window.frameElement === null
    } catch (e) {
    }
    if (root.doScroll && isTop && window.external) {//fix IE iframe BUG
        doScrollCheck()
    }
}
avalon.bind(window, "load", fireReady)

avalon.ready = function(fn) {
    if (!isReady) {
        readyList.push(fn)
    } else {
        fn(avalon)
    }
}

