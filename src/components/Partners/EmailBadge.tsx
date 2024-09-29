import { FC } from "react"
import Link from "next/link"
import { Mail } from "lucide-react"

export const EmailBadge: FC<{ email: string }> = ({ email }) => {
	return (
		<Link
			href={`mailto:${email}`}
			className="flex items-center gap-1 text-sm font-medium text-lynch-400 py-[0.625rem] px-3 rounded-full border border-lynch-400 hover:border-amethyst-500 hover:text-amethyst-500 cursor-pointer w-fit">
			<Mail size={18} />
			{email}
		</Link>
	)
}
