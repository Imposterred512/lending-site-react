import NavBar from "./components/navbar/NavBar"
import navbar_data from "./data/navbar_data"
import "./css/App.css"
import Chart from "./components/chart/Chart"
import { chart_1 } from "./data/charts_data"

function App() {
  return (
    <>
      <NavBar {...navbar_data} />
      <Chart {...chart_1} />
    </>
  )
}

export default App
