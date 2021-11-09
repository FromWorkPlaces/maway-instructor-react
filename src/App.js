import { Fragment, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Navbar from "./Layouts/Navbar";
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";

import AuthContextProvider from "./context/AuthContext";
import ProtectedRoute from "./Utility/ProtectedRoute";
import setDefaultHeader from "./Utility/SetAxiosDefaultHeader";
import FindSchool from "./pages/Workplace/FindSchool";
import SchoolDetails from "./pages/Workplace/SchoolDetails";
import Schedule from "./pages/Schedule/Schedule";
import AddSchedule from "./pages/Schedule/AddSchedule";

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

              {/* Workplace */}
              <ProtectedRoute exact path='/find_school' component={FindSchool} />
              <ProtectedRoute exact path='/school_details' component={SchoolDetails} />

              {/* Schedule */}
              <ProtectedRoute exact path='/schedule' component={Schedule} />
              <ProtectedRoute exact path='/add_schedule' component={AddSchedule} />
              
              <Route exact path='/login' component={Login} />
              <Route exact path='*' component={() => "404 not found"} />
          </Switch>

        </Fragment>
    </BrowserRouter>
    </AuthContextProvider>
  );
}

export default App;