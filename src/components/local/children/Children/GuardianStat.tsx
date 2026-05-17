import { DashContentStat, DashContentStatItem } from "@/components/DashCrudContent";
import { getChildrens } from "@/lib/server/actions/children/getchildrens";
import { UserCog } from "lucide-react";

export default async function ChildrensStat() {
    const guardians = await getChildrens()
    return (
        <DashContentStat>
            <DashContentStatItem title="Children" value={guardians?.total.toString()} icon={<UserCog size={80} />} />
        </DashContentStat>
    )
}