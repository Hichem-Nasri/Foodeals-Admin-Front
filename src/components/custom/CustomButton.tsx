import { Button } from '@/components/ui/button'
import { Loader, LucideProps } from 'lucide-react'
import { ForwardRefExoticComponent, RefAttributes } from 'react'

interface CustomButtonProps {
    label: string
    IconLeft?: ForwardRefExoticComponent<
        Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>
    >
    IconRight?: ForwardRefExoticComponent<
        Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>
    >
    onClick?: () => void
    disabled?: boolean
    className?: string
    size?: 'default' | 'sm' | 'lg' | 'icon' | null | undefined
    type?: 'button' | 'submit' | 'reset'
    variant?:
        | 'default'
        | 'destructive'
        | 'outline'
        | 'secondary'
        | 'ghost'
        | 'link'
    title?: string
    isPending?: boolean
}

export const CustomButton: React.FC<CustomButtonProps> = ({
    label,
    IconLeft,
    IconRight,
    isPending,
    ...rest
}): JSX.Element => {
    return (
        <Button {...rest}>
            {IconLeft && <IconLeft className=" mr-2 icon shrink-0" />}
            {isPending ? (
                <div>
                    <Loader className="mr-2 icon shrink-0 animate-spin" />
                </div>
            ) : (
                <>{label}</>
            )}
            {IconRight && <IconRight className=" ml-2 icon shrink-0" />}
        </Button>
    )
}
