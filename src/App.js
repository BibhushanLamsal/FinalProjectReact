import React from 'react';
import MovieApp from './components/MovieApp';
import './components/MovieApp.css';
const App = () => {
  return (
   
      <div className="App">
            <MovieApp />
      </div>
    
  );
};

export default App;

//useState is a hook in React for managing state within functional components. It allows you to store and update variables in your component
//async is a keyword used in JavaScript to indicate that a function will perform asynchronous operations. It's used to handle tasks like fetching data from servers without blocking the execution of other code.
//axios is a JavaScript library used to make HTTP requests from web browsers and Node.js environments. It's commonly used in React applications to fetch data from APIs, interact with servers, and handle AJAX requests.
//useEffect is a hook in React used to perform side effects in functional components. It allows you to execute code in response to component lifecycle events, such as mounting, updating, or unmounting. It's used for tasks like data fetching, subscriptions
//await is used to pause the execution of the function until a promise is resolved, making asynchronous code look and behave more like synchronous code, which can improve readability and maintainability.
//genres.map(...) is a function that goes through each item in a list called genres and does something with it.