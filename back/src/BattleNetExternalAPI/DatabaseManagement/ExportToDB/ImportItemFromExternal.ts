import {exportToDB} from "./ExportToDB";
import {
    getItem,
    getItemClass,
    getItemClassIndex,
    getItemMedia,
    getItemStats
} from "../../ExternalApiCall/ItemAPIRequest";
import {importFromDB} from "../ImportToDB/ImportFromDB";
import {v4 as uuid} from "uuid";
import {Item} from "../../../Model/WOWItemModel/ItemModel";
import {QueryResult} from "pg";

const itemClassIndexQueryPost: string = "INSERT INTO item_class (id, name) VALUES ($1, $2)ON CONFLICT DO NOTHING";
const itemClassQueryPost: string = "INSERT INTO item_subclass (subclass_id, subclass_name,class_id) VALUES ($1, $2,$3)ON CONFLICT DO NOTHING";
const itemSubClassQueryUpdate: string = "update item_subclass set it_it = $1, en_gb = $2, zh_tw = $3, ko_kr = $4, en_us = $5, es_mx = $6, pt_br = $7, es_es = $8, zh_cn = $9, fr_fr = $10, de_de = $11 ,ru_ru = $12 where subclass_uuid = $13"
const itemClassQueryUpdate: string = "update item_class set it_it = $1, en_gb = $2, zh_tw = $3, ko_kr = $4, en_us = $5, es_mx = $6, pt_br = $7, es_es = $8, zh_cn = $9, fr_fr = $10, de_de = $11 ,ru_ru = $12 where id = $13"
const itemClassIndexQueryGet: string = "SELECT id FROM item_class";
const itemSubClassQueryGet: string = "SELECT subclass_id,class_id,it_it from item_subclass";
const itemQueryPost:string="INSERT INTO item_table (id, level, sell_price, item_subclass_uuid, is_equippable, purchase_quantity, img_url, item_class_id, quality_type, max_count, is_stackable, name_id, purchase_price, inventory_type, required_level) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15) ON CONFLICT DO NOTHING";
const itemSubClassUuidQueryGet: string = "SELECT subclass_uuid FROM item_subclass WHERE class_id = $1 AND subclass_id = $2";
const itemNamePost:string="INSERT INTO item_name_language (item_language_id, it_it, ru_ru, en_gb, zh_tw, ko_kr, en_us, es_mx, pt_br, es_es, zh_cn, fr_fr, de_de) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11, $12,$13) ON CONFLICT DO NOTHING";
const itemQualityPost:string="INSERT INTO quality_type (quality_type, it_it, ru_ru, en_gb, zh_tw, ko_kr, en_us, es_mx, pt_br, es_es, zh_cn, fr_fr, de_de) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11, $12,$13) ON CONFLICT DO NOTHING";
const itemInventoryTypePost:string="INSERT INTO inventory_type (inventory_type, it_it, ru_ru, en_gb, zh_tw, ko_kr, en_us, es_mx, pt_br, es_es, zh_cn, fr_fr, de_de) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13) ON CONFLICT DO NOTHING";
const itemIdGet: string = "SELECT id FROM item_table WHERE item_subclass_uuid = $1";
const itemGetAllId: string = "SELECT id,item_stats FROM item_table";
const countItemGet: string = "SELECT count(*) FROM item_table WHERE item_subclass_uuid = $1"
const itemStatsQueryPost: string = "UPDATE item_table SET item_stats = $1 WHERE id=$2";

export async function exportItemClassIndex() {
    const exportedItemClassIndex = await getItemClassIndex();
    exportedItemClassIndex.item_classes.forEach(itemClassIndex => {
        exportToDB([itemClassIndex.id, itemClassIndex.name], itemClassIndexQueryPost);
    })
}

async function exportItemClass(itemClassIndexId: number) {
    const exportedItemClass = await getItemClass(itemClassIndexId);
    exportedItemClass.item_subclasses.forEach(itemClass => {
        exportToDB([itemClass.id, itemClass.name, itemClassIndexId], itemClassQueryPost);
    })
}

export async function exportAllItemClass() {
    importFromDB(itemClassIndexQueryGet, []).then(r => {
        r.rows.forEach(itemClassIndex => {
            exportItemClass(itemClassIndex.id);
        })
    })
}

async function exportItem(itemClassId: number, itemSubClassId: number) {
    const exportedItem = await getItem(itemClassId, itemSubClassId);
    const importSubclassId = await importFromDB(itemSubClassUuidQueryGet, [itemClassId,itemSubClassId])
    const itemId = await importFromDB(itemIdGet, [importSubclassId.rows[0].subclass_uuid])
    const countItemTableForSubclass = await importFromDB(countItemGet, [importSubclassId.rows[0].subclass_uuid])
    if(exportedItem.pageSize > countItemTableForSubclass.rows[0].count){
        for(const item of exportedItem.results) {
            if(itemId.rows[0]){
                if(item.data.id !== itemId.rows[0].id){
                    console.log("item subclass fill but not full")
                    await exportingItem(item,importSubclassId,itemClassId);
                }else{
                    console.log("Already Exist",item.data.id,itemId.rows[0].id);
                }
            }else{
                console.log("item subclass not already exist")
                await exportingItem(item,importSubclassId,itemClassId);
            }
        }
        console.log("Done")
    }else{
        console.log("Subclass is Full",importSubclassId.rows[0].subclass_uuid)
    }
}

export function exportAllItem() {
    importFromDB(itemSubClassQueryGet, []).then(async r => {
        for (const row of r.rows) {
            if(!row.it_it){
                await exportItem(row.class_id, row.subclass_id);
                console.log("Still Running")
            }
        }
        console.log("Done for the class")
    })
}


function exportAllItemMedia(itemId:number) {
    return getItemMedia(itemId);
}

async function exportingItem(item:Item,importSubclassId:QueryResult<any>,itemClassId:number){
    const itemMedia = await getItemMedia(item.data.id);
    const itemLanguageItemUuuid = uuid();
    console.log(importSubclassId.rows[0])
    console.log("start export item")
    await exportToDB([item.data.item_class.name.it_IT,item.data.item_class.name.en_GB,item.data.item_class.name.zh_TW,item.data.item_class.name.ko_KR,item.data.item_class.name.en_US,item.data.item_class.name.es_MX,item.data.item_class.name.pt_BR,item.data.item_class.name.es_ES,item.data.item_class.name.zh_CN,item.data.item_class.name.fr_FR,item.data.item_class.name.de_DE,item.data.item_class.name.ru_RU,item.data.item_class.id],itemClassQueryUpdate)
    console.log("update item class")
    await exportToDB([item.data.item_subclass.name.it_IT,item.data.item_subclass.name.en_GB,item.data.item_subclass.name.zh_TW,item.data.item_subclass.name.ko_KR,item.data.item_subclass.name.en_US,item.data.item_subclass.name.es_MX,item.data.item_subclass.name.pt_BR,item.data.item_subclass.name.es_ES,item.data.item_subclass.name.zh_CN,item.data.item_subclass.name.fr_FR,item.data.item_subclass.name.de_DE,item.data.item_subclass.name.ru_RU,importSubclassId.rows[0].subclass_uuid],itemSubClassQueryUpdate)
    console.log("update item sub class")
    await exportToDB([item.data.inventory_type.type,item.data.inventory_type.name.it_IT,item.data.inventory_type.name.ru_RU,item.data.inventory_type.name.en_GB,item.data.inventory_type.name.zh_TW,item.data.inventory_type.name.ko_KR,item.data.inventory_type.name.en_US,item.data.inventory_type.name.es_MX,item.data.inventory_type.name.pt_BR,item.data.inventory_type.name.es_ES,item.data.inventory_type.name.zh_CN,item.data.inventory_type.name.fr_FR,item.data.inventory_type.name.de_DE],itemInventoryTypePost)
    console.log("update item inventory type")
    await exportToDB([item.data.quality.type,item.data.quality.name.it_IT,item.data.quality.name.ru_RU,item.data.quality.name.en_GB,item.data.quality.name.zh_TW,item.data.quality.name.ko_KR,item.data.quality.name.en_US,item.data.quality.name.es_MX,item.data.quality.name.pt_BR,item.data.quality.name.es_ES,item.data.quality.name.zh_CN,item.data.quality.name.fr_FR,item.data.quality.name.de_DE],itemQualityPost)
    console.log("update item quality")
    await exportToDB([itemLanguageItemUuuid,item.data.name.it_IT,item.data.name.ru_RU,item.data.name.en_GB,item.data.name.zh_TW,item.data.name.ko_KR,item.data.name.en_US,item.data.name.es_MX,item.data.name.pt_BR,item.data.name.es_ES,item.data.name.zh_CN,item.data.name.fr_FR,item.data.name.de_DE], itemNamePost)
    console.log("update item name")
    await exportToDB([item.data.id, item.data.level, item.data.sell_price,importSubclassId.rows[0].subclass_uuid, item.data.is_equippable, item.data.purchase_quantity, itemMedia,itemClassId, item.data.quality.type, item.data.max_count, item.data.is_stackable, itemLanguageItemUuuid,item.data.purchase_price, item.data.inventory_type.type,item.data.required_level,], itemQueryPost);
    console.log("Done importing to db the item :",item.data.id)
}

async function exportItemStats(itemId:number) {
    const itemStats = await getItemStats(itemId);
    await exportToDB([itemStats,itemId],itemStatsQueryPost)
}

export function exportAllItemStats () {
    importFromDB(itemGetAllId, []).then(async r => {
        for(const row of r.rows) {
            if(!row.item_stats){
            await exportItemStats(row.id);
            console.log("item_stats exported for the item :",row.id)
            }
        }
    })
}