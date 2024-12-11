import {spawn} from "child_process";

const server_config = {
    url: "http://localhost:3000",
    endpoints: [
        "/getAll",
        "/getColumnData?c=temperature",
        "/getColumnDataByTimeInterval",
        "/exit"
    ]
}

describe('db_server', () => {
    let serverProcess
    beforeAll(async () => {
        serverProcess = spawn('node ./src/db_server.js', { stdio: 'inherit' });
    });
    afterAll(() => {
        serverProcess.kill()
    })
    server_config.endpoints.forEach(endpoint => {
        test(`testing endpoint ${endpoint}`, async () => 
            expect((await fetch(server_config.url + endpoint)).ok).toBe(true))
    })
})