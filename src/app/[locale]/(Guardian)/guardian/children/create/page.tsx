import { DashContenTitle } from "@/components/DashCrudContent";
import CreateChildrenForm from "@/components/local/children/CreateGuardianForm";
import DashSection from "@/components/Section/Section";
import { getLocale } from "next-intl/server";
import Link from "next/link";

export default async function Create() {
    const locale = await getLocale();
    return (
        <DashSection>
            <DashContenTitle>Create Children</DashContenTitle>
            <div className="mb-5"></div>
            <div className="w-1/3">
                <CreateChildrenForm />
            </div>
            <div className="mt-5">
                <Link href={`/${locale}/guardian/children`} className="text-on-surface dark:text-dark-on-surface hover:opacity-60">
                    Back to Children List
                </Link>
            </div>
        </DashSection>
    )
}