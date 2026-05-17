import { DashContentStat, DashContentStatItem } from "@/components/DashCrudContent";
import { getBraclets } from "@/lib/server/actions/braclets/getBracletss";
import { UserCog } from "lucide-react";

export default async function BracletStat() {
    const braclets = await getBraclets()
    return (
        <DashContentStat>
            <DashContentStatItem title="Braclets" value={braclets.total} icon={<UserCog size={80} />} />
        </DashContentStat>
    )
}