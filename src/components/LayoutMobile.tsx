import { ChevronLeft } from 'lucide-react'
import React from 'react'

interface Props {
    title: string
    backButton: () => void
    fixedComponent: React.ReactNode
    children: React.ReactNode
}

const LayoutMobile = ({
    title,
    backButton,
    fixedComponent,
    children,
}: Props) => {
    return (
        <div className="flex flex-col  w-full fixed bg-lynch-50 lg:bg-transparent lg:relative top-0 h-full left-0 right-0 overflow-auto gap-4">
            <div className="lg:hidden flex justify-between gap-5 items-center border-b-2 w-full border-primary p-6 bg-white">
                <button className="text-lynch-400" onClick={backButton}>
                    <ChevronLeft size={24} />
                </button>
                <h1 className="text-lynch-950">{title}</h1>
            </div>
            {fixedComponent && (
                <div className="w-full hidden lg:flex ">{fixedComponent}</div>
            )}
            {children}
            {fixedComponent && (
                <div className="flex lg:hidden  p-3 fixed bottom-0 w-full h-20">
                    <div className="w-full bg-white rounded-t-lg">
                        {fixedComponent}
                    </div>
                </div>
            )}
        </div>
    )
}

export default LayoutMobile
