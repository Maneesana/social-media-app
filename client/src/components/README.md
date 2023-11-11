# Components

This folder contains all of the components used in the project.

## Contents

- This folder consist where all the common reusable components for your application are stored.
- All the component specific design files and services files should be kept under the component folder.

> **Note:** In each subfolder, it's recommended to have an `index.ts` file that exports all of the files in that folder. This is to make it easier to import files from the folder.

## File Naming Convention

- Folder name should be in camelCase with component files names in PascalCase.
- Try to create named-exports instead of default exports for all the components. This will avoid any naming conflicts.
- Component specific styles files name should be same as component file name with `.scss` extension. E.g. `Button.scss`.
- Component specific services files name should be same as component file name with `Service.ts` extension. E.g. `ButtonService.ts`.
- Below is an example of a possible structure for the Components folder:

```
├── buttons
│   ├── PrimaryButton.tsx
│   ├── SecondaryButton.tsx
│   ├── TertiaryButton.tsx
│   └── index.ts
├── forms
│   ├── InputField.tsx
│   ├── Checkbox.tsx
│   ├── RadioButton.tsx
│   └── index.ts
├── modals
│   ├── AlertDialog.tsx
│   ├── ConfirmDialog.tsx
│   ├── Modal.tsx
│   └── index.ts
├── layout
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── Sidebar.tsx
│   └── index.ts
├── utils
│   ├── Datepicker.tsx
│   ├── Pagination.tsx
│   ├── Slider.tsx
│   └── index.ts
└── index.ts

```

## Usage

To use an components, import it from the folder's `index.ts` file.

## Props

Each component has its own set of props, the `readme` file of each component should specify the props that component accepts.

## Setup

This folder has no additional setup required.

## Dependencies

This folder has no dependencies.
