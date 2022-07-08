import Header from "@components/Header";
import Footer from "@components/Footer";
import React from "react";

export default function DashboardLayout({ children = null }) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
