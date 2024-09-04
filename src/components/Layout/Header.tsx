import Image from "next/image"
import { SearchInput } from "./SearchInput"
import { UserMenu } from "./UserMenu"

export const Header: React.FC = () => {
	return (
		<div className="flex lg:flex-row flex-col bg-white lg:rounded-none lg:pb-0 pb-2 rounded-b-[30px]">
			<div className="flex items-center justify-between gap-11 px-4 py-2 w-full h-16">
				<Image src="/logo-foodeals.svg" alt="login Illustrator" width={191} height={32} objectFit="cover" />
				<div className="lg:inline-flex hidden mr-auto">
					<SearchInput />
				</div>
				<UserMenu />
			</div>
			<div className="inline-flex lg:hidden w-full">
				<SearchInput />
			</div>
		</div>
	)
}
