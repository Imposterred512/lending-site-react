import {spawn} from "child_process";

// const serverProcess = spawn('node', ['./src/db_server.js'])
// setTimeout(() => serverProcess.kill(), 5000);

(async () => 
    {console.log((await fetch('http://localhost:3000/getColumnDataByTimeInterval?c=temperature&s=2024-10-01&e=2024-10-01')).status)})()
