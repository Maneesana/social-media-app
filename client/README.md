# React TypeScript Boilerplate with Vite

This is a basic boilerplate for a React project using TypeScript and [Vite](https://github.com/vitejs/vite) as the development server. It includes a basic file structure, TypeScript and Vite setup, and necessary dependencies for React.

## Getting Started

1.  Clone the repository: `git clone https://covalience.visualstudio.com/Covalience%20Research/_git/react-typescript-boilerplate`
2.  Install dependencies: `npm install` or `yarn install`
3.  Start the development server: `npm run dev` or `yarn dev`

## File Structure

- `src`: This folder contains the source code for the application.
  - `main.tsx`: This is the entry point for the application.
  - `App.tsx`: This is the root component for the application.
- `public`: This folder contains assets that are never referenced in source code (e.g. robots.txt).
- `tsconfig.json`: This is the TypeScript configuration file.
- `vite.config.js`: This is the Vite configuration file and transpiling the codebase.
- `eslintrc.json`: This is the ESLint configuration file.
- `prettierrc`: This is the Prettier configuration file.

## Dependencies

- `react`: The library for building user interfaces.
- `react-dom`: The package that allows React components to be rendered on the DOM.
- `vite`: A development server that enables fast and efficient development experience.
- `typescript`: A superset of JavaScript that adds optional static typing and other features.

## Tips

- If you want to use other packages which are written in JavaScript, you need to install their @types versions as well to use them with TypeScript.
- Make sure you have correctly set up the `tsconfig.json` file, especially the `baseUrl` and `paths` properties.
- If you want make changes to developement server configuration, you can do so in the `vite.config.js` file.
- Don't forget to run `npm run dev` or `yarn dev` to start the development server and see your application running.

## Conclusion

This is a minimal boilerplate that should help you quickly set up a new React project using TypeScript and Vite. You can always add more features and dependencies to your liking, but this should be enough to get you started. Happy coding!
