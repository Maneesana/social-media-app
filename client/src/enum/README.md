# Constants

Enums are a feature added to JavaScript in TypeScript which makes it easier to handle named sets of constants.

enum is logical grouping of your constants. Let's say you want to use different color. Then you make color enum consist of all colors value defined. Lets say accountType which consist value of current, saving, loan, recurring. Its logical grouping. Constant you can define for anything.

By default an enum is number based, starting at zero, and each option is assigned an increment by one. This is
useful when the value is not important.

## Contents

- We can create separate enums files as per the components.
- It's file name should be suffixed with the 'Enums' word. E.g. productEnums.ts

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

This folder has no dependencies..
