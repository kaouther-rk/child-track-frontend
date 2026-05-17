import { DashContentPagination, DashContentPaginationItem } from "@/components/DashCrudContent";
import { getBraclets } from "@/lib/server/actions/braclets/getBracletss";
import { BracletsResponse } from "@/lib/server/type/braclet/braclet";

interface BracletPaginationProps {
    data: BracletsResponse;
    currentPage: number;
}

export default async function BracletPagination({ currentPage }: BracletPaginationProps) {
    const data = await getBraclets(currentPage);

    return (
        <DashContentPagination>
            {/* Previous button */}
            {data.prev_page_url && (
                <DashContentPaginationItem 
                    href={`/dashboard/braclets?page=${currentPage - 1}`}
                >
                    Previous
                </DashContentPaginationItem>
            )}

            {/* Page numbers */}
            {data.links.slice(1, -1).map((link, index) => (
                link.url && (
                    <DashContentPaginationItem 
                        key={index} 
                        href={`/dashboard/braclets?page=${index + 1}${currentPage === index + 1 ? '&active' : ''}`}
                    >
                        {link.label}
                    </DashContentPaginationItem>
                )
            ))}

            {/* Next button */}
            {data.next_page_url && (
                <DashContentPaginationItem 
                    href={`/dashboard/braclets?page=${currentPage + 1}`}
                >
                    Next
                </DashContentPaginationItem>
            )}
        </DashContentPagination>
    )
}