import React, { useEffect, useState } from "react";
import "./App.css";
import Login from "./Login";
import { getTokenFromURL } from "./spotify";
import SpotifyWebAPI from "spotify-web-api-js";
import Player from "./Player";
import { useDataLayerValue } from './DataLayer';


const spotify = new SpotifyWebAPI(); // spotify api object

function App() {
  const [{ user, token }, dispatch] = useDataLayerValue(); // get things from the data layer

  // run code based on a given condition
  useEffect(() => {
    const hash = getTokenFromURL();
    window.location.hash = ""; // clears token from url for security
    const _token = hash.access_token;
    if(_token) {

      dispatch({
        type: 'SET_TOKEN',
        token: _token,
      })

      spotify.setAccessToken(_token); // pass the token to spotify; allow them to communicate

      spotify.getMe().then(user => { // if we have a user,
        dispatch({                   // dispatch the user info to the data layer so that it can be grabbed from any file easily
          type: 'SET_USER',
          user: user,
        })
      });
    }
  }, []);

  return (
    <div className="app">
      {/* if token exists, render Player component; else, render Login component */}
      {token ? <Player /> : <Login />}
    </div>
  );
}

export default App;
