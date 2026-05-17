import { DashContenTitle } from "@/components/DashCrudContent";
import CreateBracletForm from "@/components/local/braclet/CreateGuardianForm";

import DashSection from "@/components/Section/Section";

export default function Create() {
    return (
        <DashSection>
            <DashContenTitle>Create Braclet</DashContenTitle>
            <div className="mb-5"></div>
            <div className="w-1/3">
                <CreateBracletForm />
            </div>
        </DashSection>
    )
}