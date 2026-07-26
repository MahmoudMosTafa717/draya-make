import * as React from "react";
import { ChevronLeft, ChevronRight, ArrowUpDown } from "lucide-react";
import { t } from "@/shared/constants/tokens";
import { Button } from "./Button";
import { EmptyState } from "./EmptyState";

export interface Column<T> {
  header: string;
  accessorKey: keyof T | string;
  cell?: (item: T) => React.ReactNode;
  sortable?: boolean;
}

export interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  emptyTitle?: string;
  emptyDescription?: string;
  onRowClick?: (item: T) => void;
  pageSize?: number;
}

export function DataTable<T extends { id: string | number }>({
  columns,
  data,
  emptyTitle = "لا توجد بيانات متاحة",
  emptyDescription = "لم نجد أي سجلات حالياً.",
  onRowClick,
  pageSize = 8,
}: DataTableProps<T>) {
  const [sortKey, setSortKey] = React.useState<string | null>(null);
  const [sortOrder, setSortOrder] = React.useState<"asc" | "desc">("asc");
  const [currentPage, setCurrentPage] = React.useState(1);

  // Sorting logic
  const handleSort = (key: string) => {
    if (sortKey === key) {
      setSortOrder(prev => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  const sortedData = React.useMemo(() => {
    if (!sortKey) return data;
    return [...data].sort((a, b) => {
      const valA = (a as any)[sortKey];
      const valB = (b as any)[sortKey];
      if (valA === undefined || valB === undefined) return 0;
      
      if (typeof valA === "number" && typeof valB === "number") {
        return sortOrder === "asc" ? valA - valB : valB - valA;
      }
      
      const strA = String(valA).toLowerCase();
      const strB = String(valB).toLowerCase();
      return sortOrder === "asc" ? strA.localeCompare(strB) : strB.localeCompare(strA);
    });
  }, [data, sortKey, sortOrder]);

  // Pagination logic
  const totalPages = Math.ceil(sortedData.length / pageSize);
  const paginatedData = React.useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return sortedData.slice(start, start + pageSize);
  }, [sortedData, currentPage, pageSize]);

  if (data.length === 0) {
    return <EmptyState title={emptyTitle} description={emptyDescription} />;
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px", width: "100%" }}>
      <div
        style={{
          width: "100%",
          overflowX: "auto",
          borderRadius: "12px",
          border: `1px solid ${t.border}`,
          backgroundColor: t.bgSurface,
        }}
      >
        <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "right" }}>
          <thead>
            <tr style={{ borderBottom: `1px solid ${t.border}`, backgroundColor: t.bgSecondary }}>
              {columns.map((col, index) => (
                <th
                  key={index}
                  style={{
                    padding: "14px 18px",
                    fontSize: "0.8125rem",
                    fontWeight: 700,
                    color: t.textSecondary,
                    userSelect: "none",
                  }}
                >
                  {col.sortable ? (
                    <button
                      onClick={() => handleSort(col.accessorKey as string)}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        padding: 0,
                        fontSize: "inherit",
                        fontWeight: "inherit",
                        color: "inherit",
                        fontFamily: "inherit",
                      }}
                    >
                      {col.header}
                      <ArrowUpDown size={12} style={{ color: t.textDisabled }} />
                    </button>
                  ) : (
                    col.header
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((item) => (
              <tr
                key={item.id}
                onClick={onRowClick ? () => onRowClick(item) : undefined}
                style={{
                  borderBottom: `1px solid ${t.border}`,
                  cursor: onRowClick ? "pointer" : "default",
                  transition: "background-color 150ms",
                }}
                onMouseEnter={e => {
                  if (onRowClick) e.currentTarget.style.backgroundColor = t.bgMuted;
                }}
                onMouseLeave={e => {
                  if (onRowClick) e.currentTarget.style.backgroundColor = "transparent";
                }}
              >
                {columns.map((col, colIndex) => {
                  const content = col.cell
                    ? col.cell(item)
                    : (item as any)[col.accessorKey];

                  return (
                    <td
                      key={colIndex}
                      style={{
                        padding: "16px 18px",
                        fontSize: "0.875rem",
                        color: t.textPrimary,
                      }}
                    >
                      {content}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "4px 8px" }}>
          <span style={{ fontSize: "0.8125rem", color: t.textSecondary }}>
            الصفحة {currentPage} من {totalPages} ({data.length} عناصر إجمالاً)
          </span>
          <div style={{ display: "flex", gap: "6px" }}>
            <Button
              variant="secondary"
              size="sm"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            >
              <ChevronRight size={16} />
              السابق
            </Button>
            <Button
              variant="secondary"
              size="sm"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
            >
              التالي
              <ChevronLeft size={16} />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
