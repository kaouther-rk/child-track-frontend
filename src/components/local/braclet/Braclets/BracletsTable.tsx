import { getBraclets } from "@/lib/server/actions/braclets/getBracletss";
import BracletActions from "../actions";
import { DashContentTable, TableTd, TableTdMain, TableThead, TableTr } from "@/components/DashCrudContent";

interface BracletsTableProps {
    page: string;
}

export default async function BracletsTable({ page }: BracletsTableProps) {
    const currentPage = parseInt(page) || 1;
    const braclets = await getBraclets(currentPage);
    return (
        <>
            <DashContentTable>
                <TableThead list={['mac', 'status', 'taken-?', 'Settings']} />
                <tbody>
                    {braclets.data.map((braclet) => (
                        <TableTr key={braclet.id}>
                            <TableTdMain value={braclet.mac} />
                            <TableTd>
                                {braclet.status}
                            </TableTd>
                            <TableTd>
                                {braclet.children != null ? (
                                    <span className="text-error dark:text-dark-error">Taken</span>
                                ) : (
                                    <span className="text-green-700 dark:text-green-400">Free</span>
                                )}
                            </TableTd>
                            <TableTd>
                                <BracletActions braclet={braclet} />
                            </TableTd>
                        </TableTr>
                    ))}
                </tbody>
            </DashContentTable>
        </>
    )
}

