import { AuthTemplate } from "../_components/auth-template";
import { SignUpForm } from "./_components/sign-up-form";

export default function SignUpPage() {
    return (
        <AuthTemplate
            mode="sign-up"
            form={ <SignUpForm /> }
        />
    );
};
