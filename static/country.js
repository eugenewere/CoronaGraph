// $(document).ready(function () {

function ffff() {

    var s =localStorage.getItem('slug');
    var k =localStorage.getItem('myid');


    // console.log(s, k);
    $.ajax({
        url:"https://api.covid19api.com/dayone/country/"+ s +"/status/confirmed",
        type:"GET",
        success:function (data) {
            setCountryData(data);
        },
        error:function (data) {
            console.log(data)
        },

    });
}
function setCountryData(results){
    var mCountryData = JSON.stringify(results);

    var dates = [];
    var cases = [];

    for (x of JSON.parse(mCountryData)){
        dates.push(getUpdateDate(x['Date']));
        cases.push(x['Cases']);
    }
    var ctx = $('#vmap2')[0].getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: dates,
            datasets: [{
                label: x['Country'],
                data: cases,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(36,255,0,0.2)',
                    'rgba(1,192,187,0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            },
            animation: {
                easing: 'easeInOutElastic',
            },

        }
    });

}


function getUpdateDate(data) {
    var dataa ,day, monthh, year, hr, min;
    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    dataa = new Date(data);
    day = dataa.getDay().toString();
    monthh = dataa.getMonth().toString();
    year = dataa.getFullYear().toString();



    return [day, monthNames[monthh], year].join('/')
}


// document.addEventListener('DOMContentLoaded', function() {
//     if (!Notification) {
//         alert('Desktop notifications not available in your browser. Try Chromium.');
//         return;
//     }
//
//     if (Notification.permission !== 'granted')
//         Notification.requestPermission();
// });
//
//
// function notifyMe() {
//     if (Notification.permission !== 'granted')
//         Notification.requestPermission();
//     else {
//         var notification = new Notification('Notification title', {
//             icon: 'http://cdn.sstatic.net/stackexchange/img/logos/so/so-icon.png',
//             body: 'Hey there! You\'ve been notified!',
//         });
//         notification.onclick = function() {
//             window.open('http://stackoverflow.com/a/13328397/1269037');
//         };
//     }
// }


ffff();

// });















