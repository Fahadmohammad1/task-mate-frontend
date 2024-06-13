import googleLogo from "../assets/google.png";
import { useEffect, useState } from "react";
import { auth } from "../firebase/firebase.config";
import {
  useAuthState,
  useCreateUserWithEmailAndPassword,
  useSignInWithGoogle,
} from "react-firebase-hooks/auth";
import Loading from "../components/shared/Loading";
import axios from "axios";
import toast from "react-hot-toast";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading] = useAuthState(auth);

  // email and password
  const [createUserWithEmailAndPassword, , eLoading, eError] =
    useCreateUserWithEmailAndPassword(auth);

  const handleEmailRegister = async () => {
    const res = await createUserWithEmailAndPassword(email, password);

    if (res?.user) {
      const data = await axios.post(
        "http://localhost:5000/api/v1/auth/create-user",
        { name, email, role: "user", password }
      );
      if (data?.data?.statusCode === 200) {
        toast.success(data?.data?.message);
        localStorage.setItem("token", data?.data?.data?.accessToken);
      } else {
        toast.error("Something went wrong, Please try again");
      }
    }
  };

  // google
  const [signInWithGoogle, , gLoading, gError] = useSignInWithGoogle(auth);

  useEffect(() => {
    (async () => {
      if (user?.email) {
        const { displayName, photoURL, email } = user;
        const { data } = await axios.post(
          "http://localhost:5000/api/v1/auth/create-user",
          { name: displayName, email, role: "user", avatar: photoURL }
        );

        if (data?.statusCode === 200) {
          toast.success(data?.message);
          localStorage.setItem("token", data?.data?.accessToken);
        } else {
          toast.error("Something went wrong, Please try again");
        }
      }
    })();
  }, [user]);

  if (eLoading || gLoading || loading) {
    return <Loading />;
  }
  if (eError || gError) {
    return <p>Error: {eError?.message || gError?.message}</p>;
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
        <div className="flex justify-center mb-6">
          <span className="inline-block bg-gray-200 rounded-full p-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M12 4a4 4 0 0 1 4 4a4 4 0 0 1-4 4a4 4 0 0 1-4-4a4 4 0 0 1 4-4m0 10c4.42 0 8 1.79 8 4v2H4v-2c0-2.21 3.58-4 8-4"
              />
            </svg>
          </span>
        </div>
        <h2 className="text-2xl font-semibold text-center mb-4">
          Create a new account
        </h2>
        <div className="flex justify-evenly">
          <button onClick={() => signInWithGoogle()} className="btn">
            <img src={googleLogo} className="w-10" />
            Google
          </button>
        </div>
        <p className="my-3 text-center text-black">Or</p>
        <form onSubmit={handleEmailRegister}>
          <div className="mb-4">
            <label className="input input-bordered flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="w-4 h-4 opacity-70"
              >
                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
              </svg>
              <input
                type="text"
                onChange={(e) => setName(e.target.value)}
                className="grow"
                placeholder="Username"
              />
            </label>
          </div>
          <div className="mb-4">
            <label className="input input-bordered flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="w-4 h-4 opacity-70"
              >
                <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
              </svg>
              <input
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                className="grow"
                placeholder="Email"
              />
            </label>
          </div>
          <div className="mb-6">
            <label className="input input-bordered flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="w-4 h-4 opacity-70"
              >
                <path
                  fillRule="evenodd"
                  d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                  clipRule="evenodd"
                />
              </svg>
              <input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                className="grow"
                placeholder="Password"
              />
            </label>
          </div>
          <button
            type="submit"
            className="w-full bg-fh-primary text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Register
          </button>
          <p className="text-gray-600 text-xs text-center mt-4">
            By clicking Register, you agree to accept Flower hut's{" "}
            <a href="#" className="text-blue-500 hover:underline">
              Terms and Conditions
            </a>
            .
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
