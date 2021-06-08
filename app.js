// Load the CSV
d3.csv("/data/xi/day1.csv")
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
        options: {
            mainAspectRatio: false,
            legend:{
                display: true,
                position: 'bottom',
            }
        },
        data: 
        {
            labels: sleepyLabel,
            datasets:[
                {
                    data: sleepyData
                }
            ]
        }
    })
}