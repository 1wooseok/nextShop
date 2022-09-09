import css from "./navbar.module.css";
import Link from "next/link";

export default function Navbar() {
  return (
    <header className={css.header}>
      <div className={css.headerWrap}>
        <nav className={css.headerNav}>
          <div className={css.headerNavMenus}>
            <Link href="/">
              <a>Home</a>
            </Link>
            <input className={css.searchInput} />
            <Link href="/signin">
              <a>Sign in</a>
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
