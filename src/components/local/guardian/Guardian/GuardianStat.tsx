import { DashContentStat, DashContentStatItem } from "@/components/DashCrudContent";
import { getGuardians } from "@/lib/server/actions/gurdians/getGuardians";
import { UserCog } from "lucide-react";

export default async function GuardianStat() {
    const guardians = await getGuardians()
    return (
        <DashContentStat>
            <DashContentStatItem title="Guardians" value={guardians?.total.toString()} icon={<UserCog size={80} />} />
        </DashContentStat>
    )
}