import React from "react";
import { BrowserRouter, Redirect, Switch, Route } from "react-router-dom";
import { Home } from "./pages/home/page";
import { Login } from "./pages/login/page";
import { NotFound } from "./pages/notFound/page";
import { Register } from "./pages/register/page";
import { PageContainer } from "./components";

interface Props {
  isAuthenticated: boolean;
}

export const Routes: React.FC<Props> = (props) => {
  const { isAuthenticated } = props;
  return (
    <PageContainer>
      <BrowserRouter>
        <Switch>
          <Route component={Login} path="/login" exact />
          <Route component={Register} path="/register" exact />
          <Route
            path="/"
            render={(props) => {
              if (isAuthenticated) {
                return <AuthenticatedRoutes {...props} />;
              } else {
                return <Redirect to="/login" />;
              }
            }}
          />
          <Route component={NotFound} />
        </Switch>
      </BrowserRouter>
    </PageContainer>
  );
};

class AuthenticatedRoutes extends React.Component {
  render() {
    return (
      <Switch>
        <Route component={Home} path="/" />
      </Switch>
    );
  }
}
