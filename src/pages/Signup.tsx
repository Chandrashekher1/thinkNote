import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { BACKEND_URL } from "@/config";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

export function Signup() {
    const userNameRef = useRef<HTMLInputElement>(null);
    const passwRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate()

    const handleSignUp = async () => {
        const username = userNameRef.current?.value;
        const password = passwRef.current?.value;
        const signUpData =  {
            username: username,
            password: password
        }

        try {
            const response = await fetch(BACKEND_URL + '/api/v1/signup',{
                method: 'POST',
                headers: {
                    'Content-Type':'application/json'
                },
                body: JSON.stringify(signUpData)
            })
            const data = await response.json()
            console.log(data);
            const jwt = data.token;
            localStorage.setItem("token", jwt);
            alert("You have sign up!");
            navigate('/dashboard')
        } catch (err) {
            alert("Signup failed.");
            console.error(err);
        }
    };

    return (
        <div className="h-screen w-screen bg-gray-200 flex justify-center items-center">
            <div className="bg-white rounded-xl border p-8">
                <Input ref={userNameRef} placeholder="Username" />
                <Input ref={passwRef} placeholder="Password" />

                <div className="flex justify-center my-4">
                    <Button onClick={handleSignUp} variant="primary" text="SignUp" size="lg" />
                </div>
            </div>
        </div>
    );
}
