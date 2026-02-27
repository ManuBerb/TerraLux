

## Security Hardening Plan

### Files to modify

**1. Both Edge Functions — Add HTML escaping + input validation + honeypot check**

`supabase/functions/send-contact-email/index.ts`:
- Add `escapeHtml()` helper function
- Add validation: name (max 100), email (regex + max 255), phone (max 20), message (max 5000)
- Add honeypot field check — reject if `_hp` field has a value
- Escape all user inputs before inserting into email HTML
- Strip any unexpected fields from the request body

`supabase/functions/send-quote-email/index.ts`:
- Add `escapeHtml()` helper function
- Add service allowlist validation against known service values
- Add length limits: fullName (100), email (255), phone (20), address (500), details (2000)
- Add honeypot field check
- Escape all user inputs before inserting into email HTML

**2. Client-side forms — Add hidden honeypot fields**

`src/pages/Contact.tsx`:
- Add hidden honeypot input field (visually hidden via CSS, `tabIndex={-1}`, `autoComplete="off"`)
- Add Zod schema validation (matching the edge function limits)
- Send honeypot value in form submission body

`src/pages/Quote.tsx`:
- Add hidden honeypot input field
- Send honeypot value in form submission body

### What stays the same
- All visible form fields and UX flow remain identical
- Image upload logic is untouched
- RLS policies remain as-is (INSERT-only for anon)
- No new database tables or migrations needed

### Technical details

**HTML escape function** (added to each edge function):
```typescript
function escapeHtml(str: string): string {
  return str.replace(/&/g,'&amp;').replace(/</g,'&lt;')
    .replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#039;');
}
```

**Honeypot field** (hidden from real users):
```tsx
<input type="text" name="_hp" style={{ position: 'absolute', left: '-9999px' }}
  tabIndex={-1} autoComplete="off" />
```

**Service allowlist** (send-quote-email):
```typescript
const ALLOWED_SERVICES = [
  'Lawn Mowing & Edging', 'Overseeding', 'Flower Bed Installations',
  'Hedging', 'Leaf Removal & Raking', 'Mulch Beds', 'Sod Installation',
  'Window Cleaning', 'Pressure Washing & Sanding', 'Multiple Services'
];
```

