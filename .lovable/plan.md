
# Create Complete Copy: `/manufacturing-pitch-new`

## Overview
Create a full duplicate of the manufacturing pitch deck at a new route `/manufacturing-pitch-new` to allow reworking without affecting the original.

## Files to Create

### 1. New Slide Components (16 files)
Create copies in `src/components/pitch/manufacturing-new/`:

| Original File | New File |
|--------------|----------|
| `MfgSlideLayout.tsx` | `MfgNewSlideLayout.tsx` |
| `MfgSlideRenderer.tsx` | `MfgNewSlideRenderer.tsx` |
| `MfgTitleSlide.tsx` | `MfgNewTitleSlide.tsx` |
| `MfgChallengeSlide.tsx` | `MfgNewChallengeSlide.tsx` |
| `MfgGapSlide.tsx` | `MfgNewGapSlide.tsx` |
| `MfgPlatformSlide.tsx` | `MfgNewPlatformSlide.tsx` |
| `MfgCapabilitiesSlide.tsx` | `MfgNewCapabilitiesSlide.tsx` |
| `MfgUseCaseSlide.tsx` | `MfgNewUseCaseSlide.tsx` |
| `MfgEnterpriseUseCaseSlide.tsx` | `MfgNewEnterpriseUseCaseSlide.tsx` |
| `MfgCaseStudySlide.tsx` | `MfgNewCaseStudySlide.tsx` |
| `MfgTechnicalSlide.tsx` | `MfgNewTechnicalSlide.tsx` |
| `MfgImplementationSlide.tsx` | `MfgNewImplementationSlide.tsx` |
| `MfgImpactSlide.tsx` | `MfgNewImpactSlide.tsx` |
| `MfgCredibilitySlide.tsx` | `MfgNewCredibilitySlide.tsx` |
| `MfgNextStepsSlide.tsx` | `MfgNewNextStepsSlide.tsx` |
| `MfgContactSlide.tsx` | `MfgNewContactSlide.tsx` |

### 2. New Data Files (2 files)
Create copies in `src/data/`:

| Original File | New File |
|--------------|----------|
| `manufacturingTransformationSlides.ts` | `manufacturingNewSlides.ts` |
| `enterpriseUseCases.ts` | `enterpriseUseCasesNew.ts` |

### 3. New Page Component (1 file)
Create in `src/pages/`:

| New File |
|----------|
| `ManufacturingPitchNew.tsx` |

### 4. Route Registration
Update `src/App.tsx`:
- Add import for `ManufacturingPitchNew`
- Add route: `/manufacturing-pitch-new`

---

## Technical Details

### Naming Convention
- All new components use `MfgNew` prefix instead of `Mfg`
- Data exports use `manufacturingNewSlides` and `enterpriseUseCasesNew`
- Slide types remain the same (e.g., `mfg-title`, `mfg-challenge`) to allow easy migration back

### Import Updates
Each new component will:
1. Import from `MfgNewSlideLayout` instead of `MfgSlideLayout`
2. Use `manufacturingNewSlides` data source
3. Reference new enterprise use cases from `enterpriseUseCasesNew`

### File Count Summary
```text
Components:     16 files (in src/components/pitch/manufacturing-new/)
Data:            2 files (in src/data/)
Pages:           1 file  (in src/pages/)
Route update:    1 file  (src/App.tsx)
────────────────────────
Total:          20 files
```

---

## Post-Implementation

Once created, you can:
1. Access the new deck at `/manufacturing-pitch-new`
2. Modify any slide component in `manufacturing-new/` without affecting the original
3. Update content in `manufacturingNewSlides.ts` independently
4. When satisfied, either replace the original or keep both versions
