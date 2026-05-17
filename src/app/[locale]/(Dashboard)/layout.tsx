import Mode from "@/components/local/Navs/Mode";
import UpBar from "@/components/Navigations/NavBar/NavBar";
import NavBarGroup from "@/components/Navigations/NavBar/NavBarGroupd";
import NavBarItem from "@/components/Navigations/NavBar/NavBarItem";
import NavGroup from "@/components/Navigations/Navigation/NavGroup";
import Navigation from "@/components/Navigations/Navigation/NavigationDemo";
import NavItem from "@/components/Navigations/Navigation/NavItem";
import Profile from "@/components/Navigations/Navigation/Profile";
import { BringToFront, Home, Users } from "lucide-react";
import { getLocale } from "next-intl/server";

export default async function layout({ children }: { children: React.ReactNode }) {
    const locale = await getLocale()
    return (
        <>
            <UpBar>
                <NavBarGroup>
                    <NavBarItem link={`/${locale}/dashboard`} >Home</NavBarItem>
                    <NavBarItem link={`/${locale}`} >Leave</NavBarItem>
                    <Mode/>
                </NavBarGroup>
            </UpBar>
            <div className="flex">
                <Navigation>
                    <Profile role="admin" link={`#`} photo="/landing1.png">Admin</Profile>
                    <NavGroup title="Main" >
                        <NavItem icon={<Home size={18} />} link={`/${locale}/dashboard`}>
                            Home
                        </NavItem>
                        <NavItem icon={<BringToFront size={18} />} link={`/${locale}/dashboard/braclets`}>
                            Braclet
                        </NavItem>
                        <NavItem icon={<Users size={18} />} link={`/${locale}/dashboard/guardians`}>
                            Guardian
                        </NavItem>
                    </NavGroup>
                </Navigation>
                {children}
            </div>
        </>
    )
}