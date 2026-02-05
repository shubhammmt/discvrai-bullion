# Discvr Homepage Hero Carousel Task

## Objective
Create a 3-slide hero carousel on the `/discvr` page.

## Banner Slides
1. **Gold Banner** - From /bullion hero → CTA redirects to `/bullion?metal=gold`
2. **Silver Banner** - From /bullion hero → CTA redirects to `/bullion?metal=silver`
3. **LAMF Banner** - From user-provided design → CTA redirects to `/bullion/loans`

## Requirements
- [x] Extract Gold & Silver hero content from /bullion page
- [x] Create LAMF banner from provided image/design
- [x] Implement auto-rotating carousel (5s interval)
- [x] Add navigation dots with color-coded indicators
- [x] CTAs link to respective pages

## Implementation
- Created `src/components/discvr/DiscvrHeroCarousel.tsx` component
- Carousel auto-rotates every 5 seconds
- Gold banner (amber) → /bullion?metal=gold
- Silver banner (slate) → /bullion?metal=silver  
- LAMF banner (cyan/teal) → /bullion/loans with feature cards

## Status: COMPLETED ✅