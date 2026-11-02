import Link from "next/link";
import { AuthTemplate } from "../_components/auth-template";

export default function LoginPage() {
    return (
        <AuthTemplate
            title="Log In"
            form={ <></> }
            footer={
                <>
                    { "Don't have an account?" } <Link href="/sign-up">Sign Up</Link>
                </>
            }
        />
    );
};
