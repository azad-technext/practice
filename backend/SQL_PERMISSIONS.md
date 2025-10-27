# Database Permissions Fix

## The Issue
Your table `name_data` exists, but your user doesn't have permissions to use it.

## Solution
Run these commands in your PostgreSQL console on the droplet:

```sql
-- Grant all permissions on the table to your user
GRANT ALL PRIVILEGES ON TABLE name_data TO your_username;

-- Grant usage on the sequence (for auto-incrementing ID)
GRANT USAGE, SELECT ON SEQUENCE name_data_id_seq TO your_username;

-- If you don't know your username, check with:
SELECT current_user;
```

## Alternative (if you're the database owner)
```sql
-- Make sure your user owns the table
ALTER TABLE name_data OWNER TO your_username;
```

## After fixing permissions, test with:
```bash
npm run test-table
```

## Then start your server:
```bash
npm run dev
```
