
$(document).ready(function(){
    $.ajax({
        url:"https://api.covid19api.com/summary",
        type:"GET",
        success:getData,
        error:getError,
    })
});
function getError(results) {
    console.log(results);
}
function getData(results){
    // console.log(results);
    $('#vmap1').vectorMap({
        map: 'world_en',
        backgroundColor: '#f2f2f2',
        color: '#ffffff',
        hoverOpacity: 0.7,
        selectedColor: '#858585',
        enableZoom: true,
        showTooltip: true,
        scaleColors: ['#a7110a'],
        values: sample_data,
        normalizeFunction: 'polynomial',
        selectedRegions: null,

        onRegionClick: function(element, code, region) {
            updateMapData(code, region, results);


        },

    });
    updateTable(results);
    updateSideMapData(results);


}

function updateMapData(code, region, results) {
    var mData = JSON.stringify(results['Countries']);
    for (x of JSON.parse(mData)){
        if(x['CountryCode'] === code.toUpperCase()){
            $('#body_modal').html('');
            $('#exampleModal').modal('show');
            $('#body_modal').append(
                '<div class="col-sm-12 col-md-12 col-lg-5">'+
                    '<h3 class="custom-title"><i class="fa fa-info-circle"></i> '+ x['Country'] +'</h3>'+
                    '<ul class="hover_list">'+
                        '<li>Total Confirmed:'+ ' '+ x['TotalConfirmed']    +'</li>'+
                        '<li>New Confirmed:'+' '+  x['NewConfirmed']   +'</li>'+
                        '<li>NewDeaths:'+' '+  x['NewDeaths']   +'</li>'+
                        '<li>TotalDeaths:'+' '+  x['TotalDeaths']   +'</li>'+
                        '<li>NewRecovered:'+' '+  x['NewRecovered']   +'</li>'+
                        '<li>TotalRecovered:'+' '+  x['TotalRecovered']   +'</li>'+
                        '<li>Date Updated:'+' '+  getUpdateTime(x['Date'])   +'</li>'+
                    '</ul>'+
                '</div>'+
                '<div class="col-sm-12 col-md-12 col-lg-7">'+
                    '<canvas id="myChart" style="width: 100%; height: 100%;"></canvas>'+
                '</div>'
            );
            var ctx = document.getElementById('myChart').getContext('2d');
            var myChart = new Chart(ctx, {
                type: 'pie',
                data: {
                    labels: [
                        'NewConfirmed',
                        'TotalConfirmed',
                        'NewDeaths',
                        'TotalDeaths',
                        'NewRecovered',
                        'TotalRecovered'],
                    datasets: [{
                        label: x['Country'],
                        data: [
                            x['NewConfirmed'],
                            x['TotalConfirmed'],
                            x['NewDeaths'],
                            x['TotalDeaths'],
                            x['NewRecovered'],
                            x['TotalRecovered']],
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
                        easing:'easeInOutElastic',
                    }
                }
            });
        }
    }
}
function  updateTable(results){
    // var tablebody = document.querySelector('#');
    var mData = JSON.stringify(results['Countries']);
    var counter = 0;
    var sign;
    for (x of JSON.parse(mData)){
        counter = counter + 1;

        if (x['NewConfirmed'] === 0){
            sign = '';
        }else {
            sign = '+';
        }
        $('#myTable')
            .find('#table_body')
            .append("<tr >"+
                        "<td style='text-align: left;'>"+  counter+"</td>"+
                        "<td  style='text-align: center; cursor: pointer;' >" +
                            "<a data-slug="+ x['Slug'] +"  id="+ x['CountryCode'] +" onclick='eachCountryStats(this)'  href='#'>" + x['Country'] + "</a>" +
                        "</td>"+
                        "<td style='text-align: center;'>"+ x['TotalConfirmed'] +"</td>"+
                        "<td  style='background-color: red; color: white; text-align: center;'>"+ sign + x['NewConfirmed'] +"</td>"+

                        "<td style='text-align: center;'>"+ x['NewDeaths'] +"</td>"+
                        "<td style='text-align: center;'>"+ x['TotalDeaths'] +"</td>"+
                        "<td style='text-align: center;'>"+ x['NewRecovered']  +"</td>"+
                        "<td style='text-align: center;'>"+ x['TotalRecovered']  +"</td>"+
                        "<td style='widows: 30px;'>"+ getUpdateTime(x['Date']) +"</td>"+
                     "</tr>"
            );



    }
    $('#myTable').DataTable({
        paging: true,
    });
}

function updateSideMapData(results) {
    var mData = JSON.stringify(results['Global']);
    var x =JSON.parse(mData);

    $('#side_map_data')
        .append(
            "<li><span style='font-weight: bolder;'>NewConfirmed:</span>" +" "+ x['NewConfirmed']  +"</li>"+
            "<li><span style='font-weight: bolder;'>TotalConfirmed:</span>" +" "+ x['TotalConfirmed']  +"</li>"+
            "<li><span style='font-weight: bolder;'>NewDeaths:</span>" +" "+ x['NewDeaths']  +"</li>"+
            "<li><span style='font-weight: bolder;'>TotalDeaths:</span>" +" "+ x['TotalDeaths']  +"</li>"+
            "<li><span style='font-weight: bolder;'>NewRecovered:</span>" +" "+ x['NewRecovered']  +"</li>"+
            "<li><span style='font-weight: bolder;'>TotalRecovered:</span>" +" "+ x['TotalRecovered']  +"</li>"

        );
    var ctx = document.getElementById('side_map_chart').getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: [
                'NewConfirmed',
                'TotalConfirmed',
                'NewDeaths',
                'TotalDeaths',
                'NewRecovered',
                'TotalRecovered'],
            datasets: [{
                label: '# of Votes',
                data: [
                    x['NewConfirmed'],
                    x['TotalConfirmed'],
                    x['NewDeaths'],
                    x['TotalDeaths'],
                    x['NewRecovered'],
                    x['TotalRecovered']],
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
            }
        }
    });
}
function getUpdateTime(data) {
    var dataa ,day, monthh, year, hr, min;
    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    dataa = new Date(data);
    day = dataa.getDay().toString();
    monthh = dataa.getMonth().toString();
    year = dataa.getFullYear().toString();
    hr = dataa.getHours().toString();
    min = dataa.getMinutes().toString();


    return [day, monthNames[monthh], year].join('-') + ' '+ [hr, min].join(':')
}




function eachCountryStats(event) {
    var set_slug = event.dataset.slug;
    var c_id = event.id;


    // window.location.href = "country.html" + queryString;

    localStorage.setItem("slug", set_slug);
    localStorage.setItem("myid", c_id);
    window.location.href = 'country.html' + '#' + set_slug + '#' + c_id;


}


