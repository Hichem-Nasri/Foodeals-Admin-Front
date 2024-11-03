import { Input } from '@/components/custom/Input'
import { CloudUpload, FileMinus, LucideProps, X } from 'lucide-react'
import { FC, ForwardRefExoticComponent, RefAttributes, useState } from 'react'

interface UploadFileProps {
    value?: File[]
    onChange?: (files: File[]) => void
    disabled?: boolean
    placeholder?: string
    multiSelect?: boolean
    Icon?: ForwardRefExoticComponent<
        Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>
    >
    extensions?: string
}

export const UploadFile: FC<UploadFileProps> = ({
    disabled,
    onChange,
    value = [],
    placeholder = 'Charger le contrat',
    multiSelect = false,
    Icon = FileMinus,
    extensions = '',
}) => {
    const [files, setFiles] = useState<File[]>(value || [])

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFiles = e.target.files
        if (selectedFiles && selectedFiles.length > 0) {
            const newFile = selectedFiles[0]
            // Remove the file if it already exists in the 'files' state
            const updatedFiles = files.filter(
                (file) => file.name !== newFile.name
            )
            onChange && onChange([...updatedFiles, newFile])
            setFiles([...updatedFiles, newFile])
        }
    }

    const handleRemoveFile = (fileToRemove: File) => {
        setFiles((prev) => {
            const updatedFiles = prev.filter(
                (file) => file.name !== fileToRemove.name
            )
            if (onChange) {
                onChange(updatedFiles) // Notify parent of the updated file list
            }
            return updatedFiles
        })
    }

    return (
        <div className="flex relative w-full">
            <Input
                className="disabled:opacity-50 disabled:cursor-not-allowed text-opacity-0 "
                name="file"
                disabled={disabled}
                onChange={() => {}}
                value={''}
                IconRight={CloudUpload}
                placeholder={files.length > 0 ? '' : placeholder}
                label=""
            />
            <input
                type="file"
                className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer text-opacity-0 disabled:cursor-not-allowed"
                onChange={handleFileChange}
                disabled={disabled}
                multiple={multiSelect} // Enable multi-select
                accept={extensions}
            />
            <div className="flex gap-3 items-center absolute top-1/2 -translate-y-1/2 left-4">
                {files &&
                    files.map((file) => (
                        <span
                            className="flex items-center  py-[0.4rem] px-1 bg-lynch-200 text-lynch-500 rounded-[100px] z-20 font-semibold justify-between w-full"
                            key={file.name}
                        >
                            <div className="space-x-1.5 flex items-center px-3 justify-center">
                                <Icon className="font-semibold size-4" />
                                <span>{file.name}</span>
                            </div>
                            <X
                                className="cursor-pointer font-semibold size-5"
                                // size={14}
                                onClick={() => handleRemoveFile(file)}
                            />
                        </span>
                    ))}
            </div>
        </div>
    )
}
