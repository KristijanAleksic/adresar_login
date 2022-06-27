import { Container } from "react-bootstrap";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import Signup from "./Signup";
import AuthProvider from "./Contexts/AuthContext";
import Adresar from "./Adresar";
import Login from "./Login";

function App() {
  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
    >
      <div className="w-100" style={{ maxWidth: "400px" }}>
        <BrowserRouter>
          <AuthProvider>
            <Switch>
              <Route path="/signup">
                <Signup />
              </Route>
              <Route path="/login" >
                <Login />
              </Route>
              <Route exact path="/">
                <Redirect to="/login" />
              </Route>
              <Route path="/adresar" >
                <Adresar />
              </Route>
            </Switch>
          </AuthProvider>
        </BrowserRouter>
      </div>
    </Container>
  );
}

export default App;
