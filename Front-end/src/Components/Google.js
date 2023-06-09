import FacebookLogin from "react-facebook-login";
import FirebaseInit from "../firebase/firebase-init";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
} from "firebase/auth";
import React from "react";
function Google() {
  const responseFacebook = (response) => {
    console.log(response);
    console.log(response.accessToken);
  };

  FirebaseInit();
  const provider = new GoogleAuthProvider();
  const handleGoogleSignedIn = () => {
    const auth = getAuth();
    signInWithPopup(auth, provider).then((result) => {
      console.log({ auth_token: result._tokenResponse.oauthIdToken });
      console.log({ username: result._tokenResponse.fullName });
      console.log({ avatar: result._tokenResponse.photoUrl });
    });
  };

  const logout = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        console.log("done");
      })
      .catch(() => {
        console.log("err");
      });
  };

  return (
    <div className="App">
      <FacebookLogin
        appId="856371595431946"
        autoLoad={true}
        fields="name,email,picture"
        callback={responseFacebook}
      />

      <button onClick={handleGoogleSignedIn}>Đăng nhập với Google</button>
      <button onClick={logout}>dang xuat</button>
    </div>
  );
}

export default Google;
