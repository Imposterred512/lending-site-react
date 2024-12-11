import { useEffect } from "react"
import * as echarts from 'echarts'

const createOption = ({ type = "line", text = "[нет названия]", dataX = [], dataY = [] }) => ({
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
        type: 'value'
    },
    series: [{
        name: '',
        type: type,
        data: dataY,
        smooth: true,
        barMaxWidth: 40,
        barMinWidth: 10
    }]
})

const Chart = ({ id, type = "line", text = "[нет названия]", dataX = [], dataY = [], style }) => {
    if (id == undefined) throw new Error("LineChart->id is not")
    useEffect(() => {
        let chart = echarts.init(document.getElementById(id))
        chart.setOption(createOption({ type, text, dataX, dataY }))
    })
    return <div id={id} style={style} ></div>
}

export default Chart