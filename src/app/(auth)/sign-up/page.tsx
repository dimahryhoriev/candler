import { AuthTemplate } from "../_components/auth-template";

export default function SignUpPage() {
    return (
        <AuthTemplate
            mode="sign-up"
        // footer={
        //     <>
        //         { "Already have an account?" } <Link href="/login">Log In</Link>
        //     </>
        // }
        />
    );
};
