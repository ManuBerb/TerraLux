

## Fix: Add explicit deny policies for SELECT, UPDATE, and DELETE on `quotes` table

### What to do
Run a single migration adding three RLS policies:

```sql
CREATE POLICY "Deny public read access" ON quotes FOR SELECT USING (false);
CREATE POLICY "Deny public updates" ON quotes FOR UPDATE USING (false);
CREATE POLICY "Deny public deletes" ON quotes FOR DELETE USING (false);
```

### What about the INSERT warning?
The `WITH CHECK (true)` on INSERT is intentional — it allows anonymous quote submissions. No change needed. We'll mark this finding as ignored with justification.

### What stays the same
- Anonymous users can still submit quotes via the form
- Edge functions using the service role key bypass RLS and can still read/modify data
- No code changes required — this is a database-only fix

### Steps
1. Run migration with the 3 new policies
2. Mark the "always true" INSERT warning as ignored (intentional for public form)
3. Delete the resolved findings after migration succeeds
4. Re-run security scan to confirm clean results

