
# Mark Discvr AI Value Layers in Slide 6

## Overview
Add a visual indicator to highlight which layers in the execution stack represent Discvr AI's core value contribution. Based on DiscvrAI's B2B transformation philosophy, the value is concentrated in the **Workflows** (agentic automation) and **Intelligence** (AI models) layers.

---

## Design Approach

Add a "Discvr AI" badge/marker on the left side of the Workflows and Intelligence layers to clearly communicate where the AI platform delivers value.

### Visual Treatment Options

**Option A: Left-aligned Badge (Recommended)**
- Add a small pill badge with "Discvr AI" text positioned to the left of the layer label
- Use a distinctive color (gradient or accent) to stand out
- Apply a subtle glow or border effect for emphasis

```text
                    WORKFLOWS  ┃ Pricing │ Sales │ Marketing │ O2C ┃
  ┌─────────┐                  │                                   │
  │Discvr AI│ ─────────────────┤                                   │
  └─────────┘                  │                                   │
                 INTELLIGENCE  ┃ Demand │ Churn │ Credit │ Sentiment┃
```

---

## Implementation Details

### 1. Add `isDiscvrLayer` flag to StackLayer interface

```typescript
interface StackLayer {
  label: string;
  items: LayerItem[];
  colorClass: string;
  isDiscvrLayer?: boolean;  // NEW: marks Discvr AI value layers
}
```

### 2. Update layers array to flag Workflows and Intelligence

```typescript
{
  label: 'Workflows',
  colorClass: 'purple',
  isDiscvrLayer: true,  // NEW
  items: [...]
},
{
  label: 'Intelligence',
  colorClass: 'blue',
  isDiscvrLayer: true,  // NEW
  items: [...]
}
```

### 3. Add Discvr AI badge rendering in the layer row

For layers with `isDiscvrLayer: true`, render a badge to the left of the label:

```typescript
{layer.isDiscvrLayer && (
  <div className="absolute -left-2 top-1/2 -translate-y-1/2 flex items-center">
    <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white text-[8px] font-bold px-2 py-0.5 rounded-full shadow-sm whitespace-nowrap">
      Discvr AI
    </div>
    <div className="w-2 h-px bg-gradient-to-r from-purple-400 to-blue-400" />
  </div>
)}
```

### 4. Wrap both Workflows and Intelligence in a grouped container

Add a subtle left border or bracket connecting the two Discvr AI layers:

```typescript
// Add a vertical connector line on the left spanning both layers
<div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-400 to-blue-400 rounded-full" />
```

---

## File Changes

| File | Changes |
|------|---------|
| `DalmiaVisionArchitectureSlide.tsx` | Add `isDiscvrLayer` flag, render badge and visual connector |

---

## Result

The slide will clearly communicate:
- **Data** layer = existing foundation (SAP, SUVIDHA, etc.)
- **Workflows + Intelligence** layers = **Discvr AI value zone** (highlighted with badge and visual grouping)
- **Channels** layer = touchpoints enhanced by AI
- **Outcomes** layer = business results delivered

This aligns with the "Day-0 Digitalization First, AI Enablement Second" philosophy - the Data layer is the digital bedrock, and Discvr AI adds the intelligence layer on top.
