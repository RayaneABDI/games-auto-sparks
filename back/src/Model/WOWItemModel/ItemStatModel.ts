import {ItemNameLanguage, Key} from "./ItemModel";

export interface ItemStatModel{
    _links: Link;
    id: number;
    name: ItemNameLanguage,
    quality: ItemQuality,
    level: number,
    required_level: number,
    media: ItemMedia
    item_class: ItemClass,
    item_subclass:ItemSubClass,
    inventory_type: ItemInventoryType,
    purchase_price: number,
    sell_price: number,
    max_count: number,
    is_equippable: number,
    is_stackable: boolean,
    preview_item:PreviewItemStat,
    purchase_quantity: number

}

export interface ItemQuality{
        type: string,
        name: ItemNameLanguage,
}

interface ItemMedia{
    key: Key;
    id:number
}

interface ItemRef{
    key: Key;
    id:number
}

interface Link{
    self:Key;
}

interface ItemClass{
    key: Key;
    name:ItemNameLanguage;
    id:number;
}

interface ItemSubClass{
    key: Key;
    name:ItemNameLanguage;
    id:number;
}
interface ItemInventoryType{
    type: string,
    name: ItemNameLanguage,
}
interface ItemBinding{
    type: string,
    name: ItemNameLanguage,
}

interface Weapon{
    damage:WeaponDamage,
    attack_speed:WeaponAttackSpeed,
    dps:WeaponDPS,
}
interface WeaponDamage{
    min_value:number,
    max_value: number,
    display_string:ItemNameLanguage,
    damage_class:DamageClass,

}
interface DamageClass{
    type: string,
    name: ItemNameLanguage,

}
interface WeaponAttackSpeed{
    value:number,
    display_string:ItemNameLanguage,
}
interface WeaponDPS {
    value: number,
    display_string: ItemNameLanguage,
}
interface WeaponStatsType{
    type: string,
    name: ItemNameLanguage,
}
interface WeaponStats{
    type: WeaponStatsType,
    value: number,
    is_negated: boolean,
    display: WeaponStatsDisplay
}

interface WeaponStatsDisplay{
    display_string: ItemNameLanguage,
    color: WeaponStatsDisplayColor,
}
interface WeaponStatsDisplayColor{
    r: number,
    g: number,
    b: number,
    a: number,
}
interface WeaponSpell{
    spell:Spell,
    description: string

}

interface Spell{
    key: Key;
    name:ItemNameLanguage;
    id:number;

}
interface Requirements{
    level:RequirementLevel
}
interface RequirementLevel{
    value: number,
    display_string: ItemNameLanguage,
}

interface Level{
    value: number,
    display_string: ItemNameLanguage,
}

interface WeaponDurability{
    value: number,
    display_string: ItemNameLanguage,
}

interface SellPrice{
    value: number,
    display_string: ItemSellPriceDisplay,
}

interface ItemSellPriceDisplay{
    header:ItemNameLanguage,
    gold:ItemNameLanguage,
    silver:ItemNameLanguage,
    copper:ItemNameLanguage,

}

export interface PreviewItemStat{
    item: ItemRef,
    context: number,
    bonus_list:number[],
    quality: ItemQuality,
    name: ItemNameLanguage,
    media: ItemMedia,
    item_class:ItemClass,
    item_subclass:ItemSubClass,
    inventory_type:ItemInventoryType,
    binding:ItemBinding,
    sell_price?: SellPrice,
    unique_equipped?: ItemNameLanguage,
    weapon?: Weapon,
    stats?: WeaponStats[],
    spells?: WeaponSpell[],
    requirements: Requirements,
    level: Level,
    durability?: WeaponDurability,
    is_subclass_hidden?:boolean,
}