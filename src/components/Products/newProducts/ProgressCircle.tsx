import { useEffect, useState } from 'react'

interface Props {
    totalFiles: number
    completedFiles: number
}

const ProgressCircle = ({ totalFiles, completedFiles }: Props) => {
    const [percentage, setPercentage] = useState(0)

    // Calculate the percentage based on the completed files
    useEffect(() => {
        setPercentage(Math.round((completedFiles / totalFiles) * 100))
    }, [completedFiles, totalFiles])

    return (
        <div className="flex flex-col items-center">
            <div className="relative w-24 h-24 rounded-full">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-gray-200" />
                <div
                    className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-green-500 transition-all duration-500 ease-in-out ${
                        percentage === 100 && 'animate-spin'
                    }`}
                    style={{ transform: `rotate(${percentage * 3.6}deg)` }}
                />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-gray-900 font-bold text-xl">
                    {percentage}%
                </div>
            </div>
            <div className="mt-2 text-gray-600 text-sm">
                {completedFiles} fichiers chargés sur {totalFiles}
            </div>
            {percentage === 100 && (
                <div className="mt-2 text-green-500 font-medium">
                    Fichiers chargés avec succès
                </div>
            )}
        </div>
    )
}

export default ProgressCircle
