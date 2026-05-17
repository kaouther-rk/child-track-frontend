import { JoinLayout, JoinPictureLayout } from "../JoinComponents"
import GuardianIndex from "./lib"

export default function login() {
    return (
        <JoinLayout>
            <GuardianIndex />
            <JoinPictureLayout src="/login.png" />
        </JoinLayout>
    )
}