import Link from "next/link";
import { AuthTemplate } from "../_components/auth-template";

export default function SignUpPage() {
    return (
        <AuthTemplate
            title="Sign Up"
            form={ <></> }
            footer={
                <>
                    { "Already have an account?" } <Link href="/login">Log In</Link>
                </>
            }
        />
    );
};
