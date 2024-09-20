import { Footer } from "./Footer"
import { Header } from "./Header"
import { Navigation } from "./Navigation"

interface LayoutProps {
	children?: JSX.Element | JSX.Element[]
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
	return (
		<div className="flex flex-col gap-2 bg-lynch-50 max-w-[100vw] min-h-screen overflow-x-hidden">
			<Header />
			<div className="flex gap-2 h-full w-full px-2 relative overflow-auto">
				<Navigation />
				{children}
			</div>
			<Footer />
		</div>
	)
}
