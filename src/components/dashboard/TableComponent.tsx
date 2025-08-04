"use client";

// import * as React from "react";
import React, { useEffect, useRef, useState } from "react";
import {
  ColumnDef,
  SortingState,
  VisibilityState,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "../ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  // Configuration options
  showFilters?: boolean;
  showColumnToggle?: boolean;
  showPagination?: boolean;
  showSelection?: boolean;
  filterColumns?: string[];
  filterPlaceholder?: string;
  onSelectionChange?: (selectedIds: string[]) => void;
  // Pagination options
  pageSize?: number;
  maxPageSize?: number;
  // Row identification
  getRowId?: (row: TData) => string;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  showFilters = true,
  showColumnToggle = true,
  showPagination = true,
  showSelection = false,
  filterColumns = [],
  filterPlaceholder,
  onSelectionChange,
  pageSize = 10,
  maxPageSize = 50,
  getRowId,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  const prevSelectedIdsRef = React.useRef<string[]>([]);

  useEffect(() => {
    if (onSelectionChange && showSelection) {
      const selectedRowIds = Object.keys(rowSelection).filter(
        (key) => (rowSelection as any)[key]
      );
      const selectedIds = selectedRowIds
        .map((rowId) => {
          const row = data.find(
            (d) => (getRowId ? getRowId(d) : (d as any)?.id) === rowId
          );
          return getRowId ? getRowId(row!) : (row as any)?.id;
        })
        .filter(Boolean) as string[];
      const prevSelectedIds = prevSelectedIdsRef.current;
      if (
        prevSelectedIds.length !== selectedIds.length ||
        !prevSelectedIds.every((v, i) => v === selectedIds[i])
      ) {
        onSelectionChange(selectedIds);
        prevSelectedIdsRef.current = selectedIds;
      }
    }
  }, [rowSelection, data, onSelectionChange, showSelection, getRowId]);

  console.log("getRowId", getRowId, getRowId ? data.map(getRowId) : []);

  const table = useReactTable({
    data,
    columns,
    globalFilterFn: "auto",
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: showSelection ? setRowSelection : undefined,
    getRowId,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection: showSelection ? rowSelection : {},
    },
    initialState: {
      pagination: {
        pageSize,
      },
    },
  });

  const filterValue = table.getState().globalFilter ?? "";
  const pageCount = table.getPageCount();
  const pageIndex = table.getState().pagination.pageIndex;
  const pageSizeState = table.getState().pagination.pageSize;
  const totalRows = table.getFilteredRowModel().rows.length;
  const currentPageRows = table.getRowModel().rows.length;
  const start = totalRows === 0 ? 0 : pageIndex * pageSizeState + 1;
  const end = totalRows === 0 ? 0 : start + currentPageRows - 1;

  return (
    <>
      {/* Filters and Column Toggle */}
      {(showFilters || showColumnToggle) && (
        <div className="flex items-center py-4">
          {showFilters && (
            <Input
              placeholder={filterPlaceholder ?? "Search..."}
              value={filterValue}
              onChange={(event) => table.setGlobalFilter(event.target.value)}
              className="max-w-sm"
            />
          )}
          {showColumnToggle && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="ml-auto">
                  Columns
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white" align="end">
                {table
                  .getAllColumns()
                  .filter((column) => column.getCanHide())
                  .map((column) => {
                    return (
                      <DropdownMenuCheckboxItem
                        key={column.id}
                        className="capitalize hover:bg-gray-100"
                        checked={column.getIsVisible()}
                        onCheckedChange={(value) =>
                          column.toggleVisibility(!!value)
                        }
                      >
                        {column.id}
                      </DropdownMenuCheckboxItem>
                    );
                  })}
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      )}

      {/* Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader className="bg-gray-100">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody className="">
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  className="hover:bg-gray-50"
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="py-6">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {showPagination && (
        <div className="flex flex-col gap-4 pt-6">
          <div className="text-sm text-gray-600 font-medium">
            Showing <span className="text-gray-900">{start}</span> to{" "}
            <span className="text-gray-900">{end}</span> of{" "}
            <span className="text-gray-900">{totalRows}</span> documents
          </div>
          <div className="flex items-center justify-between">
            {showSelection && (
              <div className="text-sm text-gray-500">
                {table.getFilteredSelectedRowModel().rows.length} of{" "}
                {table.getFilteredRowModel().rows.length} row(s) selected
              </div>
            )}
            <div className="flex-1" />
            <div className="flex items-center space-x-2 justify-end">
              <Button
                variant="outline"
                size="sm"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                Previous
              </Button>
              {Array.from({ length: pageCount }, (_, i) => (
                <Button
                  key={i}
                  variant={i === pageIndex ? "default" : "outline"}
                  size="sm"
                  onClick={() => table.setPageIndex(i)}
                  className={i === pageIndex ? "font-bold" : ""}
                >
                  {i + 1}
                </Button>
              ))}
              <Button
                variant="outline"
                size="sm"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                Next
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
