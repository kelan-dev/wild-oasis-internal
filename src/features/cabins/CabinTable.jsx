import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import useCabins from "./useCabins";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import Empty from "../../ui/Empty";
import { useSearchParams } from "react-router-dom";

export default function CabinTable() {
  const { isLoading, cabins } = useCabins();
  const [searchParams] = useSearchParams();

  if (isLoading) return <Spinner />;
  if (!cabins.length) return <Empty resource="cabin" />;

  const filterValue = searchParams?.get("discount") || "all";

  let filteredCabins;
  if (filterValue === "all") {
    filteredCabins = cabins;
  }
  if (filterValue === "no-discount") {
    filteredCabins = cabins.filter((cabin) => cabin.discount === 0);
  }
  if (filterValue === "with-discount") {
    filteredCabins = cabins.filter((cabin) => cabin.discount > 0);
  }

  const sortBy = searchParams?.get("sortBy") || "name-asc";
  if (sortBy === "name-asc") {
    filteredCabins.sort((a, b) => a.name.localeCompare(b.name));
  }
  if (sortBy === "name-desc") {
    filteredCabins.sort((a, b) => b.name.localeCompare(a.name));
  }
  if (sortBy === "regularPrice-asc") {
    filteredCabins.sort((a, b) => a.regularPrice - b.regularPrice);
  }
  if (sortBy === "maxCapacity-asc") {
    filteredCabins.sort((a, b) => a.maxCapacity - b.maxCapacity);
  }
  if (sortBy === "maxCapacity-desc") {
    filteredCabins.sort((a, b) => b.maxCapacity - a.maxCapacity);
  }

  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header role="row">
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>

        <Table.Body
          data={filteredCabins}
          render={(cabin) => <CabinRow key={cabin.id} cabin={cabin} />}
        />
      </Table>
    </Menus>
  );
}
