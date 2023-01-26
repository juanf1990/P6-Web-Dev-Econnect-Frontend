import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";
import { useEffect, useState } from "react";
import { User } from "../../typings";

const index = () => {
  const [user, setUser] = useState<User | null>(null);
  const cookie = Cookies.get("token");

  useEffect(() => {
    if (cookie) {
      const decoded: any = jwtDecode(cookie);
      Cookies.set("username", decoded.username);
      setUser(decoded.username);
    }
    console.log(user);
  }, []);

  const logout = () => {
    Cookies.remove("token");
    Cookies.remove("username");
    window.location.href = "/";
  };

  const deleteAccount = () => {
    Cookies.remove("token");
    Cookies.remove("username");
    window.location.href = "/";
  };

  const auth = () => {
    const cookie = Cookies.get("token");
    if (!cookie) {
      window.location.href = "/";
    } else {
      window.location.href = "/feed";
    }
  };

  return (
    <div className="navbar flex justify-between bg-base-100 fixed z-10">
      <div>
        <a className="btn btn-ghost normal-case text-l" onClick={auth}>
          E-Connect!
        </a>
        <p>
          Hello <>{user}</>
        </p>
      </div>
      <div className="flex-none gap-2">
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <img src="/icon-left-font.svg" />
            </div>
          </label>
          <ul
            tabIndex={0}
            className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
          >
            <li>
              <a href="/" onClick={logout}>
                Logout
              </a>
            </li>
            <li>
              <a href="/" onClick={deleteAccount}>
                Delete Account!
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default index;
