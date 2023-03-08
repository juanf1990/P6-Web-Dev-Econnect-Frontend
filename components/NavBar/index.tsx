import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";
import { useEffect, useState } from "react";
import { User } from "../../typings";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";

const Index = () => {
  const [user, setUser] = useState<User | null>(null);
  const cookie = Cookies.get("token");
  const router = useRouter();

  useEffect(() => {
    if (cookie) {
      const decoded: any = jwtDecode(cookie);
      Cookies.set("username", decoded.username);
      Cookies.set("userId", decoded.id);
      setUser(decoded.username);
    }
  }, []);

  const logout = () => {
    Cookies.remove("token");
    Cookies.remove("username");
    Cookies.remove("userId");
    router.push("/");
  };

  async function deleteAccount() {
    const userId = Cookies.get("userId");
    const res = await fetch(`http://localhost:8001/api/users/${userId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${cookie}`,
      },
    });
    if (res.ok) {
      alert("Account deleted");
      Cookies.remove("token");
      Cookies.remove("username");
      Cookies.remove("userId");
      router.push("/");
    } else {
      alert("An error occured, please try again");
    }
  }

  const auth = () => {
    const cookie = Cookies.get("token");
    if (!cookie) {
      router.push("/");
    } else {
      router.push("/feed");
    }
  };

  return (
    <div className="navbar flex justify-between bg-base-100 fixed z-10">
      <div>
        <h2 className="btn btn-ghost normal-case text-l" onClick={auth}>
          E-Connect!
        </h2>
        <p>
          Hello <>{user}</>
        </p>
      </div>
      <div className="flex-none gap-2">
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <Image src="/icon-left-font.svg" alt="Icon" />
            </div>
          </label>
          <ul
            tabIndex={0}
            className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
          >
            <li>
              <Link href="/" onClick={logout}>
                Logout
              </Link>
            </li>
            <li>
              <Link href="/" onClick={deleteAccount}>
                Delete Account!
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Index;
