import { AuthTemplate } from "../_components/auth-template";
import { LoginForm } from "./_components/login-form";

export default function LoginPage() {
    return (
        <AuthTemplate
            mode="login"
            form={ <LoginForm /> }
        />
    );
};
