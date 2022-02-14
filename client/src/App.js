import React from 'react';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';

import { setContext } from '@apollo/client/link/context';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Shape from './pages/Shape';
import Acrylic from "./pages/Acrylic";
import Header from './components/Header';
import Footer from './components/Footer';




// Construct our main GraphQL API endpoint
const httpLink = createHttpLink({
  uri: '/graphql',
});

// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="flex-column justify-flex-start min-100-vh">
          <Header />
          <div className="container">
            <div>
              <Link to="/shape">Shape</Link>
              <Link to="/acrylic">Acrylic</Link>
            </div>
            {/* this is the home page */}
            <Route exact path="/">
              <Home />
            </Route>
            {/* this is the login page */}
            <Route exact path="/login">
              <Login />
            </Route>
            {/* this is the sign up page */}
            <Route exact path="/signup">
              <Signup />
            </Route>
            {/* this is the shape page */}

            <Route exact path="/shape">
              <Shape />
            </Route>

            {/* this is the acrylic page */}
            <Route exact path="/acrylic">
              <Acrylic />
            </Route>
          </div>
          <Footer />
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
