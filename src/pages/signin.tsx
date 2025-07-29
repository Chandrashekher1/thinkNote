import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { BACKEND_URL } from "@/config";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

export function SignIn() {
    const userNameRef = useRef<HTMLInputElement>(null);
    const passwRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate()

    const handleSignIn = async () => {
        const username = userNameRef.current?.value;
        const password = passwRef.current?.value;
        const loginData =  {
            username: username,
            password: password
        }

        try {
            const response = await fetch(BACKEND_URL + '/api/v1/signin',{
                method: 'POST',
                headers: {
                    'Content-Type':'application/json'
                },
                body: JSON.stringify(loginData)
            })
            const data = await response.json()
            console.log(data);
            const jwt = data.token;
            localStorage.setItem("token", jwt);
            alert("You have signin up!");
            navigate('/dashboard')
        } catch (err) {
            alert("Signin failed.");
            console.error(err);
        }
    };

    return (
        <div className="h-screen w-screen bg-gray-200 flex justify-center items-center">
            <div className="bg-white rounded-xl border p-8">
                <Input ref={userNameRef} placeholder="Username" />
                <Input ref={passwRef} placeholder="Password" />

                <div className="flex justify-center my-4">
                    <Button onClick={handleSignIn} variant="primary" text="SignIn" size="lg" />
                </div>
            </div>
        </div>
    );
}
