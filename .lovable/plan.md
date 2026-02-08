
# Plan: Add Mobile Screenshot Slide for AI Field Force & Sales Execution Platform

## Overview
Add a dedicated mobile app screenshot slide after the "AI Field Force & Sales Execution Platform" case study (currently Slide 18) to showcase the mobile-first sales platform solution.

## Implementation Steps

### Step 1: Generate Mobile Screenshot Asset
Create a new image asset `src/assets/case-study-field-force.jpg` using image generation:
- **Style**: Mobile app mockup with light background
- **Content**: Sales field force mobile application showing:
  - Daily visit planning interface
  - Territory heatmap or map view
  - Order capture screen
  - AI-powered recommendations panel
- **Format**: Portrait-oriented mobile device frame with clean UI

### Step 2: Update DalmiaScreenshotSlide Component
Modify `src/components/pitch/manufacturing-new/DalmiaScreenshotSlide.tsx`:
- Import the new field force screenshot asset
- Add entry to `screenshotMap`: `'case-study-field-force': caseStudyFieldForce`
- Optionally add a mobile-specific layout variant (portrait aspect ratio container)

### Step 3: Add New Screenshot Slide to Data
Update `src/data/dalmiaCementSlides.ts`:
- Insert new slide after current Slide 18 (Field Force case study)
- New slide configuration:
```text
{
  id: 19,
  type: 'dalmia-screenshot',
  headline: 'Field Force Mobile App',
  subtitle: 'AI-powered sales execution platform for 10,000+ field agents',
  speakerNotes: 'Mobile-first interface for daily visit planning and order capture.',
  screenshotPath: 'case-study-field-force'
}
```

### Step 4: Re-index Remaining Slides
Update slide IDs for all subsequent slides:
- Supply Chain Intelligence: 19 becomes 20
- Product Authentication: 20 becomes 21
- Demand Intelligence: 21 becomes 22
- Margin Intelligence: 22 becomes 23
- Transformation Roadmap: 23 becomes 24

## Updated Slide Sequence (Case Studies Section)
| Slide | Type | Title |
|-------|------|-------|
| 16 | Case Study | Enterprise Commercial Data Platform |
| 17 | Screenshot | Customer 360 Dashboard |
| 18 | Case Study | AI Field Force & Sales Execution |
| **19** | **Screenshot** | **Field Force Mobile App** (NEW) |
| 20 | Case Study | Supply Chain Intelligence |
| 21 | Case Study | Product Authentication |
| 22 | Case Study | Demand Intelligence |
| 23 | Case Study | Margin Intelligence |
| 24 | Roadmap | Transformation Roadmap |

## Files to Modify
1. `src/assets/case-study-field-force.jpg` - Create new mobile screenshot asset
2. `src/components/pitch/manufacturing-new/DalmiaScreenshotSlide.tsx` - Add import and map entry
3. `src/data/dalmiaCementSlides.ts` - Insert new slide, re-index subsequent slides

## Total Slides After Change
**24 slides** (up from 23)
