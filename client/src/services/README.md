# Services

All the common services will be kept at this path.

## Contents

- This folder consist different service files depending upon different module service.
- We have separate service folder for each module/feature (example we have `dashboard` folder which consist all the common services defined related to dashboard).

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
