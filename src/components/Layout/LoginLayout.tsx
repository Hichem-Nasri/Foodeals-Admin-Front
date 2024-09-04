"use client"
import Lottie from "react-lottie"
import animationData from "@/lotties/loginAnimation.json"

interface LoginLayoutProps {
	children?: JSX.Element | JSX.Element[]
}

export const LoginLayout: React.FC<LoginLayoutProps> = ({ children }) => {
	const defaultOptions = {
		loop: true,
		autoplay: true,
		clickToPause: false,
		animationData: animationData,
		rendererSettings: {
			preserveAspectRatio: "xMidYMid slice",
		},
	}
	return (
		<main className="grid grid-cols-1 lg:grid-cols-2 w-full h-screen min-h-[43.75rem]">
			<div
				className="flex justify-center items-center h-full bg-repeat bg-center p-4"
				style={{
					backgroundImage: "url(/pattern/login.svg)",
					backgroundSize: "cover",
				}}>
				{children}
			</div>
			<div className="lg:flex hidden justify-center items-center bg-primary rounded-l-[48px] p-4">
				<div className="w-[38.75rem] h-[25.625rem]">
					<Lottie options={defaultOptions} width='100%' />
				</div>
			</div>
		</main>
	)
}
