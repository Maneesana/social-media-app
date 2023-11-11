# Context

All the app’s global/common context are to be kept at this path.

## Contents

- This folder consist different context files.

> **Note:** It's recommended to have an `index.ts` file that exports all of the files in that folder. This is to make it easier to import files from the folder.

## File Naming Convention

- Context file name should be in PascalCase and should be suffixed with `Context` e.g. `UserContext.tsx`.
- Try to create named-exports instead of default exports for all the configs. This will avoid any naming conflicts.

## Usage

To use an config, import it from the folder's `index.ts` file.

## Props

It has no props.

## Setup

This folder has no additional setup required.

## Dependencies

This folder may consist different dependencies depending on the config we use (apollo/graphQL, axios, etc).
