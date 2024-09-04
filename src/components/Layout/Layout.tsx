import { Header } from "./Header"

interface LayoutProps {
	children?: JSX.Element | JSX.Element[]
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
	return (
		<div className="">
			<Header />
			{children}
		</div>
	)
}
