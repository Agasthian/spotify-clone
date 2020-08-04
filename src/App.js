import React, { useEffect, useState } from 'react';
import SpotifyWebApi from 'spotify-web-api-js';

import Login from './components/Login';
import Player from './components/Player';
import { getTokenFromUrl } from './api/spotify';
import { useDataLayerValue } from './DataLayer';

//instanciate spotify web api
const spotify = new SpotifyWebApi();

function App() {
  //state
  const [token, setToken] = useState(null);
  const [{}, dispatch] = useDataLayerValue();

  //runs the code on given condition
  useEffect(() => {
    const hash = getTokenFromUrl();
    window.location.hash = '';
    const _token = hash.access_token;

    if (_token) {
      setToken(_token);

      spotify.setAccessToken(_token); // gives the token to the imported spotify api

      spotify.getMe().then((user) => {
        console.log('👱', user); //GetMe is an built function of spotify webapi js library
      });
    }

    console.log('i have a token', token);
  }, []);

  return <div className='app'>{token ? <Player /> : <Login />}</div>;
}

export default App;
