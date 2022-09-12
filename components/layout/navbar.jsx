import { useCallback } from "react";
import Link from "next/link";
import css from "./navbar.module.css";
import { useAuthContext, useAuthActions } from "../../context/authContext";

export default function Navbar() {
  const storage = useAuthContext();
  const actions = useAuthActions();

  const handleSignIn = useCallback(async () => {
    await actions.signIn();
  }, []);

  const handleSignOut = useCallback(async () => {
    await actions.signOut();
  }, []);

  const authButton = storage ? (
    <>
      <div>
        <Link href="/mypage">
          <a>{storage.displayName}</a>
        </Link>
      </div>
      <button onClick={handleSignOut}>Sign out</button>
    </>
  ) : (
    <button onClick={handleSignIn}>Sign in</button>
  );

  return (
    <header className={css.header}>
      <div className={css.headerWrap}>
        <nav className={css.headerNav}>
          <div className={css.headerNavMenus}>
            <Link href="/">
              <a>Home</a>
            </Link>
            <input className={css.searchInput} />
            <div className={css.headerRight}>
              <button>
                <Link href="/cart">
                  <a>Cart</a>
                </Link>
              </button>
              {authButton}
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}
