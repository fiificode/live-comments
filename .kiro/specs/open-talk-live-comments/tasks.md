# Implementation Plan: Open Talk Live Comments

## Overview

Incremental build of a pure-frontend React Router v7 + TypeScript + Tailwind CSS v4 + Zustand SPA. Each phase wires into the previous one so there is no orphaned code at any step.

## Tasks

- [x] 1. Phase 1 — Project setup
  - [x] 1.1 Install dependencies and scaffold folder structure
    - Run `npm install zustand` and `npm install --save-dev fast-check vitest @testing-library/react @testing-library/user-event jsdom`
    - Create directories: `app/types/`, `app/store/`, `app/data/`, `app/hooks/`, `app/components/layout/`, `app/components/features/topics/`, `app/components/features/auth/`, `app/components/features/thread/`, `app/components/ui/`, `app/__tests__/unit/`
    - _Requirements: 9.1_

  - [x] 1.2 Define TypeScript types
    - Create `app/types/index.ts` with `User`, `Topic`, `Comment`, and `StoreState` interfaces exactly as specified in the design
    - _Requirements: 9.1_

  - [x] 1.3 Create seed data files
    - Create `app/data/topics.ts` with `SEED_TOPICS` (at least 3 topics: Masters 2025, Ryder Cup, PGA Tour Drama)
    - Create `app/data/mockComments.ts` with `MOCK_USERNAMES` (10+ names) and `MOCK_MESSAGES` (15+ sports-fan messages)
    - _Requirements: 9.4, 7.2_

  - [x] 1.4 Create Zustand store
    - Create `app/store/useStore.ts` implementing `StoreState` with all actions: `signIn`, `setActiveTopic`, `addComment`, `seedComments`, `setActiveTab`
    - Initialize store with `SEED_TOPICS`, `isAuthenticated: false`, `activeTab: 'Conversations'`
    - _Requirements: 9.1, 9.2, 9.3, 9.4_

  - [x] 1.5 Configure routing
    - Update `app/routes.ts` to export `index('routes/home.tsx')` and `route('thread/:topicId', 'routes/thread.$topicId.tsx')`
    - Create stub `app/routes/home.tsx` and `app/routes/thread.$topicId.tsx` that return `null` (to be filled in later phases)
    - _Requirements: 1.1, 4.1_

- [x] 2. Phase 2 — Base layout
  - [x] 2.1 Implement AppShell
    - Create `app/components/layout/AppShell.tsx` wrapping children in a cream (`#F5F0E8`) background with a centered max-width container
    - _Requirements: 10.1, 10.2_

  - [x] 2.2 Implement Header / hero banner
    - Create `app/components/layout/Header.tsx` with dark green background, sports image placeholder, and "Open Talk / FANZONE" branding text
    - _Requirements: 1.4_

  - [x] 2.3 Implement TabBar
    - Create `app/components/layout/TabBar.tsx` reading `activeTab` from store and calling `setActiveTab` on tap
    - Render four tabs (Conversations, Games, News, Stats) with `role="tablist"` and each tab `role="tab"` + `aria-selected`
    - Apply golden yellow underline indicator to the active tab; Games/News/Stats taps are visual-only (no navigation)
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 10.5_

  - [x] 2.4 Wire AppShell into root
    - Update `app/root.tsx` to wrap the route outlet with `AppShell` (renders `Header` + `TabBar` + outlet)
    - _Requirements: 1.4, 2.4_

- [x] 3. Phase 3 — Topic List
  - [x] 3.1 Implement TopicCard
    - Create `app/components/features/topics/TopicCard.tsx` with props `topic: Topic`, `isActive: boolean`, `onClick: () => void`
    - Render title, subtitle, right-pointing chevron icon
    - Apply `border-l-4 border-[#1A3A2A]` when `isActive` is true
    - _Requirements: 1.2, 1.3_

  - [x] 3.2 Implement TopicList
    - Create `app/components/features/topics/TopicList.tsx` reading `topics` and `activeTopicId` from store
    - On topic tap: if authenticated → navigate to `/thread/:topicId`; else → call `onAuthRequired` callback
    - _Requirements: 1.1, 1.2, 1.3, 1.6_

  - [x] 3.3 Wire TopicList into home route
    - Update `app/routes/home.tsx` to render `TopicList` with `showAuthGate` local state and `onAuthRequired` handler
    - _Requirements: 1.1_

- [x] 4. Phase 4 — Auth Gate
  - [x] 4.1 Implement AuthGate modal
    - Create `app/components/features/auth/AuthGate.tsx` with props `onAuth: () => void`, `onDismiss: () => void`
    - Render modal overlay with `role="dialog"`, `aria-modal="true"`, `aria-labelledby`
    - Display "Become part of the conversation", "Sign In" button, "Create Account" button
    - Backdrop click calls `onDismiss`
    - _Requirements: 3.1, 3.2, 3.3, 10.5_

  - [x] 4.2 Wire AuthGate into home route
    - In `app/routes/home.tsx`, conditionally render `AuthGate` overlay when `showAuthGate` is true
    - On `onAuth`: call `store.signIn()`, then navigate to `/thread/:topicId`
    - On `onDismiss`: hide AuthGate and clear `activeTopicId`
    - _Requirements: 3.4, 3.5, 3.6_

- [x] 5. Checkpoint — Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [x] 6. Phase 5 — Comment Thread
  - [x] 6.1 Implement Avatar primitive
    - Create `app/components/ui/Avatar.tsx` with props `username: string`, `size?: 'sm' | 'md'`
    - Derive initials from username; derive background color from a deterministic hash of the username
    - _Requirements: 5.1_

  - [x] 6.2 Implement CommentCard
    - Create `app/components/features/thread/CommentCard.tsx` with props `comment: Comment`, `isNew: boolean`
    - Render `Avatar`, username, relative timestamp (updated every 30s via `useEffect`), message body, like count
    - When `isNew` is true, apply fade-in + slide-up CSS animation class
    - _Requirements: 5.1, 5.2, 5.3, 5.4_

  - [x] 6.3 Implement CommentThread
    - Create `app/components/features/thread/CommentThread.tsx` reading `commentsByTopic[activeTopicId]` from store
    - Render scrollable list of `CommentCard` components with `role="feed"` and `aria-label="Comment thread"`
    - Show "Be the first to start the conversation" when the comment list is empty
    - Display topic title in a header above the feed
    - Manage scroll position ref for auto-scroll logic (to be extended in Phase 7)
    - _Requirements: 4.1, 4.3, 4.5, 10.5_

  - [x] 6.4 Wire CommentThread into thread route
    - Update `app/routes/thread.$topicId.tsx` to read `topicId` from params, check `isAuthenticated`, redirect to `/` if not, otherwise render `CommentThread`
    - Handle unknown `topicId` with a "Topic not found" message and link back to home
    - _Requirements: 4.1, 4.4_

- [x] 7. Phase 6 — Comment Input
  - [x] 7.1 Implement CommentInput
    - Create `app/components/features/thread/CommentInput.tsx` with props `topicId: string`, `onSubmit: (text: string) => void`
    - Render sticky-bottom text field and submit button with `aria-label="Write a comment"` and `aria-label="Post comment"`
    - Disable submit when input is empty or whitespace-only
    - Submit on Enter key or button tap; clear field after submission
    - Show character counter (current/280); cap input at 280 characters
    - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.6, 6.7, 10.5_

  - [x] 7.2 Wire CommentInput into thread route
    - In `app/routes/thread.$topicId.tsx`, render `CommentInput` below `CommentThread`
    - `onSubmit` handler calls `store.addComment` with a new `Comment` object using `currentUser.username` and `Date.now()`
    - _Requirements: 6.5_

- [ ] 8. Phase 7 — Live Updates
  - [x] 8.1 Implement Toast primitive
    - Create `app/components/ui/Toast.tsx` with props `message: string`, `visible: boolean`
    - Fixed position at top of screen; auto-dismisses after 3 seconds via `useEffect`
    - _Requirements: 7.3_

  - [x] 8.2 Implement TypingIndicator
    - Create `app/components/features/thread/TypingIndicator.tsx` with props `username: string`, `visible: boolean`
    - Render animated dots + "{username} is typing..." text; hidden when `visible` is false
    - _Requirements: 7.4_

  - [x] 8.3 Implement NewCommentsPill
    - Create `app/components/features/thread/NewCommentsPill.tsx` with props `count: number`, `onTap: () => void`
    - Floating pill button showing unread count + downward arrow; hidden when `count === 0`
    - _Requirements: 8.2, 8.3_

  - [x] 8.4 Implement useLiveComments hook
    - Create `app/hooks/useLiveComments.ts` accepting `topicId: string`
    - On mount: set `setInterval` with a random delay between 10 000–15 000 ms
    - Before injecting: set `typingUser` state for 1–2 s, then call `store.addComment` with a synthetic comment drawn from `MOCK_USERNAMES` and `MOCK_MESSAGES`
    - On unmount: call `clearInterval` to prevent memory leaks
    - Return `{ typingUser, showToast, toastMessage }` for the thread to consume
    - _Requirements: 7.1, 7.2, 7.3, 7.4, 7.5, 4.4_

  - [ ] 8.5 Wire live updates into CommentThread
    - In `CommentThread`, call `useLiveComments(topicId)` and render `TypingIndicator` and `Toast` using the returned state
    - Implement auto-scroll: when a new comment arrives and the scroll position is at the bottom, scroll to reveal it
    - Implement `NewCommentsPill` logic: track unread count when user is scrolled up; reset on pill tap or manual scroll to bottom
    - _Requirements: 7.3, 7.4, 8.1, 8.2, 8.3, 8.4_

- [ ] 9. Checkpoint — Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 10. Phase 8 — Polish
  - [ ] 10.1 Add page transitions
    - Implement fade or slide CSS transitions when navigating between Topic_List and Comment_Thread routes
    - _Requirements: 10.3_

  - [ ] 10.2 Add focus states and keyboard navigation
    - Ensure all interactive elements (tabs, topic cards, buttons, input) have visible focus rings
    - Verify Tab key order is logical throughout the app
    - _Requirements: 10.4_

  - [ ] 10.3 Responsiveness pass
    - Verify mobile-first layout; apply max-width container centering on desktop
    - Confirm sticky CommentInput does not overlap content on small screens
    - _Requirements: 10.1_

  - [ ] 10.4 Seed initial comments per topic
    - In `app/routes/thread.$topicId.tsx`, call `store.seedComments` on mount if the topic has no comments yet, using a small set of pre-written comments from `mockComments.ts`
    - _Requirements: 9.4_

- [ ] 11. Phase 9 — Tests
  - [ ] 11.1 Set up Vitest config
    - Configure `vitest.config.ts` with jsdom environment and `@testing-library/react` setup file
    - _Requirements: (testing infrastructure)_

  - [ ] 11.2 Write store property tests
    - Create `app/__tests__/store.test.ts`
    - [ ]* 11.2.1 Write property test for addComment (Property 1)
      - **Property 1: addComment appends to the correct topic only**
      - **Validates: Requirements 9.3, 6.5**
    - [ ]* 11.2.2 Write property test for signIn (Property 5)
      - **Property 5: signIn sets isAuthenticated and currentUser**
      - **Validates: Requirements 3.4**

  - [ ] 11.3 Write CommentInput property tests
    - Create `app/__tests__/CommentInput.test.tsx`
    - [ ]* 11.3.1 Write property test for whitespace rejection (Property 2)
      - **Property 2: Empty and whitespace-only input is rejected**
      - **Validates: Requirements 6.2**
    - [ ]* 11.3.2 Write property test for character limit (Property 3)
      - **Property 3: Character limit is enforced**
      - **Validates: Requirements 6.7**
    - [ ]* 11.3.3 Write property test for input clears after submission (Property 4)
      - **Property 4: Input clears after submission**
      - **Validates: Requirements 6.3, 6.4**

  - [ ] 11.4 Write CommentCard property tests
    - Create `app/__tests__/CommentCard.test.tsx`
    - [ ]* 11.4.1 Write property test for CommentCard renders all required fields (Property 10)
      - **Property 10: CommentCard renders all required fields for any comment**
      - **Validates: Requirements 5.1, 5.2, 5.4**

  - [ ] 11.5 Write NewCommentsPill property tests
    - Create `app/__tests__/NewCommentsPill.test.tsx`
    - [ ]* 11.5.1 Write property test for pill count matches unread injections (Property 8)
      - **Property 8: New comments pill count matches unread injections**
      - **Validates: Requirements 8.2**
    - [ ]* 11.5.2 Write property test for reaching bottom resets the pill (Property 9)
      - **Property 9: Reaching the bottom resets the pill**
      - **Validates: Requirements 8.3, 8.4**

  - [ ] 11.6 Write useLiveComments property tests
    - Create `app/__tests__/useLiveComments.test.ts`
    - [ ]* 11.6.1 Write property test for live simulator time window (Property 6)
      - **Property 6: Live simulator injects within the correct time window**
      - **Validates: Requirements 7.1**
    - [ ]* 11.6.2 Write property test for clearInterval on unmount (Property 7)
      - **Property 7: Live simulator clears its interval on unmount**
      - **Validates: Requirements 7.5, 4.4**

  - [ ] 11.7 Write TabBar property tests
    - Create `app/__tests__/TabBar.test.tsx`
    - [ ]* 11.7.1 Write property test for active tab indicator (Property 11)
      - **Property 11: Active tab receives the indicator style**
      - **Validates: Requirements 2.2**

  - [ ] 11.8 Write ARIA property tests
    - Create `app/__tests__/aria.test.tsx`
    - [ ]* 11.8.1 Write property test for ARIA attributes on key components (Property 12)
      - **Property 12: ARIA attributes are present on key components**
      - **Validates: Requirements 10.5**

  - [ ] 11.9 Write unit tests
    - Create `app/__tests__/unit/AuthGate.test.tsx` — renders correct text, Sign In calls `onAuth`, backdrop click calls `onDismiss`
    - Create `app/__tests__/unit/TopicCard.test.tsx` — active border class present, chevron rendered
    - Create `app/__tests__/unit/CommentThread.test.tsx` — empty-state message when no comments
    - _Requirements: 3.2, 3.3, 3.5, 1.2, 1.3, 4.3_

- [ ] 12. Final checkpoint — Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for a faster MVP
- Each task references specific requirements for traceability
- Checkpoints at tasks 5, 9, and 12 ensure incremental validation
- Property tests use **fast-check** with a minimum of 100 iterations each
- Unit tests use **Vitest** + **@testing-library/react**; run with `npx vitest --run`
- All property tests must include the comment tag `// Feature: open-talk-live-comments, Property N: <text>`
