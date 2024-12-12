import NavBar from "./components/navbar/NavBar"
import navbar_data from "./data/navbar_data"
import "./css/App.css"
import ChartContainer from "./components/chart/ChartContainer"
import {all} from "./data/charts_data"

function App() {
  return (
    <>
      <NavBar {...navbar_data} />
      <ChartContainer chartsData={all}/>
    </>
  )
}

export default App
