

## Fix: Prevent browser autofill from triggering the honeypot

**Root cause**: The hidden honeypot field (`_hp`) is being autofilled by the browser with values like "Quebec", causing all submissions to be silently rejected.

**Changes**:

### 1. `src/pages/Quote.tsx` — Make the honeypot immune to autofill
- Rename the field from `_hp` to a random/obscure name like `website_url` or `confirm_address_hp`
- Add `autoComplete="new-password"` (browsers respect this more than `autoComplete="off"`)
- Wrap in a div with `aria-hidden="true"` and `style={{ display: 'none' }}` instead of absolute positioning (some screen readers and autofill engines still find absolutely-positioned fields)

### 2. `supabase/functions/send-quote-email/index.ts` — Match the renamed field
- Update the honeypot check from `body._hp` to match the new field name

**No database changes needed.**

