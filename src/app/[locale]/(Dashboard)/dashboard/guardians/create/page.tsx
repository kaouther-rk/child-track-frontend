import { DashContenTitle } from "@/components/DashCrudContent";
import GuardianJoinForm from "@/components/local/guardian/CreateGuardianForm";
import DashSection from "@/components/Section/Section";

export default function Create() {
    return (
        <DashSection>
            <DashContenTitle>Create Guardian</DashContenTitle>
            <div className="mb-5"></div>
            <div className="w-1/3">
                <GuardianJoinForm />
            </div>
        </DashSection>
    )
}