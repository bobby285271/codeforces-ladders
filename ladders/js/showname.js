let username = getCookie("cf_username");
if (username) {
    document.write("<div class=\"btn-group mr-2\" style=\"margin-bottom:7px;margin-top:7px\"><a class=\"btn btn-sm btn-outline-secondary\" style=\"color:white!important\" href=\"index.html\">" + username + "</a><a class=\"btn btn-sm btn-outline-secondary\" style=\"color:white!important\" href=\"login.html\">切换用户</a></div>")
} else {
    document.write("<div class=\"btn-group mr-2\" style=\"margin-bottom:7px;margin-top:7px\"><a class=\"btn btn-sm btn-outline-secondary\" style=\"color:white!important\" href=\"login.html\">登录</a></div>")
}