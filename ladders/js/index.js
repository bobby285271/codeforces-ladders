function startService() {

    const userName = getCookie("cf_username");
    const userInfoUrl = "https://codeforces.com/api/user.info?handles=";
    const userStatusUrl = "https://codeforces.com/api/user.status?handle=";
    const userRatingUrl = "https://codeforces.com/api/user.rating?handle=";

    Promise.all([userInfoUrl, userStatusUrl, userRatingUrl].map(url =>
            fetch(url + userName)
            .then(res => res.json())
            .then(body => body.result)
        ))
        .then(process);
}

let myChart;

function process(res) {

    if (myChart) {
        myChart.destroy();
    }
    const ratingData = [];
    const ratingColor = [];
    const solveData = [];
    const solveColor = [];
    const canvas = document.getElementById('myChart');
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    res[0].forEach(item => {
        $("#myInfo").html("<div class=\"card\"><div class=\"card-body\"><div class=\"row\"><div class=\"col-12 col-lg-9\"><div class=\"card bg-light text-dark\"><div class=\"card-body\"><h3>" + ((item['firstName'] && item['lastName']) ? (item['firstName'] + " " + item['lastName']) : item['handle']) + "</h3><h5>" + ((item['organization']) ? (item['organization']) : "") + "<h5 /></div></div><br /><div class=\"card bg-light text-dark\"><div class=\"card-body\"><h5>Contest Rating <i class=\"fas fa-angle-right\"></i> " + ((item['rating']) ? (item['rating']) + " <span class=\"badge badge-secondary\">" + item['rank'] + "</span>" : "0 <span class=\"badge badge-secondary\">unrated</span>") + "</h5><h5>User Contribution <i class=\"fas fa-angle-right\"></i> " + item['contribution'] + "</h5></div></div><br /><div class=\"card bg-light text-dark\"><div class=\"card-body\"><a href=\"https://codeforces.com/profile/" + item['handle'] + "\" target=\"_blank\">点击这里访问 Codeforces 个人主页</a>" + "</div></div></div><div class=\"col-lg-3 d-none d-lg-block\"><img class=\"float-right img-thumbnail\" src=\"" + item['titlePhoto'] + "\"></div></div>");
    });
    res[1].forEach(item => {
        if (item['verdict'] != 'OK') return;
        solveData.push({
            x: new Date(item['creationTimeSeconds'] * 1000),
            y: item['problem'] && item['problem']['rating'] || 0
        });
        solveColor.push(getColor(item['problem'] && item['problem']['rating'] || 0));
        '' + item['problem']['contestId'] + item['problem']['index'] + item['problem']['name']
    });
    res[2].forEach(item => {
        ratingData.push({
            x: new Date(item['ratingUpdateTimeSeconds'] * 1000),
            y: item['newRating'] || 0
        });
        ratingColor.push(getColor(item['newRating'] || 0));
    });
    $("#syncstatus").html("<div class=\"alert alert-success\"><strong>成功：</strong>你当前登录为 " + username + "，成功同步用户做题记录和比赛记录。</div>");

    let config = {
        type: 'line',
        data: {
            datasets: [{
                    label: 'Rating Data',
                    fill: false,
                    borderColor: '#000000',
                    data: ratingData,
                    lineTension: 0,
                    pointBackgroundColor: ratingColor,
                    pointBorderColor: ratingColor,
                    pointRadius: 5,
                },
                {
                    label: 'Solving Data',
                    fill: false,
                    borderColor: '#000000',
                    data: solveData,
                    lineTension: 0,
                    showLine: false,
                    pointBackgroundColor: solveColor,
                    pointBorderColor: solveColor,
                    pointRadius: 2,
                }
            ]
        },
        options: {
            title: {
                text: 'Codeforces Compare'
            },
            scales: {
                xAxes: [{
                    type: 'time',
                    time: {
                        unit: 'month',
                    }
                }],
                yAxes: [{
                    id: 'y-axis',
                    type: 'linear',
                    display: true,
                    position: 'left'
                }]
            },
            elements: {
                point: {
                    pointStyle: 'circle',
                }
            }
        }
    };
    myChart = new Chart(ctx, config);
}

function getColor(point) {
    if (point >= 2600) return '#f33';
    if (point >= 2400 && point < 2600) return '#f77';
    if (point >= 2300 && point < 2400) return '#fb5';
    if (point >= 2100 && point < 2300) return '#fc8';
    if (point >= 1900 && point < 2100) return '#f8f';
    if (point >= 1600 && point < 1900) return '#aaf';
    if (point >= 1400 && point < 1600) return '#7db';
    if (point >= 1200 && point < 1400) return '#7f7';
    return '#ccc';
}

loadScript("https://cdn.staticfile.org/jquery/3.5.1/jquery.min.js", () => {
    $(document).ready(function() {
        let username = getCookie("cf_username");
        if (username) {
            startService();
        }
    });
})