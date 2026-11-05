import { AuthStepSetter } from "../auth-template";
import { AuthDivider } from "./auth-divider";
import { AuthEmailButton } from "./auth-email-button";
import { AuthGoogleButton } from "./auth-google-button";

export function AuthMethodSelector({
    onHandleForm,
}: {
    onHandleForm: AuthStepSetter;
}) {
    return (
        <div
            className="
                flex flex-col w-80 gap-4
            "
        >
            <AuthGoogleButton />
            <AuthDivider />
            <AuthEmailButton
                onClick={ onHandleForm }
            />
        </div>
    );
};
