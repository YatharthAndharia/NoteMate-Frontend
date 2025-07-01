import { useState, Fragment } from 'react';
import { Disclosure } from '@headlessui/react';
import { PlusIcon } from '@heroicons/react/20/solid';
import Signup from './Signup';
import Signin from './Signin';
import Cards from './Cards';
import Searchbar from './Search';
import Inputs from './Inputs';

export default function Navbar({
  isLogIn,
  setIsLogIn,
  search,
  setSearch,
  cardRefresh,
  setCardRefresh
}) {
  const [showSignup, setShowSignup] = useState(false);
  const [showSignin, setShowSignin] = useState(false);

  if (isLogIn) {
    return (
      <>
        <Searchbar setSearch={setSearch} />
        <Inputs setCardRefresh={setCardRefresh} />
        <Cards search={search} setSearch={setSearch} cardRefresh={cardRefresh} />
      </>
    );
  }

  return (
    <>
      <Disclosure as="nav" className="bg-white shadow-md sticky top-0 z-50">
        {({ open }) => (
          <>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3">
              <div className="flex justify-between items-center">
                {/* Logo */}
                <div className="flex items-center space-x-2">
                  <img
                    className="h-10 w-auto rounded-sm shadow"
                    src="/note mate logo.png"
                    alt="NoteMate"
                  />
                </div>

                {/* Buttons */}
                <div className="flex items-center">
                  <button
                    onClick={() => {
                      setShowSignup(true);
                      setShowSignin(false);
                    }}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-semibold rounded-md shadow-sm text-white bg-gray-800 from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 transition"
                  >
                    <PlusIcon className="-ml-1 mr-2 h-5 w-5" />
                    Sign Up
                  </button>
                  <button
                    onClick={() => {
                      setShowSignin(true);
                      setShowSignup(false);
                    }}
                    className="ml-3 inline-flex items-center px-4 py-2 border border-transparent text-sm font-semibold rounded-md shadow-sm text-white bg-gray-800 hover:bg-gray-700 transition"
                  >
                    Sign In
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </Disclosure>

      {/* Forms */}
      {showSignup && <Signup />}
      {showSignin && <Signin setIsLogIn={setIsLogIn} />}

      {/* Hero Image if not logged in */}
      {!isLogIn && !showSignin && !showSignup && (
        <section className="relative h-screen w-full bg-gradient-to-br from-white via-indigo-100 to-purple-200 flex items-center justify-center overflow-hidden">
          <img
            src="https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTEwL2hpcHBvdW5pY29ybl9taW5pbWFsX2ZsYXRfdmVjdG9yX2Flc3RoZXRpY19pbGx1c3RyYXRpb25fb2ZfYV9ub18xOGU4MzkwNi1kY2UyLTRhZDEtOTY4Yy0xMzM2M2UzNzJlOWJfMi5qcGc.jpg"
            alt="Welcome to NoteMate"
            className="absolute inset-0 w-full h-full object-cover opacity-30"
          />
          <div className="z-10 text-center">
            <h1 className="text-5xl font-bold text-gray-800 mb-4">Welcome to NoteMate</h1>
            <p className="text-lg text-gray-700 max-w-xl mx-auto">
              Organize your thoughts, tasks, and ideas in one place. Sign in or create a new
              account to get started.
            </p>
          </div>
        </section>
      )}
    </>
  );
}
