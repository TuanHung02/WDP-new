import React, { useEffect, useState } from 'react'
import { Chart as ChartJS, LinearScale } from 'chart.js/auto'
import { Line } from 'react-chartjs-2'
import { CHART_LAST_1day, CHART_LAST_1hour, CHART_LAST_2days, CHART_LAST_30days, CHART_LAST_30m, CHART_LAST_5m, CHART_LAST_7days } from '../../utils/components/ChartTime'
import axios from 'axios'

const ChartSection = ({ metric, timeRange, min, max, title, unit }) => {
  ChartJS.register(LinearScale)

  let now = new Date()
  let start = new Date(now.getTime() - timeRange * 1000)
  start = start.toISOString()
  let end = now
  end = end.toISOString()
  const [chartDataRaw, setChartDataRaw] = useState(null)

  const [newChart, setNewChart] = useState({
    labels: [],
    datasets: []
  })

  const convertEpochToRealTime = epoch => {
    const dateObject = new Date(epoch * 1000)
    let options = {}

    if (timeRange <= CHART_LAST_5m || timeRange === CHART_LAST_30m) {
      options = { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }
    } else if (timeRange === CHART_LAST_1hour || timeRange === CHART_LAST_1day) {
      options = { hour: '2-digit', minute: '2-digit', hour12: false }
    } else if (timeRange === CHART_LAST_2days) {
      options = { month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hour12: false }
    } else if (timeRange === CHART_LAST_7days || timeRange === CHART_LAST_30days) {
      options = { month: '2-digit', day: '2-digit', hour12: false }
    }

    return dateObject.toLocaleString('en-US', options)
  }

  const [tours, setTours] = useState([]);

  useEffect(() => {

    axios.get('http://localhost:8080/api/tour/find-all')
      .then((response) => {
        const tourData = response.data.tours;
        setTours(tourData);
      })
      .catch(error => console.log(error));


    const getData = async () => {
      if (chartDataRaw) {
        let chartdata = {
          labels: [],
          datasets: []
        }

        const colors = [
          '#FFA500',
          '#00FF00',
          '#800080',
          '#ff1a1a',
          '#5eafe2',
          '#ecf38e',
          '#F0FFF0',
          '#0080ff',
          '#8FBC8F',
          '#66CDAA'
        ]

        // Get timestamp and filter based on selected time range
        for (let i = 0; i < chartDataRaw[0].data.length; i++) {
          const timestamp = chartDataRaw[0].data[i][0]
          chartdata.labels.push(convertEpochToRealTime(timestamp))
        }

        // Get data and name
        let backgroundColor = []
        let borderColor = []
        for (let i = 0; i < chartDataRaw.length; i++) {
          backgroundColor = colors[i % colors.length] + '33'
          borderColor = colors[i % colors.length]

          let chart = {
            label: chartDataRaw[i].name,
            data: [],
            backgroundColor,
            borderWidth: 2,
            fill: true,
            borderColor,
            pointRadius: 0
          }
          for (let j = 0; j < chartDataRaw[i].data.length; j++) {
            chart.data.push(chartDataRaw[i].data[j][1])
          }
          chartdata.datasets.push(chart)
        }
        setNewChart(chartdata)
      }
    }
    getData()
  }, [chartDataRaw])

  let clicked = false

  const handleClick = (e, legendItem) => {
    const index = legendItem.datasetIndex
    const ci = e.chart
    if (!clicked) {
      for (let i = 0; i < ci.data.datasets.length; i++) {
        if (i !== index) {
          ci.getDatasetMeta(i).hidden = true
        } else {
          ci.getDatasetMeta(i).hidden = false
        }
      }
      ci.update()
      clicked = true
    } else {
      for (let i = 0; i < ci.data.datasets.length; i++) {
        ci.getDatasetMeta(i).hidden = false
      }
      ci.update()
      clicked = false
    }
  }

  const formatData = data => {
    const units = ['B', 'KiB', 'MiB', 'GiB', 'TiB']
    let index = 0
    while (data >= 1024 && index < units.length - 1) {
      data /= 1024
      index++
    }
    return `${Number(data).toFixed(2)} ${units[index]}`
  }

  const options = {
    responsive: true,
    scales: {
      y: {
        min: min,
        max: max,
        ticks: {
          callback: function (value) {
            if (unit === 'throughput') {
              return formatData(' ' + value)
            } else {
              return value + ' ' + unit
            }
          }
        }
      },
      x: {
        ticks: {
          autoSkip: true,
          maxTicksLimit: 7,
          maxRotation: 0,
          auto: true
        }
      }
    },
    plugins: {
      tooltip: {
        mode: 'nearest',
        intersect: false
      },
      title: {
        display: true,
        text: title
      },
      legend: {
        onClick: handleClick
      }
    }
  }

  return (
    <>
      <div>
        {/* <Line data={newChart} options={options} /> */}
      </div>
    </>
  )
}

export default ChartSection