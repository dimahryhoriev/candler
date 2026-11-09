import { Suspense } from "react";
import { AuthTemplate } from "../_components/auth-template";
import { ResetPasswordFooter } from "./_components/reset-password-footer";
import { ResetPasswordForm } from "./_components/reset-password-form";

export default function ResetPasswordPage() {
    return (
        <Suspense fallback={ null }>
            <AuthTemplate
                title="Reset Password"
                form={ <ResetPasswordForm /> }
                footer={ <ResetPasswordFooter /> }
            />
        </Suspense>
    );
};
