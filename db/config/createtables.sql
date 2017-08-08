-- creates the neccessary tables in our db for the inventory app
-- to modify a table and add a column like category to items:
-- ALTER TABLE items ADD COLUMN category text;
create table users(
    u_id serial primary key,  --this is my pk
    name text,
    email text,
    password text,
    photo text,
    inventory int[],           -- to be a list of the items in the inventory, maybe should be a integer and reference a thing in items
    inventoryquantity integer[],-- each thing should correspond to above to give the amount of it that there is.
    inventorydescription text[],
    location text[],
    packs integer[]
);

create table items(
    p_id serial primary key,
    name text,
    description text,
    weight double precision,
    value double precision,
    category text
);

-- do lat lon when i want to do
create table places(
    p_id serial primary key,
    name text,
    city text,
    country text,
    description text
);

-- maybe do a parent thing too so packs can be in packs kind of.
create table packs(
    site_id serial primary key,
    name text,
    photo text,
    weight_capacity double precision,
    volume_capacity double precision,
    p_id integer references places(p_id) -- this creates my one to many relationships
);

INSERT INTO places VALUES (DEFAULT,
        'home',
        'sf',
        'usa', 'where i live');
INSERT INTO packs VALUES (default, 'day pack', null, 100.00, 20.0, 1);
INSERT INTO users values (DEFAULT, 'test', 'test', '1.0', 'none.jpg', null, null, null);
