# Constants

All the app’s shared constants are to be kept at this path.

## Contents

- We can create separate constants files as per the components.
- It's file name should be suffixed with the 'Constants' word. e.g. productConstants.ts

> **Note:** It's recommended to have an `index.ts` file that exports all of the files in that folder. This is to make it easier to import files from the folder.

## File Naming Convention

- All constant names should be in UPPER_CASE (e.g SOME_NAME)
- Folder and file name should be in camelCase.
- Try to create named-exports instead of default exports for all the configs. This will avoid any naming conflicts.

## Usage

To use an config, import it from the folder's `index.ts` file.

## Props

It has no props.

## Setup

This folder has no additional setup required.

## Dependencies

This folder has no dependencies..
