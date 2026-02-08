
# Update "TODAY" Label Text in Slide 6

## Overview
Update the "From → To" bridge text to be more descriptive about the current state challenges.

---

## Change Details

| Location | Current Text | New Text |
|----------|-------------|----------|
| Line 158 | `4 Disconnected Tools` | `Disconnected Tools, Data and Insights` |

---

## File to Modify

**`src/components/pitch/manufacturing-new/DalmiaVisionArchitectureSlide.tsx`**

```typescript
// Line 158
// Before
<span className="text-xs text-slate-700">4 Disconnected Tools</span>

// After
<span className="text-xs text-slate-700">Disconnected Tools, Data and Insights</span>
```

---

## Additional Update

Also updating "Platforms" to "Channels" on line 65 as previously discussed:

```typescript
// Line 65
// Before
label: 'Platforms',

// After
label: 'Channels',
```

---

## Result

The "From → To" bridge will display:

```
TODAY: Disconnected Tools, Data and Insights  →  TOMORROW: Unified AI Platform
```

This better conveys that the problem isn't just about the number of tools, but about the fragmented nature of tools, data, and insights across the organization.
