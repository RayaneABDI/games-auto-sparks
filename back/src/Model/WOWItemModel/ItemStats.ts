export interface ItemStats{
  _links?: Links;
  id?: number;
  name?: string;
  quality?: Quality;
  level?: number;
  required_level?: number;
  media?: Media;
  item_class?: Iteminterface;
  item_subclass?: ItemSubClass;
  inventory_type?: InventoryType;
  purchase_price?: number;
  sell_price?: number;
  max_count?: number;
  is_equippable?: boolean;
  is_stackable?: boolean;
  preview_item?: PreviewItem;
  purchase_quantity?: number;
}

export interface Links {
  self?: Self;
}

export interface Self {
  href?: string;
}

export interface Quality {
  type?: string;
  name?: string;
}

export interface Media {
  key?: Key;
  id?: number;
}

export interface Key {
  href?: string;
}

export interface Iteminterface {
  key?: Key;
  name?: string;
  id?: number;
}

export interface ItemSubClass {
  key?: Key;
  name?: string;
  id?: number;
}

export interface InventoryType {
  type?: string;
  name?: string;
}

export interface PreviewItem {
  item?: Item;
  context?: number;
  bonus_list?: number[];
  quality?: Quality;
  name?: string;
  media?: Media;
  item_class?: Iteminterface;
  item_subclass?: ItemSubClass;
  inventory_type?: InventoryType;
  binding?: Binding;
  unique_equipped?: string;
  weapon?: Weapon;
  stats?: Stats[];
  spells?: Spells[];
  requirements?: Requirements;
  level?: Level;
  durability?: Durability;
}

export interface Item {
  key?: Key;
  id?: number;
}

export interface Binding {
  type?: string;
  name?: string;
}

export interface Weapon {
  damage?: Damage;
  attack_speed?: AttackSpeed;
  dps?: Dps;
}

export interface Damage {
  min_value?: number;
  max_value?: number;
  display_string?: string;
  damage_class?: DamageClass;
}

export interface DamageClass {
  type?: string;
  name?: string;
}

export interface AttackSpeed {
  value?: number;
  display_string?: string;
}

export interface Dps {
  value?: number;
  display_string?: string;
}

export interface Requirements {
  level?: Level;
}

export interface Level {
  value?: number;
  display_string?: string;
}

export interface Durability {
  value?: number;
  display_string?: string;
}

export interface Stats {
  type?: Type;
  value?: number;
  is_negated?: boolean;
  display?: Display;
}

export interface Type {
  type?: string;
  name?: string;
}

export interface Display {
  display_string?: string;
  color?: Color;
}

export interface Color {
  r?: number;
  g?: number;
  b?: number;
  a?: number;
}

export interface Spells {
  spell?: Spell;
  description?: string;
}

export interface Spell {
  key?: Key;
  name?: string;
  id?: number;
}