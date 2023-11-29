import React from 'react';

type Props = {};

function Login({}: Props) {
  return (
    <div>
      <form action="">
        <div>
          <label className="mb-2 block text-sm font-bold text-gray-700">
            Username
          </label>
          <input className="hover:shadow-md" type="text" />
        </div>
      </form>
    </div>
  );
}

export default Login;
