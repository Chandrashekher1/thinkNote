import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { Label } from "../ui/label";
import { easeOut, motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import { BACKEND_URL } from "@/config";
import { Input } from "./Input";
import { AlertPopup } from "./AlertPopup";
import { CircularProgress } from "@mui/material";

export function SignForm({
  className,
  ...props
}: React.ComponentProps<"div">) {

  const fadeInUp = {
      hidden: {opacity:0, x:-60},
      visible: {opacity:1, x:0, transition:{duration: 0.6,ease: easeOut}}
  }

  const navigate = useNavigate();
  const userRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertTitle, setAlertTitle] = useState("");
  const [alertDescription, setAlertDescription] = useState("");
  const [alertVariant, setAlertVariant] = useState<"default" | "success" | "error">("default");

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();

    const username = userRef.current?.value;
    const password = passwordRef.current?.value;

    if (!username || !password) {
      alert("Please enter both email and password.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${BACKEND_URL}/api/v1/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({username, password }),
      });

      const data = await response.json();
      
      if (data.success) {
      setAlertTitle("Success");
      setAlertDescription("Signup successful! Redirecting to login...");
      setAlertVariant("success");
      setAlertOpen(true);

      setTimeout(() => navigate("/login"), 3000);
    } else {
      setAlertTitle("Signup Failed");
      setAlertDescription(data.message || "Something went wrong.");
      setAlertVariant("error");
      setAlertOpen(true);
    }

    } catch (error) {
      console.error("Login error:", error);
      setAlertTitle("Internal Error");
      setAlertDescription(error instanceof Error ? error.message : "An unexpected error occurred.");
      setAlertVariant("error");
      setAlertOpen(true);
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
              initial = "hidden"
              whileInView="visible"
              viewport={{once:true}}
          className="bg-muted relative hidden md:block">
            <img
              src="https://app-brainly.vercel.app/assets/signupImg-DD9UQSgn.png"
              alt="Image"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </motion.div>
          <motion.div 
              variants={fadeInUp}
                initial = "hidden"
                whileInView="visible"
                viewport={{once:true}}
          >
            <form className="p-6 md:p-8" onSubmit={handleSignUp}>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">Welcome back</h1>
                <p className="text-muted-foreground text-balance">
                  Sign Up to your Account
                </p>
              </div>
              <motion.div
                variants={fadeInUp}
                initial = "hidden"
                whileInView="visible"
                viewport={{once:true}}
              className="grid gap-3">
                <Label htmlFor="username">username</Label>
                <Input
                  id="username"
                  type="username"
                  placeholder="username"
                  ref={userRef}
                  required
                />
              </motion.div>
              <motion.div 
                variants={fadeInUp}
                initial = "hidden"
                whileInView="visible"
                viewport={{once:true}}
              className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  
                </div>
                <Input 
                  id="password"
                  type="password" 
                  placeholder="user@123" 
                  ref={passwordRef}
                  required 
                />
              </motion.div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? <CircularProgress size={24} color="inherit" /> : "Sign Up"}
              </Button>
              {/* <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                <span className="bg-card text-muted-foreground relative z-10 px-2">
                  Or continue with
                </span>
              </div>
              <div className="grid grid-cols-3 gap-4">
                
                <Button variant="outline" type="button" className="w-full">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path
                      d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                      fill="currentColor"
                    />
                  </svg>
                  <span className="sr-only">Login with Google</span>
                </Button>
              </div> */}
              <div className="text-center text-sm">
                Already have an account ?{" "}
                <Button variant="link" onClick={(() => navigate('/login'))} className="inline-flex items-center">
                  Sign In
                </Button>
              </div>
            </div>
          </form>
          </motion.div>
        </CardContent>
      </Card>
      
    </div>
    <AlertPopup
      title={alertTitle}
      description={alertDescription}
      isOpen={alertOpen}
      setIsOpen={setAlertOpen}
      variant={alertVariant}
    />
    </>

  )
}
