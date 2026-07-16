import { Link } from "react-router-dom";
import { FaFacebook, FaGithub, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="border-t bg-background mt-20">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-10 sm:py-14">
        <div
          className="
        grid
        grid-cols-1
        sm:grid-cols-2
        lg:grid-cols-4
        gap-10
        "
        >
          {/* Logo */}

          <div>
            <h2 className="text-2xl font-bold text-foreground">Yordi Store</h2>

            <p
              className="
            mt-4
            text-sm
            leading-6
            text-muted-foreground
            "
            >
              Modern shopping experience built using the PERN stack with secure
              payments and fast delivery.
            </p>
          </div>

          {/* Company */}

          <div>
            <h3 className="font-semibold mb-4 text-foreground">Company</h3>

            <div className="space-y-3">
              <Link
                to="/about"
                className="
              block
              text-muted-foreground
              hover:text-primary
              transition
              "
              >
                About
              </Link>

              <Link
                to="/contact"
                className="
              block
              text-muted-foreground
              hover:text-primary
              transition
              "
              >
                Contact
              </Link>

              <Link
                to="/faq"
                className="
              block
              text-muted-foreground
              hover:text-primary
              transition
              "
              >
                FAQ
              </Link>
            </div>
          </div>

          {/* Shop */}

          <div>
            <h3 className="font-semibold mb-4 text-foreground">Shop</h3>

            <div className="space-y-3">
              <Link
                to="/products"
                className="
              block
              text-muted-foreground
              hover:text-primary
              transition
              "
              >
                Products
              </Link>

              <Link
                to="/wishlist"
                className="
              block
              text-muted-foreground
              hover:text-primary
              transition
              "
              >
                Wishlist
              </Link>

              <Link
                to="/order"
                className="
              block
              text-muted-foreground
              hover:text-primary
              transition
              "
              >
                Orders
              </Link>
            </div>
          </div>

          {/* Contact */}

          <div>
            <h3 className="font-semibold mb-4 text-foreground">Contact</h3>

            <div className="flex gap-5">
              <a
                href="#"
                className="
              text-muted-foreground
              hover:text-primary
              transition
              "
              >
                <FaGithub size={22} />
              </a>

              <a
                href="#"
                className="
              text-muted-foreground
              hover:text-primary
              transition
              "
              >
                <FaFacebook size={22} />
              </a>

              <a
                href="#"
                className="
              text-muted-foreground
              hover:text-primary
              transition
              "
              >
                <FaInstagram size={22} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}

        <div
          className="
        border-t
        mt-10
        pt-6
        text-center
        text-sm
        text-muted-foreground
        "
        >
          © {new Date().getFullYear()} Yordi Store. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
