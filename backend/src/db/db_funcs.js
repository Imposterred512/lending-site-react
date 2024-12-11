import { response } from 'express';
import pg from 'pg';
const { Pool } = pg;

export class Entitie {
    tableName = null
    table = {
        id: "serial primary key",
    }
    constructor(name, table) {
        this.tableName = name
        Object.keys(table).forEach(it => this.table[it] = table[it])
        this.delTable = `delete table ${this.tableName} where 1=1`
        this.delAll = `drop table ${this.tableName}`
        this.del = `delete from ${this.tableName} where id=$1`
        this.findById = `select * from ${this.tableName} where id=$1`
        this.findAll = `select * from ${this.tableName}`
        this.findAllByColumn = (column) => `select ${column} from ${this.tableName}`
        this.add = "insert into " + this.tableName + "(" +
            (() => Object.keys(table).join(", "))() + ") values(" +
            (() => Object.keys(table).map((unnecessary, i) => `$${i + 1}`).join(", "))() + ")"
        this.createTable = "create table " + this.tableName + "(" +
            (() => Object.entries(this.table).map(([name, value]) => `${name} ${value}`).join(', '))() + ")";
        Object.keys(this).forEach(field => {
            let Field = field.charAt(0).toUpperCase() + field.slice(1)
            this["set" + Field] = (setData) => { this[field] = setData }
            this["get" + Field] = () => this[field]
        })
    }
}

export class DBManager {
    constructor({ config, entitie }) {
        this.pool = new Pool(config)
        this.entitie = entitie;
    }
    addCustom = (name, request) => this[name] = async (arg = []) => this.pool.query(request, arg)
    setEntitie = (entitie) => this.entitie = entitie
    setPool = (config) => this.pool = new Pool(config)
    createTable = () => this.pool.query(this.entitie.createTable, [])
    delTable = () => this.pool.query(this.entitie.delTable, [])
    delAll = () => this.pool.query(this.entitie.delAll, [])
    del = (id) => this.pool.query(this.entitie.del, [id])
    add = (array) => this.pool.query(this.entitie.add, array)
    find = (id) => this.pool.query(this.entitie.findById, [id])
    findAll = async () => (await this.pool.query(this.entitie.findAll, [])).rows
    findAllByColumn = async (column) => 
        (await this.pool.query(this.entitie.findAllByColumn(column), [])).rows.map(it => Object.entries(it).pop()[1])
    exit = () => this.pool.end()
}
