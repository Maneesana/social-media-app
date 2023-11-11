# Config

All the app’s configurations are to be kept at this path.

## Contents

- This folder consist different config files e.g. graphql apollo client configurations will go under this. API Interceptor should be place under this.
- This can also consist date format, default language, some master data set, or anything like that

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

This folder may consist different dependencies depending on the config we use (apollo/graphQL, axios, etc).
