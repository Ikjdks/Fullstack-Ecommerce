import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import API from "../../API/api.js";

const Success = () => {
  const [orderId, setOrderId] = useState(null);
  const [failed, setFailed] = useState(false);
  const [searchParams] = useSearchParams();

  const [status, setStatus] = useState("Verifying payment...");

  useEffect(() => {
    const verify = async () => {
      try {
        const tx_ref = searchParams.get("tx_ref");

        if (!tx_ref) {
          setStatus("Invalid payment reference ❌");
          setFailed(true);
          return;
        }

        const res = await API.get(`/checkout/verify/${tx_ref}`);

        if (res.data.success) {
          setOrderId(res.data.order_id);
          setStatus("Payment Successful");
        } else {
          setStatus("Payment Failed");
          setFailed(true);
        }
      } catch (error) {
        console.log(error.response?.data);
        setStatus("Payment verification failed");
        setFailed(true);
      }
    };

    verify();
  }, [searchParams]);

  return (
    <div
      className="
    min-h-screen
    bg-background
    flex
    items-center
    justify-center
    px-4
    sm:px-6
    "
    >
      <div
        className="
      bg-card
      max-w-md
      w-full
      rounded-3xl
      shadow-sm
      border
      p-6
      sm:p-8
      text-center
      "
      >
        {!failed ? (
          <>
            {/* Success Icon */}

            <div
              className="
            w-20
            h-20
            mx-auto
            rounded-full
            bg-emerald-100
            flex
            items-center
            justify-center
            text-4xl
            mb-6
            "
            >
              ✓
            </div>

            <h1
              className="
            text-3xl
            font-bold
            text-emerald-600
            "
            >
              Payment Successful
            </h1>

            <p
              className="
            text-muted-foreground
            mt-3
            "
            >
              Thank you for your purchase. Your order has been confirmed.
            </p>

            {orderId && (
              <div
                className="
              mt-6
              bg-secondary
              rounded-xl
              p-4
              "
              >
                <p className="text-sm text-muted-foreground">Order Number</p>

                <p
                  className="
                text-xl
                font-bold
                mt-1
                "
                >
                  #{orderId}
                </p>
              </div>
            )}

            <div
              className="
            flex
            flex-col
            sm:flex-row
            gap-3
            mt-6
            "
            >
              <button
                onClick={() => (window.location.href = `/order/${orderId}`)}
                className="
              flex-1
              bg-primary
              hover:opacity-90
              text-primary-foreground
              py-3
              rounded-xl
              font-semibold
              transition
              "
              >
                View Order
              </button>

              <button
                onClick={() => (window.location.href = "/")}
                className="
              flex-1
              border
              py-3
              rounded-xl
              font-semibold
              hover:bg-secondary
              transition
              "
              >
                Continue Shopping
              </button>
            </div>
          </>
        ) : (
          <>
            {/* Failed Icon */}

            <div
              className="
            w-20
            h-20
            mx-auto
            rounded-full
            bg-red-100
            flex
            items-center
            justify-center
            text-4xl
            mb-6
            "
            >
              ✕
            </div>

            <h1
              className="
            text-3xl
            font-bold
            text-red-600
            "
            >
              Payment Failed
            </h1>

            <p
              className="
            text-muted-foreground
            mt-3
            "
            >
              We couldn't verify your payment. Please try again.
            </p>

            <button
              onClick={() => (window.location.href = "/cart")}
              className="
            w-full
            mt-6
            bg-primary
            hover:opacity-90
            text-primary-foreground
            py-3
            rounded-xl
            font-semibold
            transition
            "
            >
              Return to Cart
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Success;
