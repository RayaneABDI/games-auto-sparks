import {databasePool} from "../../../GlobalVar";

export async function exportToDB(values:any[],queryText:string) {
    if(values){
        const client =  await databasePool.connect()
        try {
            await client.query('BEGIN')
            await client.query(queryText, values)
            await client.query("COMMIT")
        } catch (e) {
            await client.query('ROLLBACK')
            console.log("ExportToDB Failed")
            throw e
        } finally {
            client.release()
        }
    }else{
        console.log("The Values are Undefined")
    }
}