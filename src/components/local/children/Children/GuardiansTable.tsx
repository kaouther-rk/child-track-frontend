import Braclet from "@/app/[locale]/(Guardian)/guardian/children/components/Braclert";
import { DashContentTable, TableTd, TableTdMain, TableThead, TableTr } from "@/components/DashCrudContent";
import { getChildrens } from "@/lib/server/actions/children/getchildrens";
import DangerZone from "./addDangerZone";
import CreateUpdateCircleLocationRayon from "./createUpdateCircleLocationAndReyon";


export default async function ChildrensTable() {
    const children = await getChildrens();
    return (
        <>
            <DashContentTable>
                <TableThead list={['Username', 'name', 'last', 'Braclet', 'Circle', 'Danger Zones', 'Settings']} />
                <tbody>
                    {
                        children.data.map((child) => (
                            <TableTr key={child.id} >
                                <TableTdMain value={child.username} />
                                <TableTd>
                                    {child.name}
                                </TableTd>
                                <TableTd>
                                    {child.last}
                                </TableTd>
                                <TableTd>
                                    <Braclet child={child} />
                                </TableTd>
                                <TableTd>
                                    {
                                        (child.braclet && child.braclet?.circle) ? `[${child.braclet?.circle.location.lat} - ${child.braclet?.circle.location.lng}]` : '/'
                                    }
                                    {
                                        (child.braclet && child.braclet?.circle) && <CreateUpdateCircleLocationRayon circle={child.braclet.circle.id} />
                                    }
                                </TableTd>
                                <TableTd>
                                    <ul className="flex flex-col justify-start gap-2 text-on-surface dark:text-dark-on-surface">
                                        {
                                            (child.braclet && child.braclet?.dangers) ? child.braclet.dangers.map(danger => (
                                                <li key={danger.id} className="flex items-center gap-2">
                                                    <span>{danger.name} : </span>
                                                    <span>[{danger.location.lat} , {danger.location.lng}]</span>
                                                </li>
                                            )) : "/"
                                        }
                                    </ul>
                                    {
                                        (child.braclet && child.braclet?.dangers)  && <DangerZone braclet={child.braclet.id} />
                                    }
                                </TableTd>
                                <TableTd>
                                    settings
                                    {/* <GuardianActions guardian={guardian} /> */}
                                </TableTd>
                            </TableTr>
                        ))
                    }
                </tbody>
            </DashContentTable>
        </>
    )
}

