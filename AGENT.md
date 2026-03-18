# 🧠 Agent Context: Open Talk (Live Comments App)

## 🎯 Mission

Build a polished, real-time-feeling discussion platform UI that demonstrates senior-level frontend and UX thinking.

---

## 🎨 Design Source (Figma)

Figma File:
https://www.figma.com/design/BITwZUoD8jSF0nEQvccYiS/Inspo-UI---for-hiring?node-id=1-16664

---

## 🧠 How to Interpret the Figma File

The Figma file contains **4 key screens/states**:

1. Topic List
2. Auth Gate
3. Comment Thread
4. Comment Card (reusable component)

### Instructions:

- Treat Figma as the **source of truth for layout**
- Extract:
  - Spacing system (likely 8px grid)
  - Typography scale
  - Color system
  - Component patterns
- Identify reusable components from the design before coding

### Important:

- Do NOT blindly replicate — improve UX where needed
- If something is unclear → infer a reasonable, modern UX solution

---

## 🧩 Product Context

Open Talk is a sports fan discussion hub where users:

- Browse topics
- View conversations
- Post comments
- Experience simulated live interaction

---

## 🛠️ Tech Stack

- React
- TypeScript
- Tailwind CSS
- Zustand (state management)

---

## 🧠 Core Features Mapping (Design → Code)

### 1. Topic List (from Figma)

- Scrollable list of topics
- Each item includes:
  - Title
  - Comment count
  - Possibly avatars or activity indicators
- Clicking → route to thread or auth gate

---

### 2. Tab Navigation

- Conversations (active)
- Games
- News
- Stats

Behavior:

- Only Conversations is functional
- Tabs should reflect active state visually

---

### 3. Auth Gate (from Figma)

- Appears before accessing thread if unauthenticated
- Includes:
  - Clear message
  - CTA (Sign in)
- Auth is simulated (toggle in UI)

---

### 4. Comment Thread

- Vertical scroll feed
- Sticky input at bottom
- Real-time feel

---

### 5. Comment Card (CRITICAL COMPONENT)

Reusable across:

- Initial comments
- Live updates
- User-submitted comments

Structure:

- Avatar
- Username
- Timestamp
- Message

---

## ⚡ Live Simulation Logic

- Every 10–15 seconds:
  - Generate random username + message
  - Append to active thread

Rules:

- Animate entry (fade/slide)
- Do NOT interrupt typing
- Cleanup interval on unmount

---

## 🧠 State Design (Zustand)

```ts
type Store = {
  isAuthenticated: boolean;
  topics: Topic[];
  activeTopicId: string | null;
  commentsByTopic: Record<string, Comment[]>;
};
```

## 🎨 UX Execution Rules

Follow Figma + Improve It
• Match layout closely
• Improve:
• Interaction feedback
• Edge cases
• Responsiveness

## Smart UX Enhancements (MANDATORY)

1. Auto-scroll Behavior
   • If user at bottom → auto-scroll
   • If not → show “New comments ↓”

2. Input Experience
   • Focus state
   • Enter to send
   • Disabled state if empty

3. Empty State
   • Friendly message:
   “Be the first to start the conversation”

## Motion & Interaction

    •	Page transitions (fade/slide)
    •	Comment entry animation
    •	Button hover + press feedback

## 📱 Responsiveness

    •	Mobile-first
    •	Centered feed on desktop
    •	Max-width container for readability

## ♿ Accessibility

    •	Keyboard navigation
    •	Focus states
    •	ARIA roles where needed

## ✨ Bonus Features (High Impact)

    •	Typing indicator (fake)
    •	Timestamp updates (e.g., “2s ago”)
    •	Toast for new comments
    •	Character counter in input

## ⚠️ Constraints

    •	No backend
    •	No UI libraries
    •	Must simulate real-time behavior

## 🏁 End Goal

Deliver a UI that:
• Matches the Figma design closely
• Feels like a live sports discussion platform
• Demonstrates strong frontend architecture
• Shows senior-level UX thinking

```

```
