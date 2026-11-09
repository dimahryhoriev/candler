import { Suspense } from "react";
import { AuthTemplate } from "../_components/auth-template";
import { UpdatePasswordFooter } from "./_components/update-password-footer";
import { UpdatePasswordForm } from "./_components/update-password-form";

export default function UpdatePasswordPage() {
    return (
        <Suspense fallback={ null }>
            <AuthTemplate
                title="Update Password"
                form={ <UpdatePasswordForm /> }
                footer={ <UpdatePasswordFooter /> }
            />
        </Suspense>
    );
};
