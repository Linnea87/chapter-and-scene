-- ===== Chapter & Scene: database schema =====
-- Run in the Supabase SQL Editor, once per table.
-- Row Level Security is on for all tables, and users only get access to their own rows.

-- ===== orders =====
create table public.orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid()
    references auth.users (id) on delete cascade,
  subtotal numeric(10, 2) not null,
  shipping numeric(10, 2) not null default 0,
  total numeric(10, 2) not null,
  currency text not null default 'USD',
  shipping_address jsonb,
  created_at timestamptz not null default now()
);

alter table public.orders enable row level security;

grant select, insert on public.orders to authenticated;

create policy "Users can read their own orders"
  on public.orders for select to authenticated
  using (user_id = (select auth.uid()));

create policy "Users can create their own orders"
  on public.orders for insert to authenticated
  with check (user_id = (select auth.uid()));

-- ===== order_items =====
create table public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null
    references public.orders (id) on delete cascade,
  user_id uuid not null default auth.uid()
    references auth.users (id) on delete cascade,
  media_type text not null check (media_type in ('movie', 'tv', 'book')),
  external_id text not null,
  title text not null,
  image_url text,
  format text not null,
  label text not null,
  unit_price numeric(10, 2) not null,
  quantity integer not null default 1 check (quantity > 0),
  delivery_status text check (delivery_status in ('processing', 'shipped')),
  created_at timestamptz not null default now()
);

alter table public.order_items enable row level security;

grant select, insert on public.order_items to authenticated;

create policy "Users can read their own order items"
  on public.order_items for select to authenticated
  using (user_id = (select auth.uid()));

create policy "Users can create their own order items"
  on public.order_items for insert to authenticated
  with check (user_id = (select auth.uid()));

-- ===== library_items =====
create table public.library_items (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid()
    references auth.users (id) on delete cascade,
  media_type text not null check (media_type in ('movie', 'tv', 'book')),
  external_id text not null,
  title text not null,
  image_url text,
  format text not null,
  label text not null,
  expires_at timestamptz,
  created_at timestamptz not null default now(),
  unique (user_id, media_type, external_id, format)
);

alter table public.library_items enable row level security;

grant select, insert, update on public.library_items to authenticated;

create policy "Users can read their own library"
  on public.library_items for select to authenticated
  using (user_id = (select auth.uid()));

create policy "Users can add to their own library"
  on public.library_items for insert to authenticated
  with check (user_id = (select auth.uid()));

create policy "Users can update their own library"
  on public.library_items for update to authenticated
  using (user_id = (select auth.uid()))
  with check (user_id = (select auth.uid()));

-- ===== cart_items =====
create table public.cart_items (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid()
    references auth.users (id) on delete cascade,
  key text not null,
  media_type text not null check (media_type in ('movie', 'tv', 'book')),
  external_id text not null,
  title text not null,
  image_url text,
  format text not null,
  label text not null,
  unit_price numeric(10, 2) not null,
  quantity integer not null default 1 check (quantity > 0),
  created_at timestamptz not null default now(),
  unique (user_id, key)
);

alter table public.cart_items enable row level security;

grant select, insert, update, delete on public.cart_items to authenticated;

create policy "Users can read their own cart"
  on public.cart_items for select to authenticated
  using (user_id = (select auth.uid()));

create policy "Users can add to their own cart"
  on public.cart_items for insert to authenticated
  with check (user_id = (select auth.uid()));

create policy "Users can update their own cart"
  on public.cart_items for update to authenticated
  using (user_id = (select auth.uid()))
  with check (user_id = (select auth.uid()));

create policy "Users can remove from their own cart"
  on public.cart_items for delete to authenticated
  using (user_id = (select auth.uid()));