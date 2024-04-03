create table item_class
(
    id    integer not null
        primary key,
    name  text    not null,
    it_it varchar,
    en_gb varchar,
    zh_tw varchar,
    ko_kr varchar,
    en_us varchar,
    es_mx varchar,
    pt_br varchar,
    es_es varchar,
    zh_cn varchar,
    fr_fr varchar,
    de_de varchar,
    ru_ru varchar
);

alter table item_class
    owner to rayane;

create table update_table
(
    table_id          uuid      default gen_random_uuid() not null
        constraint table_id_pk
            primary key,
    table_name        varchar
        constraint table_name_pk
            unique,
    last_modification timestamp default now()
);

alter table update_table
    owner to rayane;

create table item_subclass
(
    subclass_id   integer                        not null,
    subclass_name varchar,
    class_id      integer                        not null
        constraint class_id_pk
            references item_class,
    subclass_uuid uuid default gen_random_uuid() not null
        constraint subclass_uuid_pk
            primary key,
    it_it         varchar,
    en_gb         varchar,
    zh_tw         varchar,
    ko_kr         varchar,
    en_us         varchar,
    es_mx         varchar,
    pt_br         varchar,
    es_es         varchar,
    zh_cn         varchar,
    fr_fr         varchar,
    de_de         varchar,
    ru_ru         varchar
);

alter table item_subclass
    owner to rayane;

create table quality_type
(
    quality_type varchar not null
        constraint quality_type_pk
            primary key,
    it_it        varchar,
    ru_ru        varchar,
    en_gb        varchar,
    zh_tw        varchar,
    ko_kr        varchar,
    en_us        varchar,
    es_mx        varchar,
    pt_br        varchar,
    es_es        varchar,
    zh_cn        varchar,
    fr_fr        varchar not null,
    de_de        varchar
);

alter table quality_type
    owner to rayane;

create table inventory_type
(
    inventory_type varchar not null
        constraint inventory_type_pk
            primary key,
    it_it          varchar,
    ru_ru          varchar,
    en_gb          varchar,
    zh_tw          varchar,
    ko_kr          varchar,
    en_us          varchar,
    es_mx          varchar,
    pt_br          varchar,
    es_es          varchar,
    zh_cn          varchar,
    fr_fr          varchar not null,
    de_de          varchar
);

alter table inventory_type
    owner to rayane;

create table item_name_language
(
    item_language_id uuid not null
        constraint item_name_language_pk
            primary key,
    it_it            varchar,
    ru_ru            varchar,
    en_gb            varchar,
    zh_tw            varchar,
    ko_kr            varchar,
    en_us            varchar,
    es_mx            varchar,
    pt_br            varchar,
    es_es            varchar,
    zh_cn            varchar,
    fr_fr            varchar,
    de_de            varchar
);

alter table item_name_language
    owner to rayane;

create table item_table
(
    id                 integer not null
        constraint table_item_id_pk
            primary key,
    level              integer,
    sell_price         integer,
    item_subclass_uuid uuid
        constraint item_sublass_id_fk
            references item_subclass,
    is_equippable      boolean,
    purchase_quantity  integer,
    img_url            varchar,
    item_class_id      integer
        constraint item_class_id_fk
            references item_class,
    quality_type       varchar
        constraint item_quality_fk
            references quality_type,
    max_count          integer,
    is_stackable       boolean,
    name_id            uuid
        constraint item_name_uuid_fk
            references item_name_language,
    purchase_price     integer,
    inventory_type     varchar
        constraint item_inventory_type_fk
            references inventory_type,
    required_level     integer,
    item_stats         jsonb
);

alter table item_table
    owner to rayane;


