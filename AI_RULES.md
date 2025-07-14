# AI Rules for BYTCD Application

This document outlines the technical stack and guidelines for developing the BYTCD application.

## Tech Stack Overview

*   **Frontend Framework:** React.js
*   **Build Tool:** Vite
*   **Styling:** Tailwind CSS for utility-first styling.
*   **Language:** JavaScript (JSX) for existing files, with a preference for TypeScript (TSX) for new components and pages.
*   **UI Components:** Shadcn/ui and Radix UI for pre-built, accessible components.
*   **Icons:** Lucide React for vector icons.
*   **Analytics & Performance:** Vercel Analytics and Speed Insights.
*   **Backend/Database/Authentication:** Firebase (currently present in dependencies).
*   **Routing:** React Router for client-side navigation.
*   **Code Quality:** ESLint for linting.

## Library Usage Guidelines

To maintain consistency and efficiency, please adhere to the following guidelines when choosing and using libraries:

*   **Styling:**
    *   Always use **Tailwind CSS** for all styling. Avoid inline styles or separate CSS files unless absolutely necessary for third-party components that don't support Tailwind.
    *   Utilize **shadcn/ui** and **Radix UI** components whenever possible for common UI elements (buttons, forms, dialogs, etc.). If a specific component is not available or needs significant customization, create a new component using Tailwind CSS.
*   **Icons:**
    *   Use **`lucide-react`** for all icons.
*   **Routing:**
    *   Implement client-side routing using **React Router**. All main application routes should be defined in `src/App.tsx` (or `src/App.jsx` if no TypeScript conversion is done).
*   **State Management:**
    *   For local component state, use React's built-in **`useState`** and **`useReducer`** hooks.
    *   For global or shared state, prefer **React Context API (`useContext`)** for simpler scenarios. Avoid external state management libraries unless the application's complexity explicitly demands it.
*   **API Calls:**
    *   Use the native **`fetch` API** for making HTTP requests. If a more robust solution is needed for complex API interactions (e.g., request cancellation, interceptors), consider adding a library like `axios` after discussion.
*   **Notifications:**
    *   For toast notifications, use **`react-hot-toast`**.
*   **Backend/Authentication/Database:**
    *   Leverage **Firebase** for backend services, authentication, and database interactions, as it is already included in the project dependencies. If a different backend solution is required, it should be discussed and integrated separately.
*   **Component Structure:**
    *   Create a new file for every new component or hook, no matter how small.
    *   Components should be placed in `src/components/`.
    *   Pages should be placed in `src/pages/`.
    *   Utility functions should be placed in `src/utils/`.
    *   Aim for components that are 100 lines of code or less.
*   **Language:**
    *   While existing files are `.jsx`, new components and features should ideally be written in **TypeScript (.tsx)** to leverage type safety.