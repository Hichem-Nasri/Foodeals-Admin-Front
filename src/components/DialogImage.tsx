'use client'
import React, { FC, useEffect } from 'react'
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from './ui/dialog'
import { CloudUpload, Download, X } from 'lucide-react'
import { Button } from 'react-day-picker'
import { UploadFile } from './Partners/NewPartner/UploadFile'
import { CustomButton } from './custom/CustomButton'
import { set } from 'date-fns'

interface DialogImageProps {
    files: File[]
    onChange: (files: File[]) => void
}

export const fileTypeMapping: { [key: string]: string } = {
    jpg: 'image',
    jpeg: 'image',
    png: 'image',
    gif: 'image',
    pdf: 'pdf',
    xls: 'excel',
    xlsx: 'excel',
    doc: 'word',
    docx: 'word',
    ppt: 'powerpoint',
    pptx: 'powerpoint',
    txt: 'Text',
    // Add more mappings as needed
}

const DialogImage: FC<DialogImageProps> = ({ files, onChange }) => {
    const [open, setOpen] = React.useState(false)
    const [selectedFiles, setSelectedFiles] = React.useState<File[]>(files)
    const [selectedFile, setSelectedFile] = React.useState<File | null>(null)

    const handleFileClick = (file: string) => {
        // Logic to open the file in a new tab
        window.open(file, '_blank')
    }

    const handleDownload = (file: string) => {
        // Logic to download the file
        const link = document.createElement('a')
        link.href = file
        link.download = file.split('/').pop() || 'download'
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
    }
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFiles = e.target.files
        if (selectedFiles && selectedFiles.length > 0) {
            const newFilesArray = Array.from(selectedFiles)
            const updatedFiles = files.filter(
                (file: File) =>
                    !newFilesArray.some((newFile) => newFile.name === file.name)
            )
            const combinedFiles = [...updatedFiles, ...newFilesArray]
            setSelectedFiles(combinedFiles)
            onChange(combinedFiles)
        }
    }

    useEffect(() => {
        console.log('selectedFile: ', selectedFiles.length)
    }, [selectedFiles])

    const renderContent = (file: File) => {
        if (!file) return null
        console.log('file: ', file.name)
        const fileExtension = file.name.split('.').pop()?.toLowerCase()
        const isImage = ['jpg', 'jpeg', 'png', 'gif'].includes(
            fileExtension || ''
        )

        return (
            <div className="flex flex-col items-center">
                <div className="flex flex-col items-center my-4 relative">
                    {isImage ? (
                        <img
                            src={URL.createObjectURL(file)} // Use createObjectURL to display the image
                            alt={`Uploaded ${file.name}`}
                            className="size-64 cursor-pointer border-2 aspect-square object-cover border-lynch-50 rounded-full"
                            onClick={() =>
                                handleFileClick(URL.createObjectURL(file))
                            }
                        />
                    ) : (
                        <div className="flex flex-col items-center">
                            <img
                                src={`/icons/${
                                    fileTypeMapping[fileExtension as string]
                                }.png`} // Replace with your file type icons
                                alt={`${fileExtension} Document`}
                                className="w-20 h-20 cursor-pointer"
                                onClick={() =>
                                    handleFileClick(URL.createObjectURL(file))
                                }
                            />
                            <span className="mt-2 text-center">
                                {file.name}
                            </span>
                        </div>
                    )}
                    <CustomButton
                        label=""
                        type="button"
                        size={'sm'}
                        variant="outline"
                        onClick={() =>
                            handleDownload(URL.createObjectURL(file))
                        }
                        className={`[&>.icon]:m-0 rounded-full ${
                            isImage && 'absolute bottom-4 right-4 bg-white'
                        }`}
                        IconLeft={Download}
                    />
                </div>
            </div>
        )
    }

    const handleFileSelection = (files: File[]) => {
        setSelectedFiles(files)
        if (files.length > 0) {
            setSelectedFile(files[0]) // Set the first selected file to display
        }
    }
    console.log('open: ', open)
    return (
        <Dialog open={open} onOpenChange={(open) => !open && setOpen(false)}>
            <DialogTrigger className="w-full">
                <div className="hidden lg:flex">
                    <UploadFile
                        value={selectedFiles}
                        onChange={handleFileSelection} // Update to handle file selection
                        setOpen={setOpen}
                        setSelectedFile={setSelectedFile}
                    />
                </div>
                <div className="lg:hidden flex justify-center p-4 rounded-[14px] bg-lynch-50 relative min-h-fit">
                    <input
                        type="file"
                        className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer text-opacity-0 disabled:cursor-not-allowed"
                        onChange={handleFileChange}
                        disabled={false}
                        multiple={true} // Enable multi-select
                    />
                    {selectedFiles.length > 0 ? (
                        <div className="flex flex-wrap justify-center items-center gap-2 h-full">
                            {selectedFiles.map((file, index) => {
                                const fileExtension = file.name.split('.').pop()
                                const isImage = [
                                    'jpg',
                                    'jpeg',
                                    'png',
                                    'gif',
                                ].includes(fileExtension?.toLowerCase() || '')

                                return (
                                    <div
                                        key={index}
                                        className="flex flex-col items-center gap-2 justify-between h-1/2"
                                    >
                                        <div className="flex justify-center items-center h-36 w-36  relative">
                                            {isImage ? (
                                                <button
                                                    className="flex items-center justify-center m-auto w-36 h-36"
                                                    type="button"
                                                    title="Open Image"
                                                    onClick={() => {
                                                        setSelectedFile(file)
                                                        setOpen(true)
                                                    }}
                                                >
                                                    <img
                                                        src={URL.createObjectURL(
                                                            file
                                                        )}
                                                        alt={`Uploaded ${file.name}`}
                                                        className="w-full aspect-square object-cover rounded-full"
                                                    />
                                                </button>
                                            ) : (
                                                <button
                                                    className="flex items-center justify-center m-auto w-36 h-36"
                                                    type="button"
                                                    title="Open File"
                                                    onClick={() =>
                                                        handleFileClick(
                                                            URL.createObjectURL(
                                                                file
                                                            )
                                                        )
                                                    }
                                                >
                                                    <img
                                                        src={`/icons/${
                                                            fileTypeMapping[
                                                                fileExtension as string
                                                            ]
                                                        }.png`}
                                                        alt={`${fileExtension} Document`}
                                                        className="size-20 cursor-pointer "
                                                        width={64}
                                                    />
                                                </button>
                                            )}
                                            <button
                                                className="absolute right-1 top-1 bg-white rounded-full text-lynch-400 z-40"
                                                type="button"
                                                title="remove Image"
                                                onClick={() => {
                                                    const updatedFiles =
                                                        selectedFiles.filter(
                                                            (f) =>
                                                                f.name !==
                                                                file.name
                                                        )
                                                    setSelectedFiles(
                                                        updatedFiles
                                                    )
                                                    if (
                                                        updatedFiles.length > 0
                                                    ) {
                                                        setSelectedFile(
                                                            updatedFiles[0]
                                                        )
                                                    } else {
                                                        setSelectedFile(null)
                                                    }
                                                }}
                                            >
                                                <X size={24} />
                                            </button>
                                        </div>
                                        <span className="text-sm text-lynch-400">
                                            {file.name.length > 10
                                                ? file.name.slice(0, 10) + '...'
                                                : file.name}
                                        </span>
                                    </div>
                                )
                            })}
                        </div>
                    ) : (
                        <div className="flex  justify-between items-center text-lynch-300 w-full">
                            <h4>Selectionner les pieces</h4>
                            <CloudUpload size={24} />
                        </div>
                    )}
                </div>
            </DialogTrigger>
            <DialogContent>{renderContent(selectedFile!)}</DialogContent>
        </Dialog>
    )
}

export default DialogImage
