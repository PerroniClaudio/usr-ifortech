import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  getPaginationRowModel,
} from "@tanstack/react-table";

import {
  ArrowDownUp,
  ArrowUp,
  ArrowDown,
  ArrowRightToLine,
  ArrowLeftToLine,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

const columnHelper = createColumnHelper();

const columns = [
  columnHelper.accessor("id", {
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor((row) => row.user.name, {
    id: "user.name",
    cell: (info) => <i>{info.getValue().split("-")[0]}</i>,
    header: () => <span>Nome</span>,
  }),
  columnHelper.accessor("date_from", {
    header: () => "Data Inizio",
    cell: (info) => (
      <span>{new Date(info.getValue()).toLocaleDateString()}</span>
    ),
  }),
  columnHelper.accessor("date_to", {
    header: () => "Data Fine",
    cell: (info) => (
      <span>{new Date(info.getValue()).toLocaleDateString()}</span>
    ),
  }),
  columnHelper.accessor("created_at", {
    header: () => "Creata il",
    cell: (info) => (
      <span>{new Date(info.getValue()).toLocaleDateString()}</span>
    ),
  }),
];

function TrasferteTable({ businessTrips }) {
  const [sorting, setSorting] = useState([]);
  const navigate = useNavigate();

  const table = useReactTable({
    data: businessTrips,
    columns,
    state: {
      sorting,
    },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
  });

  const editTrasferta = (id) => () => {
    navigate(`/trasferte/${id}`);
  };

  return (
    <div className="overflow-x-auto">
      <table className="table">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} colSpan={header.colSpan}>
                  {header.isPlaceholder ? null : (
                    <div
                      {...{
                        className: header.column.getCanSort()
                          ? "cursor-pointer select-none"
                          : "",
                        onClick: header.column.getToggleSortingHandler(),
                      }}>
                      <div className="flex justify-between gap-2 items-center">
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {{
                          asc: <ArrowUp />,
                          desc: <ArrowDown />,
                        }[header.column.getIsSorted()] ?? <ArrowDownUp />}
                      </div>
                    </div>
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => {
            let businessTripId = row.getVisibleCells()[0].getValue();

            return (
              <tr
                key={row.id}
                onClick={editTrasferta(businessTripId)}
                className="cursor-pointer hover:bg-base-200">
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="h-4" />
      <div className="flex items-center justify-between gap-2">
        <div>
          <button
            className="btn btn-ghost"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}>
            <ArrowLeftToLine />
          </button>
          <button
            className="btn btn-ghost"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}>
            <ArrowLeft />
          </button>
          <button
            className="btn btn-ghost"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}>
            <ArrowRight />
          </button>
          <button
            className="btn btn-ghost"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}>
            <ArrowRightToLine />
          </button>
        </div>
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1">
            <div>Pagina</div>
            <strong>
              {table.getState().pagination.pageIndex + 1} di{" "}
              {table.getPageCount()}
            </strong>
          </span>
          <div className="divider divider-horizontal" />
          <span className="flex items-center gap-2">
            <span>Vai alla pagina</span>
            <input
              type="number"
              className="input input-bordered w-16"
              defaultValue={table.getState().pagination.pageIndex + 1}
              onChange={(e) => {
                const page = e.target.value ? Number(e.target.value) - 1 : 0;
                table.setPageIndex(page);
              }}
            />
          </span>
          <div className="divider divider-horizontal" />
          <select
            className="select select-bordered w-36"
            value={table.getState().pagination.pageSize}
            onChange={(e) => {
              table.setPageSize(Number(e.target.value));
            }}>
            {[10, 20, 30, 40, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                Mostra {pageSize}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
export default TrasferteTable;
