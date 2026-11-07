import { Suspense } from "react";
import { AuthTemplate } from "../_components/auth-template";
import { LoginFooter } from "./_components/login-footer";
import { LoginForm } from "./_components/login-form";

export default function LoginPage() {
    return (
        <Suspense fallback={ null }>
            <AuthTemplate
                title="Log In"
                form={ <LoginForm /> }
                footer={ <LoginFooter /> }
            />
        </Suspense>
    );
};
