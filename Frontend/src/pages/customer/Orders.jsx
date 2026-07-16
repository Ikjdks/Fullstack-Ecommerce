import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../../API/api.js";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await API.get("/orders/");
        setOrders(res.data);
      } catch (error) {
        console.log(error.response?.data);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div
      className="
    min-h-screen
    bg-background
    px-4
    sm:px-6
    py-8
    sm:py-10
    "
    >
      <div className="max-w-5xl mx-auto">
        {/* Header */}

        <div className="mb-8">
          <h1
            className="
          text-3xl
          sm:text-4xl
          font-bold
          "
          >
            My Orders
          </h1>

          <p
            className="
          text-muted-foreground
          mt-2
          "
          >
            Track your purchases and order history
          </p>
        </div>

        {orders.length === 0 ? (
          <div
            className="
          bg-card
          rounded-3xl
          border
          shadow-sm
          p-10
          text-center
          "
          >
            <div
              className="
            w-16
            h-16
            mx-auto
            rounded-full
            bg-secondary
            flex
            items-center
            justify-center
            text-3xl
            mb-5
            "
            >
              📦
            </div>

            <h2
              className="
            text-2xl
            font-semibold
            "
            >
              No orders yet
            </h2>

            <p
              className="
            text-muted-foreground
            mt-2
            "
            >
              Your purchased products will appear here.
            </p>
          </div>
        ) : (
          <div className="space-y-5">
            {orders.map((order) => (
              <div
                key={order.id}
                onClick={() => navigate(`/order/${order.id}`)}
                className="
              bg-card
              rounded-3xl
              border
              shadow-sm
              p-5
              sm:p-6
              cursor-pointer
              hover:shadow-md
              transition
              "
              >
                <div
                  className="
                flex
                flex-col
                sm:flex-row
                sm:items-center
                sm:justify-between
                gap-5
                "
                >
                  {/* Product */}

                  <div
                    className="
                  flex
                  items-center
                  gap-4
                  "
                  >
                    <img
                      src={order.image_url}
                      alt={order.display_title}
                      className="
                    w-20
                    h-20
                    rounded-2xl
                    object-cover
                    "
                    />

                    <div>
                      <h2
                        className="
                      font-semibold
                      text-lg
                      "
                      >
                        {order.display_title}
                      </h2>

                      <p
                        className="
                      text-sm
                      text-muted-foreground
                      mt-1
                      "
                      >
                        Order #{order.id}
                      </p>

                      <p
                        className="
                      text-sm
                      text-muted-foreground
                      "
                      >
                        {new Date(order.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  {/* Price + Status */}

                  <div
                    className="
                  sm:text-right
                  "
                  >
                    <p
                      className="
                    text-xl
                    font-bold
                    "
                    >
                      {order.total_price} ETB
                    </p>

                    <span
                      className={`
                    inline-block
                    mt-2
                    px-3
                    py-1
                    rounded-full
                    text-sm
                    font-medium

                    ${
                      order.order_status === "delivered"
                        ? "bg-emerald-100 text-emerald-700"
                        : order.order_status === "cancelled"
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-yellow-700"
                    }
                    `}
                    >
                      {order.order_status}
                    </span>
                  </div>
                </div>

                <div
                  className="
                mt-5
                border-t
                pt-4
                text-right
                "
                >
                  <button
                    className="
                  text-primary
                  font-medium
                  hover:underline
                  "
                  >
                    View Details →
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
