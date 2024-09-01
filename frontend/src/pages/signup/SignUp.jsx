import React from "react";
import GenderCheckbox from "./GenderCheckbox";

const SignUp = () => {
  return (
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
      {/*Glass effect*/}
      <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
        {/*Heading*/}
        <h1 className="text-3xl font-semibold text-center text-gray-300">
          SignUp
          <span className="text-blue-500"> AJTalks</span>
        </h1>

        <form>
          {/*Full name*/}
          <div>
            <label className="label p-2">
              <span className="text-base label-text">Full Name</span>
            </label>

            <input
              type="text"
              placeholder="Ajaay Teotia"
              className="w-full h-10 input input-bordered"
            />
          </div>

          {/*Username*/}
          <div>
            <label className="label p-2">
              <span className="text-base label-text">Username</span>
            </label>

            <input
              type="text"
              placeholder="ajaayteotia"
              className="w-full h-10 input input-bordered"
            />
          </div>

          {/*Password*/}
          <div>
            <label className="label p-2">
              <span className="text-base label-text">Password</span>
            </label>

            <input
              type="password"
              placeholder="Enter password"
              className="w-full h-10 input input-bordered"
            />
          </div>

          {/*Password*/}
          <div>
            <label className="label p-2">
              <span className="text-base label-text">Confirm Password</span>
            </label>

            <input
              type="password"
              placeholder="Enter password"
              className="w-full h-10 input input-bordered"
            />
          </div>

          {/*Gender Checkbox*/}
          <GenderCheckbox />

          {/*Already have an account*/}
          <a
            href="#"
            className="text-sm hover:text-blue-600  hover:underline mt-2 inline-block"
          >
            Already have an acount?
          </a>

          {/*Signup button*/}
          <div>
            <button className="btn btn-block btn-sm mt-2">Sign Up</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
