import { Button, Card, CardBody, CardFooter, Input } from "@nextui-org/react";
import { useState } from "react";
import loginAuth from "./api/authen/POST/Login";
import Cookies from 'js-cookie';
import logo from '../styles/Logo.png'
import Image from "next/image";

interface LoginProps {
    username: string;
    password: string;
}

interface LoginComponentProps {
    onLogin: (loginStatus: boolean) => void;
    handleRole: (role: string) => void;
}

const Login = ({ onLogin, handleRole }: LoginComponentProps) => {
    const [loginData, setLoginData] = useState<LoginProps>({
        username: "",
        password: ""
    })

    const handleLogin = async () => {
        try {
            const data = await loginAuth(loginData);
            if (data) {
                Cookies.set('token', data.token, { expires: 0.5 })
                handleRole(data?.role)
                onLogin(true);
            }
            else {
                onLogin(false);
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="flex w-screen h-screen justify-center items-center  bg-gray-900">

            <Card className="w-1/4 shadow-white shadow-md border ">
                <div className="flex justify-center">
                <Image src={logo} alt="logo" width={200}/>
                </div>
                <CardBody className="">
                    <div>
                    <Input
                        key="outside"
                        label="Enter Username"
                        labelPlacement="outside"
                        onChange={(e) => setLoginData(prevState => ({
                            ...prevState,
                            username: e.target.value,
                        }))}
                    />
                    </div>

                    <div className="mt-4">
                    <Input
                        key="outside"
                        label="Enter Password"
                        labelPlacement="outside"
                        onChange={(e) => setLoginData(prevState => ({
                            ...prevState,
                            password: e.target.value,
                        }))}
                    />
                    </div>
                </CardBody>
                
                <CardFooter>
                <div className="flex items-center justify-center">
                    <Button className=" text-white bg-gray-900 font-bold p-6 pl-12 pr-12  rounded" onClick={handleLogin}>Login</Button>
                </div>
                </CardFooter>

            </Card>

        </div>
    );
}
export default Login;