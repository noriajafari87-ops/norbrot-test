-- Users table matching your previous Sequelize fields (camelCase)
create table if not exists public.users (
  id bigserial primary key,
  firstName text not null,
  lastName text not null,
  phone text unique not null,
  street text,
  houseNumber text,
  apartment text,
  postalCode text,
  city text,
  state text,
  country text default 'Deutschland',
  createdAt timestamptz not null default now(),
  updatedAt timestamptz not null default now()
);

-- Orders table matching your app fields (camelCase)
create table if not exists public.orders (
  id bigserial primary key,
  userId bigint not null,
  productName text,
  quantity integer default 1,
  totalPrice double precision default 0,
  totalAmount double precision default 0,
  firstName text,
  lastName text,
  phone text,
  street text,
  houseNumber text,
  apartment text,
  postalCode text,
  city text,
  state text,
  status text default 'confirmed',
  deliveredAt timestamptz null,
  createdAt timestamptz not null default now(),
  updatedAt timestamptz not null default now()
);

-- Simple products table for listing
create table if not exists public.products (
  id bigserial primary key,
  name text not null,
  slug text unique,
  price_cents integer not null default 0,
  active boolean not null default true
);

-- Seed a default product
insert into public.products (name, slug, price_cents, active)
select 'Traditionelles Barbari-Brot', 'barbari-brot', 350, true
where not exists (select 1 from public.products);

-- RLS example: allow public read of products
alter table public.products enable row level security;
drop policy if exists products_read_all on public.products;
create policy products_read_all on public.products for select using (true);


