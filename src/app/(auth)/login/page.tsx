import { AuthTemplate } from "../_components/auth-template";

export default function LoginPage() {
    return (
        <AuthTemplate
            mode="login"
        // footer={
        //     <>
        //         { "Don't have an account?" } <Link href="/sign-up">Sign Up</Link>
        //     </>
        // }
        />
    );
};
