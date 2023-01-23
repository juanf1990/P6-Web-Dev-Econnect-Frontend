import Image from "next/image";
import Link from "next/link";
import LogoutButton from "./LogoutButton";
import { unstable_getServerSession } from "next-auth";

type Props = {
  session: Awaited<ReturnType<typeof unstable_getServerSession>>;
};

async function Header() {
  const session = await unstable_getServerSession();

  if (session)
    return (
      <header className="sticky top-0 z-50 bg-blue-500 flex flex-col justify-between items-center p-10 shadow-sm">
        <div className="flex space-x-2">
          <Image
            className="rounded-full mx-2 object-contain"
            height={50}
            width={50}
            src="/../images/icon.png"
            alt="Groupomania Logo"
          />

          <div>
            <p className="text-cyan-400">Logged is as:</p>
            <p className="font-bold text-lg text-gray-500">
              {session.user?.name!}
            </p>
          </div>
        </div>

        <LogoutButton />
      </header>
    );

  return (
    <header className="sticky top-0 z-50 bg-white flex justify-between items-center p-10 shadow-sm">
      <div className="flex flex-col items-center space-y-5">
        <div className="flex space-x-2 items center">
          <Image src="/images/icon.png" height={10} width={50} alt="Logo" />

          <p className="text-cyan-400">Welcome to Econnect</p>
        </div>
      </div>

      <Link
        href="auth/signin"
        className="bg-cyan-700 text-white font-bold py-2 px-4"
      >
        Sign in!
      </Link>
    </header>
  );
}

export default Header;
