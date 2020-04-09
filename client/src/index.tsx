import React from "react";
import ReactDOM from "react-dom";
import { InMemoryCache, NormalizedCacheObject } from "apollo-cache-inmemory";
import { ApolloLink, Observable } from "apollo-link";
import { onError } from "apollo-link-error";
import { HttpLink } from "apollo-link-http";
import { ApolloClient } from "apollo-client";
import { ApolloProvider } from "@apollo/react-hooks";
import { TokenRefreshLink } from "apollo-link-token-refresh";
import jwtDecode from "jwt-decode";
// import { resolvers, typeDefs } from "./graphql/resolvers";
import { getAccessToken, setAccessToken } from "./accessToken";
import injectStyles from "./styles";
import { App } from "./app";

const cache = new InMemoryCache();

const requestLink = new ApolloLink(
  (operation, forward) =>
    new Observable((observer) => {
      let handle: any;

      Promise.resolve(operation)
        .then((operation) => {
          const accessToken = getAccessToken();
          if (accessToken) {
            operation.setContext({
              headers: {
                authorization: `bearer ${accessToken}`,
              },
            });
          }
        })
        .then(() => {
          handle = forward(operation).subscribe({
            next: observer.next.bind(observer),
            error: observer.error.bind(observer),
            complete: observer.complete.bind(observer),
          });
        })
        .catch(observer.error.bind(observer));

      return () => {
        if (handle) handle.unsubscribe();
      };
    })
);

const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  link: ApolloLink.from([
    new TokenRefreshLink({
      accessTokenField: "accessToken",
      isTokenValidOrUndefined: () => {
        const token = getAccessToken();

        if (!token) {
          return true;
        }

        try {
          const { exp } = jwtDecode(token);
          if (Date.now() >= exp * 1000) {
            return false;
          } else {
            return true;
          }
        } catch {
          return false;
        }
      },
      fetchAccessToken: () => {
        console.log("fetchAccessToken");
        return fetch("http://localhost:5002/refresh_token", {
          method: "POST",
          credentials: "include",
        });
      },
      handleFetch: (accessToken) => {
        console.log("handleFetch");
        setAccessToken(accessToken);
      },
      handleError: (err) => {
        console.warn("Your refresh token is invalid. Please login.");
        console.error(err);
      },
    }),
    onError(({ graphQLErrors, networkError }) => {
      console.log(graphQLErrors || "");
      console.log(networkError || "");
    }),
    requestLink,
    new HttpLink({
      uri: "http://localhost:5002/graphql",
      credentials: "include",
    }),
  ]),
  cache,
  // resolvers,
  // typeDefs,
});

// const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
//   cache,
//   link: new HttpLink({
//     uri: "http://localhost:5002/graphql",
//     headers: {
//       authorization: localStorage.getItem("token"),
//     },
//   }),
//   resolvers,
//   typeDefs,
// });

injectStyles();
ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
);
