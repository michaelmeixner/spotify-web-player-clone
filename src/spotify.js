// https://developer.spotify.com/documentation/web-playback-sdk/quick-start/#

// take user to spotify to login with their account when they click login button
export const authEndpoint = "https://accounts.spotify.com/authorize";
// after login with spotify bring user back to homepage of app
const redirectURI = "http://localhost:3000/";
const clientID = "ac9e1b11f5094fe1951c602102a6825d";
// scopes: permissions for what app can do; works with API
const scopes = [
  "user-read-currently-playing",
  "user-read-recently-played",
  "user-read-playback-state",
  "user-top-read",
  "user-modify-playback-state",
];

export const getTokenFromURL = () => {
    return window.location.hash
        .substring(1)
        .split('&')
        .reduce((initial, item) => {
            // #accessToken=mysupersecretkey&name=michael&...
            let parts = item.split('=');
            initial[parts[0]] = decodeURIComponent(parts[1]);
            return initial;
        }, {});
}

export const loginURL = `${authEndpoint}?client_id=${clientID}&redirect_uri=${redirectURI}&scope=${scopes.join(
  "%20"
)}&response_type=token&show_dialog=true`;
