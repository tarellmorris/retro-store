"use client";

import { Pagination as HeroPagination } from "@heroui/react";
import { useRouter } from "next/navigation";

export interface PaginationProps {
  queryString: string;
  total: number;
}

export const Pagination = ({ queryString, total }: PaginationProps) => {
  const router = useRouter();
  const params = new URLSearchParams(queryString);
  const currentPage = Number(params.get("page"));
  const handleChange = (pageNumber: number) => {
    params.set("page", String(pageNumber - 1));
    router.push(`/games?${params.toString()}`);
  };
  return (
    <HeroPagination
      initialPage={currentPage + 1}
      onChange={handleChange}
      showShadow={true}
      total={total}
    />
  );
};
