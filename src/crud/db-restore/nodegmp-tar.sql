toc.dat                                                                                             0000600 0004000 0002000 00000011157 14332003547 0014445 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        PGDMP       +                
    z            nodegmp    14.5 (Homebrew)    14.4                0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false                    0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false                    0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false                    1262    16384    nodegmp    DATABASE     R   CREATE DATABASE nodegmp WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'C';
    DROP DATABASE nodegmp;
                zoya_rassadkina    false         �            1259    24589    groups    TABLE     n   CREATE TABLE public.groups (
    id uuid NOT NULL,
    name text NOT NULL,
    permissions text[] NOT NULL
);
    DROP TABLE public.groups;
       public         heap    zoya_rassadkina    false         �            1259    32831    user_groups    TABLE     j   CREATE TABLE public.user_groups (
    "UserModelId" integer NOT NULL,
    "GroupModelId" uuid NOT NULL
);
    DROP TABLE public.user_groups;
       public         heap    zoya_rassadkina    false         �            1259    16404    users    TABLE     �   CREATE TABLE public.users (
    id integer NOT NULL,
    login character varying NOT NULL,
    password character varying NOT NULL,
    age integer NOT NULL
);
    DROP TABLE public.users;
       public         heap    zoya_rassadkina    false         �            1259    16403    users_id_seq    SEQUENCE     �   ALTER TABLE public.users ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          zoya_rassadkina    false    210                   0    24589    groups 
   TABLE DATA           7   COPY public.groups (id, name, permissions) FROM stdin;
    public          zoya_rassadkina    false    211       3601.dat           0    32831    user_groups 
   TABLE DATA           D   COPY public.user_groups ("UserModelId", "GroupModelId") FROM stdin;
    public          zoya_rassadkina    false    212       3602.dat           0    16404    users 
   TABLE DATA           9   COPY public.users (id, login, password, age) FROM stdin;
    public          zoya_rassadkina    false    210       3600.dat            0    0    users_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.users_id_seq', 18, true);
          public          zoya_rassadkina    false    209                    2606    24595    groups groups_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public.groups
    ADD CONSTRAINT groups_pkey PRIMARY KEY (id);
 <   ALTER TABLE ONLY public.groups DROP CONSTRAINT groups_pkey;
       public            zoya_rassadkina    false    211         �           2606    32835    user_groups user_groups_pkey2 
   CONSTRAINT     v   ALTER TABLE ONLY public.user_groups
    ADD CONSTRAINT user_groups_pkey2 PRIMARY KEY ("UserModelId", "GroupModelId");
 G   ALTER TABLE ONLY public.user_groups DROP CONSTRAINT user_groups_pkey2;
       public            zoya_rassadkina    false    212    212         }           2606    16410    users users_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public            zoya_rassadkina    false    210         �           2606    32841 *   user_groups user_groups_GroupModelId_fkey1    FK CONSTRAINT     �   ALTER TABLE ONLY public.user_groups
    ADD CONSTRAINT "user_groups_GroupModelId_fkey1" FOREIGN KEY ("GroupModelId") REFERENCES public.groups(id) ON UPDATE CASCADE ON DELETE CASCADE;
 V   ALTER TABLE ONLY public.user_groups DROP CONSTRAINT "user_groups_GroupModelId_fkey1";
       public          zoya_rassadkina    false    3455    212    211         �           2606    32836 )   user_groups user_groups_UserModelId_fkey1    FK CONSTRAINT     �   ALTER TABLE ONLY public.user_groups
    ADD CONSTRAINT "user_groups_UserModelId_fkey1" FOREIGN KEY ("UserModelId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;
 U   ALTER TABLE ONLY public.user_groups DROP CONSTRAINT "user_groups_UserModelId_fkey1";
       public          zoya_rassadkina    false    212    3453    210                                                                                                                                                                                                                                                                                                                                                                                                                         3601.dat                                                                                            0000600 0004000 0002000 00000000225 14332003547 0014243 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        9e9798f3-99b2-4352-b149-f6d0deec400e	manager	{READ,WRITE}
36e5b356-abe2-46ad-9b13-37a97b2b7f13	superuser	{READ,WRITE,DELETE,SHARE,UPLOAD_FILES}
\.


                                                                                                                                                                                                                                                                                                                                                                           3602.dat                                                                                            0000600 0004000 0002000 00000000426 14332003547 0014247 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        2	9e9798f3-99b2-4352-b149-f6d0deec400e
3	9e9798f3-99b2-4352-b149-f6d0deec400e
4	9e9798f3-99b2-4352-b149-f6d0deec400e
5	9e9798f3-99b2-4352-b149-f6d0deec400e
8	36e5b356-abe2-46ad-9b13-37a97b2b7f13
4	36e5b356-abe2-46ad-9b13-37a97b2b7f13
2	36e5b356-abe2-46ad-9b13-37a97b2b7f13
\.


                                                                                                                                                                                                                                          3600.dat                                                                                            0000600 0004000 0002000 00000000454 14332003547 0014246 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        4	zoua	strongpassYEEEAH	90
7	jsdhfdsf	jdhsfjhjsdfh	20
8	NickEkk	dfgk444m	26
9	aaatest	dfgk444m	6
11	yyytest	dfgk444m	6
10	atest	coolpass1	60
2	ivan	ivanov	10
14	sergey	password	46
3	boris	password	45
5	anytest	pass2	36
15	Arnold	vnkdfjn5544	80
16	Nickole	23124bbbbbb	30
17	Zeynep	mcvxnn4545b	35
\.


                                                                                                                                                                                                                    restore.sql                                                                                         0000600 0004000 0002000 00000010452 14332003547 0015367 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        --
-- NOTE:
--
-- File paths need to be edited. Search for $$PATH$$ and
-- replace it with the path to the directory containing
-- the extracted data files.
--
--
-- PostgreSQL database dump
--

-- Dumped from database version 14.5 (Homebrew)
-- Dumped by pg_dump version 14.4

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

DROP DATABASE nodegmp;
--
-- Name: nodegmp; Type: DATABASE; Schema: -; Owner: zoya_rassadkina
--

CREATE DATABASE nodegmp WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'C';


ALTER DATABASE nodegmp OWNER TO zoya_rassadkina;

\connect nodegmp

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: groups; Type: TABLE; Schema: public; Owner: zoya_rassadkina
--

CREATE TABLE public.groups (
    id uuid NOT NULL,
    name text NOT NULL,
    permissions text[] NOT NULL
);


ALTER TABLE public.groups OWNER TO zoya_rassadkina;

--
-- Name: user_groups; Type: TABLE; Schema: public; Owner: zoya_rassadkina
--

CREATE TABLE public.user_groups (
    "UserModelId" integer NOT NULL,
    "GroupModelId" uuid NOT NULL
);


ALTER TABLE public.user_groups OWNER TO zoya_rassadkina;

--
-- Name: users; Type: TABLE; Schema: public; Owner: zoya_rassadkina
--

CREATE TABLE public.users (
    id integer NOT NULL,
    login character varying NOT NULL,
    password character varying NOT NULL,
    age integer NOT NULL
);


ALTER TABLE public.users OWNER TO zoya_rassadkina;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: zoya_rassadkina
--

ALTER TABLE public.users ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Data for Name: groups; Type: TABLE DATA; Schema: public; Owner: zoya_rassadkina
--

COPY public.groups (id, name, permissions) FROM stdin;
\.
COPY public.groups (id, name, permissions) FROM '$$PATH$$/3601.dat';

--
-- Data for Name: user_groups; Type: TABLE DATA; Schema: public; Owner: zoya_rassadkina
--

COPY public.user_groups ("UserModelId", "GroupModelId") FROM stdin;
\.
COPY public.user_groups ("UserModelId", "GroupModelId") FROM '$$PATH$$/3602.dat';

--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: zoya_rassadkina
--

COPY public.users (id, login, password, age) FROM stdin;
\.
COPY public.users (id, login, password, age) FROM '$$PATH$$/3600.dat';

--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: zoya_rassadkina
--

SELECT pg_catalog.setval('public.users_id_seq', 18, true);


--
-- Name: groups groups_pkey; Type: CONSTRAINT; Schema: public; Owner: zoya_rassadkina
--

ALTER TABLE ONLY public.groups
    ADD CONSTRAINT groups_pkey PRIMARY KEY (id);


--
-- Name: user_groups user_groups_pkey2; Type: CONSTRAINT; Schema: public; Owner: zoya_rassadkina
--

ALTER TABLE ONLY public.user_groups
    ADD CONSTRAINT user_groups_pkey2 PRIMARY KEY ("UserModelId", "GroupModelId");


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: zoya_rassadkina
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: user_groups user_groups_GroupModelId_fkey1; Type: FK CONSTRAINT; Schema: public; Owner: zoya_rassadkina
--

ALTER TABLE ONLY public.user_groups
    ADD CONSTRAINT "user_groups_GroupModelId_fkey1" FOREIGN KEY ("GroupModelId") REFERENCES public.groups(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: user_groups user_groups_UserModelId_fkey1; Type: FK CONSTRAINT; Schema: public; Owner: zoya_rassadkina
--

ALTER TABLE ONLY public.user_groups
    ADD CONSTRAINT "user_groups_UserModelId_fkey1" FOREIGN KEY ("UserModelId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      