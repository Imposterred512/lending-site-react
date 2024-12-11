import express from 'express'
import { DBManager, Entitie } from './db/db_funcs.js'
import config from './db/db_config.js'
import table from './db/db_table.js'

const app = express()

const db_manager = new DBManager({
    config,
    entitie: new Entitie(table.name, table.columns)
})

app.get('/getAll', (req, res) => {
    db_manager.findAll().then(json => res.json(json))
})

app.get('/getColumnData', (req, res) => {
    const { c } = req.query
    db_manager.findByColumn(c).then(json => res.json(json))
})

app.listen(3000)