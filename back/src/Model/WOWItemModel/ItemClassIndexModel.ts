interface ItemClass {
    key:Key,
    id:number,
    name: string,
}

interface ItemClassIndexlinks{
    self:Key;
}

interface Key{
    href: string,
}

export interface ItemClassIndexModel{
    _links:ItemClassIndexlinks,
    item_classes:ItemClass[],
}