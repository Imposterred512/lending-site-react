import Chart from "./Chart"
import "./ChartContainer.scss"

const getGridConfig = (columns, rows) => ({
    gridColumn: columns,
    gridRow: rows
})

const ChartContainer = ({chartsData = []}) => 
    <div className="chart-container">
        {chartsData.map((chartData, i) => 
            <Chart key={`chart-${i}`}  {...chartData} style={((i) => {
                switch(i){ 
                    case 0: return getGridConfig('1/2', '1/6')
                    case 1: return getGridConfig('2/3', '1/6')
                    case 2: return getGridConfig('1/2', '6/11')
                    case 3: return getGridConfig('2/3', '6/11')
                }
            })(i)}/>)}
    </div>

export default ChartContainer