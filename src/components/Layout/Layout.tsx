import { Footer } from "./Footer"
import { Header } from "./Header"
import { Navigation } from "./Navigation"

interface LayoutProps {
	children?: JSX.Element | JSX.Element[]
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
	return (
		<div className="flex flex-col gap-2 bg-lynch-50 h-full">
			<Header />
			<div className="flex gap-2 h-full px-2">
				<Navigation />
				{children}
			</div>
			<Footer />
		</div>
	)
}
