import { spawn } from "child_process";
import dotenv from 'dotenv'
import * as fs from 'fs'

dotenv.config({ path: '../frontend/.env'});
const {VITE_SERVER_DB_URL} = process.env

const extarctEndpoints = (path) => {
    let code = fs.readFileSync(path, {encoding: 'utf-8'}).split('\n')
    let result = code.reduce((res, line) => {
        if(line.startsWith('app.get'))
            res.push(line.split('app.get(\'')[1].split('\',')[0])
        return res
    }, [])
    return result
}

const server_config = {
    url: VITE_SERVER_DB_URL,
    endpoints: extarctEndpoints('./src/db_server.js')
}

describe('db_server', () => {
    let serverProcess
    beforeEach(async () => {
        serverProcess = spawn('node', ['./src/db_server.js']);
        await new Promise((resolve) => { setTimeout(resolve, 1000); });
    });
    server_config.endpoints.forEach(endpoint => {
        test(`testing endpoint ${endpoint}`, async () =>
            expect((await fetch(server_config.url + endpoint)).status).toBe(200))
    })
    afterEach(async () => {
        serverProcess.kill()
    })
})