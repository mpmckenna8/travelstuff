--
-- PostgreSQL database dump
--

-- Dumped from database version 10.2
-- Dumped by pg_dump version 10.2

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET search_path = public, pg_catalog;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: items; Type: TABLE; Schema: public; Owner: matthewmckenna
--

CREATE TABLE items (
    p_id integer NOT NULL,
    name text,
    description text,
    weight double precision,
    value double precision,
    category text
);


ALTER TABLE items OWNER TO matthewmckenna;

--
-- Name: items_p_id_seq; Type: SEQUENCE; Schema: public; Owner: matthewmckenna
--

CREATE SEQUENCE items_p_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE items_p_id_seq OWNER TO matthewmckenna;

--
-- Name: items_p_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: matthewmckenna
--

ALTER SEQUENCE items_p_id_seq OWNED BY items.p_id;


--
-- Name: packs; Type: TABLE; Schema: public; Owner: matthewmckenna
--

CREATE TABLE packs (
    coll_id integer NOT NULL,
    name text,
    photo text,
    description text,
    weight_capacity double precision,
    volume_capacity double precision,
    p_id integer
);


ALTER TABLE packs OWNER TO matthewmckenna;

--
-- Name: packs_coll_id_seq; Type: SEQUENCE; Schema: public; Owner: matthewmckenna
--

CREATE SEQUENCE packs_coll_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE packs_coll_id_seq OWNER TO matthewmckenna;

--
-- Name: packs_coll_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: matthewmckenna
--

ALTER SEQUENCE packs_coll_id_seq OWNED BY packs.coll_id;


--
-- Name: places; Type: TABLE; Schema: public; Owner: matthewmckenna
--

CREATE TABLE places (
    p_id integer NOT NULL,
    name text,
    city text,
    country text,
    description text
);


ALTER TABLE places OWNER TO matthewmckenna;

--
-- Name: places_p_id_seq; Type: SEQUENCE; Schema: public; Owner: matthewmckenna
--

CREATE SEQUENCE places_p_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE places_p_id_seq OWNER TO matthewmckenna;

--
-- Name: places_p_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: matthewmckenna
--

ALTER SEQUENCE places_p_id_seq OWNED BY places.p_id;


--
-- Name: userpack; Type: TABLE; Schema: public; Owner: matthewmckenna
--

CREATE TABLE userpack (
    up_id integer NOT NULL,
    name text,
    packtype integer,
    items integer[]
);


ALTER TABLE userpack OWNER TO matthewmckenna;

--
-- Name: userpack_up_id_seq; Type: SEQUENCE; Schema: public; Owner: matthewmckenna
--

CREATE SEQUENCE userpack_up_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE userpack_up_id_seq OWNER TO matthewmckenna;

--
-- Name: userpack_up_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: matthewmckenna
--

ALTER SEQUENCE userpack_up_id_seq OWNED BY userpack.up_id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: matthewmckenna
--

CREATE TABLE users (
    u_id integer NOT NULL,
    name text,
    email text,
    password text,
    photo text,
    inventory integer[],
    inventoryquantity integer[],
    inventorydescription text[],
    location text[],
    userpacks integer[]
);


ALTER TABLE users OWNER TO matthewmckenna;

--
-- Name: users_u_id_seq; Type: SEQUENCE; Schema: public; Owner: matthewmckenna
--

CREATE SEQUENCE users_u_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE users_u_id_seq OWNER TO matthewmckenna;

--
-- Name: users_u_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: matthewmckenna
--

ALTER SEQUENCE users_u_id_seq OWNED BY users.u_id;


--
-- Name: items p_id; Type: DEFAULT; Schema: public; Owner: matthewmckenna
--

ALTER TABLE ONLY items ALTER COLUMN p_id SET DEFAULT nextval('items_p_id_seq'::regclass);


--
-- Name: packs coll_id; Type: DEFAULT; Schema: public; Owner: matthewmckenna
--

ALTER TABLE ONLY packs ALTER COLUMN coll_id SET DEFAULT nextval('packs_coll_id_seq'::regclass);


--
-- Name: places p_id; Type: DEFAULT; Schema: public; Owner: matthewmckenna
--

ALTER TABLE ONLY places ALTER COLUMN p_id SET DEFAULT nextval('places_p_id_seq'::regclass);


--
-- Name: userpack up_id; Type: DEFAULT; Schema: public; Owner: matthewmckenna
--

ALTER TABLE ONLY userpack ALTER COLUMN up_id SET DEFAULT nextval('userpack_up_id_seq'::regclass);


--
-- Name: users u_id; Type: DEFAULT; Schema: public; Owner: matthewmckenna
--

ALTER TABLE ONLY users ALTER COLUMN u_id SET DEFAULT nextval('users_u_id_seq'::regclass);


--
-- Data for Name: items; Type: TABLE DATA; Schema: public; Owner: matthewmckenna
--

COPY items (p_id, name, description, weight, value, category) FROM stdin;
1	macbook air	thin laptop	4.29999999999999982	\N	tool
4	Nalgene	1000 ml liquid holder	4.59999999999999964	\N	potion
6	Notebook	A collection of papers bound together for note taking.	1	\N	tool
7	Thermos	Drinking vessel to maintain temperature and seal.	2.20000000000000018	\N	potion
8	iPad	tablet from apple	1.30000000000000004	\N	electronics
5	e-reader	Tablet like device for reading.	2	\N	electronics
9	scarf	neck warming wear	0.5	\N	clothing
10	Coffee mug	Vessel for keeping coffee warm and seals well	2	\N	potion
11	Pen	ink writing utensil.	0.5	\N	tool
13	Battery for charging electronics	portable batter for charging phones and such.	1	\N	tool
14	incense	stuff that burns to smell good	1	\N	other
15	beer	a mildly intoxicating beverage.	1	\N	potion
16	paneer	delicious indian style cheesey goodness	1	\N	comestible
17	hard candy	candy made of mostly sugar which is hard	1	\N	comestible
18	chocolate chip cookies	package of chocolate chip cookies	1	\N	comestible
19	mac 'n cheese single serve	small thing of macaroni and cheese	0.5	\N	comestible
20	microUSB cable	cable for plugging in micro usb things	0.5	\N	tool
21	front bike light	light for the front of a bicycle, usually white.	0.5	\N	tool
22	Chocolate	tasty snack from cacao	1	\N	comestible
23	Sunglasses	protect the eyes from uv light	0.5	\N	clothing
24	pencil	writing utensil using lead or probably a lead substitute unless it's an old one	0.5	\N	tool
25	herb pouch	A little pouch for storing herbs	1	\N	tool
26	spring for barrel adjuster.	Spring that needs to be put into the barrel adjuster to hold stuff good.	1	\N	almost junk
27	grapes	juicy little fruits from a vine	1	\N	comestible
28	bicycle multitool	Tool with a bunch of allen keys and a could other useful bike tols	0.200000000000000011	\N	tool
29	granola bar	bar of oats and granola	0.100000000000000006	\N	comestible
2	banana	tasty yellow or green fruit	0.900000000000000022	\N	comestible
12	Rice Crispy Treat	rice krispies and marshmallow	0.5	\N	comestible
30	Cliff bar with peanut butter	A chocolatey cliff bar with peanut butter filling	0.299999999999999989	\N	comestible
31	Mandarin	A small sweet orange.	0.100000000000000006	\N	comestible
32	Socks	Apparel to slide over feet and keep them warm.	0.100000000000000006	\N	clothing
33	lighter	a hand held device to make fire.	0.100000000000000006	\N	tool
3	rain jacket	dull yellow light windbreaker type thing	1	\N	clothing
34	flip flops	thin laptop	4.29999999999999982	\N	clothing
35	t-shirt	A shirt that kind of makes the shape of a t when unfolded.	0.200000000000000011	\N	clothing
36	Button down long leave shirt	A fancy kind of shirt that buttons down the front	0.200000000000000011	\N	clothing
37	gym shorts	shorts designed for athletic activities	0.100000000000000006	\N	clothing
38	hoodie (zip up)	A sweatshirt with a hood that zips up the front.	0.200000000000000011	\N	clothing
39	Boxer shorts	underwear that are kind of like shorts	0.100000000000000006	\N	clothing
40	pajama pants	Pants for lounging or sleeping	0.100000000000000006	\N	clothing
41	Jeans	pants made out of denim	1	\N	clothing
42	Dress pants	Fancy pants which could maybe be worn with a suit	0.200000000000000011	\N	clothing
44	dried mango with chil powder	Dried mango slices with chili powder covering	0.299999999999999989	\N	comestible
45	iPhone6 to usb	Cable that can be used to charge and/or connect an iPhone6/7 models.	0.100000000000000006	\N	electronics
46	Pocket knife	a little knife that fits in your pocket	0.100000000000000006	\N	tool
47	Plug adapter for Apple laptop charger.	Adapter to add to the charger cable for an Apple laptop so it can plug into a wall	0.100000000000000006	\N	electronics
48	Electric tape	Tape that's designed to cover wires so it's pretty tough, but not super sticky.	0.200000000000000011	\N	tool
49	Cheese and cracker snack pack	A little container of very processed cheese and some crackers or cracker sticks.	0.100000000000000006	\N	comestible
50	flask	hip flask for holding a small amount of liquid	0.400000000000000022	\N	potion
51	tin	A tin for holding stuff and keeping it from losing moisture. 	0.200000000000000011	\N	potion
52	special pen	A special kind of pen.	0.200000000000000011	\N	potion
53	Macbook Air charging cable	A cable designed for a 2012-13 Macbook laptop.	1	\N	electronics
54	Sandwich	At least 2 pieces of bread with stuff in between	0.299999999999999989	\N	comestible
55	trail mix	A snack mix usually with nuts and other stuff	1	\N	comestible
56	Rear bike light (red)	A bike light designed to face backwards on a bicycle	0.200000000000000011	\N	tool
57	iPhone6	A model of the Apple iPhone	1	\N	electronics
\.


--
-- Data for Name: packs; Type: TABLE DATA; Schema: public; Owner: matthewmckenna
--

COPY packs (coll_id, name, photo, description, weight_capacity, volume_capacity, p_id) FROM stdin;
1	day pack	\N	suitcase for holding stuff	20	1	\N
2	Chrome backpack	\N	big green backpack	30	\N	\N
3	pannier	\N	bag designed to clip onto a bicycle rack.	14	\N	\N
4	napsack	\N	sacknapped	13.5	\N	\N
5	Shopping bag	\N	Small reusable shopping bag with shoulder straps	13	\N	\N
6	pouch	\N	tiny bag	5	\N	\N
8	ziplock bag	\N	plastic bag	1	\N	\N
9	suitcase	\N	for travel	40	\N	\N
10	messenger bag	\N	shoulder bag	10	\N	\N
11	poop bag	\N	bag for dog poop	1	\N	\N
13	library bag	\N	lib bag	10	\N	\N
15	grocery bag	\N	paper bag from grocery store	10	\N	\N
17	treat bag	\N	bag for treats	1.5	\N	\N
18	big bag	\N	bag that's big	100.5	\N	\N
21	electronics box	\N	box for holding electronics	9	\N	\N
22	Noisebridge Locker	\N	locker at Noisebridge	1000	\N	\N
24	Bike Valet Room	\N	Room where we park lots of bikes	100000	\N	\N
\.


--
-- Data for Name: places; Type: TABLE DATA; Schema: public; Owner: matthewmckenna
--

COPY places (p_id, name, city, country, description) FROM stdin;
1	home	sf	usa	where i live
\.


--
-- Data for Name: userpack; Type: TABLE DATA; Schema: public; Owner: matthewmckenna
--

COPY userpack (up_id, name, packtype, items) FROM stdin;
2	sachel	1	{{2,1}}
8	nb locker	22	{{26,1}}
27	lib bag	13	{}
6	bookbag	13	{{9,0},{29,1},{22,1},{1,0},{6,1},{11,2},{13,1},{20,1},{30,0},{23,1},{33,0},{4,0},{3,0},{15,0},{45,1},{46,1},{28,1},{48,1},{47,1},{49,1},{21,1},{50,1},{51,0},{53,0},{55,1},{56,1}}
38	Room where the SFBC valets bicycles at the San Francisco Giants Stadium.	24	{{1,1},{53,1},{47,1},{9,1},{51,1},{10,1},{3,1},{22,1},{4,1},{7,1},{50,1}}
33	daker	4	{}
34	dfakl;jdaker	4	{}
36	sadadafda	9	{}
37	kppakdsjfa	9	{}
9	big suity	9	{{3,0},{32,0},{35,0},{36,0},{37,0},{38,0},{39,0},{40,0},{41,0},{42,0}}
15	boolll	9	{{3,0},{23,0},{9,0},{2,0},{12,0},{27,0}}
7	Pannier	3	{{27,0}}
20	loads	9	{}
22	bag info	9	{}
23	treaterbag	8	{}
25	zipperliner	8	{}
0	DAYPACK	1	{{1,0},{9,1}}
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: matthewmckenna
--

COPY users (u_id, name, email, password, photo, inventory, inventoryquantity, inventorydescription, location, userpacks) FROM stdin;
1	test	test	1.0	none.jpg	{1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,19,20,21,22,23,24,25,26,27,1,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57}	{1,0,1,2,1,1,1,1,3,1,4,0,3,0,0,0,1,1,1,1,2,1,2,1,0,1,1,2,0,0,7,2,1,1,1,2,2,1,1,2,1,1,0,1,1,2,1,1,1,1,1,1,0,1,1,1}	\N	\N	{0,15,6,7,8,9,32,2,38}
\.


--
-- Name: items_p_id_seq; Type: SEQUENCE SET; Schema: public; Owner: matthewmckenna
--

SELECT pg_catalog.setval('items_p_id_seq', 57, true);


--
-- Name: packs_coll_id_seq; Type: SEQUENCE SET; Schema: public; Owner: matthewmckenna
--

SELECT pg_catalog.setval('packs_coll_id_seq', 24, true);


--
-- Name: places_p_id_seq; Type: SEQUENCE SET; Schema: public; Owner: matthewmckenna
--

SELECT pg_catalog.setval('places_p_id_seq', 1, true);


--
-- Name: userpack_up_id_seq; Type: SEQUENCE SET; Schema: public; Owner: matthewmckenna
--

SELECT pg_catalog.setval('userpack_up_id_seq', 38, true);


--
-- Name: users_u_id_seq; Type: SEQUENCE SET; Schema: public; Owner: matthewmckenna
--

SELECT pg_catalog.setval('users_u_id_seq', 1, true);


--
-- Name: items items_pkey; Type: CONSTRAINT; Schema: public; Owner: matthewmckenna
--

ALTER TABLE ONLY items
    ADD CONSTRAINT items_pkey PRIMARY KEY (p_id);


--
-- Name: packs packs_pkey; Type: CONSTRAINT; Schema: public; Owner: matthewmckenna
--

ALTER TABLE ONLY packs
    ADD CONSTRAINT packs_pkey PRIMARY KEY (coll_id);


--
-- Name: places places_pkey; Type: CONSTRAINT; Schema: public; Owner: matthewmckenna
--

ALTER TABLE ONLY places
    ADD CONSTRAINT places_pkey PRIMARY KEY (p_id);


--
-- Name: userpack userpack_pkey; Type: CONSTRAINT; Schema: public; Owner: matthewmckenna
--

ALTER TABLE ONLY userpack
    ADD CONSTRAINT userpack_pkey PRIMARY KEY (up_id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: matthewmckenna
--

ALTER TABLE ONLY users
    ADD CONSTRAINT users_pkey PRIMARY KEY (u_id);


--
-- Name: packs packs_p_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: matthewmckenna
--

ALTER TABLE ONLY packs
    ADD CONSTRAINT packs_p_id_fkey FOREIGN KEY (p_id) REFERENCES places(p_id);


--
-- Name: userpack userpack_packtype_fkey; Type: FK CONSTRAINT; Schema: public; Owner: matthewmckenna
--

ALTER TABLE ONLY userpack
    ADD CONSTRAINT userpack_packtype_fkey FOREIGN KEY (packtype) REFERENCES packs(coll_id);


--
-- PostgreSQL database dump complete
--

