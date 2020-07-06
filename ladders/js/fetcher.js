page_data = {};

function updatePage() {
    let username = getCookie("cf_username");
    let page = this.location.href.substring(this.location.href.lastIndexOf('/') + 1);
    $("#cf_username").html(username)
    let url = `https://codeforces.com/api/user.status?handle=${username}`;
    $.getJSON(url, (data, status) => {
        let solved = new Set();
        let unsolved = new Set();
        for (let item of data.result) {
            if (item.verdict == "OK") {
                solved.add(`http://codeforces.com/problemset/problem/${item.problem.contestId}/${item.problem.index}`)
            } else {
                unsolved.add(`http://codeforces.com/problemset/problem/${item.problem.contestId}/${item.problem.index}`)
            }
        }
        for (let element of $("td > a")) {
            if (solved.has($(element).attr("href"))) {
                $(element).parent().parent().css("background-color", "lightgreen")
            } else if (unsolved.has($(element).attr("href"))) {
                $(element).parent().parent().css("background-color", "pink")
            }
        }
        $("#syncstatus").html("<div class=\"alert alert-success\"><strong>成功：</strong>您当前登录为 " + username + "，成功同步用户做题记录。</div>");
    })
}

function startService() {
    let problem_tree = "./js/data.json";
    $.getJSON(problem_tree, (data, status) => {
        page_data = data
        updatePage()
        setInterval(updatePage, 60000)
    })
}

loadScript("https://cdn.staticfile.org/jquery/3.5.1/jquery.min.js", () => {
    $(document).ready(function() {
        let username = getCookie("cf_username");
        if (username) {
            startService();
        }
    });
})