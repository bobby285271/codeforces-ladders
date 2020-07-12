function validateUsername(username) {
    let url = `https://codeforces.com/api/user.info?handles=${username}`
    let timer = setTimeout(() => {
        $("#syncstatus").html("<div class=\"alert alert-warning\"><strong>错误：</strong>连接 Codeforces 服务器超时，部分功能可能不可用，请确认 Codeforces 在您当前的网络环境下可以正常访问。<a href=\"javascript:location.reload();\" class=\"alert-link\">点击这里刷新</a>。</div>");
        validateUsername(username)
    }, 5000)
    $.getJSON(url, (data, status) => {
        clearInterval(timer)
        setCookie("cf_username", username, 1)
    })
}

$("#syncstatus").html("<div class=\"alert alert-info\"><strong>请稍候：</strong>正在查询用户信息，这可能需要一些时间。</div>");

let userName = getCookie("cf_username");
if (!userName) {
    $("#syncstatus").html("<div class=\"alert alert-warning\"><strong>错误：</strong>由于缺失 Codeforces 用户数据，部分功能将不可用，请先登录。<a href=\"login.html\" class=\"alert-link\">点击这里前往登录页</a>。</div>");
} else {
    validateUsername(userName);
}