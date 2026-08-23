// import Sidebar from "./navbar";
import {Outlet} from 'react-router-dom';


function Layout(){
    return(
        <>
            <div className="flex flex-col min-vh-100">
                <div className="grow">
                    <Outlet />
                </div>
            </div>
        </>
    )
}

export default Layout;