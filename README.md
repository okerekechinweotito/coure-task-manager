## Live at - https://coure-task-manager.vercel.app

## SETUP

To start up locally, Run

- `npm install`

- `npm run dev`

To run tests, Run

- `npm run test`

## Technologies Used

- Framework - Next 15 with Typescript
- Styling - Chakra UI
- State Manager - Jotai
- Unit Test - Jest + React Testing Library
- Data Validation - Zod
- Form Handling - React Hook Form
- Icon Pack - React Icons

## Project Structure and Flow

- 'modules/home' is the main entry point of the project. CRUD operations and filtering are all done inside useTask Hook. filter-select component handles UI and FORM used for filtering. task-card handles UI for individual task card. task-form handles UI and FORM for creating and updating Tasks

- Next 15 new App directory was used, the 'app' folder is used solely for routing, layout and providers
- 'shared' folder is where hooks and UI components are stored
- `__tests__` holds unit tests for useTask hook; which covers CRUD operations + filtering
