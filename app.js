// Data Array
const sleepArray = [
    "data/mike/sleepy - mike - 5_30_21 - Pivot Table .csv",
    "data/mike/sleepy - mike - 5_31_21 - Pivot Table.csv",
    "data/mike/sleepy - mike - 6_1_21 - Pivot Table .csv",
    "data/mike/sleepy - mike - 6_2_21 - Pivot Table.csv",
    "data/mike/sleepy - mike - 6_3_21 - Pivot Table.csv",
    "data/mike/sleepy - mike - 6_4_21 - Pivot Table.csv",
    "data/mike/sleepy - mike - 6_5_21 - Pivot Table.csv",
    "data/mike/sleepy - mike - 6_6_21 - Pivot Table.csv",
    "data/xi/day1.csv",
    "data/xi/day2.csv",
    "data/xi/day3.csv",
    "data/xi/day4.csv",
]

function selector(){
    let i = document.getElementById('select-data').value
    let filePath = sleepArray[i]

    // Load the CSV
    d3.csv(filePath)
    .then(drawCharts)
}

function drawCharts(data){
    makeChartMotion(data)
    makeChartTemp(data)

    if(typeof data[0].CO2 != "undefined")
        makeChartCo2(data)
    else
        window.co2Chart.destroy() 

}

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

    if(window.motionChart != null)
        window.motionChart.destroy() 
        
    window.motionChart = new Chart('main', 
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
                tension: 0.4,
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

function makeChartTemp(data) {
    console.log(data)
    let tempLabel = data.map(function(d)
    {
        return d.Time
    })

    let tempData = data.map(function(d)
    {
        return d.Temperature
    })

    if(window.tempChart != null)
        window.tempChart.destroy() 
        
    window.tempChart = new Chart('temperature', 
    {
        type: 'line',
        data: {
            labels: tempLabel,
            datasets:[{
                label: 'Temprature',
                data: tempData,
                backgroundColor: ['rgba(153, 102, 255, 1)'],
                borderColor: ['rgba(153, 102, 255, 1)'],
                borderWidth: 1,
                tension: 0.4,
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

// Create the Motion Chart
function makeChartCo2(data) {
    console.log(data)

    // Get Time
    let timeData = data.map(function(d)
    {
        return d.Time
    })

    // Get CO2
    let co2Data = data.map(function(d)
    {
        return d.CO2
    })

    // Get TVOC
    let tvocData= data.map(function(d)
    {
        return d.TVOC
    })

    // Destroy previous chart if it already exists
    if(window.co2Chart != null)
        window.co2Chart.destroy() 
     
    // Draw New Chart
    window.co2Chart = new Chart('co2', 
    {
        type: 'line',
        data: {
            labels: timeData,
            datasets:[{
                label: 'CO2 (PPM)',
                data: co2Data,
                backgroundColor: ['rgba(153, 102, 255, 1)'],
                borderColor: ['rgba(153, 102, 255, 1)'],
                borderWidth: 1,
                tension: 0.4,
            },
            {
                label: 'TVOC (PPM)',
                data: tvocData,
                backgroundColor: ['rgba(153, 102, 255, 1)'],
                borderColor: ['rgba(153, 102, 255, 1)'],
                borderWidth: 1,
                tension: 0.4,
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