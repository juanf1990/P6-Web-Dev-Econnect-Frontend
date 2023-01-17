const index = () => {
  return (
    <div className="navbar flex justify-start bg-base-100 fixed z-10">
      <div>
        <a className="btn btn-ghost normal-case text-l" href="/">E-Connect!</a>
      </div>
      <div className="flex-1">
        <a className="btn btn-ghost normal-case text-l" href="/feed">Feed</a>
      </div>
      <div className="flex-none gap-2">
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <img src="/icon-left-font.svg" />
            </div>
          </label>
          <ul tabIndex={0} className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52">
            <li><a href="/">Logout</a></li>
            <li><a href="/">Delete Account!</a></li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default index