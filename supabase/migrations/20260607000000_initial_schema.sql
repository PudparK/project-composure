-- Initial Composure schema for the MVP core loop.
-- Supports profiles, spaces, memberships, thoughts, and membership-based RLS.

create extension if not exists pgcrypto;

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.spaces (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users(id) on delete cascade,
  name text not null,
  kind text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  archived_at timestamptz,
  constraint spaces_name_not_empty check (length(trim(name)) > 0),
  constraint spaces_kind_check check (kind in ('personal', 'work', 'family', 'custom'))
);

create table public.space_memberships (
  id uuid primary key default gen_random_uuid(),
  space_id uuid not null references public.spaces(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  role text not null default 'owner',
  created_at timestamptz not null default now(),
  constraint space_memberships_space_user_unique unique (space_id, user_id),
  constraint space_memberships_role_check check (role in ('owner', 'member'))
);

create table public.thoughts (
  id uuid primary key default gen_random_uuid(),
  space_id uuid not null references public.spaces(id) on delete restrict,
  created_by uuid not null references auth.users(id) on delete cascade,
  body text not null,
  review_at timestamptz,
  processed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint thoughts_body_not_empty check (length(trim(body)) > 0)
);

create index spaces_owner_id_idx on public.spaces(owner_id);
create index space_memberships_space_id_idx on public.space_memberships(space_id);
create index space_memberships_user_id_idx on public.space_memberships(user_id);
create index thoughts_created_by_idx on public.thoughts(created_by);
create index thoughts_space_id_idx on public.thoughts(space_id);
create index thoughts_inbox_idx on public.thoughts(created_by, processed_at, created_at desc);
create index thoughts_upcoming_idx on public.thoughts(created_by, processed_at, review_at);

create trigger profiles_set_updated_at
before update on public.profiles
for each row execute function public.set_updated_at();

create trigger spaces_set_updated_at
before update on public.spaces
for each row execute function public.set_updated_at();

create trigger thoughts_set_updated_at
before update on public.thoughts
for each row execute function public.set_updated_at();

alter table public.profiles enable row level security;
alter table public.spaces enable row level security;
alter table public.space_memberships enable row level security;
alter table public.thoughts enable row level security;

create policy "Users can read their own profile"
on public.profiles for select
to authenticated
using (id = auth.uid());

create policy "Users can update their own profile"
on public.profiles for update
to authenticated
using (id = auth.uid())
with check (id = auth.uid());

create policy "Users can read spaces they belong to"
on public.spaces for select
to authenticated
using (
  exists (
    select 1
    from public.space_memberships
    where space_memberships.space_id = spaces.id
      and space_memberships.user_id = auth.uid()
  )
);

create policy "Users can create their own spaces"
on public.spaces for insert
to authenticated
with check (owner_id = auth.uid());

create policy "Owners can update their spaces"
on public.spaces for update
to authenticated
using (owner_id = auth.uid())
with check (owner_id = auth.uid());

create policy "Users can read memberships for their spaces"
on public.space_memberships for select
to authenticated
using (
  user_id = auth.uid()
  or exists (
    select 1
    from public.spaces
    where spaces.id = space_memberships.space_id
      and spaces.owner_id = auth.uid()
  )
);

create policy "Owners can create memberships for their spaces"
on public.space_memberships for insert
to authenticated
with check (
  exists (
    select 1
    from public.spaces
    where spaces.id = space_memberships.space_id
      and spaces.owner_id = auth.uid()
  )
);

create policy "Users can read thoughts in their spaces"
on public.thoughts for select
to authenticated
using (
  exists (
    select 1
    from public.space_memberships
    where space_memberships.space_id = thoughts.space_id
      and space_memberships.user_id = auth.uid()
  )
);

create policy "Users can create thoughts in their spaces"
on public.thoughts for insert
to authenticated
with check (
  created_by = auth.uid()
  and exists (
    select 1
    from public.space_memberships
    where space_memberships.space_id = thoughts.space_id
      and space_memberships.user_id = auth.uid()
  )
);

create policy "Users can update thoughts in their spaces"
on public.thoughts for update
to authenticated
using (
  exists (
    select 1
    from public.space_memberships
    where space_memberships.space_id = thoughts.space_id
      and space_memberships.user_id = auth.uid()
  )
)
with check (
  exists (
    select 1
    from public.space_memberships
    where space_memberships.space_id = thoughts.space_id
      and space_memberships.user_id = auth.uid()
  )
);

create or replace function public.create_initial_spaces_for_user(user_id uuid)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  personal_space_id uuid;
  work_space_id uuid;
  family_space_id uuid;
begin
  insert into public.spaces (owner_id, name, kind)
  values (user_id, 'Personal', 'personal')
  returning id into personal_space_id;

  insert into public.spaces (owner_id, name, kind)
  values (user_id, 'Work', 'work')
  returning id into work_space_id;

  insert into public.spaces (owner_id, name, kind)
  values (user_id, 'Family', 'family')
  returning id into family_space_id;

  insert into public.space_memberships (space_id, user_id, role)
  values
    (personal_space_id, user_id, 'owner'),
    (work_space_id, user_id, 'owner'),
    (family_space_id, user_id, 'owner');
end;
$$;

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, display_name)
  values (new.id, coalesce(new.raw_user_meta_data ->> 'display_name', new.email));

  perform public.create_initial_spaces_for_user(new.id);

  return new;
end;
$$;

create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_user();
