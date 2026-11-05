import { AuthTemplate } from "../_components/auth-template";
import { SignUpForm } from "../sign-up/_components/sign-up-form";

export default function LoginPage() {
    return (
        <AuthTemplate
            mode="login"
            form={ <SignUpForm /> }
        />
    );
};
