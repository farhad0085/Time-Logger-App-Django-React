import React from "react";
import LogsPage from "./time_logs/LogsPage";
import { useSelector } from 'react-redux'
import UsersPage from "./time_logs/admin/UsersPage";


const HomePage = () => {
  const auth = useSelector(state => state.auth)
  if (auth.user.is_company_owner) return <UsersPage />
  return <LogsPage />;
};

export default HomePage;
