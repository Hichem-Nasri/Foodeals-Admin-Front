"use client"
import { Label } from "./Label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "./ui/input"
import { useState } from "react"
import { cn } from "@/lib/utils"

interface AvatarProfileProps {
	iUrl: string
	alt?: string
	label?: string
	className?: string
	disabled?: boolean
}

export const AvatarProfile: React.FC<AvatarProfileProps> = ({ alt = "", iUrl, label = "", className, disabled }) => {
	const [src, setSrc] = useState(iUrl)
	return (
		<div className="flex flex-col gap-3">
			{label.length > 0 && <Label label={label} className="text-xs font-semibold text-lynch-950 lg:inline hidden" />}
			<Avatar className={cn(`w-[7.5rem] h-[7.5rem] lg:rounded-[24px] border border-lynch-200`, className)}>
				<Input
					type="file"
					disabled={disabled}
					className="absolute w-full h-full top-0 left-0 opacity-0 cursor-pointer"
					onChange={(e) => e.currentTarget.files && setSrc(URL.createObjectURL(e.currentTarget.files[0]))}
				/>
				<AvatarImage src={src} />
				<AvatarFallback>{alt[0].toUpperCase()}</AvatarFallback>
			</Avatar>
		</div>
	)
}
