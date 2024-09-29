import { LoginLayout } from "@/components/Layout/LoginLayout"
import { Login } from "@/components/Login/Index"

interface LoginPageProps {}

export default async function LoginPage({}: LoginPageProps) {
	return (
		<LoginLayout>
			<Login />
		</LoginLayout>
	)
}
