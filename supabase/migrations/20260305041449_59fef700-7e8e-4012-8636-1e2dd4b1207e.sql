
-- Create rate_limits table
create table public.rate_limits (
  id uuid primary key default gen_random_uuid(),
  ip text not null,
  created_at timestamptz not null default now()
);

create index idx_rate_limits_ip_created on public.rate_limits (ip, created_at);

-- Enable RLS with deny-all policies
alter table public.rate_limits enable row level security;

create policy "Deny public select on rate_limits"
on public.rate_limits for select
using (false);

create policy "Deny public insert on rate_limits"
on public.rate_limits for insert
with check (false);

create policy "Deny public update on rate_limits"
on public.rate_limits for update
using (false);

create policy "Deny public delete on rate_limits"
on public.rate_limits for delete
using (false);
