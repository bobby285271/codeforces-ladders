function validateUsername(username) {
    $("#loginstatus").html("<div class=\"alert alert-info\"><strong>请稍候：</strong>正在查询用户信息，这可能需要一些时间。</div>");
    let url = `https://codeforces.com/api/user.info?handles=${username}`
    let timer = setTimeout(() => {
        $("#loginstatus").html("<div class=\"alert alert-warning\"><strong>错误：</strong>登录失败，请确认 Codeforces 在您当前的网络环境下可以正常访问且帐号填写正确。</div>");
    }, 5000)
    $.getJSON(url, (data, status) => {
        clearInterval(timer)
        setCookie("cf_username", username, 1)
        $("#loginstatus").html("<div class=\"alert alert-success\"><strong>成功：</strong>您已登录为 " + username + "，<a href=\"./\" class=\"alert-link\">点击这里前往首页</a>。</div>");
    })
}

function submit_desktop() { validateUsername(document.getElementById("userName_desktop").value); }

function submit_mobile() { validateUsername(document.getElementById("userName_mobile").value); }

function delCookie(name) {
    setCookie(name, ' ', -1);
    $("#loginstatus").html("<div class=\"alert alert-success\"><strong>成功：</strong>您已成功注销，<a href=\"./\" class=\"alert-link\">点击这里前往首页</a>。</div>");
};