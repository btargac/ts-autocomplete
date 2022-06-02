#### What is the difference between Component and PureComponent? give an example where it might break my app.
The main difference is how these components decide whether to re-render or not. PureComponent implements shouldComponentUpdate
method which compares the state/props with a shallow comparison, on the other hand Component re-renders every time state or props are updated,
even if state or props are the same or if the parent component is updated it still re-renders. When we have hierarchical state data within our components
and if the state/ props are mutated in any of the component it will lead to bugs by not triggering re-renders with all of its children components.

#### Context + ShouldComponentUpdate might be dangerous. Can think of why is that?
Back in the days there was a problem with the context updates due to shouldComponentUpdate lifecycle method. If an intermediate
component had a custom logic to skip re-rendering context propagation to the descendant components were failing. But nowadays 
it should have been fixed so even if the parent components skips updating the children that consume context gets updated to the most 
recent context values.

#### Describe 3 ways to pass information from a component to its PARENT.
- With a global state management such as redux or etc. Child component can cause a change in the global state that parent 
component can listen to the change and act accordingly.
- With the help of Context api, one component can trigger a method to update the context and parent can listen accordingly.
- Parent component can pass a callback method the child component, child component can call that method to notify the parent with the recent data.
- 
#### Give 2 ways to prevent components from re-rendering.
React.memo can be used to memoize the component so that if no relevant props passed gets updated that memoized value can be used,
the other way can be using a shouldComponentUpdate and returning false in redundant updates.

#### What is a fragment and why do we need it? Give an example where it might break my app.
In react we need to return only a single element from a component, but if we need multiple HTML element or components we need 
to wrap them with a container, and if we want that wrapper not to be rendered in the DOM we can use React.fragment or the equivalent <></> syntax.
The short syntax does not support keys, so if there is a mapper that maps a list and returns such fragments there can be rendering errors due to missing keys.

#### Give 3 examples of the HOC pattern.
Back in the days we needed them more where hooks were not introduced, to share the reusable logic across components.
- connect HOC was being widely used to give the component the ability to reach redux state values as component props
- WithRouter was our helper when we needed history and location as component props
- WithTranslate or a similar one was helpful when we needed translations
- 
#### what's the difference in handling exceptions in promises, callbacks and async...await.
In promises we need to catch the errors in a .catch() block, but for callbacks and async await approach we need to use the 
try{} catch (error){}

#### How many arguments does setState take and why is it async.
setState takes two arguments, first one is the updater function or an object as the new part of the state to be updated. The second one is the callback function
that ensures the state is updated since the setState is not directly a state changer but a request to react to handle state changes in an async way just because
react handles the updates within a component tree in a way that avoids rendering multiple times if both parent and child components 
have their state updated individually.

#### List the steps needed to migrate a Class to Function Component.
Class component has a render method, first return what render used to return as JSX,
after that replace componentDidMount and component did update lifecycle methods with useEffect callbacks,
if the class component is pure then wrap with a react.memo() wrapper. If it had an initial state within a constructor
add a useState hook and set the initial data.

#### List a few ways styles can be used with components.
- css modules can be choice, directly import css/scss files to the components and use the classnames on elements, needs a webpack config btw.
- styled-components or emotion as a css in js approach that.
- inline styles can be given on elements with style={{backgroundColor: red}} style

#### How to render an HTML string coming from the server.
with the help of dangerouslySetInnerHtml method we can set the contents of an element, but sanitizing the incoming data is crucial to avoid
remote code execution on users' browsers.