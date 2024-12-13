import Chart from "./Chart";
import "./ChartFeed.scss"

const ChartFeed = ({chartsData = []}) => 
    <div className="chart-feed">
        {chartsData.map((chartData, i) => 
            <Chart key={`chart-${i}`} {...{className: "chart-feed-item", ...chartData}}/>)
            }
    </div>

export default ChartFeed