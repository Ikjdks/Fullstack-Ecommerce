import API from "../../../API/api.js";
import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

const CheckoutPage = () => {
  const [cartAmount, setCartAmount] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({
    name: "",
    address: "",
    email: "",
    phone: "",
  });

  // const navigate = useNavigate();

  const handlePayment = async () => {
    try {
      setLoading(true);

      const res = await API.post("/checkout/chapa");

      window.location.href = res.data.data.checkout_url;
    } catch (error) {
      console.log(error.response?.data);

      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchCarts = async () => {
      try {
        const carts = await API.get("/checkout/cart");
        const tot = await API.get("/checkout/total");
        const userInfo = await API.get("/checkout/info");

        setUser(userInfo.data);
        setTotalAmount(tot.data.total);
        setCartAmount(carts.data);
        console.log(carts.data);
        console.log(tot.data.total);
        console.log(userInfo.data);
      } catch (error) {
        console.log(error.response.data.message);
      }
    };

    fetchCarts();
  }, []);

  return (
    <div
      className="
    min-h-screen
    bg-background
    px-4
    sm:px-6
    py-8
    sm:py-12
    "
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}

        <div className="mb-10">
          <h1
            className="
          text-3xl
          sm:text-4xl
          font-bold
          "
          >
            Checkout
          </h1>

          <p className="text-muted-foreground mt-2">
            Complete your information and place your order securely.
          </p>
        </div>

        <div
          className="
        grid
        lg:grid-cols-3
        gap-8
        "
        >
          {/* Checkout Form */}
          <div
            className="
          lg:col-span-2
          bg-card
          rounded-3xl
          border
          shadow-sm
          p-6
          sm:p-8
          "
          >
            <div
              className="
            flex
            items-center
            gap-3
            mb-8
            "
            >
              <div
                className="
              w-11
              h-11
              rounded-xl
              bg-emerald-100
              text-emerald-700
              flex
              items-center
              justify-center
              "
              >
                ✓
              </div>

              <div>
                <h2 className="text-xl font-bold">Delivery Information</h2>

                <p className="text-sm text-muted-foreground">
                  Enter your shipping details
                </p>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="text-sm font-medium">Full Name</label>

                <input
                  type="text"
                  value={user.name}
                  onChange={(e) =>
                    setUser({
                      ...user,
                      name: e.target.value,
                    })
                  }
                  placeholder="Your name"
                  className="
                mt-2
                w-full
                rounded-xl
                border
                bg-background
                px-4
                py-3
                outline-none
                focus:ring-2
                focus:ring-primary
                "
                />
              </div>

              <div>
                <label className="text-sm font-medium">Email</label>

                <input
                  type="email"
                  value={user.email}
                  onChange={(e) =>
                    setUser({
                      ...user,
                      email: e.target.value,
                    })
                  }
                  placeholder="Email address"
                  className="
                mt-2
                w-full
                rounded-xl
                border
                bg-background
                px-4
                py-3
                outline-none
                focus:ring-2
                focus:ring-primary
                "
                />
              </div>

              <div className="sm:col-span-2">
                <label className="text-sm font-medium">Address</label>

                <input
                  type="text"
                  value={user.address}
                  onChange={(e) =>
                    setUser({
                      ...user,
                      address: e.target.value,
                    })
                  }
                  placeholder="Delivery address"
                  className="
                mt-2
                w-full
                rounded-xl
                border
                bg-background
                px-4
                py-3
                outline-none
                focus:ring-2
                focus:ring-primary
                "
                />
              </div>

              <div>
                <label className="text-sm font-medium">Phone Number</label>

                <input
                  type="text"
                  value={user.phone}
                  onChange={(e) =>
                    setUser({
                      ...user,
                      phone: e.target.value,
                    })
                  }
                  placeholder="Phone number"
                  className="
                mt-2
                w-full
                rounded-xl
                border
                bg-background
                px-4
                py-3
                outline-none
                focus:ring-2
                focus:ring-primary
                "
                />
              </div>
            </div>

            {/* Payment */}

            <div className="mt-10">
              <h2 className="text-xl font-bold mb-5">Payment Method</h2>

              <div className="flex gap-4">
                <button
                  className="
                flex-1
                border-2
                border-primary
                bg-primary
                text-primary-foreground
                rounded-xl
                py-4
                font-semibold
                "
                >
                  Chapa
                </button>

                <button
                  disabled
                  className="
                flex-1
                border
                rounded-xl
                py-4
                text-muted-foreground
                opacity-50
                cursor-not-allowed
                "
                >
                  Pay on delivery
                </button>
              </div>
            </div>
          </div>{" "}
          {/* Order Summary */}
          <div
            className="
          bg-card
          rounded-3xl
          border
          shadow-sm
          p-6
          sm:p-8
          h-fit
          sticky
          top-24
          "
          >
            <div
              className="
            flex
            items-center
            justify-between
            mb-7
            "
            >
              <h2
                className="
              text-2xl
              font-bold
              "
              >
                Order Summary
              </h2>

              <span
                className="
              text-sm
              bg-emerald-100
              text-emerald-700
              px-3
              py-1
              rounded-full
              font-medium
              "
              >
                Secure
              </span>
            </div>

            {/* Products */}

            <div
              className="
            space-y-5
            max-h-[420px]
            overflow-y-auto
            pr-2
            "
            >
              {cartAmount.map((c) => (
                <div
                  key={c.id}
                  className="
                flex
                gap-4
                items-center
                "
                >
                  <img
                    src={c.image_url}
                    alt={c.title}
                    className="
                  w-20
                  h-20
                  rounded-2xl
                  object-cover
                  border
                  "
                  />

                  <div className="flex-1">
                    <p
                      className="
                    font-semibold
                    line-clamp-1
                    "
                    >
                      {c.title}
                    </p>

                    <p
                      className="
                    text-sm
                    text-muted-foreground
                    mt-1
                    "
                    >
                      {c.quantity} × ${c.price}
                    </p>
                  </div>

                  <p
                    className="
                  font-bold
                  "
                  >
                    ${(c.quantity * Number(c.price)).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>

            <div
              className="
            my-6
            border-t
            "
            />

            {/* Price Details */}

            <div
              className="
            space-y-4
            "
            >
              <div
                className="
              flex
              justify-between
              text-sm
              "
              >
                <span className="text-muted-foreground">Subtotal</span>

                <span className="font-medium">${totalAmount}</span>
              </div>

              <div
                className="
              flex
              justify-between
              text-sm
              "
              >
                <span className="text-muted-foreground">Shipping</span>

                <span
                  className="
                text-emerald-600
                font-semibold
                "
                >
                  FREE
                </span>
              </div>

              <div
                className="
              border-t
              pt-5
              flex
              justify-between
              items-center
              "
              >
                <span
                  className="
                text-xl
                font-bold
                "
                >
                  Total
                </span>

                <span
                  className="
                text-2xl
                font-bold
                "
                >
                  ${totalAmount}
                </span>
              </div>
            </div>

            <button
              disabled={loading}
              onClick={handlePayment}
              className="
            w-full
            mt-8
            bg-primary
            text-primary-foreground
            py-4
            rounded-xl
            font-semibold
            transition
            hover:opacity-90
            disabled:opacity-50
            "
            >
              {loading ? "Redirecting..." : "Place Order"}
            </button>

            <p
              className="
            text-xs
            text-center
            text-muted-foreground
            mt-5
            "
            >
              Your payment information is processed securely.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
