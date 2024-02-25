interface ItemSubClass {
    key:Key,
    id:number,
    name: string,
}

interface ItemClasslinks{
    self:Key;
}

interface Key{
    href: string,
}

export interface ItemClassModel{
    _links:ItemClasslinks,
    class_id:number
    name:string,
    item_subclasses:ItemSubClass[],
}