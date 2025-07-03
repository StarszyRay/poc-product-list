# Getting Started with Create React App

This is a poc react app done as a part of recruitment process. It consists of:

1. List of all Products (home page) - A simple vertical list of products Each product name
   can be clicked which will take the user to a “Product Details” screen for the clicked item.
2. Product Details Screen - a place where you can view and edit all the details about the
   product

The app loads initially with a default items array or the state from localStorage if the app was used before and items have been edited - all edits to items persist between user sessions with the use of localstorage.
Default items array can be found in `defaultItemsData.ts` file.

The app uses Redux (redux toolkit) for state management and localstorage middleware. However, smaller and simpler solution, like React context, would be more appropriate for this case.

The app has minimal styling, focusing on functinality over visuals.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.
