import { getGuardians } from "@/lib/server/actions/gurdians/getGuardians";
import GuardianActions from "../actions";
import CreateKey from "../creactKey";
import { DashContentTable, TableTd, TableTdMain, TableThead, TableTr } from "@/components/DashCrudContent";

interface GuardiansTableProps {
    page: string;
}

export default async function GuardiansTable({ page }: GuardiansTableProps) {
    const currentPage = parseInt(page) || 1;
    const guardians = await getGuardians(currentPage);

    return (
        <>
            <DashContentTable>
                <TableThead list={['Username', 'name', 'last', 'Key', 'Email', 'Settings']} />
                <tbody>
                    {guardians?.data.map((guardian) => (
                        <TableTr key={guardian.id}>
                            <TableTdMain value={guardian.username} />
                            <TableTd>
                                {guardian.name}
                            </TableTd>
                            <TableTd>
                                {guardian.last}
                            </TableTd>
                            <TableTd>
                                {guardian.key?.value || <CreateKey guardian={guardian} />}
                            </TableTd>
                            <TableTd>
                                {guardian.key?.user?.email || 'No Account'}
                            </TableTd>
                            <TableTd>
                                <GuardianActions guardian={guardian} />
                            </TableTd>
                        </TableTr>
                    ))}
                </tbody>
            </DashContentTable>
        </>
    )
}

