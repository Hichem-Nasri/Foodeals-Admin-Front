"use client"
import { Label } from "./Label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "./ui/input"
import { useState } from "react"
import { cn } from "@/lib/utils"

interface AvatarProfileProps {
	iUrl: string
	alt?: string
	width?: string
	height?: string
	label?: string
}

export const AvatarProfile: React.FC<AvatarProfileProps> = ({ alt = "", iUrl, width, height, label = "" }) => {
	const [src, setSrc] = useState(iUrl)
	return (
		<div className="flex flex-col gap-3 w-full">
			<Label label={label} className="text-xs font-semibold text-lynch-950" />
			<Avatar
				className={cn(
					`w-[120px] h-[120px] rounded-[24px] border border-lynch-200`,
					width ? `w-[${width}px]` : "",
					height ? `h-[${height}px]` : ""
				)}>
				<Input
					type="file"
					className="absolute w-full h-full top-0 left-0 opacity-0 cursor-pointer"
					onChange={(e) => e.currentTarget.files && setSrc(URL.createObjectURL(e.currentTarget.files[0]))}
				/>
				<AvatarImage src={src} />
				<AvatarFallback>{alt[0].toUpperCase()}</AvatarFallback>
			</Avatar>
		</div>
	)
}
