import Navbar from "./navbar";
import Footer from "./footer";
import css from "./main.module.css";

export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      <main className={css.main}>{children}</main>
      <Footer />
    </>
  );
}
