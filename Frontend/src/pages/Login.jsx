import { useEffect, useState } from "react";
import API from "../../API/api.js";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
const Login = ({ user, setUser }) => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError("");
      if (!form.email || !form.password) {
        setError("Please fill in all fields");
        return;
      }
      setLoading(true);
      const res = await API.post("/auth/login", form);
      setUser(res.data.user);
      navigate("/");
    } catch (error) {
      setError(
        error.response?.data?.message || "Login failed. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };
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
      w-full
      max-w-md
      bg-card
      border
      rounded-3xl
      shadow-sm
      p-6
      sm:p-8
      "
      >
        {/* Back Button */}

        <button
          type="button"
          onClick={() => navigate(-1)}
          className="
        flex
        items-center
        gap-2
        text-muted-foreground
        hover:text-primary
        transition
        mb-8
        "
        >
          ← Go back
        </button>

        {/* Header */}

        <div className="text-center mb-8">
          <div
            className="
          mx-auto
          w-14
          h-14
          rounded-2xl
          bg-primary
          text-primary-foreground
          flex
          items-center
          justify-center
          font-bold
          text-xl
          mb-5
          "
          >
            E
          </div>

          <h1
            className="
          text-3xl
          font-bold
          text-foreground
          "
          >
            Welcome Back
          </h1>

          <p
            className="
          text-muted-foreground
          mt-2
          "
          >
            Login to continue shopping
          </p>
        </div>

        {error && (
          <div
            className="
          bg-red-50
          text-red-600
          border
          border-red-200
          px-4
          py-3
          rounded-xl
          mb-5
          text-sm
          "
          >
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <Label>Email</Label>

            <Input
              type="email"
              placeholder="Enter your email"
              value={form.email}
              className="
            mt-2
            rounded-xl
            "
              onChange={(e) =>
                setForm({
                  ...form,
                  email: e.target.value,
                })
              }
            />
          </div>

          <div>
            <Label>Password</Label>

            <Input
              type="password"
              placeholder="Enter your password"
              value={form.password}
              className="
            mt-2
            rounded-xl
            "
              onChange={(e) =>
                setForm({
                  ...form,
                  password: e.target.value,
                })
              }
            />
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="
          w-full
          h-12
          rounded-xl
          text-base
          "
          >
            {loading ? "Logging in..." : "Login"}
          </Button>
        </form>

        <p
          className="
        text-center
        text-sm
        text-muted-foreground
        mt-6
        "
        >
          Don't have an account?
          <span
            onClick={() => navigate("/register")}
            className="
          text-primary
          font-medium
          cursor-pointer
          ml-1
          hover:underline
          "
          >
            Register
          </span>
        </p>
      </div>
    </div>
  );
};
export default Login;
