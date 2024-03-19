export interface ItemPage{
    page: number;
    pageSize: number;
    maxPageSize: number;
    pageCount: number;
    results:Item[];
}
export interface Item{
    key: Key;
    data: ItemData;
}
export interface Key{
    href: string;
}
interface ItemData{
    level: number;
    required_level: number;
    sell_price: number;
    item_subclass:ItemSubClass;
    is_equippable:boolean;
    purchase_quantity:number;
    media:ItemMedia;
    item_class:ItemClass;
    quality:ItemQuality;
    max_count:number;
    is_stackable:boolean;
    name:ItemNameLanguage;
    purchase_price:number;
    id:number;
    inventory_type:InventoryType;
}
interface ItemSubClass{
    name:ItemNameLanguage;
    id:number;
}

interface ItemMedia{
    id:number
}
interface ItemClass{
    name:ItemNameLanguage;
    id:number;
}

interface ItemQuality{
    name:ItemNameLanguage;
    type:string;
}
interface InventoryType{
    name:ItemNameLanguage;
    type:string;
}
export interface ItemNameLanguage{
    it_IT	:	string;
    ru_RU	:	string;
    en_GB	:	string;
    zh_TW	:	string;
    ko_KR	:	string;
    en_US	:	string;
    es_MX	:	string;
    pt_BR	:	string;
    es_ES	:	string;
    zh_CN	:	string;
    fr_FR	:	string;
    de_DE   :   string;
}