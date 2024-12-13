import { useEffect } from "react"
import * as echarts from 'echarts'

const createOption = ({ type = "line", text = "[нет названия]", dataX = [], dataY = [], lineStyle = {}, itemStyle = {}}) => ({
    title: {
        text: text,
        left: 'center'
    },
    tooltip: {
        trigger: 'axis'
    },
    xAxis: [{
        type: 'category',
        boundaryGap: false,
        data: dataX
    }],
    yAxis: {
        type: 'value',
        min: Math.round(Math.min(...dataY)),
        max: Math.round(Math.max(...dataY))
    },
    series: [{
        name: '',
        type: type,
        data: dataY,
        smooth: true,
        barMaxWidth: 40,
        barMinWidth: 10,
        lineStyle,
        itemStyle,
    }]
})

const Chart = ({ id, type = "line", text = "[нет названия]", dataX = [], dataY = [], style = {}, itemStyle = {}, lineStyle={}, className=""}) => {
    if (id == undefined) throw new Error("LineChart->id is not")
    useEffect(() => {
        let chart = echarts.init(document.getElementById(id))
        chart.setOption(createOption({ type, text, dataX, dataY, itemStyle, lineStyle }))
    })
    return <div id={id} style={style} className={className} ></div>
}

export default Chart