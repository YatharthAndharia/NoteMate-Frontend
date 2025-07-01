import { Fragment, useRef } from 'react';
import { Popover } from '@headlessui/react';
import {
  MagnifyingGlassIcon,
  ArrowLeftStartOnRectangleIcon,
} from '@heroicons/react/20/solid';
import ChatBot from './ChatBot';

export default function Searchbar({ setSearch }) {
  const searchRef = useRef();

  function handleSearch() {
    setSearch(searchRef.current.value);
  }

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.reload();
  };

  return (
    <>
      <Popover
        as="header"
        className={({ open }) =>
          `bg-gray-800 shadow-md text-white sticky top-0 z-50 ${
            open ? 'overflow-y-auto' : ''
          }`
        }
      >
        {({ open }) => (
          <>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
              <div className="flex justify-between items-center">
                {/* Logo */}
                <div className="flex items-center gap-2">
                  <img
                    src="/note mate logo.png"
                    alt="NoteMate"
                    className="h-10 w-auto rounded-md shadow-md"
                  />
                  <span className="text-2xl font-bold tracking-tight text-white">
                    NoteMate
                  </span>
                </div>

                {/* Search Bar */}
                <div className="flex-1 mx-6 max-w-2xl">
                  <div className="relative">
                    <input
                      ref={searchRef}
                      type="text"
                      placeholder="Search your notes..."
                      className="w-full rounded-md border-none bg-gray-100 text-gray-800 py-2 pl-4 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 shadow"
                      onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                      onClick={handleSearch}
                    />
                    <div
                      onClick={handleSearch}
                      className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
                    >
                      <MagnifyingGlassIcon className="h-5 w-5 text-gray-500 hover:text-sky-500" />
                    </div>
                  </div>
                </div>

                {/* Logout Button */}
                <button
                  onClick={handleLogout}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-tr from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-md text-sm font-medium shadow transition-all"
                >
                  <ArrowLeftStartOnRectangleIcon className="w-5 h-5" />
                  Sign Out
                </button>
              </div>
            </div>
          </>
        )}
      </Popover>

      {/* ChatBot Below Nav */}
      <div className="fixed bottom-5 right-5 z-40">
        <ChatBot />
      </div>
    </>
  );
}
