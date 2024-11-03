import { CustomButton } from '@/components/custom/CustomButton'
import { UploadFile } from '@/components/Partners/NewPartner/UploadFile'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogTitle,
} from '@/components/ui/dialog'
import {
    ColumnFiltersState,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    RowModel,
    Table,
    useReactTable,
} from '@tanstack/react-table'
import { CheckCheck, FileDown, FileSpreadsheet, X } from 'lucide-react'
import { FC, Fragment, useEffect, useState } from 'react'
import readXlsxFile from 'read-excel-file'
import {
    columnsSheetProductTable,
    SheetProductType,
} from '../column/sheetProductColumn'
import ProgressCircle from './ProgressCircle'
import { DataTable } from '@/components/DataTable'

interface SheetProductProps {
    open: boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}
export const SheetProduct: FC<SheetProductProps> = ({ open, setOpen }) => {
    const [file, setFile] = useState<File[] | null>(null)
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState<SheetProductType[]>([])
    const [completedFiles, setCompletedFiles] = useState(0)
    const [error, setError] = useState<string | null>(null)
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])

    const table = useReactTable({
        data: data,
        columns: columnsSheetProductTable,
        state: {
            columnFilters: [],
        },
        getCoreRowModel: getCoreRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    })
    const Reset = () => {
        setFile(null)
        setLoading(false)
        setData([])
        setCompletedFiles(0)
        setError(null)
        setOpen((prev) => !prev)
    }

    const handleConfirm = () => {
        console.log(data)
        setOpen((prev) => !prev)
    }

    const handleFileChange = async () => {
        if (!file) return
        console.log(file)
        setLoading(true)
        try {
            for (const f of file) {
                const rows = await readXlsxFile(f)
                const fileData: SheetProductType[] = rows
                    .map((row) => {
                        if (
                            ['nom', 'name'].includes(
                                row[0].toString().toLowerCase()
                            )
                        ) {
                            return null
                        }
                        return {
                            name: row[0].toString(),
                            codebar: row[1].toString(),
                            marque: row[2].toString(),
                            categorie: row[3].toString(),
                            sousCategorie: row[4].toString(),
                        }
                    })
                    .filter((row) => row !== null) as SheetProductType[]
                setData((prevData) => [...prevData, ...fileData])
                setCompletedFiles((prev) => prev + 1)
            }
        } catch (error) {
            setError('Erreur lors de la lecture du fichier')
        } finally {
            // setLoading(false)
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent
                className="min-w-[860px] max-w-full px-4 max-h-[calc(100vh-200px)] overflow-auto"
                showContent={false}
            >
                <DialogTitle className="text-lynch-500 flex justify-between items-center  text-wrap text-lg font-light">
                    <span>
                        Chargez un fichier Excel et visualisez un récapitulatif
                        des produits avant validation.
                    </span>
                    <button type="button" onClick={Reset}>
                        <X />
                    </button>
                </DialogTitle>

                {!loading ? (
                    <DialogDescription className="flex flex-col justify-center items-start space-y-2">
                        <h6 className="text-sm font-semibold text-lynch-950">
                            Ajouter un fichier
                        </h6>
                        <UploadFile
                            placeholder="Charger le fichier"
                            onChange={(file) => setFile(file)}
                            Icon={FileDown}
                            multiSelect
                            extensions=".xlsx, .xls"
                        />
                        {file && (
                            <div className="justify-end flex space-x-4 w-full">
                                <CustomButton
                                    label="Annuler"
                                    onClick={Reset}
                                    variant="secondary"
                                    size={'sm'}
                                    IconRight={X}
                                />
                                <CustomButton
                                    size={'sm'}
                                    label="Importer"
                                    onClick={handleFileChange}
                                    isPending={loading}
                                    IconRight={FileSpreadsheet}
                                />
                            </div>
                        )}
                    </DialogDescription>
                ) : (
                    <>
                        {file && file.length == completedFiles ? (
                            <>
                                <DataTable
                                    table={table}
                                    data={data}
                                    title=""
                                    transform={(val) => <Fragment />}
                                />
                                <div className="justify-end flex space-x-4 w-full">
                                    <CustomButton
                                        label="Annuler"
                                        onClick={Reset}
                                        variant="secondary"
                                        size={'sm'}
                                        IconRight={X}
                                    />
                                    <CustomButton
                                        size={'sm'}
                                        label="Confirmer"
                                        onClick={handleConfirm}
                                        // isPending={loading}
                                        IconRight={CheckCheck}
                                    />
                                </div>
                            </>
                        ) : (
                            <ProgressCircle
                                totalFiles={file?.length!}
                                completedFiles={completedFiles}
                            />
                        )}
                    </>
                )}
                {error && <p className="text-coral-500">{error}</p>}
            </DialogContent>
        </Dialog>
    )
}
