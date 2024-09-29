import { FC } from "react"
import Link from "next/link"
import { PhoneCall } from "lucide-react"

export const PhoneBadge: FC<{ phone: string }> = ({ phone }) => {
	return (
		<Link
			href={`tel:${phone}`}
			className="flex items-center gap-1 text-sm font-medium text-lynch-400 py-[0.625rem] px-3 rounded-full border border-lynch-400 hover:border-green-500 hover:text-green-500 text-nowrap cursor-pointer">
			<PhoneCall size={18} />
			{phone}
		</Link>
	)
}
