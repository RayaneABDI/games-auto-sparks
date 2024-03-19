
import {exportToDB} from "../ExportToDB/ExportToDB";
import {importFromDB} from "./ImportFromDB";
import {
    exportAllItem,
    exportAllItemClass,
    exportAllItemStats,
    exportItemClassIndex,
} from "../ExportToDB/ImportItemFromExternal";

const date:Date = new Date();

const updateTableQuery ="INSERT INTO update_table (table_name) VALUES ($1)"
export async function updateDataBase() {
    exportAllItemStats()
    if(await checkDataBaseModification("item_class",5259600)){
        console.log("Need to update item_class")
        exportItemClassIndex().then(() => {
            console.log("ExportToDB Item Class Index done")
            updateDataBaseModification("item_class")
        })
    }if(await checkDataBaseModification("item_subclass",5259600)){
        console.log("Need to update item_subclass")
        exportAllItemClass().then(async () => {
            console.log("ExportToDB Item Class done")
            updateDataBaseModification("item_subclass")
        })
    }
    if(await checkDataBaseModification("item_table",5259600)){
        console.log("Need to update item_class")
        exportAllItem()
        exportAllItemStats()
        console.log("Export To Db Item done")
        updateDataBaseModification("quality_type")
        updateDataBaseModification("inventory_type")
        updateDataBaseModification("item_name_language")
        updateDataBaseModification("item_table")
    }
    else{
        console.log("No need to update")
    }
}

function updateDataBaseModification(tableName:string) {
    exportToDB([tableName],updateTableQuery).then(r => {
        console.log("Update Table Modification Date")
    })
}
async function checkDataBaseModification(tableName:string,minTimeStamp:number) {
    const lastModification = await importFromDB("SELECT update_table.last_modification FROM update_table WHERE table_name = $1", [tableName])
    if(lastModification.rows[0]){
        return (lastModification.rows[0].last_modification.getTime()/1000 - date.getTime()/1000 > minTimeStamp)
    }else{
        return true
    }

}