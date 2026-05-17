import { getAdmins } from "@/lib/server/actions/doctors/getAdmins";
import AdminActions from "../actions";
import CreateKey from "../creactKey";
import { DashContentTable, TableTd, TableTdMain, TableThead, TableTr } from "@/components/DashCrudContent";

interface AdminsTableProps {
    page: string;
}

export default async function AdminsTable({ page }: AdminsTableProps) {
    const currentPage = parseInt(page) || 1;
    const admins = await getAdmins(currentPage);

    return (
        <>
            <DashContentTable>
                <TableThead list={['Username', 'name', 'last', 'Key', 'Email', 'Settings']} />
                <tbody>
                    {admins?.data.map((admin) => (
                        <TableTr key={admin.id}>
                            <TableTdMain value={admin.username} />
                            <TableTd>
                                {admin.name}
                            </TableTd>
                            <TableTd>
                                {admin.last}
                            </TableTd>
                            <TableTd>
                                {admin.key?.value || <CreateKey admin={admin} />}
                            </TableTd>
                            <TableTd>
                                {admin.key?.user?.email || 'No Account'}
                            </TableTd>
                            <TableTd>
                                <AdminActions admin={admin} />
                            </TableTd>
                        </TableTr>
                    ))}
                </tbody>
            </DashContentTable>
        </>
    )
}

