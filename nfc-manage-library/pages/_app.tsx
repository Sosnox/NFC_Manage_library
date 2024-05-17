import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Login from "./Login";
import { NextUIProvider } from "@nextui-org/react";
import { use, useEffect, useState } from "react";
import Cookies from 'js-cookie';
import { Navbar } from "./components/navbar";
import { jwtDecode } from 'jwt-decode';
import { NavbarSuperadmin } from "./components/navbarSuperadmin";


export default function App({ Component, pageProps }: AppProps) {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [role, setRole] = useState<string>('');


  const handleLogin = (status: boolean) => {
    setIsLoggedIn(status);
  };
  const handleRole = (role: string) => {
    setRole(role);
  };

  console.log(role, "role")

  useEffect(() => {
    const token = Cookies.get('token');
    if (token) {
      try {
        const decodedToken = jwtDecode<{ exp: number  , role : string}>(token);
        const isTokenExpired = decodedToken.exp * 1000 < Date.now();

        if (!isTokenExpired) {
          handleLogin(true);
          handleRole(decodedToken.role);
        } else {
          handleLogin(false);
          Cookies.remove('token');
        }
      } catch (error) {
        handleLogin(false);
        Cookies.remove('token');
      }
    } else {
      handleLogin(false);
    }
  }, []);

  return (
    <div>
      {!isLoggedIn ? (
        <Login onLogin={handleLogin} handleRole={handleRole} />
      ) : (
        <NextUIProvider className="flex flex-row w-full h-screen">
          {role === 'super_admin' ? (
            <>
              <NavbarSuperadmin />
              <main className="w-full m-16">
                <Component {...pageProps} />
              </main>
            </>
          ) : (
            <>
              <Navbar />
              <main className=" w-full m-16">
                <Component {...pageProps} />
              </main>
            </>
          )}
        </NextUIProvider>
      )}
    </div>
  )
}
