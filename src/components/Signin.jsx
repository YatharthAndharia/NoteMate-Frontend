import { useState } from "react";
import Cards from './Cards'
import Searchbar from './Search'
import Inputs from './Inputs'

export default function Signin({setIsLogIn}) {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
        console.log(formData);
        
      const res = await fetch("http://localhost:8000/sign-in", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      if (res.status === 200){
        const data =await res.json();
        console.log(data);
        localStorage.setItem('token', data.token);
        setIsSignedIn(true); 
        setIsLogIn(true);
      }
      else{
        setError("Signin failed. Please try again.");
      }

    } catch (err) {
      console.error(err);
      setError("Signin failed. Please try again.");
    }
  };

  if (isSignedIn) {
    return (
        <>
            <Searchbar />
            <Inputs />
            <Cards />
        </>
    );
  }

  return (
    <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">Sign-in</h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email address</label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm sm:text-sm"
                />
              </div>
            </div>

            {error && <p className="text-sm text-red-500">{error}</p>}

            <div>
              <button
                type="submit"
                className="w-full flex justify-center rounded-md bg-gray-800 py-2 px-4 text-sm font-medium text-white hover:bg-gray-500"
              >
                Sign In
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
