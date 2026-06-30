create table if not exists public.demo_saves (
  player_id text primary key,
  state jsonb not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_demo_saves_updated_at on public.demo_saves;
create trigger set_demo_saves_updated_at
before update on public.demo_saves
for each row
execute function public.set_updated_at();

alter table public.demo_saves enable row level security;

drop policy if exists "demo_saves_service_role_all" on public.demo_saves;
create policy "demo_saves_service_role_all"
on public.demo_saves
for all
using (auth.role() = 'service_role')
with check (auth.role() = 'service_role');
