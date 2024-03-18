import axios from "axios";
import {Params} from "../../Model/ApiSetUpModel/FetchingModel";
import {GlobalVar, localeVar, regionVar} from "../../GlobalVar";
import {ItemClassIndexModel} from "../../Model/WOWItemModel/ItemClassIndexModel";
import {ItemClassModel} from "../../Model/WOWItemModel/ItemClassModel";
import {ItemPage} from "../../Model/WOWItemModel/ItemModel";

const itemClassIndexParams: Params = {
    namespace: GlobalVar.static + regionVar.USA,
    locale: localeVar.EN,
    access_token: GlobalVar.access_token
}


export async function getItemClassIndex(): Promise<ItemClassIndexModel> {
    return axios.get(GlobalVar.baseUrl + GlobalVar.itemClassIndexUrl, {
        params: itemClassIndexParams
    })
        .then(response => {
            return response.data;
        })
        .catch(error => {
            console.log(error);
        });
}

export async function getItemClass(itemClassIndexId: number):Promise<ItemClassModel> {
    return axios.get(GlobalVar.baseUrl + GlobalVar.itemClassUrl+itemClassIndexId, {
        params: itemClassIndexParams
    })
        .then(response => {
            return response.data;
        })
        .catch(error => {
            console.log(error);
        });

}

export async function getItem(itemClassId: number,itemSubClassID:number,page:number=1):Promise<ItemPage> {
    return axios.get(GlobalVar.baseUrl + GlobalVar.itemUrl, {
        params:
            {
                namespace: GlobalVar.static + regionVar.USA,
                _page:page,
                access_token: GlobalVar.access_token,
                _pageSize:1000,
                ["item_class.id"]:itemClassId,
                ["item_subclass.id"]: itemSubClassID,
            }
    })
        .then(response => {
            return response.data;
        })
        .catch(error => {
            console.log(error);
        });

}

export async function getItemMedia(itemId: number):Promise<string> {
    return axios.get(GlobalVar.baseUrl + GlobalVar.itemMediaUrl+itemId, {
        params: itemClassIndexParams
    })
        .then(response => {
            return response.data.assets[0].value;
        })
        .catch(error => {
            console.log(error);
        });

}

export async function getItemStats(itemId: number):Promise<string> {
    return axios.get(GlobalVar.baseUrl + GlobalVar.itemStatsUrl+itemId, {
        params: itemClassIndexParams
    })
        .then(response => {
            return response.data;
        })
        .catch(error => {
            console.log(error);
        });

}

