import { Entitie, DBManager } from "../src/db/db_funcs"
import config from "../src/db/db_config"
import table from "../src/db/db_table"

const expectedData = {
    createTable: "create table data(" +
        "id serial primary key, " +
        "temperature double precision, " +
        "humidity double precision, " +
        "timestamp timestamp with time zone, " +
        "pressure double precision, " +
        "light double precision" + ")",
    delTable: "delete table data where 1=1",
    delAll: "drop table data",
    del: "delete from data where id=$1",
    findById: "select * from data where id=$1",
    findAll: "select * from data",
    add: "insert into data(temperature, humidity, timestamp, pressure, light) values($1, $2, $3, $4, $5)"
}

describe("Entitie", () => {
    let entitie
    beforeEach(() => { entitie = new Entitie(table.name, table.columns) })
    test('testing field createTable', () => { expect(entitie.getCreateTable()).toBe(expectedData.createTable) })
    test('testing field delTable', () => { expect(entitie.getDelTable()).toBe(expectedData.delTable) })
    test('testing field delAll', () => { expect(entitie.getDelAll()).toBe(expectedData.delAll) })
    test('testing field del', () => { expect(entitie.getDel()).toBe(expectedData.del) })
    test('testing field findById', () => { expect(entitie.getFindById()).toBe(expectedData.findById) })
    test('testing field findAll', () => { expect(entitie.getFindAll()).toBe(expectedData.findAll) })
    test('testing field add', () => { expect(entitie.getAdd()).toBe(expectedData.add) })
})

describe("DBManager", () => {
    let db_manager
    beforeEach(() => {
        db_manager = new DBManager({
            config,
            entitie: new Entitie(table.name, table.columns)
        })
    })
    test('testing db connection', () => {
        expect(db_manager.pool.query("select 1"))
        db_manager.exit()
    })
})