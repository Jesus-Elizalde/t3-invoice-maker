import { type ReactNode } from "react";
import { signIn, signOut, useSession } from "next-auth/react";

import Image from "next/image";
import { useRouter } from "next/router";
import Link from "next/link";

import { HiHome } from "react-icons/hi";
import { HiUsers } from "react-icons/hi";
import { HiOutlineLogout } from "react-icons/hi";

type Props = {
  children: ReactNode;
};

export const DrawerNav = ({ children }: Props) => {
  const { data: sessionData } = useSession();
  console.log(
    "🚀 ~ file: DrawerNav.tsx:18 ~ DrawerNav ~ sessionData:",
    sessionData
  );

  const router = useRouter();
  const path = router.pathname;

  return (
    <>
      {sessionData?.user ? (
        <div className="drawer-mobile drawer">
          <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content ">
            <label
              htmlFor="my-drawer-2"
              className="btn-primary drawer-button btn lg:hidden"
            >
              Open drawer
            </label>
            {children}
          </div>
          <div className="drawer-side">
            <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
            <ul className="menu w-80 justify-between bg-base-100 p-4 text-base-content">
              {/* <!-- Sidebar content here --> */}

              <div>
                <li>
                  <Link href="/" className={path === "/" ? "active" : ""}>
                    <HiHome />
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    href="/customers"
                    className={path === "/customers" ? "active" : ""}
                  >
                    <HiUsers />
                    Customers
                  </Link>
                </li>
              </div>
              <div>
                <li>
                  <div className="flex">
                    <label
                      tabIndex={0}
                      className="btn-ghost btn-circle avatar btn"
                    >
                      <div className="w-10 rounded-full">
                        <Image
                          src={sessionData?.user?.image ?? ""}
                          alt={sessionData?.user?.name ?? ""}
                          fill
                          className="rounded-full"
                        />
                      </div>
                    </label>
                    <div>
                      <p>{sessionData?.user?.name}</p>
                      <p>{sessionData?.user?.email}</p>
                    </div>
                    <div onClick={() => void signOut()}>
                      <HiOutlineLogout />
                    </div>
                  </div>
                </li>
              </div>
            </ul>
          </div>
        </div>
      ) : (
        <>
          <div className="navbar bg-base-100">
            <div className="flex-1">
              <a className="btn-ghost btn text-xl normal-case">daisyUI</a>
            </div>
            <div className="flex-none gap-2">
              <div className="btn" onClick={() => signIn()}>
                Sign In
              </div>
            </div>
          </div>
          {children}
        </>
      )}
    </>
  );
};
