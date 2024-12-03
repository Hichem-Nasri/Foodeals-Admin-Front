import React from 'react'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogTitle,
    DialogTrigger,
} from '../ui/dialog'
import { LogOut, ChevronRight } from 'lucide-react'
import { Button } from 'react-day-picker'
import { CustomButton } from '../custom/CustomButton'
import { SignOut } from '@/app/actions'

interface LogoutProps {
    children?: React.ReactNode
    className?: string
}

const Logout: React.FC<LogoutProps> = ({ children, className }) => {
    const [isLoading, setIsLoading] = React.useState(false)
    const handleLogout = async () => {
        setIsLoading(true)
        const res = await SignOut().then(() => {
            setIsLoading(false)
        })
    }
    return (
        <Dialog>
            <DialogTrigger className={className}>{children}</DialogTrigger>
            <DialogContent>
                <DialogTitle className="text-lynch-950 text-xl">
                    Confirmer déconnecter
                </DialogTitle>
                <DialogDescription className="text-lynch-500 text-base">
                    Voulez-vous vraiment vous déconnecter?
                </DialogDescription>
                <div className="flex gap-4 mt-4 w-full">
                    <DialogClose>
                        <CustomButton
                            label="Annuler"
                            size={'sm'}
                            variant="ghost"
                            onClick={() => {}}
                        />
                    </DialogClose>
                    <CustomButton
                        label="Confirmer"
                        size={'sm'}
                        className="bg-coral-500 hover:bg-coral-50 hover:text-coral-500 text-white transition-colors"
                        disabled={isLoading}
                        onClick={handleLogout}
                    />
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default Logout
