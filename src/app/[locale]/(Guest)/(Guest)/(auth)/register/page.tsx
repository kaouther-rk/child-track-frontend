import { AuthLayout, AuthPictureLayout } from "../AuthComponents";
import RegisterIndex from "./lib";

export default function register() {
    return (
        <>
            <AuthLayout>
                <RegisterIndex />
                <AuthPictureLayout src="/login.png" />
            </AuthLayout>
        </>
    )
}