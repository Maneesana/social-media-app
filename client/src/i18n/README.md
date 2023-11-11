/i18n :

1. Internationalization or multi-lingual support is achieved by the use of the “i18next” library.
2. It mainly consists of a configuration file and all the language translations in independent language.json files.

# Constants

Here we can place Internationalization or multi-lingual support is achieved by the use of the “i18next” library

## Contents

- It mainly consists of a configuration file and all the language translations in independent language.json files.

> **Note:** It's recommended to have an `index.ts` file that exports all of the files in that folder. This is to make it easier to import files from the folder.

## File Naming Convention

- Folder and file name should be in camelCase.
- Try to create named-exports instead of default exports for all the configs. This will avoid any naming conflicts.

## Usage

To use an config, import it from the folder's `index.ts` file.

## Props

Each component has its own set of props, the `readme` file of each component should specify the props that component accepts and returns.

## Setup

This folder has no additional setup required.

## Dependencies

This folder has no dependencies.
