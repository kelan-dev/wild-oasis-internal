import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constants";

export default function useBookings() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  const filterValue = searchParams.get("status") || "all";
  const filter =
    !filterValue || filterValue === "all"
      ? null
      : { field: "status", value: filterValue };

  let sortBy = searchParams.get("sortBy") || "startDate-desc";
  if (sortBy === "startDate-desc") {
    sortBy = { field: "startDate", sortOrder: "desc" };
  }
  if (sortBy === "startDate-asc") {
    sortBy = { field: "startDate", sortOrder: "asc" };
  }
  if (sortBy === "totalPrice-desc") {
    sortBy = { field: "totalPrice", sortOrder: "desc" };
  }
  if (sortBy === "totalPrice-asc") {
    sortBy = { field: "totalPrice", sortOrder: "asc" };
  }

  const page = Number(searchParams.get("page")) || 1;

  const {
    data: { data: bookings, count } = {},
    error,
    isLoading,
  } = useQuery({
    queryKey: ["bookings", filter, sortBy, page],
    queryFn: () => getBookings({ filter, sortBy, page }),
  });

  const pageCount = Math.ceil(count / PAGE_SIZE);

  if (page < pageCount)
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, page + 1],
      queryFn: () => getBookings({ filter, sortBy, page: page + 1 }),
    });
  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, page - 1],
      queryFn: () => getBookings({ filter, sortBy, page: page - 1 }),
    });

  return {
    bookings,
    error,
    isLoading,
    count,
  };
}
