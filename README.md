# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## Integrating with the Backend

 - **Backend base URL:** The frontend expects the backend at `http://localhost:5000` during development.
 - **Dev proxy:** Vite is configured to proxy `/api` requests to the backend, so frontend code can call `/api/...` without CORS issues.
 - **Environment variable:** The backend URL is available as `VITE_API_BASE_URL` (see `.env`).

Start the backend first (run `npm install` then `npm run start` in the `Backend` folder), then run the frontend dev server.
