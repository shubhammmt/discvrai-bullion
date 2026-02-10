

# AI Career Counsellor Agent for Aptech Limited

## Overview
Build a conversational AI career counsellor chatbot for Aptech Limited, accessible at `/aptech-counsellor`. The agent guides prospective students through course discovery, qualification, and lead capture -- all within a polished chat UI.

## Step 1: Save the Spec as a Markdown File
- Create `src/data/aptech-career-counsellor-spec.md` containing the full prompt/spec provided by the user (conversation flow, course data, objection handling, examples, etc.)

## Step 2: Create the Course Knowledge Base
- Create `src/data/aptechCourseData.ts` with structured course catalog:
  - Arena Animation programs (Animation/VFX, Gaming, Web/Graphics, Digital Marketing)
  - MAAC programs (VFX/Animation, Filmmaking, Gaming, Multimedia)
  - Other programs (IT, Hardware, Banking, English)
  - Each entry: name, duration, price range, career outcomes, placement rate
  - Objection handling scripts
  - Center locations (mock data for major cities)

## Step 3: Build the Chat Page
- Create `src/pages/AptechCounsellor.tsx` -- a full-screen conversational UI:
  - Aptech-branded header (orange/blue gradient matching Aptech branding)
  - Welcome screen with quick prompt cards: "Explore Animation & VFX", "Career in Gaming", "Upgrade My Skills", "Check Course Fees"
  - Chat message area with user/bot bubbles, typing indicator
  - Input bar with send button
  - AI responses powered by local logic (pattern matching on user input to simulate the 7-phase conversation flow)
  - Lead capture form rendered inline in chat (name, mobile, email, city, course interest, budget range)
  - Intent score display after qualification
  - Lead ID generation (APT-YYYY-MM-DD-xxxx format)
  - Summary card at end of conversation showing captured data

## Step 4: Create Supporting Components
- `src/components/aptech/AptechChatMessage.tsx` -- styled message bubble (bot with Aptech branding, user messages)
- `src/components/aptech/AptechLeadForm.tsx` -- inline lead capture form rendered within chat flow
- `src/components/aptech/AptechCourseCard.tsx` -- rich course recommendation card (program name, duration, price, career outcomes, placement rate)
- `src/components/aptech/AptechIntentScore.tsx` -- visual intent score meter (0-100)

## Step 5: AI Conversation Engine (Local Mock)
- Create `src/utils/aptechCounsellorEngine.ts`:
  - Phase detection based on conversation state (tracks which phase user is in)
  - Pattern matching for keywords (animation, VFX, gaming, budget, placement, EMI, etc.)
  - Response generation using the objection handling scripts and course data
  - Intent scoring algorithm (budget match + urgency + engagement + course fit = 0-100)
  - Lead ID generator
  - State machine tracking: greeting -> discovery -> course matching -> qualification -> objection handling -> data collection -> close

## Step 6: Add Route
- Register `/aptech-counsellor` route in `src/App.tsx`

## Step 7: Mobile Responsive
- Chat UI optimized for mobile (primary channel per spec)
- Bottom-fixed input bar, scrollable chat area
- Touch-friendly quick prompt cards

---

## Technical Notes
- No backend/Supabase needed -- conversation engine runs entirely client-side with pattern matching
- If Lovable Cloud is connected later, the mock engine can be swapped for a real AI edge function using Lovable AI gateway
- Uses existing UI primitives (Card, Button, Input, Badge from shadcn)
- No new dependencies required
- Course data, objection scripts, and conversation flow all derived from the user's spec
- Lead data stored in local state only (no persistence)

## Files to Create
1. `src/data/aptech-career-counsellor-spec.md` -- full spec saved as markdown
2. `src/data/aptechCourseData.ts` -- structured course catalog and knowledge base
3. `src/pages/AptechCounsellor.tsx` -- main chat page
4. `src/components/aptech/AptechChatMessage.tsx` -- message bubble component
5. `src/components/aptech/AptechLeadForm.tsx` -- inline lead capture form
6. `src/components/aptech/AptechCourseCard.tsx` -- course recommendation card
7. `src/components/aptech/AptechIntentScore.tsx` -- intent score visualization
8. `src/utils/aptechCounsellorEngine.ts` -- conversation engine with phase tracking

## Files to Modify
1. `src/App.tsx` -- add route for `/aptech-counsellor`

