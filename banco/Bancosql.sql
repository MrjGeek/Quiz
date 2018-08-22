--
-- PostgreSQL database dump
--

-- Dumped from database version 9.5.14
-- Dumped by pg_dump version 9.5.14

-- Started on 2018-08-22 01:32:36

SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 1 (class 3079 OID 12355)
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- TOC entry 2159 (class 0 OID 0)
-- Dependencies: 1
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET default_tablespace = '';

SET default_with_oids = false;

--
-- TOC entry 188 (class 1259 OID 16627)
-- Name: answer; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.answer (
    idanswer integer NOT NULL,
    question_idquestion integer,
    is_correct boolean,
    title text
);


ALTER TABLE public.answer OWNER TO postgres;

--
-- TOC entry 187 (class 1259 OID 16625)
-- Name: answer_idanswer_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.answer_idanswer_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.answer_idanswer_seq OWNER TO postgres;

--
-- TOC entry 2160 (class 0 OID 0)
-- Dependencies: 187
-- Name: answer_idanswer_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.answer_idanswer_seq OWNED BY public.answer.idanswer;


--
-- TOC entry 186 (class 1259 OID 16616)
-- Name: people; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.people (
    name text,
    email text,
    idpeople integer NOT NULL
);


ALTER TABLE public.people OWNER TO postgres;

--
-- TOC entry 185 (class 1259 OID 16614)
-- Name: people_idpeople_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.people_idpeople_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.people_idpeople_seq OWNER TO postgres;

--
-- TOC entry 2161 (class 0 OID 0)
-- Dependencies: 185
-- Name: people_idpeople_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.people_idpeople_seq OWNED BY public.people.idpeople;


--
-- TOC entry 190 (class 1259 OID 16643)
-- Name: peopleanswer; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.peopleanswer (
    idpeopleanswer integer NOT NULL,
    question_idquestion integer,
    answer_idanswer integer,
    answertext text,
    datequizbegin date,
    hourquizbegin time with time zone,
    datequizfinish date,
    hourquizfinish time with time zone,
    people_idpeople integer
);


ALTER TABLE public.peopleanswer OWNER TO postgres;

--
-- TOC entry 189 (class 1259 OID 16641)
-- Name: peopleanswer_idpeopleanswer_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.peopleanswer_idpeopleanswer_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.peopleanswer_idpeopleanswer_seq OWNER TO postgres;

--
-- TOC entry 2162 (class 0 OID 0)
-- Dependencies: 189
-- Name: peopleanswer_idpeopleanswer_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.peopleanswer_idpeopleanswer_seq OWNED BY public.peopleanswer.idpeopleanswer;


--
-- TOC entry 184 (class 1259 OID 16600)
-- Name: question; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.question (
    idquestion integer NOT NULL,
    quiz_idquiz integer,
    title text,
    type text
);


ALTER TABLE public.question OWNER TO postgres;

--
-- TOC entry 183 (class 1259 OID 16598)
-- Name: question_idquestion_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.question_idquestion_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.question_idquestion_seq OWNER TO postgres;

--
-- TOC entry 2163 (class 0 OID 0)
-- Dependencies: 183
-- Name: question_idquestion_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.question_idquestion_seq OWNED BY public.question.idquestion;


--
-- TOC entry 182 (class 1259 OID 16589)
-- Name: quiz; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.quiz (
    idquiz integer NOT NULL,
    title text
);


ALTER TABLE public.quiz OWNER TO postgres;

--
-- TOC entry 181 (class 1259 OID 16587)
-- Name: quiz_idquiz_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.quiz_idquiz_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.quiz_idquiz_seq OWNER TO postgres;

--
-- TOC entry 2164 (class 0 OID 0)
-- Dependencies: 181
-- Name: quiz_idquiz_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.quiz_idquiz_seq OWNED BY public.quiz.idquiz;


--
-- TOC entry 2013 (class 2604 OID 16630)
-- Name: idanswer; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.answer ALTER COLUMN idanswer SET DEFAULT nextval('public.answer_idanswer_seq'::regclass);


--
-- TOC entry 2012 (class 2604 OID 16619)
-- Name: idpeople; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.people ALTER COLUMN idpeople SET DEFAULT nextval('public.people_idpeople_seq'::regclass);


--
-- TOC entry 2014 (class 2604 OID 16646)
-- Name: idpeopleanswer; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.peopleanswer ALTER COLUMN idpeopleanswer SET DEFAULT nextval('public.peopleanswer_idpeopleanswer_seq'::regclass);


--
-- TOC entry 2011 (class 2604 OID 16603)
-- Name: idquestion; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.question ALTER COLUMN idquestion SET DEFAULT nextval('public.question_idquestion_seq'::regclass);


--
-- TOC entry 2010 (class 2604 OID 16592)
-- Name: idquiz; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.quiz ALTER COLUMN idquiz SET DEFAULT nextval('public.quiz_idquiz_seq'::regclass);


--
-- TOC entry 2148 (class 0 OID 16627)
-- Dependencies: 188
-- Data for Name: answer; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.answer VALUES (6, 12, false, 'ZX2R');
INSERT INTO public.answer VALUES (8, 12, false, 'Comet GTR 250');
INSERT INTO public.answer VALUES (9, 12, false, 'Twister 250');
INSERT INTO public.answer VALUES (7, 12, true, 'Ninja 250R');
INSERT INTO public.answer VALUES (10, 13, true, '400');
INSERT INTO public.answer VALUES (11, 14, true, 'Ponte');
INSERT INTO public.answer VALUES (12, 14, false, 'Árvore');
INSERT INTO public.answer VALUES (13, 14, false, 'Estação Espacial');


--
-- TOC entry 2165 (class 0 OID 0)
-- Dependencies: 187
-- Name: answer_idanswer_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.answer_idanswer_seq', 13, true);


--
-- TOC entry 2146 (class 0 OID 16616)
-- Dependencies: 186
-- Data for Name: people; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 2166 (class 0 OID 0)
-- Dependencies: 185
-- Name: people_idpeople_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.people_idpeople_seq', 24, true);


--
-- TOC entry 2150 (class 0 OID 16643)
-- Dependencies: 190
-- Data for Name: peopleanswer; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 2167 (class 0 OID 0)
-- Dependencies: 189
-- Name: peopleanswer_idpeopleanswer_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.peopleanswer_idpeopleanswer_seq', 52, true);


--
-- TOC entry 2144 (class 0 OID 16600)
-- Dependencies: 184
-- Data for Name: question; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.question VALUES (12, 14, 'Moto 250 Kawasaki que saiu de linha em 2012', 'multi');
INSERT INTO public.question VALUES (13, 14, 'Cilindrada da nova moto da Kawasaki Lançada em 2018', 'single');
INSERT INTO public.question VALUES (14, 14, 'Um turco atingiu 400KM/H em uma Kawasaki H2R sobre uma...', 'multi');


--
-- TOC entry 2168 (class 0 OID 0)
-- Dependencies: 183
-- Name: question_idquestion_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.question_idquestion_seq', 14, true);


--
-- TOC entry 2142 (class 0 OID 16589)
-- Dependencies: 182
-- Data for Name: quiz; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.quiz VALUES (14, 'Teste 1 Diversos');


--
-- TOC entry 2169 (class 0 OID 0)
-- Dependencies: 181
-- Name: quiz_idquiz_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.quiz_idquiz_seq', 14, true);


--
-- TOC entry 2022 (class 2606 OID 16635)
-- Name: idanswer; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.answer
    ADD CONSTRAINT idanswer PRIMARY KEY (idanswer);


--
-- TOC entry 2020 (class 2606 OID 16624)
-- Name: people_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.people
    ADD CONSTRAINT people_pkey PRIMARY KEY (idpeople);


--
-- TOC entry 2024 (class 2606 OID 16651)
-- Name: peopleanswer_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.peopleanswer
    ADD CONSTRAINT peopleanswer_pkey PRIMARY KEY (idpeopleanswer);


--
-- TOC entry 2018 (class 2606 OID 16608)
-- Name: question_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.question
    ADD CONSTRAINT question_pkey PRIMARY KEY (idquestion);


--
-- TOC entry 2016 (class 2606 OID 16597)
-- Name: quiz_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.quiz
    ADD CONSTRAINT quiz_pkey PRIMARY KEY (idquiz);


--
-- TOC entry 2026 (class 2606 OID 16636)
-- Name: answer_question_idquestion_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.answer
    ADD CONSTRAINT answer_question_idquestion_fkey FOREIGN KEY (question_idquestion) REFERENCES public.question(idquestion);


--
-- TOC entry 2025 (class 2606 OID 16609)
-- Name: question_quiz_idquiz_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.question
    ADD CONSTRAINT question_quiz_idquiz_fkey FOREIGN KEY (quiz_idquiz) REFERENCES public.quiz(idquiz);


--
-- TOC entry 2158 (class 0 OID 0)
-- Dependencies: 6
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE ALL ON SCHEMA public FROM PUBLIC;
REVOKE ALL ON SCHEMA public FROM postgres;
GRANT ALL ON SCHEMA public TO postgres;
GRANT ALL ON SCHEMA public TO PUBLIC;


-- Completed on 2018-08-22 01:32:37

--
-- PostgreSQL database dump complete
--

