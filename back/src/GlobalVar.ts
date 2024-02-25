import {Pool} from "pg";
export enum GlobalVar{
    static = 'static-',
    dynamic = 'dynamic-',
    jsonResponseType ='json',
    baseUrl = 'https://us.api.blizzard.com/data/wow/',
    itemClassIndexUrl= 'item-class/index',
    itemClassUrl = 'item-class/',
    itemMediaUrl = 'media/item/',
    itemUrl="search/item",
    access_token="KR21dbQoKxytkajTDGOHXAMtMJXXvFGDnx"
}

export enum regionVar{
    EUROPE ='eu',
    USA = 'us',
    KOREA = 'kr',
    JAPAN = 'jp',
    TAIWAN = 'tw',
    RUSSIA = 'ru',
}

export enum DatabaseTable{
    ITEM_CLASS="item_class",
    UPDATE_TABLE="update_table"
}

export enum localeVar{
    FR = 'fr_FR',
    EN = 'en_US',
    DE = 'de_DE',
    ES = 'es_ES',
    IT = 'it_IT',
    JA = 'ja_JP',
    KO = 'ko_KR',
    PT = 'pt_PT',
}

export const databasePool = new Pool({
    user : 'rayane',
    host : 'localhost',
    database : 'postgres',
    password :'password',
    port :  5432,
});
