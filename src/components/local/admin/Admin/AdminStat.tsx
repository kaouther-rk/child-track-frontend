import { DashContentStat, DashContentStatItem } from "@/components/DashCrudContent";
import { getAdmins } from "@/lib/server/actions/doctors/getAdmins";
import { UserCog } from "lucide-react";

export default async function AdminStat() {
    const admins = await getAdmins()
    return (
        <DashContentStat>
            <DashContentStatItem title="Admins" value={admins?.total.toString()} icon={<UserCog size={80} />} />
        </DashContentStat>
    )
}