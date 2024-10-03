import React from "react";
import NavbarComponent from "../NavbarComponent";
import { Outlet } from "react-router-dom";
import FooterComponent from "../common/footer/FooterComponent";
export default function Layout() {
  return (
    <div>
      <nav className="sticky top-0 z-50">
        <NavbarComponent />
      </nav>
      <main className="mx-auto ">
        <Outlet />
      </main>
      <footer className="w-full bg-black ">
        <FooterComponent />
      </footer>
    </div>
  );
}
