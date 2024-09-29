"use client"

import { FC, useState } from "react"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import {
  ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { RotateCw, Store } from "lucide-react"
import { useRouter } from "next/navigation"
import { columnsSiegesTable, SiegesType } from "@/types/association"
import { CustomButton } from "@/components/custom/CustomButton"
import { DataTable } from "@/components/DataTable"
import { FiltersAssociation } from "../FiltersAssociation"
import { SiegeCard } from "./SiegeCard"

interface SiegesProps {
  sieges: SiegesType[]
}

export interface TableRowType {
  key: string
  label: string
}

export const Sieges: FC<SiegesProps> = ({ sieges }) => {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const router = useRouter()
  const schema = z.object({
    startDate: z.date().optional(),
    endDate: z.date().optional(),
    company: z
      .array(
        z.object({
          label: z.string().optional(),
          key: z.string().optional(),
          avatar: z.string().optional(),
        })
      )
      .optional(),
    collaborators: z
      .array(
        z.object({
          label: z.string().optional(),
          key: z.string().optional(),
          avatar: z.string().optional(),
        })
      )
      .optional(),
    email: z.string().optional(),
    phone: z.string().optional(),
    city: z.string().optional(),
    companyType: z.string().optional(),
    solution: z.array(z.enum(["MARKET_PRO", "DLC_PRO", "DONATE_PRO"])).optional(),
  })
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    mode: "onBlur",
    defaultValues: {
      startDate: undefined,
      endDate: undefined,
      company: [],
      collaborators: [],
      email: "",
      phone: "",
      city: "",
      companyType: "",
      solution: [],
    },
  })

  const [data, _setData] = useState(() => [...sieges])

  const table = useReactTable({
    data,
    columns: columnsSiegesTable(router),
    getCoreRowModel: getCoreRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  })

  return (
    <div className="flex flex-col gap-[0.625rem] w-full px-3 lg:mb-0 mb-4">
      <FiltersAssociation table={table} form={form} data={sieges} />
      <DataTable
        data={data}
        table={table}
        title="Liste des sièges"
        transform={(value) => <SiegeCard sieges={value} />}
      />
      <div className="lg:hidden flex flex-col items-center gap-4 ">
        <CustomButton
          size="sm"
          label="Voir plus"
          className="text-sm font-semibold rounded-full border-lynch-400 text-lynch-400 py-[0.375rem] px-5"
          variant="outline"
          IconRight={RotateCw}
        />
        <CustomButton label="Ajouter un partenaire" className="w-full" IconRight={Store} />
      </div>
    </div>
  )
}
