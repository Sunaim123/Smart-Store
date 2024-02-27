CREATE TABLE public.user(
  id SERIAL PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  username VARCHAR(50) NOT NULL UNIQUE,
  password TEXT NOT NULL,
  mobile VARCHAR(20) NOT NULL UNIQUE
  points INTEGER,
  role_id INTEGER REFERENCES public.role(id)
);

CREATE TABLE public.role(
  id SERIAL PRIMARY KEY,
  name CHARACTER VARYING(20) NOT NULL, -- super admin, admin, manager, operator
  permissions TEXT
);

CREATE TABLE public.session(
	id SERIAL PRIMARY KEY,
	token CHARACTER VARYING(64) NOT NULL UNIQUE,
	login_timestamp TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
	expiry_timestamp TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP + (30 ||' days')::interval,
	user_id INTEGER REFERENCES public.user(id) NOT NULL UNIQUE,
  permissions TEXT
);

CREATE TABLE public.product(
    id SERIAL PRIMARY KEY,
    title VARCHAR(80) UNIQUE NOT NULL,
    description TEXT NOT NULL,
    price DOUBLE PRECISION NOT NULL,
    thumbnail TEXT,
    category  INTEGER NOT NULL DEFAULT 1,
    quantity INTEGER NOT NUL DEFAULT 1,
    niche VARCHAR(20) NOT NULL DEFAULT 'grocery'
);

CREATE TABLE public.order(
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES public.user(id) NOT NULL,
    note TEXT,
    order_status VARCHAR(50) NOT NULL DEFAULT 'punched',
    payment_status VARCHAR(50) NOT NULL DEFAULT 'unpaid',
    order_datetime TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    total DOUBLE PRECISION,
    mobile VARCHAR NOT NULL,
    address TEXT NOT NULL
);

CREATE TABLE public.order_history(
	id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES public.user(id) NOT NULL,
  product_id INTEGER REFERENCES public.product(id),
  quantity INTEGER NOT NULL DEFAULT 1,
  last_order TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE public.order_lineitem(
  id SERIAL PRIMARY KEY,
  quantity INTEGER NOT NULL DEFAULT 1,
  product_id INTEGER REFERENCES public.product(id),
  order_id INTEGER REFERENCES public.order(id),
  price DOUBLE PRECISION
);

CREATE TABLE public.return(
    id SERIAL PRIMARY KEY,
    order_id INTEGER,
    user_id INTEGER REFERENCES public.user(id) NOT NULL,
    return_reason TEXT,
    image1 TEXT,
    image2 TEXT,
    return_status VARCHAR(50) DEFAULT 'Pending', -- Status: Pending, Approved, Rejected, etc.
    return_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE public.feedback(
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES public.user(id) NOT NULL,
  name CHARACTER VARYING(50) NOT NULL,
  status CHARACTER VARYING(50) NOT NULL,
  email CHARACTER VARYING(100) NOT NULL,
  problem TEXT NOT NULL,
  result TEXT
  order_id INTEGER NOT NULL
);