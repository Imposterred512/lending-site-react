import express, { response } from 'express'
import { DBManager, Entitie } from './db/db_funcs.js'
import cors from 'cors';
import config from './db/db_config.js'
import table from './db/db_table.js'

const serverConfig = {
    port: 3000
}

const firstLetterToCase = (text) => `${text}`.charAt(0).toUpperCase() + `${text}`.slice(1)

const app = express()

app.use(cors({origin: 'http://localhost:5173'}))

const db_manager = new DBManager({
    config,
    entitie: new Entitie(table.name, table.columns)
})

const addFuncFindByTimeInterval = (column) =>
    db_manager.addCustom(`findByTimeInterval${firstLetterToCase(column)}`,
        `select ${column} from ${db_manager.entitie.tableName} where timestamp between $1 and $2`)

const addFuncFindEveryNthByColumn = (column) =>
    db_manager.addCustom(`findEveryNthByColumn${firstLetterToCase(column)}`,
        `select ${column} from ${db_manager.entitie.tableName} where id % $1 = 0`)

const columns = ['*', 'humidity', 'pressure', 'light', 'temperature', 'timestamp']
columns.forEach(column => {
    addFuncFindByTimeInterval(column)
    addFuncFindEveryNthByColumn(column)
});

db_manager.addCustom('findEveryNthByColumn', `SELECT * FROM ${db_manager.entitie.tableName} WHERE id % $1 = 0`)

app.get('/getAll', (req, res) => {
    db_manager.findAll().then(json => res.json(json))
})

app.get('/getColumnData', (req, res) => {
    const { c } = req.query
    db_manager.findAllByColumn(c).then(json => res.json(json))
})

app.get('/getColumnDataByTimeInterval', (req, res) => {
    let { c, s, e } = req.query
    s += ' 00:00:00+03'
    e += ' 23:59:59+03'
    if(c != '*')
        db_manager['findByTimeInterval' + firstLetterToCase(c)]([s, e])
            .then(response => response.rows)
            .then(rows => res.json(rows.map(it => Object.entries(it).pop()[1])))
    else 
        db_manager['findByTimeInterval' + firstLetterToCase(c)]([s, e])
            .then(response => response.rows)
            .then(rows => res.json(rows))
})

app.get('/getEveryNthByColumn', (req, res) => {
    const {c, n} = req.query
    if(c != '*') 
        db_manager["findEveryNthByColumn" + firstLetterToCase(c)]([n])
            .then(response => response.rows)
            .then(rows => res.json(rows.map(it => Object.entries(it).pop()[1])))
    else 
        db_manager["findEveryNthByColumn" + firstLetterToCase(c)]([n])
            .then(response => response.rows)
            .then(rows => res.json(rows)) 
})

app.get('/exit', (req, res) => {
    db_manager.exit()
    res.json({ "status": "exit" })
})

app.listen(serverConfig.port)