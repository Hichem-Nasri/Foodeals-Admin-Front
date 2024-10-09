import Image from 'next/image'
import { Label } from '../ui/label'

export const Footer: React.FC = () => {
    return (
        <div className="lg:flex hidden items-center justify-between bg-lynch-50 w-full h-full px-6 py-[0.625rem]">
            <div className="flex items-center gap-[0.625rem] text-lynch-700">
                <Image
                    src="/symbole-foodeals.svg"
                    alt="logo"
                    width={32}
                    height={32}
                />
                <Label>Foodeals pro @ 2024</Label>
            </div>
            <div className="text-lynch-700">
                <Label>
                    <span className="underline underline-offset-1 cursor-pointer hover:scale-90 transition-all hover:underline-offset-2">
                        Conditions générales
                    </span>{' '}
                    &{' '}
                    <span className="underline underline-offset-1 cursor-pointer hover:scale-90 transition-all hover:underline-offset-2">
                        Politique de confidentialité
                    </span>
                </Label>
            </div>
        </div>
    )
}
