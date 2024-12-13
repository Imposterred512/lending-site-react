import express, { response } from 'express'
import { DBManager, Entitie } from './db/db_funcs.js'
import cors from 'cors';
import config from './db/db_config.js'
import table from './db/db_table.js'
import dotenv from 'dotenv'

dotenv.config({ path: '../frontend/.env'});
const {VITE_FRONTEND_URL, VITE_SERVER_DB_PORT} = process.env

const firstLetterToCase = (text) => `${text}`.charAt(0).toUpperCase() + `${text}`.slice(1)
const checkDate = (date) => {
    let temp = date.split('-')
    if(temp.length != 3) return false
    if(temp[0].length != 4) return false
    if(temp[1].length != 2) return false
    if(temp[2].length != 2) return false
    return true  
}

const app = express()

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", VITE_FRONTEND_URL);
    res.setHeader("Access-Control-Allow-Methods", "GET");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
});

const db_manager = new DBManager({
    config,
    entitie: new Entitie(table.name, table.columns)
})

const db_columns = ['*', ...db_manager.getCoumns()] 

const addFuncFindByTimeInterval = (column) =>
    db_manager.addCustom(`findByTimeInterval${firstLetterToCase(column)}`,
        `select ${column} from ${db_manager.entitie.tableName} where timestamp between $1 and $2`)

const addFuncFindEveryNthByColumn = (column) =>
    db_manager.addCustom(`findEveryNthByColumn${firstLetterToCase(column)}`,
        `select ${column} from ${db_manager.entitie.tableName} where id % $1 = 0`)

const columns = ['*', ...db_manager.getCoumnsWithOutId()]
columns.forEach(column => {
    addFuncFindByTimeInterval(column)
    addFuncFindEveryNthByColumn(column)
});

db_manager.addCustom('findEveryNthByColumn', `select * from ${db_manager.entitie.tableName} where id % $1 = 0`)

app.get('/getAll', (req, res) => {
    db_manager.findAll().then(json => res.json(json))
})

app.get('/getColumnData', (req, res) => {
    const { c } = req.query
    if(!db_columns.includes(c)) {
        res.json({parameter: "incorrect"})
        return
    }
    db_manager.findAllByColumn(c).then(json => res.json(json))
        
})

app.get('/getColumnDataByTimeInterval', (req, res) => {
    let { c, s, e } = req.query
    if(!db_columns.includes(c)) {
        res.json({parameter: "incorrect"})
        return
    }
    if(!checkDate(s) || !checkDate(e)) {
        res.json({parameter: "incorrect"})
        return
    }
    s += ' 00:00:00+03'
    e += ' 23:59:59+03'
    if (c != '*')
        db_manager['findByTimeInterval' + firstLetterToCase(c)]([s, e])
            .then(response => response.rows)
            .then(rows => res.json(rows.map(it => Object.entries(it).pop()[1])))
    else
        db_manager['findByTimeInterval' + firstLetterToCase(c)]([s, e])
            .then(response => response.rows)
            .then(rows => res.json(rows))
})

app.get('/getEveryNthByColumn', (req, res) => {
    const { c, n } = req.query
    if(!db_columns.includes(c)) {
        res.json({parameter: "incorrect"})
        return
    }
    if(n < 0) {
        res.json({parameter: "incorrect"})
        return
    }
    if (c != '*')
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

app.listen(VITE_SERVER_DB_PORT, () => {
    console.log("Server start: " + VITE_SERVER_DB_PORT + " port") 
})