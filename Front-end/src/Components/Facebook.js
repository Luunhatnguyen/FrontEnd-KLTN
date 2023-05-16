import React from "react";
import FacebookLogin from "react-facebook-login";

function FbLogin() {
  const responseFacebook = (response) => {
    console.log(response);
    console.log(response.accessToken);
  };
  const componentClick = (data) => {
    console.warn(data);
  };
  return (
    <div className="App">
      <FacebookLogin
        appId="856371595431946"
        autoLoad={true}
        fields="name,email,picture"
        onClick={componentClick}
        callback={responseFacebook}
      />
    </div>
  );
}

export default FbLogin;
