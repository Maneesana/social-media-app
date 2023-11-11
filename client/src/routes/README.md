# Routes

All the app’s routing logic resides here.
Our app uses “react-router-dom” (version-6) for routing implementation.

## Contents

- This folder consist mainly 2 types of routes are included, public & private, where private being the ones that require authentication.
- “publicRoute.ts” is a component to keep all the routes that can be accessed without authentication.
- “privateRoute.ts” is a component to add a check for user authentication for secure/private routes.

  > **Note:** It's recommended to have an `index.ts` file that exports all of the files in that folder. This is to make it easier to import files from the folder.

## File Naming Convention

- Folder and file name should be in camelCase.
- Try to create named-exports instead of default exports for all the configs. This will avoid any naming conflicts.

## Usage

To use an config, import it from the folder's `index.ts` file.

## Props

It has no props.

## Setup

This folder has no additional setup required.

## Dependencies

This folder files is created based on assuming tat this project uses "react-router-dom" (version 6).
