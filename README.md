# Frontend Engineering Assignment – Kanban Board

## Objective
Build a simplified Kanban Board application that demonstrates:
- Optimistic UI updates
- Asynchronous state handling
- Automatic state rollback on API failure

---

## Landing Page & Mock Authentication
- Simple login page
- Accepts any non-empty username or email
- No real backend authentication is used
- User is redirected to the Kanban Board after login
- Login state persists across page refresh using localStorage

---

## Kanban Board Features
- Three columns:
  - To Do
  - In Progress
  - Done
- Add Task: Users can add a new task to the **To Do** column
- Move Task: Tasks can be moved between columns using drag and drop
- Delete Task: Tasks can be removed from the board

---

## Mock API Behavior
- Every action (Add, Move, Delete) has a simulated delay of 1–2 seconds
- Optimistic UI updates are applied immediately without waiting for the API response
- The mock API fails randomly approximately 20% of the time

---

## Failure Handling & Rollback
- If the mock API fails after the delay:
  - A clear and user-friendly error message is displayed
  - The UI automatically rolls back to the previous valid state
- This ensures data consistency while maintaining a responsive user experience

---

## Technical Requirements
- Framework: React.js
- Styling: Tailwind CSS (clean, minimal, and responsive)
- State Management: Proper handling of optimistic updates and rollback
- No heavy UI or component libraries are used

---

## How to Run Locally
```bash
npm install
npm run dev


Trade-offs & Decisions

Local component state is used due to the limited scope of the application

Task persistence after page refresh is not implemented as it was not required

UI is intentionally kept minimal to focus on application logic and async behavior

Author

Gourav Singh