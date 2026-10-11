# UserApp Frontend

A simple **React + Vite + TypeScript** frontend for the [UserApp Spring Boot API](https://github.com/dasunisenanayake25/userapp). It lists users and supports full CRUD (create, read, update, delete). The UI is intentionally minimal: the goal is wiring the API and practising React Hooks and the Context API.

## Tech Stack

- React (function components + Hooks)
- TypeScript
- Vite (dev server and build tool)
- Context API with a custom hook (`useUsers`)
- ESLint

## Features

- Load users from the backend on page load (loading and error states)
- Create a user (backend validation messages shown in the form)
- Edit and update a user
- Delete a user (with confirmation)

## Prerequisites

- Node.js 20.19+ (or 22.12+) and npm
- The backend running on `http://localhost:8080` (see the [backend repo](https://github.com/dasunisenanayake25/userapp)): Spring Boot, MySQL with the `userdb` database, and the `local` profile active

## Getting Started

```bash
git clone https://github.com/dasunisenanayake25/userapp-frontend.git
cd userapp-frontend
npm install
npm run dev
```

Open `http://localhost:5173`.

Start the backend first, otherwise the page shows a red error message instead of the user table.

## Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Start the Vite dev server with hot reload |
| `npm run build` | Type-check with `tsc` and create a production build in `dist/` |
| `npm run lint` | Run ESLint |
| `npm run preview` | Preview the production build locally |

## How the frontend talks to the backend

The browser (`localhost:5173`) and the Spring Boot API (`localhost:8080`) are different origins, so direct calls would be blocked by CORS. In development, the Vite dev server **proxies** every request that starts with `/api` to the backend:

```ts
// vite.config.ts
server: {
  proxy: {
    "/api": "http://localhost:8080",
  },
},
```

The code simply calls `fetch("/api/users")`. If you change `vite.config.ts`, restart `npm run dev`.

## API Endpoints Used

| Action | Request |
|---|---|
| Read all | `GET /api/users` |
| Create | `POST /api/users` |
| Update | `PUT /api/users/{id}` |
| Delete | `DELETE /api/users/{id}` |

Request body for create and update:

```json
{ "fullName": "Nimal Perera", "email": "nimal@mail.com" }
```

Errors from the backend arrive as `{"error": "message"}` and are displayed in the UI.

## Project Structure

```
src
├── main.tsx                  # App entry point
├── App.tsx                   # Layout, wraps everything in <UserProvider>
├── types
│   └── user.ts               # User and UserRequest interfaces (mirror the backend DTOs)
├── api
│   └── userApi.ts            # fetch wrapper and the 4 API functions
├── context
│   ├── UserContext.ts        # Context object and its type
│   └── UserProvider.tsx      # State (users, loading, error) and actions
├── hooks
│   └── useUsers.ts           # Custom hook to read the context safely
└── components
    ├── UserForm.tsx          # Create and edit form
    ├── UserList.tsx          # Table with loading / error / empty states
    └── UserItem.tsx          # One table row with Edit and Delete buttons
```

## Concepts Practised

| Concept | Where |
|---|---|
| Components and props | `UserItem`, `UserList`, `UserForm` |
| `useState` | Form inputs, `users`, `loading`, `error`, `editingUser` |
| `useEffect` | Load users when the provider mounts (`UserProvider`) |
| Context API | `UserContext` + `UserProvider` avoid prop drilling |
| Custom hook | `useUsers()` wraps `useContext` and throws if used outside the provider |
| TypeScript interfaces | `User`, `UserRequest`, component prop types |
| Immutable state updates | `[...prev, item]`, `map`, `filter` |
| `key` prop to reset a component | `<UserForm key={editingUser?.id ?? "new"} />` |

## Data Flow (example: create)

```
UserForm submit -> addUser() [context] -> POST /api/users [fetch]
  -> backend saves and returns the new user -> setUsers([...prev, created])
  -> UserList re-renders with the new row
```

## Known Limitations

- Submitting a duplicate email returns a generic `Request failed (500)` because the backend does not yet handle the unique-constraint error with a friendly message.
- The Vite proxy only works in development. A production deployment needs CORS configured on the backend (or a reverse proxy).

## Git Workflow

Each part was built on its own branch and merged into `main` through a pull request:

`components` -> `usestate` -> `fetch` -> `useeffect` -> `create` -> `delete` -> `context`