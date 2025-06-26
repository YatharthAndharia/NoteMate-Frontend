/*
  This example requires Tailwind CSS v2.0+ 
  
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
import { Fragment,useRef } from 'react'
import { Button, Menu, Popover, Transition } from '@headlessui/react'
import { MagnifyingGlassIcon,ArrowLeftStartOnRectangleIcon} from '@heroicons/react/20/solid'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'

const user = {
  name: 'Chelsea Hagon',
  email: 'chelsea.hagon@example.com',
  imageUrl:
    'https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
}
const navigation = [
  { name: 'Dashboard', href: '#', current: true },
  { name: 'Calendar', href: '#', current: false },
  { name: 'Teams', href: '#', current: false },
  { name: 'Directory', href: '#', current: false },
]
const userNavigation = [
  { name: 'Your Profile', href: '#' },
  { name: 'Settings', href: '#' },
  { name: 'Sign out', href: '#' },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}



export default function Example({setSearch}) {
    const searchRef = useRef();
    function handleSearch() {
        setSearch(searchRef.current.value);
    }

    const handleLogout = () => {
      localStorage.removeItem('token');
      window.location.reload();
    }
  return (
    <>
      {/* When the mobile menu is open, add `overflow-hidden` to the `body` element to prevent double scrollbars */}
      <Popover
        as="header"
        className={({ open }) =>
          classNames(
            open ? 'fixed inset-0 z-40 overflow-y-auto' : '',
            'bg-white shadow-sm lg:static lg:overflow-y-visible'
          )
        }
      >
        {({ open }) => (
          <>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="relative flex justify-between lg:gap-8 xl:grid xl:grid-cols-12">
                <div className="flex md:absolute md:inset-y-0 md:left-0 lg:static xl:col-span-2">
                  <div className="flex flex-shrink-0 items-center">
                    <a href="#">
                      <img
                        className="block h-8 w-auto"
                        src="data:image/png;base64,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"
                        alt="NoteMate"
                      />
                    </a>
                  </div>
                </div>
                <div className="min-w-0 flex-1 md:px-8 lg:px-0 xl:col-span-6">
                  <div className="flex items-center px-6 py-4 md:mx-auto md:max-w-3xl lg:mx-0 lg:max-w-none xl:px-0">
                    <div className="w-full">
                      <label htmlFor="search" className="sr-only">
                        Search
                      </label>
                      <div className="relative">
                        <div onClick={handleSearch} className="cursor-pointer absolute inset-y-0 right-0 flex items-center pr-3">
                            <MagnifyingGlassIcon className="h-5 w-5 text-gray-400"/>
                        </div>
                        <input
                          id="search"
                          name="search"
                          className="block w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-3 text-sm placeholder-gray-500 focus:border-indigo-500 focus:text-gray-900 focus:placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                          placeholder="Search"
                          type="text"
                          ref={searchRef}
                          onClick={handleSearch}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              handleSearch();
                            }
                          }}
                        />
                        
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="hidden lg:flex lg:items-center lg:justify-end xl:col-span-4">
                
                      <button
                        className="bg-gray-800 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-500"
                        onClick={handleLogout}
                      >
                      <ArrowLeftStartOnRectangleIcon className="-ml-1 mr-2 h-5 w-5 inline" />
                        Sign Out
                      </button>
                      </div>

                  
                
              </div>
            </div>

            <Popover.Panel as="nav" className="lg:hidden" aria-label="Global">
              <div className="mx-auto max-w-3xl space-y-1 px-2 pt-2 pb-3 sm:px-4">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    aria-current={item.current ? 'page' : undefined}
                    className={classNames(
                      item.current ? 'bg-gray-100 text-gray-900' : 'hover:bg-gray-50',
                      'block rounded-md py-2 px-3 text-base font-medium'
                    )}
                  >
                    {item.name}
                  </a>
                ))}
              </div>
              <div className="border-t border-gray-200 pt-4 pb-3">
                <div className="mx-auto flex max-w-3xl items-center px-4 sm:px-6">
                  <div className="flex-shrink-0">
                    <img className="h-10 w-10 rounded-full" src={user.imageUrl} alt="" />
                  </div>
                  <div className="ml-3">
                    <div className="text-base font-medium text-gray-800">{user.name}</div>
                    <div className="text-sm font-medium text-gray-500">{user.email}</div>
                  </div>
                  
                </div>
                <div className="mx-auto mt-3 max-w-3xl space-y-1 px-2 sm:px-4">
                  {userNavigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="block rounded-md py-2 px-3 text-base font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
              </div>
            </Popover.Panel>
          </>
        )}
      </Popover>
    </>
  )
}
