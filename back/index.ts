import express, { Request, Response , Application } from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import {updateDataBase} from "./src/BattleNetExternalAPI/DatabaseManagement/ImportToDB/UpdateDatabase";
import {getItem} from "./src/BattleNetExternalAPI/ExternalApiCall/ItemAPIRequest";
import {exportAllItemClass} from "./src/BattleNetExternalAPI/DatabaseManagement/ExportToDB/ImportItemFromExternal";
//For env File
dotenv.config();

const app: Application = express();
const port = process.env.PORT || 8080;

app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);

updateDataBase()

app.get('/', (request, response) => {
    response.json("")
})
app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})

//test git