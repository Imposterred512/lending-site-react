import { spawn } from "child_process";

const server_config = {
    url: "http://localhost:3000",
    endpoints: [
        "/getAll",
        "/getColumnData?c=temperature",
        "/getColumnDataByTimeInterval?c=temperature&s=2024-10-01&e=2024-10-01",
        "/exit"
    ]
}

describe('db_server', () => {
    let serverProcess
    beforeEach(async () => {
        serverProcess = spawn('node', ['./src/db_server.js']);
        await new Promise((resolve) => {setTimeout(resolve, 300);});
    });
    server_config.endpoints.forEach(endpoint => {
        test(`testing endpoint ${endpoint}`, async () =>
            expect((await fetch(server_config.url + endpoint)).status).toBe(200))
    })
    afterEach(async () => {
        serverProcess.kill()
    })
})