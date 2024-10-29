import { FC } from 'react'
import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
import { Columns2, X } from 'lucide-react'
import { Switch } from '../custom/Switch'
import { cn } from '@/lib/utils'
import { DialogClose } from '@radix-ui/react-dialog'

interface ColumnVisibilityModalProps {
    table: import('@tanstack/table-core').Table<any>
    className?: string
    hiddens?: string[]
}

export const ColumnVisibilityModal: FC<ColumnVisibilityModalProps> = ({
    table,
    className,
    hiddens,
}) => {
    return (
        <Dialog>
            <DialogTrigger
                className={cn(
                    'flex items-center gap-3 rounded-[12px] border border-lynch-200 text-lynch-500 font-medium text-sm px-5 py-3 hover:text-black hover:bg-neutral-100',
                    className
                )}
            >
                Afficher
                <Columns2 />
            </DialogTrigger>
            <DialogContent className="[&>.Icon]:hidden p-5 rounded-[14px] max-w-[42.5rem] w-full gap-[1.875rem]">
                <DialogTitle className="flex justify-between items-center gap-3 text-[1.375rem] font-normal text-lynch-400">
                    Afficher les colonnes
                    <DialogClose>
                        <X />
                    </DialogClose>
                </DialogTitle>
                <div className="flex flex-wrap gap-3">
                    {table
                        .getAllColumns()
                        .map(
                            (column) =>
                                column.id !== 'id' &&
                                !hiddens?.includes(column.id) && (
                                    <Switch
                                        key={column.id}
                                        checked={column.getIsVisible()}
                                        onChange={column.getToggleVisibilityHandler()}
                                        label={
                                            column.columnDef.header?.toString() ||
                                            ''
                                        }
                                    />
                                )
                        )}
                </div>
            </DialogContent>
        </Dialog>
    )
}
