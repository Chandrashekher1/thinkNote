import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { Label } from "../ui/label";
import { motion, easeOut } from "framer-motion";
import { BACKEND_URL } from "@/config";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "./Input";
import { AlertPopup } from "./AlertPopup";
import { CircularProgress } from "@mui/material";
import { EyeIcon, EyeOffIcon } from "lucide-react";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const fadeInUp = {
    hidden: { opacity: 0, x: 60 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: easeOut } },
  };

  const navigate = useNavigate();
  const userRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);

  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [alertTitle, setAlertTitle] = useState("");
  const [alertDescription, setAlertDescription] = useState("");
  const [alertVariant, setAlertVariant] = useState<"default" | "success" | "error">("default");
  const [showPassword,setShowPassword] = useState(false)

  const loginWithGoogle = () => {
    const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
    const REDIRECT_URI = "http://localhost:3000/auth/google/callback";
    const SCOPE = "openid profile email";
    const RESPONSE_TYPE = "code";

    const url = `https://accounts.google.com/o/oauth2/v2/auth?response_type=${RESPONSE_TYPE}&client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=${SCOPE}`;
    window.location.href = url;
  };

  const triggerAlert = (
    title: string,
    description: string,
    variant: "default" | "success" | "error" = "default"
  ) => {
    setAlertTitle(title);
    setAlertDescription(description);
    setAlertVariant(variant);
    setIsAlertOpen(true);
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();

    const username = userRef.current?.value;
    const password = passwordRef.current?.value;

    if (!username || !password) {
      triggerAlert("Missing Fields", "Please enter both username and password.", "error");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${BACKEND_URL}/login/api/v1/signin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      console.log(data);
      

      if (data.success || data.token) {
        localStorage.setItem("token", data.token);
        triggerAlert("Success", "Login successful!", "success");
        navigate("/dashboard");
      } else {
        triggerAlert("Login Failed", data.message || "Please check your credentials.", "error");
      }
    } catch (error) {
      console.error("Login error:", error);
      triggerAlert("Error", "Something went wrong. Please try again later.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className={cn("flex flex-col gap-6", className)} {...props}>
        <Card className="overflow-hidden p-0">
          <CardContent className="grid p-0 md:grid-cols-2">
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <form className="p-6 md:p-8" onSubmit={handleSignIn}>
                <div className="flex flex-col gap-6">
                  <div className="flex flex-col items-center text-center">
                    <h1 className="text-2xl font-bold">Welcome back</h1>
                    <p className="text-muted-foreground text-balance">
                      Login to your account
                    </p>
                  </div>
                  <motion.div
                    variants={fadeInUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid gap-3"
                  >
                    <Label htmlFor="username">Username</Label>
                    <Input
                      id="username"
                      type="text"
                      placeholder="username"
                      ref={userRef}
                      required
                    />
                  </motion.div>
                  <motion.div
                    variants={fadeInUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid gap-3"
                  >
                    <div className="flex items-center">
                      <Label htmlFor="password">Password</Label>
                      <a
                        href="#"
                        className="ml-auto text-sm underline-offset-2 hover:underline"
                      >
                        Forgot your password?
                      </a>
                    </div>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text": "password"}
                        placeholder="password"
                        ref={passwordRef}
                        required
                        autoComplete="current-password"
                        className="pr-10"
                    />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-secondary-foreground cursor-pointer">{showPassword ? <EyeOffIcon/> : <EyeIcon/>} </button>
                    </div>
                  </motion.div>
                  <Button type="submit" variant="default" className="w-full" disabled={loading}>
                    {loading ? <CircularProgress size={24} color="inherit" /> : "Login"}
                  </Button>
                  <div className="text-center text-sm">
                    Don't have an account?{" "}
                    <Button type="button" variant="link" onClick={() => navigate("/signup")} className="inline-flex items-center ">
                      Sign up
                    </Button>
                  </div>
                </div>
                <Button variant="default" className="w-full" onClick={loginWithGoogle} type="button">
                  Login With Google
                </Button>
              </form>
            </motion.div>
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="bg-muted relative hidden md:block"
            >
              <img
                src="https://app-brainly.vercel.app/assets/signupImg-DD9UQSgn.png"
                alt="Login Illustration"
                className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
              />
            </motion.div>
          </CardContent>
        </Card>
      </div>
      <AlertPopup
        title={alertTitle}
        description={alertDescription}
        isOpen={isAlertOpen}
        setIsOpen={setIsAlertOpen}
        variant={alertVariant}
      />
    </>
  );
}
