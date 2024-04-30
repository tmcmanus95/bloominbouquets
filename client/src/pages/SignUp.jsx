import { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { ADD_USER } from "../utils/mutations";
import { ColorPicker } from "antd";
import Auth from "../utils/auth";

const Signup = () => {
  const [formState, setFormState] = useState({
    username: "",
    email: "",
    password: "",
    color: "",
  });

  const [addProfile, { error, data }] = useMutation(ADD_USER);

  const handleColorSelect = (value) => {
    const { r, g, b } = value.metaColor;
    const colorValue = `rgb(${r.toFixed(0)}, ${g.toFixed(0)}, ${b.toFixed(0)})`;

    setFormState({
      ...formState,
      color: colorValue,
    });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addProfile({
        variables: { ...formState },
      });

      Auth.login(data.addUser.token); // Assuming addUser returns the token
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="max-w-md w-full p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl text-center mb-6">Sign Up</h1>

        {data ? (
          <p className="text-center mb-6">
            Success! You may now head <Link to="/">back to the homepage.</Link>
          </p>
        ) : (
          <form onSubmit={handleFormSubmit}>
            <div className="mb-4 border-2 border-solid px-1 border-sky-300">
              <input
                className="form-input w-full"
                placeholder="Your username"
                name="username"
                type="text"
                value={formState.username}
                onChange={handleChange}
              />
            </div>

            <div className="mb-4 border-2 border-solid px-1 border-sky-300">
              <input
                className="form-input w-full"
                placeholder="Your email"
                name="email"
                type="email"
                value={formState.email}
                onChange={handleChange}
              />
            </div>

            <div className="mb-4 border-2 border-solid px-1 border-sky-300">
              <input
                className="form-input w-full"
                placeholder="******"
                name="password"
                type="password"
                value={formState.password}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-row align-center">
              <h1>Profile flower color:</h1>
              <ColorPicker
                format="hex"
                showText
                defaultValue="#1677ff"
                onChangeComplete={(value) => handleColorSelect(value)}
              />
            </div>

            <div className="text-center">
              <button
                className="bg-transparent hover:bg-blue-300 text-blue-500 font-semibold hover:text-white py-2 px-4 border border-blue-300 hover:border-transparent rounded"
                style={{ cursor: "pointer" }}
                type="submit"
              >
                Submit
              </button>
            </div>
          </form>
        )}

        {error && (
          <div className="my-3 p-3 bg-danger text-center">{error.message}</div>
        )}
      </div>
    </div>
  );
};

export default Signup;
