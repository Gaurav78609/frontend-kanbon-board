Frontend Engineering Assignment – Kanban Board

Objective:
Build a simplified Kanban Board application that demonstrates optimistic UI updates,
asynchronous state handling, and automatic rollback on failure.

Landing Page & Mock Authentication:
- Simple login page
- Accepts any non-empty username or email
- No real backend authentication
- User is redirected to the Kanban Board after login
- User remains logged in after page refresh using localStorage

Kanban Board:
- Three columns: To Do, In Progress, Done
- Add Item: User can add a new task to the To Do column
- Move Item: User can move tasks between columns using drag and drop
- Delete Item: User can remove a task

Mock API Rules:
- Every action (Add, Move, Delete) has a simulated delay of 1–2 seconds
- Optimistic UI: The UI updates instantly without waiting for the server response
- Random Failures: The mock API fails randomly about 20% of the time

Failure Behavior:
- If the mock API fails after the delay:
  - A clear error message is shown to the user
  - The UI automatically rolls back to the previous state

Technical Requirements:
- Framework: React.js
- Styling: Tailwind CSS (clean, minimal, responsive)
- State Management: Proper handling of optimistic updates and rollback
- No heavy UI or component libraries used

How to Run Locally:
- npm install
- npm run dev

Trade-offs / Decisions:
- Local component state is used due to limited application scope
- Task persistence after refresh is not implemented as it was not required
- UI is kept minimal to focus on application logic and async behavior

Author:
Gourav Singh
