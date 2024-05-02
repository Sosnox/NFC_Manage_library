import { Button, Card, CardBody, CardFooter, Input } from "@nextui-org/react";
import { useState } from "react";
import loginAuth from "./api/authen/POST/Login";
import Cookies from 'js-cookie';
import { jwtDecode } from "jwt-decode";

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
    console.log(loginData, "loginData")

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
        <div className="flex w-screen h-screen justify-center items-center">
            <Card className="w-1/4">
                <CardBody className="">
                    <label>Login</label>
                    <Input
                        key="outside"
                        label="Username"
                        labelPlacement="outside"
                        onChange={(e) => setLoginData(prevState => ({
                            ...prevState,
                            username: e.target.value,
                        }))}
                    />
                    <Input
                        key="outside"
                        label="Password"
                        labelPlacement="outside"
                        onChange={(e) => setLoginData(prevState => ({
                            ...prevState,
                            password: e.target.value,
                        }))}
                    />
                </CardBody>
                <CardFooter>
                    <Button className=" text-white font-bold py-2 px-4 rounded" onClick={handleLogin}>Login</Button>
                </CardFooter>
            </Card>

        </div>
    );
}
export default Login;