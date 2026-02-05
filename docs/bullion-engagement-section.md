 # Bullion Engagement Section Requirements
 
 ## Subject: Add Engagement Section (Polls and Contests) to the Bullion Screen
 
 ### Objective
 Add a new "Engagement & Rewards" section to the /bullion page. This section should include an interactive Poll component and a Gamified Contest card to drive user retention and investment habits.
 
 ---
 
 ## 1. Poll Component: "Market Sentiment"
 
 **Placement:** Insert below the "Investment Journey" banner but above the "Top Performers" list.
 
 **UI Design:**
 - A card with a light background (matching the app's clean aesthetic).
 - Question Text: "What is your investment strategy for this week?" (Bold, Black).
 
 **Options (Buttons):**
 1. "Buy more Gold 📈"
 2. "Hold & Wait ⏳"
 3. "Switch to Silver 🥈"
 
 **Interactivity:**
 - When a user clicks an option, show a "Percentage Result" view (e.g., 65% of users are buying Gold).
 - Add a subtle "Thank you for voting!" message with a "Start Buying" button.
 
 ---
 
 ## 2. Contest Component: "The Savings Streak"
 
 **Placement:** Insert as a horizontal scrolling card or a full-width banner below the Funds list.
 
 **UI Design:**
 - Use a gradient background (Gold to Orange).
 - Title: "🏆 The 7-Day Gold Sprint"
 - Subtitle: "Invest just ₹10 for 7 days in a row and win a digital silver bonus!"
 
 **Features to include:**
 - **Progress Tracker:** A row of 7 circular icons representing days.
 - **Visual Logic:** Highlight the "Day 1" and "Day 2" circles as 'completed' (green checkmark) to show the user how it works.
 - **CTA Button:** A primary button labeled "Continue My Streak."
 
 ---
 
 ## 3. Reward Logic & Navigation
 
 **State Management:**
 - Create a simple state where clicking "Vote" or "Enter Contest" triggers a confetti animation or a success toast message.
 
 **Navigation:**
 - Ensure the "Enter Contest" button scrolls the user back up to the "Digital Gold" card to initiate a purchase.
 
 ---
 
 ## 4. Styling Guidelines (Matches existing UI)
 
 - **Fonts:** Use the same Sans-Serif font as the "Start Your Investment Journey" header.
 - **Colors:** Use the Aqua background (#E0F7FA) for the Poll and the Dark Gray (#333333) for text to ensure visibility.
 - **Corner Radius:** All cards should have a `rounded-xl` or 16px border radius to match the current card design.