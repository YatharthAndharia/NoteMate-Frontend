import { useState, Fragment } from 'react'
import { Disclosure } from '@headlessui/react'
import { PlusIcon } from '@heroicons/react/20/solid'
import Signup from './Signup'
import Signin from './Signin'
import Cards from './Cards'
import Searchbar from './Search'
import Inputs from './Inputs'

export default function Example({ isLogIn,setIsLogIn,search,setSearch }) {
  const [showSignup, setShowSignup] = useState(false)
  const [showSignin, setShowSignin] = useState(false)

  if (isLogIn) {
    return <>
    <Searchbar setSearch={setSearch}/>
    <Inputs />
    <Cards search={search} setSearch={setSearch}/>
    </>
  }
  else {
  return (
    <>
      <Disclosure as="nav" className="bg-white shadow">
        {({ open }) => (
          <>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="flex h-16 justify-between">
                <div className="flex items-center">
                  <img
                    className="h-8 w-auto"
                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAbkAAAByCAMAAAD50l/ZAAAAgVBMVEX///8AAADw8PCysrJbW1szMzOioqL7+/tYWFh9fX0NDQ1wcHDFxcXr6+vj4+O9vb1jY2OFhYXV1dX29vYYGBjb29tSUlLLy8ssLCw7OztERESgoKB2dna+vr6srKxNTU0kJCRnZ2cmJiaWlpYLCwtBQUE4ODiCgoKNjY0XFxeYmJipzZu9AAAQq0lEQVR4nO1daXuyOhC1omKVRVHEBUXa2lr//w+8NclkIxMQ0fa5b84nhQAhJ5ktk9DrNcci2XujeVmsj8vvj5eXj8ny+LYZvF68OAtvuI3DExEGo3L4YsVydY7T366ng4zkUB7tpAl8bN+D/m9X2OEHftCcNcBke4h+u97/OtKv9a20saE3CPzfrvw/jGyM8LLersazcjotZ4NVMfw2F/ocLX77Bf5RVHmbbGb5JU6jsL/gA8r3+2EUZaOvsqhI1fXOcfd8RKVCwnGVH9LISoQfRsF89qlcNgyeVV8HhtGHaP7lYJQ29tYW6T7fSNxNnaH5TIQz0fSFd7OP7WfTpRitbtg9Dxm3OT7OLV3r0BMD773b2jmg2PE2P98j6uI3uM3MGSpPQQ4NfrrXnZ5zQ8UFNZ8AruJ2lkLhIac+wOqSWYqlIHYnLqbycKxYW39a2vqghp7nlhH1CoXcqHswYMTleJHRSwUlrg89R91TAJpphJaIVlXifhCjF6QTWuLYfW0dOGLGwwEtkS2NxNlM/4gFrctH1NiBIGIseGiJGOHNKl/Dt7qB7HAf/G3diAtw4n4MFfSyiA1UN2H+IJybMoDAImNpgaGbsnsIUtq8W7zEDGftim/ckbjQEpcHVNuhN6Cti1vvVll5xfSOmzu0BjM+cOukV5/YgMdTQlrg9QEV/9fhn0jTrvASnoUyBoukPdASLgrWObxacVZPnHXEFnUC1aEdqEdwxgu8N2FuiV+fuEH3EDC7HY8/LpoQZ51goGEz3OdwaIVB3ZDLbXxJwCdRaed4c3kpnSJc1oiytCFxtkkGGgRzaSmdgtonA7zAtilzlhAXfYgLPHcKqoP26PmdjSsVeIiLqsqj88Y7hE9SE95QHWWZIqhihj6GKlNb+oPDjcjsTb6/hTiLqovtpx1uBw1wYLH+w23E/agyZPDSENjJUpEwITDryoSddDMOAnQSIDGeW5xvJe7lpUDMFJI9a5lS4PrUaICyc0vnVwgQNbc2tkjwaaKmFmfjsPsi5yyKDrKT3kxmDDs3dMxxUClmCjanNVNyONYHg1Cjis6S1cDzykzxzTbMhRR/g+zuK0Mn3qozMGHTwIkRp6qTQWOXuPEpZQQaYtctmOuza4rmlzwOfveVoSaInnjXRsGpWOmac0HE8ideE8GcISv6DuYsMYbnAZgbd3fLKbmhZlXcbFGaoK+eI6GYJe6LS1m41fdzzFVAjBA1tpGeuiDuRXc1qPg1G7FXyPnTlWkHx1wF5H5b2aKoTTlpDsXxpszgQWcl812Xl445HfT1ZLuhQeJCc8itRoM1uHGpMKfrQ8ecDmrxSaZlhyPuilx/FB7/UlebaLOwLZiD+eA/wVyv88roXlb08dItRJolzbXFzWJtnZCqEBHmFsGhXG1Oq+khU9z/JAgCCJVvs+CKvn5dsRmeci/Rb0hBFX9wHpy25S6Rz7/PtpsiN+7V83PX6Wa4KWY7pTbXysCA2Mq3B2SH6eo03Ew9JE6ReF/XtyxmI+m+VDaKK4qOiZMY8MnKu6G5cr0Kc0ulbYzMRdJmAi/LqdCNvuE1AuS6obLpDiyvuPqje77JC4/ojfiht0qkN8nl2pSiTQ17Akkea/gqXbbeVYSKH8vzo8scqkKDhdwpMKyPuxdikJEaHCuMYc9W5Co7JjPnV3xOnpDhG5aLCeYu2pmjFDaIROm5XIY0dah0iIHSyP1K5KIA7gbVygj/eTdRz3xrYYi4sskhe0saTYTeupjoxToAryVpzm9UUwFzQ+iDshkK58TVqWGq/hTWMxcazr3y8S2Y+6pcHmrpwlvpVRJTKvGulrm+IcI4lWWAKSIyJs8trz8/QOw+YMhJMzu0luhsATx8Dj8+pFdghwRziXEXQOboW5iLjBt1DuBRwFxWmZf0q1kdIsCamvckjGuYC43KqRA9wpwuSZw4Uhs+U/BmLHgvQNO9Kv9Q5l75enUp9MyOcOYiZPvGIymA67k+EmWARwFz8UYvsTO4SyAPF1jyPulIqJ5bmNcACwM0kQ5+SLbj1Rcgj9yyHtc4yes2gPqhHQid5xHM8XoImc8OcOZE/z9NL5ep4IM6TF/jwQAa7Dgb/IDFUadQ7ru87BOv5Pv2eCpztEcXG9FcR9Kt304nyaAAP5hL1vU5S5LszMc16RDzn8rAuDsOSGVoIwjVOCOV4b0RbH3efYo4iaL0zAtEbJQVTMx3Eq6sArzqmiCKYE5UhFvP7D8wx7Oa1qwjBLyxONvg/MphBi4DSya0+eZ0w4XC3PXW+37PjxRz5nTdsTrc827DphJD+A8qyucdhAs+9l/25/iIGrPKhHAZm0Cu9OA+dICfNiIdCGbn+PO6xXIhdww0yUxijq/W4yEH9p8xx5OuT1wV9rfa00wxFFiZK69sh/Fy0Jgbs+6ciDE2AEOG2xV0IIMZMa0+CNrcFEMBkf4lDsGdLkqLSLWFUdjrfcvvdvPWvw3BVBtVFI2YC0FKgdxgfxlzMOS+JY+Wtzk4WgbmwB9WHA428b9V7yISELl+WwqLCQ5RS8PLt1d615IHCheBpjAwB0NOSUJlIv6TPArsE8mo+3mDyXqV7xY90kIgT5pzcRuYgNxLL2uAzJzIFUyVqjHm4KTiDYNcW7EGNDAHwkZx8jP5SZw50cH6YH5IExivlUOLJJY1OAhQ6CMG5kp2SImnwPNJZ3+X/0ABkL/kTCn/eQD2chM1Y45L7pMvV40yB6+nTk4BU6BbqsyFTKhoSyiYlTKSb72WPJKSHZMmMfUhVQEwB01rYI5VRsvd2Eo3hr5ojPUqt7+JjhvQhrkeBAXOctUoc2DAaOFb0D5Mt1SZg9GlmbdM0xHJA8zJ4VXoRNIhEAno6iSgFsRZlTmojGax7aRKczmdG8IXE/n2t/HRHC2kpWR5ZVLVKHMQl9ICRdBFWXNWmYMnmFuZKLqocpGRub36KA1hwLc8w5lj5H9okQlWGWJ6SavfSj00Tm1LuF3Nd0BaI5Hr2shCuQL4IYKL/abMbdX7AsD+YPKnyhxQ8D1RwKwh4hc0ZM485vrJ/jIt1vJ0C84cmJETY2WoInh9kfH5FUtvTIQteAVaqK4rgE12g21JAB0p15kDG1jrrqBbBhhzSMiCgTRWa+YWQb42fAIAZ660Nxp5N7+yCc1xsGfmFbGbwBPvdDpcYKNQ08QTp+COaKwxx/4sNeZ4ZpyPMGdfTkbyr9sy5yHyCmcO+x4EAzWHIkNYbU2VBHFmwJ+NqsW6ADiSVA81iH71lAtISIH9UpjT13RB67DXqTJnz4yatGduYQgqU+DM1cyEMkO2/2o4R+aXyPU84tzycy41AOH8pfxrwBx/u5nKHDM79UUKoNBX2Jhr0FitmFto4envTQ46F2cOJVtUhiB9rQZIro46qdWTZnlK8rd2lkdijudWgB9AmYMOpmWJQquz1qoyBwLKM6O1hSJFDYvZ3EvDBde5OHPsosnIXBnJDwiz15XG3gwsHGhN/wkzq+gSSwNzlRg4ZQ66qyZ4QU3nGHMQm7cs5WrDHFcyy3feLeuZYwES3StAECaHqaymU9Y0vPPesLK4KbRshje0cibm9I3iKHMQFdJ2RD2rh6vMQT/As3VbMQfquJD0bj1zcIsblvFGZz6yLk/NICLWUH0GkcJcqIoJyhwMLjWPzAdtw96myhw495bdktowx9pMMZjqmYPK3LRnK7c1VywY8MCsPRGTbZq1p64rUpepU+Z4bEEZPNAUEzRu2Wdz/pYFNW2YY02mLFOC2BbOHHilljUyBsCDh9VM2RvXhddBunPTTFltRZiSU8XmCsC8VxoL7A8I4QJzUmOB7FXF5XY9mF9YwmYb5thvZbYGrtGZW/mVIqqDO1vPzjsvuVYmPewu+WCj1BZ83E/WfR+WnS7fmHZDfPNZhDklx4Mxx7vXoXo5f1EYmRthE8FIULYoAxaUiPMtzLHQibx6lBstOnNHYTPywKxss0ENr8/XLC4C8DbGrMMUvuHiDqCYEE1XhOirMOX6QDYDZ5MbrrzDiSEGRyRNAvEvaQkM7wWZ3OS3MLeSb0DQ5xEVnTl5a10wkYfVrkVihFwpiCC9DzceselxdWl2WBOYaQyVpaarsCrrZ6XUNWBOJEXlpL0y4VIJJ48bYsUhPoy060b0Thl3iKnyu8e25CHZWBgLXOhwk/50iL135Vk/dNL2T0o4QOUE/wsjQGR1RsjKx04k5lTz3GiKc/3Kx+rKZxG14rlfcgLyUY7LSgNMCaAf6TGpF6wH443kv2atmRMMrOdxsP+SzWHOnJo5SY9JPthxMD5JlQk0aj9mZ2+Xi9joVZeb03oettp400OBMyfeQGTKlubH5sbLrtBo0LFTr7kphmKQUSsmQjlzoXKa9V9TUPIKEKmYe03k64NW+FfVGRVUlj3bcOaE9SFlpxspUK9VVgYwLeSbqYO2asVcNVI/iZgZK0w0hQUYKWbqRI6EmYQ1ibv8vV01TDt1gxEgrwgxiAV9kXIpneNPNmV8c9+83VxBxajLYBxKxrXMArdTTKNKNr/11StXwDes/sxONvASJubAN1PqGWgzpavqzSWWRKZOonfJXChfYE7Oi7QwB6mSqRJ72qa8r8lukfTlYbGLVlpqlSnVQGaizylseC/7M7tHeSuSuT02birsjclJzerJcm68nF6NrxDNt8TdOm6lfNReOi9g/nq5ush1Clkl5DSFd/psOfKSsWJ8IPvxGOykgkicL3LRWEkOg8ost3LCV3ou4NLv4lxtoPS84iblehaLFqBCCpNiN1uZ2I5tdNTYdmxrhUWUBJ4XJPjnzv0oTdLql7WjNIt/rku72xU8TOPDwcvsNySViXRlUleZfppk3uGQpYpopJYD+q2CrnZJ3NtPO7QAUXT4DjM3LRPBtx6gysJt5NwlqKLDZz7mNqpULFGZRUNR7mO5nYLKMcvMR3MLEw9tUWPsb2xw8b9Bn0Zr8H3Pu9j1nrJvmdJ0aIGStKrlU1VYkEYHLisp+d9u6/RuwQLoeLPe/3WXQV3ncGiFoq5dG31R6Yhfz+St+9Zq12CxHIvh14Q5ixKjoSD3hZDuQQed5cuBDZw6y5cDYzfkHgWW3YAubbvva510Zs59OPAhYNFzfA/C2uQUCy9sesN54Y8AMyEsnnLNRKtlf2Ymad/RAg73gE3n4J8PXNgXtOLmCRuta/ddlscAdsrC0yGxnbYIcFcuYnNPzjx5FGAyGB885t3taiRh+FZHrcO9iGupi7DQs2WgMpvU8mkQh7sBszn48FgY86bW+AxBCjsNOCX3UEBijSUMFlQlpuWbyDwVwkWaHwzIpdpYWtpTffI5Pj8gHAnnyT0cPJ3NEk3phSOarLTJd7b1lnzXYzcR/gzwYTK4V8Dx6YW1E5VPgZjPOd/zkTuP68OBRZw6dAmRYDk5t/Sew4NwH16dVfk0JNJOPYV3s6hbBKW0/RXu6Tl0j4WyNm0wquYHo1dG+6nsra+cbfJkpOoqhLdVfkjx9O8r/DAK5jM1xjK0GagOD0JQ2dzsYzPI3+M0CvsLrrp8vx9GUTb6KouKh768ONPkV+B7WJDybbsaz8rptJwNxsXQsKUjKTR3vsDvIRgjtNTidPgb3/D+dxHGs5s/YTDZjtxU3J9Acigbs/exfQ/caPtLCINRWbM793J1jt1Y+6NYJHtvNJ9t18fl98fPAJssj2+f4/zixZkzR56O/wAH0uZKstnZMgAAAABJRU5ErkJggg=="
                    alt="NoteMate"
                  />
                </div>

                <div className="flex items-center">
                  <button
                    onClick={() => {
                      setShowSignup(true)
                      setShowSignin(false)
                    }}
                    className="bg-gray-800 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-500"
                  >
                    <PlusIcon className="-ml-1 mr-2 h-5 w-5 inline" />
                    Sign Up
                  </button>

                  <button
                    onClick={() => {
                      setShowSignin(true)
                      setShowSignup(false)
                    }}
                    className="ml-2 bg-gray-800 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-500"
                  >
                    Sign In
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </Disclosure>
      

      {showSignup && <Signup />}
      {showSignin && <Signin setIsLogIn={setIsLogIn}/>}

      {!isLogIn && !showSignin && !showSignup && (
  <img
    src="https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTEwL2hpcHBvdW5pY29ybl9taW5pbWFsX2ZsYXRfdmVjdG9yX2Flc3RoZXRpY19pbGx1c3RyYXRpb25fb2ZfYV9ub18xOGU4MzkwNi1kY2UyLTRhZDEtOTY4Yy0xMzM2M2UzNzJlOWJfMi5qcGc.jpg" // Replace with your actual image path or URL
    alt="Background"
    className="w-full h-screen object-cover"
  />
)}
    </>
    
  )
}
}
