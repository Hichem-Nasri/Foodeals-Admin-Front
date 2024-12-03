import React from 'react'
import { Button } from '../ui/button'
import { Archive, ArrowLeft } from 'lucide-react'

interface ArchiveButtonProps {
    archive: boolean
    isLoading: boolean
    handleArchive: () => void
}

const ArchiveButton: React.FC<ArchiveButtonProps> = ({
    isLoading,
    archive,
    handleArchive,
}) => {
    return (
        <Button
            size="sm"
            className="text-lynch-500 rounded-full bg-white hover:bg-transparent hover:text-black w-14 h-14"
            onClick={handleArchive}
            disabled={isLoading}
        >
            {archive ? <ArrowLeft size={26} /> : <Archive size={26} />}
        </Button>
    )
}

export default ArchiveButton
