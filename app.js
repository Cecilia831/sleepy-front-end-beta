// Load the CSV
d3.csv("/data/sample/mike - sample pivot (hour).csv")
.then(makeChartMotion)

function makeChartMotion(data) {
    console.log(data)
    let sleepyLabel = data.map(function(d)
    {
        return d.Time
    })

    let sleepyData = data.map(function(d)
    {
        return d.Movement
    })

    let chart = new Chart('main', 
    {
        type: 'line',
        data: {
            labels: sleepyLabel,
            datasets:[{
                label: 'Movement',
                data: sleepyData,
                backgroundColor: ['rgba(153, 102, 255, 1)'],
                borderColor: ['rgba(153, 102, 255, 1)'],
                borderWidth: 1,
            }]
        },
        options: {
            scales:{
                y: {
                    ticks:{
                        beginAtZero: true,
                    }
                },
                x: {
                    ticks:{
                        autoSkip: true,
                        autoSkipPadding: 10,
                        maxTicksLimit:10,
                        padding: 10,
                    }
                },
            },
            plugins:{
                legend:
                {
                    display: true,
                    position: 'bottom',
                },
            },

        },
    })
}