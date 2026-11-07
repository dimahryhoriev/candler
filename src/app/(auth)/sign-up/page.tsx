import { Suspense } from "react";
import { AuthTemplate } from "../_components/auth-template";
import { SignUpFooter } from "./_components/sign-up-footer";
import { SignUpForm } from "./_components/sign-up-form";

export default function SignUpPage() {
    return (
        <Suspense>
            <AuthTemplate
                title="Sign Up"
                form={ <SignUpForm /> }
                footer={ <SignUpFooter /> }
            />
        </Suspense>
    );
};
