import React from 'react'

const IsLoading: React.FC = () => {
    return (
        <div className="flex items-center justify-center h-screen bg-white w-full rounded-[18px] p-4">
            <div className="text-2xl font-semibold flex items-center text-lynch-400">
                Loading
                <span className="dot animate-bounce">.</span>
                <span className="dot animate-bounce delay-200">.</span>
                <span className="dot animate-bounce delay-300">.</span>
            </div>
        </div>
    )
}

export default IsLoading
