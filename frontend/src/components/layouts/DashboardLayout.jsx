import React from 'react'
import { Container } from "reactstrap";
// core components
import AdminFooter from "../Footers/AdminFooter";
import { useLocation } from "react-router-dom";
import TopNavBar from '../Navbars/TopNavBar';


const DashboardLayout = ({ props, children }) => {
  const mainContent = React.useRef(null);
  const location = useLocation();

  React.useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    mainContent.current.scrollTop = 0;
  }, [location]);

  return (
    <div className="main-content" ref={mainContent}>
      <TopNavBar />
      {children}
      <Container fluid>
        <AdminFooter />
      </Container>
    </div>
  )

}


export default DashboardLayout