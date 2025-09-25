-- Create orders table compatible with existing app fields (camelCase kept)
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

-- Optional: products table for public listing
create table if not exists public.products (
  id bigserial primary key,
  name text not null,
  slug text unique,
  price_cents integer not null default 0,
  active boolean not null default true
);

-- Seed a default product if table is empty
insert into public.products (name, slug, price_cents, active)
select 'Traditionelles Barbari-Brot', 'barbari-brot', 350, true
where not exists (select 1 from public.products);

-- Enable RLS if desired (inserts will use service role in backend)
alter table public.orders enable row level security;
create policy if not exists "select_own_orders"
  on public.orders for select
  using (auth.uid()::text = userId::text);


-- Create users table expected by backend (phone-based quick registration)
create table if not exists public.users (
  id bigserial primary key,
  firstName text,
  lastName text,
  phone text unique,
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

-- Helpful index for phone lookups used by /api/order and /api/register
create index if not exists idx_users_phone on public.users (phone);


