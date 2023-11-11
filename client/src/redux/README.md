/redux :

1. It holds all the redux resources in one place. We can create a context folder at the same level if required.
2. This includes action creators, reducers, and a redux store of our app.
3. CONSTANTS.js has all the action types.
4. Initial state of the app is divided based on features and thus corresponding reducers and actions are modularized.
5. “/actions” dir consists of all the action files. Each action file includes feature-based action-creators. As the name suggests, appActions will have app config-based actions and userActions will have all user state-related actions.
6. “/reducer” dir follows the same practice as actions. reducer reduces all the actions and applies corresponding changes to the store. These reducers are later merged into a root-reducer redux’s combineReducers function.
7. “/store.js” is the central state of the application. This incorporates all the mapping between reducer, store, and middle-wares if any.
8. We have redux-thunk middleware in our app for enabling asynchronous dispatching of actions.
9. Configuration for enabling dev tools for redux is done in store.js.
10. Above files are enough for “small to medium” sized applications.
11. For a large application with tens of features, each having tens of actions, types, and individual initial states, it is recommended to have corresponding action.js, reducer.js, and constants in the feature-specific directory.
12. Finally, it can be combined into a single store in the same way it is done now.

Folder Structure in Redux
Redux

> Actions
>
> > appActions.ts
> > userActions.ts

> Reducers
>
> > appReducer.ts
> > userReducer.ts

Constants.ts
store.ts
