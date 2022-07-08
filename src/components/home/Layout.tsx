import Header from "@components/Header";
import Footer from "@components/Footer";
import React from "react";

export default function HomeLayout({ children = null }) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
