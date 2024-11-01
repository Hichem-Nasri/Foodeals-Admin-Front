import {
    ArrowLeft,
    SaveIcon,
    CheckCircle,
    ChevronLeft,
    Pencil,
} from 'lucide-react'

import React, { FC, useContext } from 'react'
import { CustomButton } from '../custom/CustomButton'
import { useRouter } from 'next/navigation'
import { Button } from '../ui/button'
import { useMediaQuery } from 'react-responsive'
import { set } from 'date-fns'

interface TopBarProps {
    onSubmit: any
    setEdit: React.Dispatch<React.SetStateAction<boolean>>
    edit?: boolean
}

const TopBar: FC<TopBarProps> = ({ onSubmit, edit, setEdit }) => {
    const router = useRouter()
    const Mobile = useMediaQuery({ query: '(max-width: 1024px)' })
    return (
        <>
            <div className="hidden lg:flex justify-between p-2 bg-white w-full rounded-[18px]">
                <CustomButton
                    label="Retour"
                    IconLeft={ArrowLeft}
                    variant="outline"
                    onClick={router.back}
                    size="sm"
                />
                {!edit ? (
                    <CustomButton
                        label="Modifier"
                        size={'sm'}
                        IconRight={Pencil}
                        onClick={() => setEdit((prev) => !prev)}
                    />
                ) : (
                    <div
                        className={`flex justify-center items-center space-x-2`}
                    >
                        <CustomButton
                            label="Enregistrer"
                            variant="outline"
                            size="sm"
                            IconRight={SaveIcon}
                            onClick={onSubmit}
                        />
                        <CustomButton
                            label="Confirmer"
                            size="sm"
                            IconRight={CheckCircle}
                            disabled
                        />
                    </div>
                )}
            </div>
            <div className="lg:hidden flex justify-between gap-5 items-center border-b-2 w-full border-primary p-6 bg-white">
                <button
                    className="text-lynch-400"
                    onClick={() => router.back()}
                >
                    <ChevronLeft size={20} />
                </button>
                <h1 className="text-lynch-950">Ajouter un produit</h1>
            </div>
        </>
    )
}

export default TopBar
