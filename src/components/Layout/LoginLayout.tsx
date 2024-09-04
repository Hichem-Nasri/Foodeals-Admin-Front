import Image from "next/image"

interface LoginLayoutProps {
	children?: JSX.Element | JSX.Element[]
}

export const LoginLayout: React.FC<LoginLayoutProps> = ({ children }) => {
	return (
		<main className="grid grid-cols-2 w-full h-screen min-h-[43.75rem]">
			<div
				className="flex justify-center items-center h-full bg-repeat bg-center"
				style={{
					backgroundImage: "url(/pattern/login.svg)",
					backgroundSize: "cover",
				}}>
				{children}
			</div>
			<div className="flex justify-center items-center bg-primary rounded-l-[48px]">
				<div className="w-[38.75rem] h-[25.625rem]">
					<Image src="/login-illustrator.svg" alt="login Illustrator" width={700} height={500} objectFit="cover" />
				</div>
			</div>
		</main>
	)
}
