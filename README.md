# Inventory Tracker

## Overview
The Inventory Tracker is a simple Electron application designed to help users manage inventory lots and their associated sites. The application allows users to track units in a lot, with each lot having a lot number and expiration date. Users can also manage sites, which are simply identified by a name. The application provides a user-friendly interface built with Alpine.js and utilizes SQLite for data storage.

## Features
- Track inventory lots with lot numbers and expiration dates.
- Manage sites associated with inventory lots.
- View the number of units of a given lot at each site.
- Runs as an Electron application for desktop use.
- Provides a web version for testing in the browser with a temporary database.

## Technologies Used
- **Electron**: For building the desktop application.
- **TypeScript**: For type-safe development.
- **Alpine.js**: For building the user interface.
- **Drizzle**: For database management and migrations.
- **SQLite**: For local data storage.
- **Playwright**: For end-to-end testing.
- **Vite**: For building the renderer process.

## Project Structure
```
inventory-tracker
├── src
│   ├── main                # Main process files
│   ├── renderer             # Renderer process files
│   ├── shared              # Shared types and IPC channels
│   └── web                 # Web version files
├── tests                   # Test files
├── drizzle                 # Drizzle migrations
├── .github                 # GitHub Actions workflows
├── package.json            # NPM configuration
├── tsconfig.json           # TypeScript configuration
├── electron-builder.json    # Electron build configuration
├── vite.config.ts          # Vite configuration
├── vitest.config.ts        # Vitest configuration
├── copilot-instructions.md # Testing requirements and guidelines
└── README.md               # Project documentation
```

## Setup Instructions
1. Clone the repository:
   ```
   git clone https://github.com/yourusername/inventory-tracker.git
   cd inventory-tracker
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Run the application in development mode:
   ```
   npm run dev
   ```

4. Build the application for production:
   ```
   npm run build
   ```

5. Run tests:
   ```
   npm run test
   ```

## Testing
The project includes unit tests and end-to-end tests. You can run the tests locally using the following command:
```
npm run test
```

## Deployment
The application can be deployed to GitHub Pages using GitHub Actions. The deployment workflow is defined in `.github/workflows/deploy-pages.yml`.

## Contributing
Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes. 

Before submitting a pull request, please review the [Copilot Instructions](copilot-instructions.md) for guidelines on testing requirements.

## License
This project is licensed under the MIT License. See the LICENSE file for details.