import { Link, useNavigate } from "react-router-dom";
import { PlusIcon, LogOutIcon, LogInIcon, UserPlusIcon } from "lucide-react";

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  // return <header className="bg-base-300 border-b border-base-content/10">
  //     <div className="mx-auto max-w-6xl p-4">
  //         <div className="flex items-center justify-between">
  //             <h1 className="text-3xl font-bold text-primary font-mono tracking-tighter">
  //                 Thinkboard
  //             </h1>
  //             <div className="flex items-center gap-4">
  //                 <Link to={"/create"} className="btn btn-primary">
  //                     <PlusIcon className="size-5 mr-2" />
  //                     <span>New Note</span>
  //                 </Link>
  //             </div>
  //         </div>
  //     </div>
  // </header>

  return (
    <header className="bg-base-300 border-b border-base-content/10">
      <div className="mx-auto max-w-6xl p-4">
        <div className="flex items-center justify-between">
          <Link
            to="/"
            className="text-3xl font-bold text-primary font-mono tracking-tighter"
          >
            Thinkboard
          </Link>

          <div className="flex items-center gap-4">
            {token ? (
              <>
                <Link to="/create" className="btn btn-primary">
                  <PlusIcon className="size-5 mr-2" />
                  <span>New Note</span>
                </Link>

                <button onClick={logout} className="btn btn-outline btn-error">
                  <LogOutIcon className="size-5 mr-2" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="btn btn-ghost">
                  <LogInIcon className="size-5 mr-2" />
                  <span>Login</span>
                </Link>

                <Link to="/register" className="btn btn-primary">
                  <UserPlusIcon className="size-5 mr-2" />
                  <span>Register</span>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
