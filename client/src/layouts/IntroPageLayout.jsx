import { Outlet } from "react-router-dom";
import NavBar from "../components/navbar intro/NavBar";
import Footer from "./components/Footer";

export default function IntroPageLayout() {
  return (
    <div>
      <NavBar />
      <Outlet />
      <Footer />
    </div>
  );
}
