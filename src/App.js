import { Fragment, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Navbar from "./Layouts/Navbar";
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";

import AuthContextProvider from "./context/AuthContext";
import ProtectedRoute from "./Utility/ProtectedRoute";
import setDefaultHeader from "./Utility/SetAxiosDefaultHeader";
import FindSchool from "./pages/Workspace/FindSchool";
import SchoolDetails from "./pages/Workspace/SchoolDetails";

if(localStorage.maway_token){
  setDefaultHeader(localStorage.maway_token)
}

function App() {
  
  return (
    <AuthContextProvider>
    <BrowserRouter>
      <Fragment>
          <Navbar />
          <Switch>
              <ProtectedRoute exact path='/' component={Dashboard} />
              <ProtectedRoute exact path='/find_school' component={FindSchool} />
              <ProtectedRoute exact path='/school_details' component={SchoolDetails} />
              <Route exact path='/login' component={Login} />
              <Route exact path='*' component={() => "404 not found"} />
          </Switch>

        </Fragment>
    </BrowserRouter>
    </AuthContextProvider>
  );
}

export default App;