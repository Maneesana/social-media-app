src\pages\README.md
I don't think we need the following files, as those would be in the component files itself.
- `type.ts`: contains the types for the specific page.
- `utils.ts`: contains the utility functions used in the specific page.

src\utils\README.md
As mentioned in this file, It's recommended to have an `index.ts` file that exports all of the files in that folder. This is to make it easier to import files from the folder.

So, we need to update its file structure accordingly. Currently, index.ts contains utility function, but it should contain export of fns only.

env\README.md
It is mentioned to read the env variables, we will use import.meta.env
I have seen in some projects, it is like process.env
Can we use it in this way?

env/ - we can update its readme.md, to not push this folder on cloud server- we need to 
and put it under the .gitignore file