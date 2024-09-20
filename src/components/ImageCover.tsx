"use client"
import { Label } from "./Label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "./ui/input"
import { useState } from "react"

interface ImageCoverProps {
	src: string
	alt?: string
}

export const ImageCover: React.FC<ImageCoverProps> = ({ alt = "" }) => {
	const [src, setSrc] = useState("https://via.placeholder.com/740x223")
	return (
		<div className="flex flex-col gap-3">
			<Label label="Image du logo" />
			<Avatar className="w-[740px] h-[223px] rounded-[24px] border border-lynch-200">
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
