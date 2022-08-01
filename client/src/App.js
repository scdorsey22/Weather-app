import React, { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import CreateAnAccount from "./Components/CreateAnAccount";
import Login from "./Components/Login";
import "./App.css";
import { useHistory } from "react-router-dom";
import MainContent from "./Components/MainContent";
import Header from "./Components/Header";
import MyCities from "./Components/MyCities";

function App() {
  const [loggedUser, setLoggedUser] = useState(null);
  const [responseFromAccountOrLogged, setResponseFromAccountOrLogged] =
    useState(false);
  const [authorize, setAuthorize] = useState(false);
  const [myCities, setMyCities] = useState([]);

  useEffect(() => {
    fetch("/users/show").then((r) => {
      if (r.ok) {
        r.json().then((user) => {
          setLoggedUser(user);
          setAuthorize(true);
          fetch("/cities").then((r) => {
            if (r.ok) {
              r.json().then((likeCities) => setMyCities(likeCities));
            }
          });
        });
      } else {
        setAuthorize(true);
      }
    });
  }, []);

  function handleLogOut(e) {
    e.preventDefault();
    fetch("/logout", {
      method: "DELETE",
    }).then((r) => {
      if (r.ok) {
        setLoggedUser(null);
        setResponseFromAccountOrLogged(false);
        history.push("/");
      }
    });
  }

  const history = useHistory();

  function handleCreateOrLog(user) {
    setResponseFromAccountOrLogged(true);

    setTimeout(() => {
      setLoggedUser(user);
      history.push("/");
    }, 1500);
  }

  function handleLikeOrUnlike(city) {
    const existedCity = myCities.find((ct) => ct.name === city.name);

    if (!existedCity) {
      setMyCities([...myCities, city]);
    } else {
      const updatedMyCities = myCities.filter((ct) => ct.name !== city.name);
      setMyCities(updatedMyCities);
    }
  }


  if (!authorize) {
    return <div></div>;
  }

  return (
    <div>
      <Header loggedUser={loggedUser} onLogOut={handleLogOut} />
      {loggedUser ? (
        <Switch>
          <Route exact path="/">
            <MainContent
              myCities={myCities}
              onLikeOrUnlike={handleLikeOrUnlike}
            />
          </Route>
          <Route exact path="/my-cities">
            <MyCities myCities={myCities} onUnlike={handleLikeOrUnlike}/>
          </Route>
          <Route exact path="*">
            <h2>404 Error Not Found</h2>
          </Route>
        </Switch>
      ) : (
        <Switch>
          <Route exact path="/login">
            <Login
              onCreateOrLog={handleCreateOrLog}
              responseFromAccountOrLogged={responseFromAccountOrLogged}
            />
          </Route>
          <Route exact path="/">
            <Login
              onCreateOrLog={handleCreateOrLog}
              responseFromAccountOrLogged={responseFromAccountOrLogged}
            />
          </Route>
          <Route exact path="/create-account">
            <CreateAnAccount
              onCreateOrLog={handleCreateOrLog}
              responseFromAccountOrLogged={responseFromAccountOrLogged}
            />
          </Route>
          <Route exact path="*">
            <h2>404 Error Not Found</h2>
          </Route>
        </Switch>
      )}
    </div>
  );
}

export default App;