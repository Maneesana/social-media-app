/pages :

1. This is the heart of our application.
2. All the various features/screens/pages are defined here. In this case, “Home”, Login”, “Profile” and "Settings" are 4 different pages of our app.
3. Each screen consists of “index.tsx and style.scss files which exports the screen’s container as default module which makes the screen available as a functional component.
4. Any or Every pages can have a “components” dir. This will hold all the components that are required by only this page.
5. As a general rule, if a module (a utility, component, etc.) is only used within another module, then I want it nested in the directory structure.
6. “/Card/index.tsx” is a layout specific component and used only in Home.

Folder Structure in Pages
V Pages

> Home
> index.tsx
> style.scss
>
> > Components
> >
> > > Card
> > > > index.tsx

# Pages

This folder contains all of the top-level components that represent the pages of the application.

## Contents

Depending on the project requirements, this folder structure may change. The following is the structure of this folder if project has a authentication flow (which is there for most projects):

- `guestPages`: contains all the pages that are accessible to guests user.
- `userPages`: contains all the pages that are accessible to logged in users.
- `adminPages`: contains all the pages that are accessible to admin users.

Each page consist of following files:

- `index.tsx`: contains the component that represents the page.
- `styles.css`: contains the styles for the specific page.
- `readme.md`: contains the documentation for the specific page.
- `@component`: contains the components used in the specific page.
## Usage

1. Import the desired component into the module where it will be used.
   ```javascript
   import { Home } from './pages/Home';
   ```
2. Use the imported component as needed.
   ```javascript
   <Home />
   ```

## Props

Each component has its own set of props, the `readme.md` file of each component should specify the props that component accepts.

## Setup

This folder has no additional setup required.

## Dependencies

This folder has no dependencies.
