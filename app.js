// Data Array of all the data files we collected
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

// Selector Function chooses the CSV to load
function selector(){
    let i = document.getElementById('select-data').value
    let filePath = sleepArray[i]

    // Load the CSV
    d3.csv(filePath)
    .then(drawCharts)
}

// drawCharts loads the data into each chart type
function drawCharts(data){
    makeChartMotion(data)
    makeChartTemp(data)

    // Some datasets are missing co2 information so we destroy any previous c02 charts
    if(typeof data[0].CO2 != "undefined")
        makeChartCo2(data)
    else
        window.co2Chart.destroy() 
}

// Create Motion Chart
function makeChartMotion(data) {
    console.log(data)

    // Variable Starter Pack Begins
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
    // Variable Starter Pack Ends

    // If a previous chart exists, we must destory it before we draw a new one
    if(window.motionChart != null)
        window.motionChart.destroy() 
       
    // Draw a Chart 
    window.motionChart = new Chart('main', 
    {
        // Data Setup
        data: {
            labels: sleepyTime,
            datasets:[{
                type: 'line',
                label: 'Movement',
                data: sleepyMovement,
                fill: true,
                // Line color
                backgroundColor: ['rgba(153, 102, 255, .5)'], //purple
                borderColor:     ['rgba(153, 102, 255, 1)'], //purple
                borderWidth: 4,
                // Point color
                pointBackgroundColor: ['rgba(153, 102, 255, 1)'], //purple
                pointBorderColor:     ['rgba(153, 102, 255, 1)'], //purple
                // Interaction
                pointHoverRadius:8,
                tension: 0.4
            }]
        },
        // Configuration
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales:{
                y: {
                    ticks:{
                        beginAtZero: true,
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

// Create Temperature Chart
function makeChartTemp(data) {
    console.log(data)
    
    // Variable Starter Pack Begins
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
    // Variable Starter Pack Ends

    // If a previous chart exists, we must destory it before we draw a new one
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
                backgroundColor: ['rgba(153, 102, 255, 0.4)'], // Purple
                borderColor:     ['rgba(153, 102, 255, 1)'], // Purple
                borderWidth: 4,
                // Point color
                pointBackgroundColor: ['rgba(153, 102, 255, 1)'], // Purple
                pointBorderColor:     ['rgba(153, 102, 255, 1)'], // Purple
                // Interaction
                pointHoverRadius:8,
                tension: 0.4


                },
                {
                label: 'Humidity (%)',
                data: humidityData,
                fill: true,
                // Line color
                backgroundColor: ['rgba(255,215,0, 0.4)'], //Yellow
                borderColor:     ['rgba(255,215,0, 1)'],
                borderWidth: 4,
                // Point color
                pointBackgroundColor: ['rgba(255,215,0, 1)'], //Yellow
                pointBorderColor:     ['rgba(255,215,0, 1)'], //Yellow
                // Interaction
                pointHoverRadius: 8,
                tension: 0.4,
                }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales:{
                y: {
                    ticks:{
                        beginAtZero: false,
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
                    text: 'Temperature Sensor Report',
                }
            },

        },
    })
}

// Create the co2 Chart
function makeChartCo2(data) {
    console.log(data)

    // Variable Starter Pack Begins
    let timeData = data.map(function(d){
        return d.Time
    })

    let co2Data = data.map(function(d){
        return d.CO2
    })


    let tvocData= data.map(function(d){
        return d.TVOC
    })
    // Variable Starter Pack Ends

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
                fill:true,
                // Line color
                backgroundColor: ['rgba(153, 102, 255, .4)'], // Purple
                borderColor:     ['rgba(153, 102, 255, 1)'], // Purple
                borderWidth: 4,
                // Point color
                pointBackgroundColor: ['rgba(153, 102, 255, 1)'], // Purple
                pointBorderColor:     ['rgba(153, 102, 255, 1)'], // Purple
                // Interaction
                pointHoverRadius: 8,        
                tension: 0.4, 
            },
            {
                label: 'TVOC (PPM)',
                data: tvocData,
                fill:true,
                // Line color
                backgroundColor: ['rgba(255, 20, 147, .4)'], // Magenta
                borderColor:     ['rgba(255, 20, 147, 1)'], // Magenta
                borderWidth: 4,
                // Point color
                pointBackgroundColor: ['rgba(255, 20, 147, 1)'], // Magenta
                pointBorderColor:     ['rgba(255, 20, 147, 1)'], // Magenta
                // Interaction
                pointHoverRadius: 8,
                tension: 0.4,
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales:{
                y: {
                    ticks:{
                        beginAtZero: true,
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