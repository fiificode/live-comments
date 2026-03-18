# Requirements Document

## Introduction

Open Talk is a sports fan discussion hub that provides a live-feeling comment experience. Users browse a list of conversation topics, authenticate via a simulated auth gate, and participate in threaded comment feeds that receive auto-injected live comments every 10–15 seconds. The application is a pure frontend SPA built with React Router v7, TypeScript, Tailwind CSS v4, and Zustand — no backend, no UI libraries.

---

## Glossary

- **App**: The Open Talk Live Comments single-page application.
- **Topic_List**: The screen displaying all available conversation topics.
- **Topic**: A single discussion subject with a title, subtitle, and associated comment thread.
- **Auth_Gate**: The modal overlay that blocks thread access for unauthenticated users.
- **Comment_Thread**: The scrollable feed of comments for a selected topic.
- **Comment_Card**: The reusable UI component that renders a single comment.
- **Comment_Input**: The sticky bottom input bar used to submit new comments.
- **Live_Simulator**: The background timer that injects synthetic comments into the active thread.
- **Store**: The Zustand global state store managing authentication, topics, and comments.
- **New_Comments_Pill**: The floating button shown when new comments arrive and the user is not scrolled to the bottom.
- **Tab_Bar**: The top navigation bar with Conversations, Games, News, and Stats tabs.
- **Toast**: A transient notification shown when a live comment is injected.
- **Typing_Indicator**: A visual cue showing that a simulated user is about to post.

---

## Requirements

### Requirement 1: Topic List Display

**User Story:** As a sports fan, I want to see a list of discussion topics, so that I can choose a conversation to join.

#### Acceptance Criteria

1. THE App SHALL render the Topic_List as the default route at `/`.
2. THE Topic_List SHALL display each Topic with a title, subtitle, and a right-pointing chevron icon.
3. WHEN a Topic is the active topic, THE Topic_List SHALL render a green left border on that Topic's list item.
4. THE Topic_List SHALL display a hero banner containing a sports image and the "Open Talk / FANZONE" branding text.
5. THE Topic_List SHALL render the Tab_Bar with four tabs: Conversations, Games, News, and Stats.
6. WHEN the user taps a Topic, THE App SHALL navigate to the Comment_Thread route for that Topic.

---

### Requirement 2: Tab Bar Navigation

**User Story:** As a user, I want a tab bar at the top of the screen, so that I can understand the app's navigation structure.

#### Acceptance Criteria

1. THE Tab_Bar SHALL render four tabs: Conversations, Games, News, and Stats.
2. WHEN the Conversations tab is active, THE Tab_Bar SHALL apply a visually distinct active style (golden yellow underline or indicator) to that tab.
3. WHEN the user taps the Games, News, or Stats tabs, THE App SHALL take no navigation action and SHALL keep the Conversations tab active.
4. THE Tab_Bar SHALL remain visible at the top of the Topic_List screen.

---

### Requirement 3: Authentication Gate

**User Story:** As an unauthenticated user, I want to be prompted to sign in before viewing a thread, so that the platform can maintain a community identity.

#### Acceptance Criteria

1. WHEN an unauthenticated user taps a Topic, THE Auth_Gate SHALL render as a modal overlay above the Topic_List.
2. THE Auth_Gate SHALL display the message "Become part of the conversation".
3. THE Auth_Gate SHALL render a "Sign In" button and a "Create Account" button.
4. WHEN the user taps "Sign In" or "Create Account", THE Store SHALL set `isAuthenticated` to `true` and THE App SHALL navigate to the Comment_Thread for the selected Topic.
5. WHEN the user dismisses the Auth_Gate without authenticating, THE App SHALL return to the Topic_List with no topic selected.
6. WHILE `isAuthenticated` is `true`, THE App SHALL bypass the Auth_Gate and navigate directly to the Comment_Thread when a Topic is tapped.

---

### Requirement 4: Comment Thread

**User Story:** As an authenticated user, I want to read a scrollable feed of comments for a topic, so that I can follow the conversation.

#### Acceptance Criteria

1. THE Comment_Thread SHALL render a vertically scrollable list of Comment_Cards for the active Topic.
2. THE Comment_Thread SHALL render the Comment_Input as a sticky element fixed to the bottom of the viewport.
3. WHEN the Comment_Thread has no comments, THE Comment_Thread SHALL display the empty-state message "Be the first to start the conversation".
4. WHEN the user navigates away from the Comment_Thread, THE App SHALL stop the Live_Simulator interval for that thread.
5. THE Comment_Thread SHALL display the Topic title in a header above the comment feed.

---

### Requirement 5: Comment Card

**User Story:** As a user, I want each comment to show the author's identity and message clearly, so that I can follow who said what.

#### Acceptance Criteria

1. THE Comment_Card SHALL display the author's avatar (initials-based fallback if no image), username, relative timestamp, and message body.
2. THE Comment_Card SHALL display at least one reaction affordance (e.g., a like/heart count).
3. WHEN a Comment_Card is newly injected by the Live_Simulator or submitted by the user, THE Comment_Card SHALL animate into view with a fade-in and upward slide transition.
4. THE Comment_Card SHALL update its relative timestamp display (e.g., "2s ago", "1m ago") without requiring a page reload.

---

### Requirement 6: Comment Input

**User Story:** As an authenticated user, I want to type and submit a comment, so that I can participate in the conversation.

#### Acceptance Criteria

1. THE Comment_Input SHALL render a text field and a submit button fixed to the bottom of the Comment_Thread.
2. WHILE the text field is empty, THE Comment_Input SHALL render the submit button in a disabled state.
3. WHEN the user presses the Enter key with a non-empty text field, THE Comment_Input SHALL submit the comment and clear the text field.
4. WHEN the user taps the submit button with a non-empty text field, THE Comment_Input SHALL submit the comment and clear the text field.
5. WHEN a comment is submitted, THE Store SHALL prepend the new Comment to the active Topic's comment list with the authenticated user's username and the current timestamp.
6. THE Comment_Input SHALL display a character counter showing the current character count against a maximum of 280 characters.
7. WHEN the character count reaches 280, THE Comment_Input SHALL prevent further input.

---

### Requirement 7: Live Comment Simulation

**User Story:** As a user viewing a thread, I want to see new comments appear automatically, so that the platform feels live and active.

#### Acceptance Criteria

1. WHILE the Comment_Thread is mounted, THE Live_Simulator SHALL inject a synthetic Comment into the active Topic's comment list at a random interval between 10 and 15 seconds.
2. THE Live_Simulator SHALL generate each synthetic Comment with a random username and a contextually relevant sports-fan message.
3. WHEN the Live_Simulator injects a comment, THE App SHALL display a Toast notification indicating a new comment has arrived.
4. WHEN the Live_Simulator injects a comment, THE App SHALL display the Typing_Indicator for 1–2 seconds before the comment appears.
5. WHEN the Comment_Thread unmounts, THE Live_Simulator SHALL clear its interval to prevent memory leaks.

---

### Requirement 8: Auto-Scroll and New Comments Pill

**User Story:** As a user reading a thread, I want the feed to auto-scroll when I'm at the bottom, so that I don't miss new comments, and I want a prompt when I've scrolled up.

#### Acceptance Criteria

1. WHEN a new comment is added and the user's scroll position is at the bottom of the Comment_Thread, THE Comment_Thread SHALL automatically scroll to reveal the new comment.
2. WHEN a new comment is added and the user's scroll position is NOT at the bottom of the Comment_Thread, THE App SHALL display the New_Comments_Pill with a downward arrow and a count of unread new comments.
3. WHEN the user taps the New_Comments_Pill, THE Comment_Thread SHALL scroll to the bottom and THE App SHALL hide the New_Comments_Pill and reset the unread count to zero.
4. WHEN the user manually scrolls to the bottom of the Comment_Thread, THE App SHALL hide the New_Comments_Pill and reset the unread count to zero.

---

### Requirement 9: Zustand State Management

**User Story:** As a developer, I want a single Zustand store to manage all application state, so that data flows predictably across components.

#### Acceptance Criteria

1. THE Store SHALL maintain the following state shape: `isAuthenticated: boolean`, `topics: Topic[]`, `activeTopicId: string | null`, `commentsByTopic: Record<string, Comment[]>`.
2. THE Store SHALL expose actions: `setAuthenticated`, `setActiveTopic`, `addComment`, and `seedComments`.
3. WHEN `addComment` is called, THE Store SHALL append the new Comment to the correct topic's comment array without mutating other topics' arrays.
4. THE Store SHALL be initialized with at least three seed Topics on application load.

---

### Requirement 10: Responsive Layout and Visual Design

**User Story:** As a user on any device, I want the app to look polished and be usable on mobile and desktop, so that I have a consistent experience.

#### Acceptance Criteria

1. THE App SHALL use a mobile-first layout with a centered, max-width container on desktop screens.
2. THE App SHALL apply the defined color system: cream background (`#F5F0E8`), golden yellow (`#F5A623`), dark green (`#1A3A2A`), and near-black text.
3. THE App SHALL implement page transitions (fade or slide) when navigating between the Topic_List and Comment_Thread.
4. THE App SHALL provide visible focus states on all interactive elements for keyboard navigation.
5. THE App SHALL apply ARIA roles and labels to the Auth_Gate modal, Tab_Bar, Comment_Thread feed, and Comment_Input to support assistive technologies.
