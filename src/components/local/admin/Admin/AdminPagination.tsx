import { AdminResponse } from "@/lib/server/type/admin/admin";
import { getAdmins } from "@/lib/server/actions/doctors/getAdmins";
import { DashContentPagination, DashContentPaginationItem } from "@/components/DashCrudContent";

interface AdminPaginationProps {
    data: AdminResponse;
    currentPage: number;
}

export default async function AdminPagination({ currentPage }: AdminPaginationProps) {
    const data = await getAdmins(currentPage);

    return (
        <DashContentPagination>
            {/* Previous button */}
            {data.prev_page_url && (
                <DashContentPaginationItem 
                    href={`/dashboard/admins?page=${currentPage - 1}`}
                >
                    Previous
                </DashContentPaginationItem>
            )}

            {/* Page numbers */}
            {data.links.slice(1, -1).map((link, index) => (
                link.url && (
                    <DashContentPaginationItem 
                        key={index} 
                        href={`/dashboard/admins?page=${index + 1}${currentPage === index + 1 ? '&active' : ''}`}
                    >
                        {link.label}
                    </DashContentPaginationItem>
                )
            ))}

            {/* Next button */}
            {data.next_page_url && (
                <DashContentPaginationItem 
                    href={`/dashboard/admins?page=${currentPage + 1}`}
                >
                    Next
                </DashContentPaginationItem>
            )}
        </DashContentPagination>
    )
}