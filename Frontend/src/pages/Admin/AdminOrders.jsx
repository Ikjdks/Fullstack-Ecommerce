import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import { Spinner } from "@/components/ui/spinner";
import { toast } from "sonner";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

import { useState, useEffect } from "react";
import API from "../../../API/api.js";

import { Field } from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";

import { SearchIcon, Eye } from "lucide-react";

const AdminOrders = () => {
  const [form, setForm] = useState({
    search: "",
    order_status: "",
    payment_status: "",
  });

  const statusVal = [
    "awaiting_payment",
    "processing",
    "delivered",
    "cancelled",
  ];

  const paymentVal = ["pending", "successful", "failed", "refunded"];

  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);

        const res = await API.get("orders/admin/orders", {
          params: {
            ...form,
            page,
            limit: 6,
          },
        });

        setOrders(res.data.orders);
        setTotalPages(res.data.totalPages);
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to load orders.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [page, form]);

  const paymentStyle = (status) => {
    switch (status) {
      case "successful":
        return "bg-green-100 text-green-700";

      case "failed":
        return "bg-red-100 text-red-700";

      case "refunded":
        return "bg-yellow-100 text-yellow-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const orderStyle = (status) => {
    switch (status) {
      case "delivered":
        return "bg-green-100 text-green-700";

      case "processing":
        return "bg-blue-100 text-blue-700";

      case "cancelled":
        return "bg-red-100 text-red-700";

      default:
        return "bg-orange-100 text-orange-700";
    }
  };

  return (
    <div
      className="
      min-h-screen
      w-full
      bg-gray-100
      p-8
    "
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Orders Management
          </h1>

          <p className="text-gray-500 mt-1">
            Manage customer orders, payments and delivery status.
          </p>
        </div>

        {/* Filters */}

        <div
          className="
          bg-white
          rounded-xl
          border
          shadow-sm
          p-5
          mb-6
        "
        >
          <div
            className="
            flex
            flex-col
            lg:flex-row
            gap-4
          "
          >
            {/* Search */}

            <div className="flex-1">
              <Field>
                <InputGroup>
                  <InputGroupAddon>
                    <SearchIcon size={18} />
                  </InputGroupAddon>

                  <InputGroupInput
                    placeholder="Search order, customer, product..."
                    value={form.search}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        search: e.target.value,
                      })
                    }
                  />
                </InputGroup>
              </Field>
            </div>

            {/* Order Status */}

            <Select
              value={form.order_status}
              onValueChange={(value) =>
                setForm({
                  ...form,
                  order_status: value,
                })
              }
            >
              <SelectTrigger className="w-full lg:w-48">
                <SelectValue placeholder="Order Status" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="all">All Orders</SelectItem>

                {statusVal.map((status) => (
                  <SelectItem key={status} value={status}>
                    {status.replace("_", " ")}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Payment Status */}

            <Select
              value={form.payment_status}
              onValueChange={(value) =>
                setForm({
                  ...form,
                  payment_status: value,
                })
              }
            >
              <SelectTrigger className="w-full lg:w-48">
                <SelectValue placeholder="Payment Status" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="all">All Payments</SelectItem>

                {paymentVal.map((status) => (
                  <SelectItem key={status} value={status}>
                    {status}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Table */}

        <div
          className="
          bg-white
          rounded-xl
          border
          shadow-sm
          overflow-hidden
        "
        >
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50 hover:bg-green-50 transition-colors">
                <TableHead>Customer</TableHead>

                <TableHead>Product</TableHead>

                <TableHead>Total</TableHead>

                <TableHead>Payment</TableHead>

                <TableHead>Status</TableHead>

                <TableHead>Date</TableHead>

                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={7} className="py-10">
                    <div className="flex justify-center">
                      <Spinner className="size-8" />
                    </div>
                  </TableCell>
                </TableRow>
              ) : orders.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={7}
                    className="
                    text-center
                    py-10
                    text-gray-500
                  "
                  >
                    No orders found
                  </TableCell>
                </TableRow>
              ) : (
                orders.map((order) => (
                  <TableRow
                    key={order.id}
                    className="hover:bg-green-50 transition-colors"
                  >
                    <TableCell>
                      <div>
                        <p className="font-semibold">{order.name}</p>

                        <p className="text-sm text-gray-500">{order.email}</p>
                      </div>
                    </TableCell>

                    <TableCell>
                      <div
                        className="
                        flex
                        items-center
                        gap-3
                      "
                      >
                        <img
                          src={order.image_url}
                          alt={order.title}
                          className="
                          w-12
                          h-12
                          rounded-lg
                          object-cover
                        "
                        />

                        <div>
                          <p className="font-medium">{order.display_title}</p>

                          <p className="text-xs text-gray-500">
                            {order.item_count} item(s)
                          </p>
                        </div>
                      </div>
                    </TableCell>

                    <TableCell className="font-semibold">
                      {Number(order.total_price).toLocaleString()} ETB
                    </TableCell>

                    <TableCell>
                      <span
                        className={`
                        px-3
                        py-1
                        rounded-full
                        text-xs
                        font-medium
                        ${paymentStyle(order.payment_status)}
                      `}
                      >
                        {order.payment_status}
                      </span>
                    </TableCell>

                    <TableCell>
                      <span
                        className={`
                        px-3
                        py-1
                        rounded-full
                        text-xs
                        font-medium
                        ${orderStyle(order.order_status)}
                      `}
                      >
                        {order.order_status.replace("_", " ")}
                      </span>
                    </TableCell>

                    <TableCell>
                      {new Date(order.created_at).toLocaleDateString("en-GB")}
                    </TableCell>

                    <TableCell>
                      <Button
                        size="sm"
                        className="
                        gap-2
                        bg-green-600
                        hover:bg-green-700
                      "
                        onClick={() => navigate(`/admin/orders/${order.id}`)}
                      >
                        <Eye size={16} />
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}

        <div className="mt-6 flex justify-center">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();

                    if (page > 1) setPage(page - 1);
                  }}
                />
              </PaginationItem>

              {[...Array(totalPages)].map((_, index) => (
                <PaginationItem key={index}>
                  <PaginationLink
                    href="#"
                    isActive={page === index + 1}
                    className="data-[active=true]:bg-green-600 data-[active=true]:text-white"
                    onClick={(e) => {
                      e.preventDefault();

                      setPage(index + 1);
                    }}
                  >
                    {index + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}

              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();

                    if (page < totalPages) setPage(page + 1);
                  }}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </div>
  );
};

export default AdminOrders;
