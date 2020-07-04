function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function loadScript(url, callback) {

    var script = document.createElement("script")
    script.type = "text/javascript";

    // if (script.readyState) {
    //     script.onreadystatechange = function() {
    //         if (script.readyState == "loaded" ||
    //             script.readyState == "complete") {
    //             script.onreadystatechange = null;
    //             callback();
    //         }
    //     };
    // } else {
    script.onload = function() {
        callback();
    };
    // }

    script.src = url;
    document.getElementsByTagName("head")[0].appendChild(script);
}