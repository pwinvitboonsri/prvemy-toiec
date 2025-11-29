-- 1. Create the function that runs on every signup
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (
    id, 
    name, -- Matches your column
    profile_picture_url, -- Matches your column
    role, -- Matches your column (defaults to 'user')
    email_verified -- derived from auth.users
  )
  values (
    new.id,
    -- We grab these from the metadata we will send from Next.js
    new.raw_user_meta_data ->> 'name',
    new.raw_user_meta_data ->> 'profile_picture_url',
    'user', -- Default role
    false   -- Default not verified
  );
  return new;
end;
$$;

-- 2. Attach the trigger to auth.users
-- If you already have a trigger, drop it first: drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row
  execute procedure public.handle_new_user();