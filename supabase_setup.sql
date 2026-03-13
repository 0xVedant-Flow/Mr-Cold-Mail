-- Create the templates table
create table if not exists public.templates (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade,
  name text not null,
  subject text not null,
  body text not null,
  category text not null,
  usage_count integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security
alter table public.templates enable row level security;

-- Create policy to allow users to manage their own templates
create policy "Users can manage their own templates" on public.templates
  for all using (auth.uid() = user_id);
