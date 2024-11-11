// components/ScanButton.tsx

import React from 'react'

interface ScanButtonProps {
    onClick: () => void
}

const ScanButton: React.FC<ScanButtonProps> = ({ onClick }) => {
    return (
        <button
            onClick={onClick}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
            Scan Product
        </button>
    )
}

export default ScanButton
