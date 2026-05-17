import { AuthLayout, AuthPictureLayout } from "../AuthComponents"
import LoginIndex from "./lib"

export default function login() {
    return (
        <AuthLayout>
            <LoginIndex />
            <AuthPictureLayout src="/login.png" />
        </AuthLayout>
    )
}