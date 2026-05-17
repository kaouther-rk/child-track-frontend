import { DashContentPagination, DashContentPaginationItem } from "@/components/DashCrudContent";
import { getGuardians } from "@/lib/server/actions/gurdians/getGuardians";
import { GuardiansResponse } from "@/lib/server/type/guardian/guardian";

interface GuardianPaginationProps {
    data: GuardiansResponse;
    currentPage: number;
}

export default async function GuardianPagination({ currentPage }: GuardianPaginationProps) {
    const data = await getGuardians(currentPage);

    return (
        <DashContentPagination>
            {/* Previous button */}
            {data.prev_page_url && (
                <DashContentPaginationItem 
                    href={`/dashboard/guardians?page=${currentPage - 1}`}
                >
                    Previous
                </DashContentPaginationItem>
            )}

            {/* Page numbers */}
            {data.links.slice(1, -1).map((link, index) => (
                link.url && (
                    <DashContentPaginationItem 
                        key={index} 
                        href={`/dashboard/guardians?page=${index + 1}${currentPage === index + 1 ? '&active' : ''}`}
                    >
                        {link.label}
                    </DashContentPaginationItem>
                )
            ))}

            {/* Next button */}
            {data.next_page_url && (
                <DashContentPaginationItem 
                    href={`/dashboard/guardians?page=${currentPage + 1}`}
                >
                    Next
                </DashContentPaginationItem>
            )}
        </DashContentPagination>
    )
}