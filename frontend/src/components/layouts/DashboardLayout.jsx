import React from 'react'
import { Container } from "reactstrap";
// core components
import AdminNavbar from "../Navbars/AdminNavbar";
import AdminFooter from "../Footers/AdminFooter";
import { useLocation } from "react-router-dom";


const DashboardLayout = ({ props, children }) => {
    const mainContent = React.useRef(null);
    const location = useLocation();

    React.useEffect(() => {
        document.documentElement.scrollTop = 0;
        document.scrollingElement.scrollTop = 0;
        mainContent.current.scrollTop = 0;
    }, [location]);

    return (
        <>
            <div className="main-content" ref={mainContent}>
                <AdminNavbar
                    {...props}
                    brandText="Logo Here"
                />
                {children}
                <Container fluid>
                    <AdminFooter />
                </Container>
            </div>
        </>
    )

}


export default DashboardLayout