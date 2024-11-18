import React from 'react'

export const MyError = ({ message }: { message: string }) => {
    return (
        <div className="grid place-content-center w-full min-h-full	 text-coral-500 text-2xl underline underline-offset-1">
            Error: {message}
        </div>
    )
}
