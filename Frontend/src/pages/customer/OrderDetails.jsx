import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../../../API/api.js";
import { Skeleton } from "@/components/ui/skeleton";
const OrderDetails = () => {
  const { id } = useParams();

  const [order, setOrder] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await API.get(`/orders/${id}`);
        setOrder(res.data);
      } catch (error) {
        console.log(error.response?.data);
      }
    };

    fetchOrder();
  }, [id]);

  if (!order) {
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
        <div className="max-w-5xl mx-auto">
          {/* Header Skeleton */}
          <div className="flex justify-between items-center mb-8">
            <div className="space-y-3">
              <Skeleton className="h-10 w-64" />
              <Skeleton className="h-4 w-48" />
            </div>

            <Skeleton className="h-8 w-28 rounded-full" />
          </div>

          {/* Order Information Skeleton */}
          <div
            className="
          bg-card
          border
          rounded-2xl
          shadow-sm
          p-5
          sm:p-7
          mb-8
          "
          >
            <Skeleton className="h-6 w-48 mb-6" />

            <div className="grid sm:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Skeleton className="h-4 w-28" />
                <Skeleton className="h-5 w-32" />
              </div>

              <div className="space-y-2">
                <Skeleton className="h-4 w-28" />
                <Skeleton className="h-5 w-32" />
              </div>

              <div className="space-y-2">
                <Skeleton className="h-4 w-28" />
                <Skeleton className="h-5 w-32" />
              </div>
            </div>
          </div>

          {/* Items Skeleton */}
          <div
            className="
          bg-card
          border
          rounded-2xl
          shadow-sm
          p-5
          sm:p-7
          "
          >
            <Skeleton className="h-6 w-40 mb-6" />

            <div className="space-y-5">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="
                flex
                gap-4
                border-b
                pb-5
                "
                >
                  <Skeleton className="w-24 h-24 rounded-xl" />

                  <div className="space-y-3 flex-1">
                    <Skeleton className="h-5 w-48" />
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-4 w-40" />
                  </div>

                  <Skeleton className="h-6 w-24" />
                </div>
              ))}
            </div>

            {/* Total Skeleton */}
            <div
              className="
            mt-8
            border-t
            pt-6
            flex
            justify-between
            "
            >
              <Skeleton className="h-6 w-20" />
              <Skeleton className="h-8 w-32" />
            </div>
          </div>
        </div>
      </div>
    );
  }

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
      <div className="max-w-5xl mx-auto">
        {/* Header */}

        <div
          className="
        flex
        flex-col
        sm:flex-row
        sm:items-center
        justify-between
        gap-5
        mb-8
        "
        >
          <div>
            <h1
              className="
            text-3xl
            sm:text-4xl
            font-bold
            "
            >
              Order #{order.id}
            </h1>

            <p className="text-muted-foreground mt-2">
              Placed on {new Date(order.created_at).toLocaleDateString()}
            </p>
          </div>

          <span
            className={`
          px-4
          py-2
          rounded-full
          text-sm
          font-semibold
          w-fit

          ${
            order.order_status === "delivered"
              ? "bg-green-100 text-green-700"
              : order.order_status === "cancelled"
                ? "bg-red-100 text-red-700"
                : "bg-yellow-100 text-yellow-700"
          }
          `}
          >
            {order.order_status}
          </span>
        </div>

        {/* Order Information */}

        <div
          className="
        bg-card
        border
        rounded-2xl
        shadow-sm
        p-5
        sm:p-7
        mb-8
        "
        >
          <h2
            className="
          text-xl
          font-bold
          mb-6
          "
          >
            Order Information
          </h2>

          <div
            className="
          grid
          sm:grid-cols-3
          gap-6
          "
          >
            <div>
              <p className="text-sm text-muted-foreground">Payment Method</p>

              <p className="font-semibold mt-1 capitalize">
                {order.payment_method}
              </p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">Payment Status</p>

              <p className="font-semibold mt-1 capitalize">
                {order.payment_status}
              </p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">Order Status</p>

              <p className="font-semibold mt-1 capitalize">
                {order.order_status}
              </p>
            </div>
          </div>
        </div>

        {/* Items */}

        <div
          className="
        bg-card
        border
        rounded-2xl
        shadow-sm
        p-5
        sm:p-7
        "
        >
          <h2
            className="
          text-xl
          font-bold
          mb-6
          "
          >
            Order Items
          </h2>

          <div className="space-y-5">
            {order.items.map((item) => (
              <div
                key={item.product_id}
                className="
              flex
              flex-col
              sm:flex-row
              sm:items-center
              justify-between
              gap-5
              border-b
              pb-5
              last:border-none
              "
              >
                <div
                  className="
                flex
                gap-4
                "
                >
                  <img
                    src={item.image_url}
                    alt={item.title}
                    className="
                  w-20
                  h-20
                  sm:w-24
                  sm:h-24
                  rounded-xl
                  object-cover
                  "
                  />

                  <div>
                    <h3
                      className="
                    font-semibold
                    text-lg
                    "
                    >
                      {item.title}
                    </h3>

                    <p className="text-sm text-muted-foreground mt-1">
                      Quantity: {item.quantity}
                    </p>

                    <p className="text-sm text-muted-foreground">
                      Price: {item.price_at_purchase} ETB
                    </p>
                  </div>
                </div>

                <div
                  className="
                sm:text-right
                "
                >
                  <p
                    className="
                  text-lg
                  font-bold
                  "
                  >
                    {(item.quantity * item.price_at_purchase).toFixed(2)} ETB
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Total */}

          <div
            className="
          mt-8
          border-t
          pt-6
          flex
          justify-between
          items-center
          "
          >
            <span
              className="
            text-lg
            font-semibold
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
              {order.total_price} ETB
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
