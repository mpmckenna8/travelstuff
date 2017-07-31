create table users(
    u_id serial primary key,  --this is my pk
    name text,
    email text,
    password text,
    photo text,
    inventory text[],           -- to be a list of the items in the inventory, maybe should be a integer and reference a thing in items
    inventoryquantity integer[],-- each thing should correspond to above to give the amount of it that there is.
    inventorydescription text[],
    packs integer[]
);

create table items(
    p_id serial primary key,
    name text,
    location text,
    description text
);

create table places(
    p_id serial primary key,
    name text,
    city text,
    country text,
    description text
);

create table packs(
    site_id serial primary key,
    name text,
    photo text,
    p_id integer references places(p_id) -- this creates my one to many relationships
);



INSERT INTO users values (DEFAULT, 'test', 'test', '1', 'none.jpg', null, null, null);
