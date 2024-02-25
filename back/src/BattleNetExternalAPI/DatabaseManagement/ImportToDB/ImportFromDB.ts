import {databasePool} from "../../../GlobalVar";
import {QueryResult} from "pg";

export async function importFromDB(queryText: string, values: any[]): Promise<QueryResult> {
    return await databasePool.query(queryText, values)
}