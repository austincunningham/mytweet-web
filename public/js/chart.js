/**
 * Created by austin on 08/07/2016.
 * Pie chart implementation with use of CanvasJS and pulling imput date from jsonArray
 * chart.options.data[0].dataPoints.push({y: 23}); // Add a new dataPoint to dataPoints array
 */

window.onload = function () {
        var chart = new CanvasJS.Chart('chartContainer',
            {
              title: {
                text: '% Percentage Tweet count',
              },
              data: [
                {
                  type: 'pie',
                  toolTipContent: '{y} %',
                  dataPoints: [],
                },
              ],
            });

        $(function loadChartData() {
           $.ajax({
            dataType: 'json',
            url: 'http://lap-austin:4000/api/tweetcount/',
            type: "GET",

            success(data){
              console.log('success');
              console.log(data);
              var emailCount = data;
              console.log('emailCount: '+ emailCount)
              renderPoints(emailCount);
            },
            error: function (err) {
              console.log(err.statusText);
            }

          });
          function renderPoints(emailCount){
            let total = 0;
            for (j = 0; j < emailCount.length; j++) {
              total += emailCount[j].count;
            }

            console.log('total :' + total);
            let val;
            let i = 0;
            for (i = 0 ;i < emailCount.length; i++) {
              //console.log('Getting added to pie ' + chartSort[i][1]);
              chart.options.data[0].dataPoints.push({
                y: (Math.round((parseInt(emailCount[i].count) / total) * 100)),
                indexLabel: emailCount[i].email + ' Percentage : ' + (Math.round((parseFloat(emailCount[i].count / total) * 100))) + '%',
              });
              chart.render();
            }

          };
        });
}


function chartCallback(data) {
  chartSort = data;
  return chartSort;
}

function reloadPie() {
  location.reload();
}

function chartSpline() {
  let chartType = 'spline';
  loadChart(chartType);
}

function chartColume() {
  let chartType = 'column';
  loadChart(chartType);
}

function chartPie() {
  let chartType = 'pie';
  loadChart(chartType);
}

function loadChart(chartType) {
  var chart = new CanvasJS.Chart('chartContainer',
      {
        title: {
          text: '% Percentage Tweet count',
        },
        axisX:{
          labelAutoFit: true,
          labelAngle: 25,
          interval: 1,
        },
        data: [
          {
            type: chartType,
            toolTipContent: '{y} %',
            dataPoints: [],
          },
        ],
      });

  $(function loadChartData() {
    $.ajax({
      dataType: 'json',
      url: 'http://lap-austin:4000/api/tweetcount/',
      type: "GET",

      success(data){
        console.log('success');
        console.log(data);
        var emailCount = data;
        console.log('emailCount: '+ emailCount);
        renderPoints(emailCount);
      },
      error: function (err) {
        console.log(err.statusText);
      }

    });
    function renderPoints(emailCount){
      let total = 0;
      for (j = 0; j < emailCount.length; j++) {
        total += emailCount[j].count;
      }

      console.log('total :' + total);
      let val;
      let i = 0;
      for (i = 0 ;i < emailCount.length; i++) {
        chart.options.data[0].dataPoints.push({
          y: (Math.round((parseInt(emailCount[i].count) / total) * 100)),
          indexLabel: (Math.round((parseFloat(emailCount[i].count / total) * 100))) + '%',
          label:emailCount[i].email,
        });
        chart.render();
      }

    };
  });
}

