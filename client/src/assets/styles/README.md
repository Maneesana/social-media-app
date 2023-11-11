# Styles

All the application-level styles to be kept at this path.

It can include theme definition (font, colors, typography) of the app UI and global or commonly used styles

Material UI’s Theme is defined here, and it can have global styles also exported as a part of the theme object as shown below.
It can then be referenced in individual components using MUI’s theme object.
Pastebin link for the above code: https://rentry.co/arowg/raw
(More on Material UI implementation in “ARCHITECTURE section” below)
Pastebin link for the above code: https://rentry.co/arowg/raw
(More on Material UI implementation in “ARCHITECTURE section” below)

## Contents

- This folder consist different style files depending upon different module style.
- This folder consist `mixins.scss` file which consist all the mixins which are used in the application.
- This folder consist `variables.scss` file which consist all the styles variables which are used in the application.

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

It has no dependencies.
