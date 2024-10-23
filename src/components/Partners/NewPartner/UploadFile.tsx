import { Input } from '@/components/custom/Input'
import { CloudUpload, FileMinus, X } from 'lucide-react'
import { FC, useState, useEffect } from 'react'

interface UploadFileProps {
    value?: File[]
    onChange?: (files: File[]) => void
    disabled?: boolean
    placeholder?: string
}

export const UploadFile: FC<UploadFileProps> = ({
    disabled,
    onChange,
    value = [],
    placeholder = 'Charger le contrat',
}) => {
    const [files, setFiles] = useState<File[]>(value)

    useEffect(() => {
        if (onChange) {
            onChange(files)
        }
    }, [files, onChange])

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFiles = e.target.files
        if (selectedFiles && selectedFiles.length > 0) {
            const newFile = selectedFiles[0]
            setFiles((prev) => [...prev, newFile])
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
                className="disabled:opacity-50 disabled:cursor-not-allowed"
                name="file"
                disabled={disabled}
                onChange={() => {}}
                value={files.length ? files[0].name : ''}
                IconRight={CloudUpload}
                placeholder={files.length > 0 ? '' : placeholder}
            />
            <input
                type="file"
                className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer text-opacity-0 disabled:cursor-not-allowed"
                onChange={handleFileChange}
                disabled={disabled}
            />
            <div className="flex gap-3 items-center absolute top-1/2 -translate-y-1/2 left-4">
                {files &&
                    files.map((file) => (
                        <span
                            className="flex items-center gap-3 py-[0.4rem] px-3 bg-lynch-200 text-lynch-500 rounded-[100px] z-20"
                            key={file.name}
                        >
                            <FileMinus size={14} />
                            {file.name.split('.')[0]}
                            <X
                                className="cursor-pointer"
                                size={14}
                                onClick={() => handleRemoveFile(file)}
                            />
                        </span>
                    ))}
            </div>
        </div>
    )
}
