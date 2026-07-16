import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import API from "../../../API/api.js";

import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuGroup,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Menu, X, ShoppingBag, ChevronDown } from "lucide-react";

const Navi = ({ user, setUser }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [open, setOpen] = useState(false);

  const logout = async () => {
    try {
      await API.post("/auth/logout");

      setUser(null);

      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  const closeMenu = () => setOpen(false);

  const navLinks = [
    {
      name: "Home",
      path: "/",
    },
    {
      name: "Products",
      path: "/products",
    },
    ...(user
      ? [
          {
            name: "Cart",
            path: "/cart",
          },
          {
            name: "Orders",
            path: "/order",
          },
          {
            name: "Wishlist",
            path: "/wishlist",
          },
        ]
      : []),
  ];

  return (
    <nav
      className="
      sticky
      top-0
      z-50
      px-4
      pt-4
    "
    >
      <div
        className="
        max-w-7xl
        mx-auto
      "
      >
        <div
          className="
            flex
            items-center
            justify-between
            rounded-2xl
            border
            bg-background/80
            backdrop-blur-xl
            shadow-sm
            px-5
            py-3
            "
        >
          {/* Brand */}

          <Link
            to="/"
            className="
              flex
              items-center
              gap-3
              group
            "
          >
            <div
              className="
                flex
                items-center
                justify-center
                w-10
                h-10
                rounded-xl
                bg-primary
                text-primary-foreground
                transition
                group-hover:scale-105
              "
            >
              <ShoppingBag size={21} />
            </div>

            <div className="hidden sm:block">
              <h1
                className="
                font-bold
                text-lg
                text-foreground
              "
              >
                EthioShopping
              </h1>

              <p
                className="
                text-xs
                text-muted-foreground
              "
              >
                Modern marketplace
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}

          <div
            className="
            hidden
            md:flex
            items-center
            gap-2
          "
          >
            {navLinks.map((link) => {
              const active = location.pathname === link.path;

              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`
                    relative
                    px-4
                    py-2
                    rounded-lg
                    text-sm
                    font-medium
                    transition
                    ${
                      active
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted"
                    }
                  `}
                >
                  {link.name}
                </Link>
              );
            })}

            {user?.role === "admin" && (
              <Link
                to="/admin/"
                className="
                  px-4
                  py-2
                  rounded-lg
                  text-sm
                  font-medium
                  text-primary
                  hover:bg-muted
                  transition
                "
              >
                Admin
              </Link>
            )}
          </div>

          {/* Right Actions */}

          <div
            className="
            flex
            items-center
            gap-3
          "
          >
            <button
              className="
                md:hidden
                flex
                items-center
                justify-center
                w-10
                h-10
                rounded-lg
                hover:bg-muted
                transition
              "
              onClick={() => setOpen(!open)}
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                {user ? (
                  <button
                    className="
                      flex
                      items-center
                      gap-2
                      rounded-full
                      border
                      p-1
                      hover:bg-muted
                      transition
                    "
                  >
                    <img
                      src={user.avatar}
                      alt="Profile"
                      className="
                        w-9
                        h-9
                        rounded-full
                        object-cover
                      "
                    />

                    <ChevronDown size={16} className="hidden sm:block" />
                  </button>
                ) : (
                  <Button onClick={() => navigate("/login")}>Login</Button>
                )}
              </DropdownMenuTrigger>

              {user && (
                <DropdownMenuContent
                  align="end"
                  className="
                    w-52
                    rounded-xl
                  "
                >
                  <DropdownMenuGroup>
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>

                    <DropdownMenuSeparator />

                    <DropdownMenuItem
                      className="cursor-pointer"
                      onClick={() => navigate("/settings")}
                    >
                      Settings
                    </DropdownMenuItem>

                    <DropdownMenuItem
                      className="cursor-pointer"
                      onClick={() => navigate("/order")}
                    >
                      Orders
                    </DropdownMenuItem>

                    <DropdownMenuItem
                      className="cursor-pointer"
                      onClick={() => navigate("/wishlist")}
                    >
                      Wishlist
                    </DropdownMenuItem>

                    <DropdownMenuItem
                      className="cursor-pointer"
                      onClick={() => navigate("/cart")}
                    >
                      Cart
                    </DropdownMenuItem>
                  </DropdownMenuGroup>

                  <DropdownMenuSeparator />

                  <DropdownMenuItem
                    onClick={logout}
                    className="
                      cursor-pointer
                      text-red-600
                    "
                  >
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              )}
            </DropdownMenu>
          </div>
        </div>

        {/* Mobile Menu */}

        {open && (
          <div
            className="
              md:hidden
              mt-3
              rounded-2xl
              border
              bg-card
              shadow-sm
              p-5
              space-y-2
            "
          >
            {navLinks.map((link) => (
              <Link
                key={link.path}
                onClick={closeMenu}
                to={link.path}
                className="
                  block
                  px-4
                  py-3
                  rounded-xl
                  text-muted-foreground
                  hover:bg-muted
                  hover:text-foreground
                  transition
                "
              >
                {link.name}
              </Link>
            ))}

            {user?.role === "admin" && (
              <Link
                onClick={closeMenu}
                to="/admin/"
                className="
                  block
                  px-4
                  py-3
                  rounded-xl
                  text-primary
                  hover:bg-muted
                  transition
                "
              >
                Admin
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navi;
