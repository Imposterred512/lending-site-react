import NavBar from "./components/navbar/NavBar"
import navbar_data from "./data/navbar_data"
import "./css/App.css"
import ChartContainer from "./components/chart/ChartContainer"
import {all} from "./data/charts_data"
import {BrowserView, MobileView} from 'react-device-detect'
import ChartFeed from "./components/chart/ChartFeed"

function App() {
  return (
    <>
      <NavBar {...navbar_data} />
      <BrowserView>
        <ChartContainer chartsData={all}/>
      </BrowserView>
      <MobileView>
        <ChartFeed chartsData={all}/>
      </MobileView>
    </>
  )
}

export default App
