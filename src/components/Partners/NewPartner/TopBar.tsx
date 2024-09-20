import { FC, ForwardRefExoticComponent, RefAttributes } from "react"
import { LucideProps } from "lucide-react"
import { CustomButton } from "@/components/custom/CustomButton"
import { PartnerStatus } from "../PartnerStatus"
import { PartnerStatusType } from "@/types/partners"

interface TopBarProps {
	primaryButtonLabel: string
	secondaryButtonLabel: string
	primaryButtonAction?: () => void
	secondaryButtonAction?: () => void
	primaryButtonIcon?: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>
	secondaryButtonIcon?: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>
	primaryButtonDisabled?: boolean
	secondaryButtonDisabled?: boolean
}

export const TopBar: FC<TopBarProps> = ({
	primaryButtonAction,
	primaryButtonIcon,
	primaryButtonLabel,
	secondaryButtonAction,
	secondaryButtonIcon,
	secondaryButtonLabel,
	primaryButtonDisabled,
	secondaryButtonDisabled,
}) => {
	return (
		<div className="flex justify-between w-full rounded-[18px] lg:bg-white">
			<div className="lg:flex items-center hidden gap-3 p-[1.125rem]">
				<PartnerStatus status={PartnerStatusType.DRAFT} />
			</div>
			<div className="lg:flex grid grid-cols-2 lg:relative fixed left-0 bottom-0 lg:w-fit w-full gap-3 lg:p-2 p-3 rounded-t-[24px] lg:bg-transparent bg-white">
				<CustomButton
					onClick={secondaryButtonAction}
					disabled={secondaryButtonDisabled}
					size="sm"
					className="bg-white text-primary border-[1.5px] border-primary hover:bg-primary/40"
					label={secondaryButtonLabel}
					IconRight={secondaryButtonIcon}
				/>
				<CustomButton
					disabled={primaryButtonDisabled}
					onClick={primaryButtonAction}
					size="sm"
					label={primaryButtonLabel}
					IconRight={primaryButtonIcon}
				/>
			</div>
		</div>
	)
}
