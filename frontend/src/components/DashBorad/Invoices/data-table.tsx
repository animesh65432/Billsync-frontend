import { useState, Dispatch, SetStateAction, useEffect } from "react";
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    useReactTable,
    getPaginationRowModel,
    getFilteredRowModel,
    getFacetedRowModel,
    getFacetedUniqueValues,
    FilterFn,
} from "@tanstack/react-table";
import { Input } from "@/components/ui/input"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useStore } from "@/store";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[],
    globalFilter: string,
    setGlobalFilter: Dispatch<SetStateAction<string>>;
    title?: string;
}

const fuzzyFilter: FilterFn<any> = (row, columnId, value) => {
    const itemValue = String(row.getValue(columnId)).toLowerCase();
    const searchValue = String(value).toLowerCase();
    return itemValue.includes(searchValue);
};

export default function InvoicesDataTable<TData, TValue>({
    columns,
    data,
    globalFilter,
    setGlobalFilter,
    // title = "Invoices"
}: DataTableProps<TData, TValue>) {
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 4,
    });
    const { color } = useStore();
    const isDarkMode = color;
    const [windowWidth, setWindowWidth] = useState<number>(
        typeof window !== 'undefined' ? window.innerWidth : 1024
    );

    // Track window size for responsive adjustments
    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Adjust columns visibility based on screen size
    const getVisibleColumns = () => {
        if (windowWidth < 640) { // Mobile
            return columns.filter((col: any) => !col.meta?.hideMobile);
        } else if (windowWidth < 768) { // Small tablet
            return columns.filter((col: any) => !col.meta?.hideSmall);
        }
        return columns; // Desktop & larger tablets
    };

    const table = useReactTable({
        data,
        columns: getVisibleColumns(),
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getFacetedRowModel: getFacetedRowModel(),
        getFacetedUniqueValues: getFacetedUniqueValues(),
        state: {
            pagination,
            globalFilter,
        },
        onPaginationChange: setPagination,
        globalFilterFn: fuzzyFilter,
        onGlobalFilterChange: setGlobalFilter,
        manualPagination: false,
    });

    // Dynamic classes based on theme
    const containerClasses = "space-y-4";
    const tableBorderClasses = `rounded-md border ${isDarkMode ? "border-slate-700" : "border-slate-200"} overflow-hidden`;
    const headerBgClasses = `${isDarkMode ? "bg-slate-800" : "bg-slate-50"}`;
    const headerTextClasses = `font-medium ${isDarkMode ? "text-slate-200" : "text-slate-700"} px-2 sm:px-4 py-3 text-left`;
    const rowHoverClasses = `hover:${isDarkMode ? "bg-slate-700/50" : "bg-slate-50"} transition-colors`;
    const rowBorderClasses = `border-b ${isDarkMode ? "border-slate-700" : "border-slate-100"} last:border-none`;
    const cellClasses = `px-2 sm:px-4 py-2 sm:py-3 ${isDarkMode ? "text-slate-300" : "text-slate-700"} truncate`;
    const noResultsClasses = `text-${isDarkMode ? "slate-400" : "slate-500"}`;
    const paginationTextClasses = `text-sm ${isDarkMode ? "text-slate-400" : "text-slate-500"}`;
    const buttonVariant = isDarkMode ? "secondary" : "outline";

    return (
        <div className={containerClasses}>
            <div className="mt-20  md:w-[50vw] sm:hidden block">
                <Input
                    placeholder="Search all Invoices ..."
                    value={globalFilter ?? ""}
                    onChange={(event) => setGlobalFilter(event.target.value)}
                    className="max-w-sm"
                />

            </div>
            <div className="w-full overflow-auto">
                <div className={tableBorderClasses}>
                    <Table>
                        <TableHeader className={headerBgClasses}>
                            {table.getHeaderGroups().map((headerGroup) => (
                                <TableRow key={headerGroup.id} className={rowBorderClasses}>
                                    {headerGroup.headers.map((header) => (
                                        <TableHead
                                            key={header.id}
                                            className={headerTextClasses}
                                        >
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    ))}
                                </TableRow>
                            ))}
                        </TableHeader>
                        <TableBody className={isDarkMode ? "bg-slate-900" : "bg-white"}>
                            {table.getRowModel().rows?.length ? (
                                table.getRowModel().rows.map((row) => (
                                    <TableRow
                                        key={row.id}
                                        data-state={row.getIsSelected() && "selected"}
                                        className={`${rowHoverClasses} ${rowBorderClasses}`}
                                    >
                                        {row.getVisibleCells().map((cell) => (
                                            <TableCell key={cell.id} className={cellClasses}>
                                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow className={isDarkMode ? "bg-slate-900" : "bg-white"}>
                                    <TableCell
                                        colSpan={table.getAllColumns().length}
                                        className="h-24 text-center"
                                    >
                                        <div className="flex flex-col items-center justify-center space-y-1">
                                            <p className={`text-sm font-medium ${noResultsClasses}`}>No results found</p>
                                            {globalFilter && (
                                                <p className={`text-xs ${noResultsClasses}`}>
                                                    Try adjusting your search query
                                                </p>
                                            )}
                                        </div>
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
            </div>

            {/* Responsive Pagination */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-2 py-2">
                <div className={`${paginationTextClasses} text-center sm:text-left`}>
                    {windowWidth > 640 ? (
                        <>Showing page {table.getState().pagination.pageIndex + 1} of {table.getPageCount() || 1}</>
                    ) : (
                        <>Page {table.getState().pagination.pageIndex + 1}/{table.getPageCount() || 1}</>
                    )}
                </div>
                <div className="flex items-center space-x-1 sm:space-x-2">
                    <Button
                        variant={buttonVariant}
                        size="sm"
                        onClick={() => setPagination((prev) => ({ ...prev, pageIndex: 0 }))}
                        disabled={!table.getCanPreviousPage()}
                        className="w-8 sm:w-auto p-0 sm:px-3"
                    >
                        <ChevronsLeft className="h-4 w-4" />
                        <span className="hidden sm:inline ml-1">First</span>
                    </Button>
                    <Button
                        variant={buttonVariant}
                        size="sm"
                        onClick={() => setPagination((prev) => ({ ...prev, pageIndex: prev.pageIndex - 1 }))}
                        disabled={!table.getCanPreviousPage()}
                        className="w-8 sm:w-auto p-0 sm:px-3"
                    >
                        <ChevronLeft className="h-4 w-4" />
                        <span className="hidden sm:inline ml-1">Prev</span>
                    </Button>
                    <div className={`text-xs sm:text-sm px-1 sm:px-2 ${isDarkMode ? "text-slate-300" : "text-slate-700"}`}>
                        {table.getState().pagination.pageIndex + 1}
                    </div>
                    <Button
                        variant={buttonVariant}
                        size="sm"
                        onClick={() => setPagination((prev) => ({ ...prev, pageIndex: prev.pageIndex + 1 }))}
                        disabled={!table.getCanNextPage()}
                        className="w-8 sm:w-auto p-0 sm:px-3"
                    >
                        <span className="hidden sm:inline mr-1">Next</span>
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                    <Button
                        variant={buttonVariant}
                        size="sm"
                        onClick={() => setPagination((prev) => ({ ...prev, pageIndex: table.getPageCount() - 1 }))}
                        disabled={!table.getCanNextPage()}
                        className="w-8 sm:w-auto p-0 sm:px-3"
                    >
                        <span className="hidden sm:inline mr-1">Last</span>
                        <ChevronsRight className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        </div>
    );
}