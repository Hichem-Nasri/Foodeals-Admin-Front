import React from 'react'

const IsLoading: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-white w-full rounded-[18px] p-4">
            <div className="text-2xl font-normal flex items-center text-lynch-400">
                Chargement
                <span className="dot animate-bounce">.</span>
                <span className="dot animate-bounce delay-200">.</span>
                <span className="dot animate-bounce delay-300">.</span>
            </div>
        </div>
    )
}

export default IsLoading
