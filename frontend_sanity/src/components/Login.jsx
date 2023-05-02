import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import jwt from 'jwt-decode';

import shareVideo from '../assets/share.mp4';
import logo from '../assets/logowhite.png';

import { client } from '../client';

const Login = () => {
  const navigate = useNavigate();
  const responseGoogle = (response) => {
    const { clientId, credential } = response;
    const { name, picture } = jwt(credential);

    const newResponse = {
      name,
      googleId: response.clientId,
      imageUrl: picture,
    };
    localStorage.setItem('user', JSON.stringify(newResponse));

    const doc = {
      _id: clientId,
      _type: 'user',
      userName: name,
      image: picture,
    };
    client.createOrReplace(doc).then(() => {
      navigate('/', { replace: true });
    });
  };
  const responseGoogleFail = (response) => {
		// eslint-disable-next-line no-console
    console.log(response);
  };

  return (
    <div className="flex justify-start items-center flex-col h-screen">
      <div className=" relative w-full h-full">
        <video
          src={shareVideo}
          type="video/mp4"
          loop
          controls={false}
          muted
          autoPlay
          className="w-full h-full object-cover"
        />

        <div className="absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0    bg-blackOverlay">
          <div className="p-5">
            <img src={logo} width="130px" />
          </div>

          <div className="shadow-2xl">
            <GoogleLogin
              render={(renderProps) => (
                <button
                  type="button"
                  className="bg-mainColor flex justify-center items-center p-3 rounded-lg cursor-pointer outline-none"
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                >
                  <FcGoogle className="mr-4" /> Sign in with google
                </button>
              )}
              onSuccess={responseGoogle}
              onFailure={responseGoogleFail}
              cookiePolicy="single_host_origin"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
