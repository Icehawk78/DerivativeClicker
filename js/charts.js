var enableChart = true;

$(function() {
    Highcharts.setOptions({
        global: {
            useUTC: false
        },
        colors: ['#ADBAFF'],
        lang: {
        	numericSymbols: ["K", "M", "B", "T", "Qa", "Qt", "Sx", "Sp", "Oc", "Nn", "Dc"]
        }
    });

    var chart;
    $('#chartContainer').highcharts({
        chart: {
            type: 'areaspline',
            animation: Highcharts.svg, // don't animate in old IE
            marginRight: 10,
            events: {
                load: function() {

                    // set up the updating of the chart each ten seconds
                    var series = this.series[0];
                    chart = this;
                    counter = 0;
                    setInterval(function() {
                    	if(enableChart){
	                        var x = (new Date()).getTime(), // current time
	                            y = player.money;
	                        //shifts if series length is longer than 100
	                        var shift = series.data.length > 100;
	                        series.addPoint([x, y], true, shift, false)  
	                    }
                    }, 10000);
                }
            }
        },
        title: {
            text: 'Money vs Time'
        },
        xAxis: {
            type: 'datetime',
            tickPixelInterval: 150
        },
        yAxis: {
            title: {
                text: 'Money'
            },
            type: 'logarithmic',
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }],
            labels: {
            	formatter: function(){
            		return displayNum(this.value, true);
            	}
            }
        },
        tooltip: {
            formatter: function() {
                    return '<b>'+ this.series.name +'</b><br/>'+
                    Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) +'<br/>'+
                    displayNum(this.y, true);
            }
        },
        legend: {
            enabled: false
        },
        exporting: {
            enabled: false
        },
        series: [{
            name: 'Money',
            data: (function() {
                var data = [[(new Date()).getTime(), player.money]];
                return data;
            })()
        }]
    });
    
    var chart = $("#chartContainer").highcharts(),
	type = 1,
	types = ["logarithmic", "linear"];

	$("#chartAxisToggle").click(function(){
		chart.yAxis[0].update({type: types[type]})
		type++;
		if(type === types.length) type = 0;
	});
});
