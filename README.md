
# Deal-Pilot-AI

**Deal-Pilot-AI** is a deal monitoring system that helps sales and business teams track deals, manage leads, keep tabs on related clients, and stay on top of issues connected to ongoing deals — all in one place.

##  Features

-  **Deal Monitoring** — Track the status and progress of active deals in real time.
-  **Lead Management** — Capture, organize, and follow up on leads linked to each deal.
-  **Client Tracking** — View client details and history associated with every deal.
-  **Issue Handling** — Log and manage issues or blockers related to deals, so nothing slips through the cracks.
-  **Fast & Modern UI** — Built with React + Vite for a smooth, responsive experience with Hot Module Replacement (HMR) during development.

##  Tech Stack

- **Frontend:** React (Vite)
- **Linting:** Oxlint
- **Bundler:** Vite

This project uses the official [`@vitejs/plugin-react`](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) (powered by [Oxc](https://oxc.rs/)) for Fast Refresh.

> Note: React Compiler is not enabled by default in this setup due to its impact on dev/build performance. See the [official docs](https://react.dev/learn/react-compiler/installation) if you'd like to enable it.

##  Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later recommended)
- npm / yarn / pnpm

### Installation


git clone https://github.com/<your-username>/Deal-Pilot-AI.git
cd Deal-Pilot-AI
npm install


### Run in Development


npm run dev



### Build for Production

`
npm run build


### Preview Production Build

npm run preview


## Project Structure


Deal-Pilot-AI/
├── public/            # Static assets
├── src/
│   ├── assets/         # Images, icons, etc.
│   ├── components/      # Reusable UI components
│   ├── pages/            # Page-level components (Deals, Leads, Clients, Issues)
│   ├── App.jsx           # Root component
│   └── main.jsx          # Entry point
├── index.html
├── vite.config.js
└── package.json




## Linting

This project uses **Oxlint** for fast linting. If you're building a production-grade app, consider adding TypeScript with type-aware lint rules — check out the [Vite React-TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for reference.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## 📄 License

This project is licensed under the MIT License — feel free to use and modify it.
