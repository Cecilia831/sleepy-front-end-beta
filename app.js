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
    let sleepyTime = data.map(function(d){
        return d.Time
    })

    let sleepyMovement = data.map(function(d){
        return d.Movement
    })

    let sleepyLight = data.map(function(d){
        return d.Light
    })

    let sleepySound = data.map(function(d){
        return d.Sound
    })

    if(window.motionChart != null)
        window.motionChart.destroy() 
        
    window.motionChart = new Chart('main', 
    {

        data: {
            labels: sleepyTime,
            datasets:[{
                type: 'bar',
                label: 'Movement',
                data: sleepyMovement,
                fill: true,
                // Line color
                backgroundColor: ['rgba(153, 102, 255, .5)'],
                borderColor:     ['rgba(153, 102, 255, 1)'],
                borderWidth: 4,
                // Point color
                pointBackgroundColor: ['rgba(153, 102, 255, 1)'],
                pointBorderColor:     ['rgba(153, 102, 255, 1)'],
                // Interaction
                pointHoverRadius:8,
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
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
                title:{
                    display: true,
                    text: 'Motion Sensor Report'
                }
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

    let humidityData = data.map(function(d){
        return d.Humidity
    })

    if(window.tempChart != null)
        window.tempChart.destroy() 
        
    window.tempChart = new Chart('temperature', 
    {
        type: 'line',
        data: {
            labels: tempLabel,
            datasets:[
                {
                label: 'Temperature (C)',
                data: tempData,

                fill: true,
                // Line color
                backgroundColor: ['rgba(153, 102, 255, 0.2)'],
                borderColor:     ['rgba(153, 102, 255, 1)'],
                borderWidth: 4,
                // Point color
                pointBackgroundColor: ['rgba(153, 102, 255, 1)'],
                pointBorderColor:     ['rgba(153, 102, 255, 1)'],
                // Interaction
                pointHoverRadius:8,
                tension: 0.4


                },
                {
                label: 'Humidity (%)',
                data: humidityData,
                fill: true,
                // Line color
                backgroundColor: ['rgba(255,215,0, 0.2)'],
                borderColor:     ['rgba(255,215,0, 1)'],
                borderWidth: 4,
                // Point color
                pointBackgroundColor: ['rgba(255,215,0, 1)'],
                pointBorderColor:     ['rgba(255,215,0, 1)'],
                // Interaction
                pointHoverRadius: 8,
                tension: 0.4,
                }]
        },
        options: {
            responsive: true,
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
                title:{
                    display: true,
                    text: 'Temperature Sensor Report'
                }
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
        type: 'bar',
        data: {
            labels: timeData,
            datasets:[{
                label: 'CO2 (PPM)',
                data: co2Data,
                fill:true,
                // Line color
                backgroundColor: ['rgba(153, 102, 255, 0.5)'],
                borderColor:     ['rgba(153, 102, 255, 1)'],
                borderWidth: 4,
                // Point color
                pointBackgroundColor: ['rgba(153, 102, 255, 1)'],
                pointBorderColor:     ['rgba(153, 102, 255, 1)'],
                // Interaction
                pointHoverRadius: 8,
                tension: 0.4,
                
            },
            {
                label: 'TVOC (PPM)',
                data: tvocData,
                fill:true,
                // Line color
                backgroundColor: ['rgba(255, 20, 147, 0.5)'],
                borderColor:     ['rgba(255, 20, 147, 1)'],
                borderWidth: 4,
                // Point color
                pointBackgroundColor: ['rgba(255, 20, 147, 1)'],
                pointBorderColor:     ['rgba(255, 20, 147, 1)'],
                // Interaction
                pointHoverRadius: 8,
                tension: 0.4,
            }]
        },
        options: {
            responsive: true,
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
                title:{
                    display: true,
                    text: 'Air Quality Report'
                }
            },

        },
    })
}