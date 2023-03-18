import { type ReactNode } from "react";

import { DrawerNav } from "./NavBar/DrawerNav";

type Props = {
  children: ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <>
      <main>
        <DrawerNav>
          {children}
        </DrawerNav>
      </main>
    </>
  );
}
