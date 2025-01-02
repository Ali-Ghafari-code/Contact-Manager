# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

## Getting Started

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (LTS recommended)

### Setup

1. Clone the repository or create a new project:

   ```bash
   git clone <repository-url>
   cd <project-directory>
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Scripts

- **Start Development Server**:
  Runs the development server and JSON server concurrently.

  ```bash
  json-server --watch server/Data.json --port 3001
  ```

- **Development Mode**:
  Starts the Vite development server only.
  ```bash
  npm run dev
  ```

### Configuration

- The mock server watches `server/Data.json` on port `3001`.
- Vite's default dev server runs on port `5173`. You can configure this in `vite.config.js` if needed.

### Plugins Used

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md): Provides Babel-based Fast Refresh.

### Project Structure

```
project-directory
├── public/          # Static assets
├── src/             # React components and source files
├── server/          # Mock server data (Data.json)
├── package.json     # Project dependencies and scripts
└── vite.config.js   # Vite configuration
```

### Notes

For any changes in `server/Data.json`, the JSON server will automatically update without restarting.
