import { FC } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface AvatarAndName {
	avatar?: string
	name: string
}

export const AvatarAndName: FC<AvatarAndName> = ({ avatar, name }) => {
	return (
		<div className="flex gap-3 items-center">
			{avatar && (
				<Avatar>
					<AvatarImage src={avatar} />
					<AvatarFallback>{name[0].toUpperCase()}</AvatarFallback>
				</Avatar>
			)}
			<span className="line-clamp-1 text-input">{name}</span>
		</div>
	)
}
