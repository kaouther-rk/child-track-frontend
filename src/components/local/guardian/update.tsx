import { getGuardian } from "@/lib/server/actions/gurdians/getGuardian";
import UpdateGuardianForm from "./UpdateForm";
import { Suspense } from "react";
import GuardianUpdateSkeleton from "./Guardian/GuardianUpdateSkeleton";

export default async function UpdateGuardian({ guardian }: { guardian: number }) {
    return (
        <Suspense fallback={<GuardianUpdateSkeleton />}>
            <UpdateGuardianContent guardian={guardian} />
        </Suspense>
    );
}

async function UpdateGuardianContent({ guardian }: { guardian: number }) {
    const guardian_ = await getGuardian(Number(guardian));

    return <UpdateGuardianForm guardian={guardian_} />;
}
