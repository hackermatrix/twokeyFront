import React from "react";
import RecentFiles from "../components/RecentFiles";
import AccountFiles from "../components/AccountFiles";
import ErrorPage from "../components/ErrorPage";

const Development = () => {
  if (!sessionStorage.getItem("token")) {
    return <ErrorPage error="You are not authorised" />;
  }
  return (
    <div className="p-4">
      <RecentFiles />
      <AccountFiles />
    </div>
  );
};

export default Development;
