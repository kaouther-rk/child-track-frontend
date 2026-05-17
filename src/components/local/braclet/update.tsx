
import { getBraclet } from "@/lib/server/actions/braclets/getBraclet";
import UpdateBracletForm from "./UpdateForm";
import { Suspense } from "react";
import BracletUpdateSkeleton from "./Braclets/BracletUpdateSkeleton";


export default async function UpdateBraclet({ braclet }: { braclet: number }) {
    return (
        <Suspense fallback={<BracletUpdateSkeleton />}>
            <UpdateBracletContent braclet={braclet} />
        </Suspense>
    );
}

async function UpdateBracletContent({ braclet }: { braclet: number }) {
    const braclet_ = await getBraclet(Number(braclet));

    return <UpdateBracletForm braclet={braclet_} />;
}
