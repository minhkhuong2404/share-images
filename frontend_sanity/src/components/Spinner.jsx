import React from 'react';
import Loader from 'react-loader-spinner';

function Spinner({ message }) {
  return (
    <div className="flex flex-col justify-center items-center w-full h-full">
      <Loader
        type="MutatingDots"
        color="#00DBDE"
        secondaryColor="#FC00FF"
        radius="12.5"
        height={100}
        width={100}
        className="m-5"
      />

      <p className="text-white text-lg text-center px-2">{message}</p>
    </div>
  );
}

export default Spinner;
