import { NotificationProvider } from '@/context/NotifContext'
import { Footer } from './Footer'
import { Header } from './Header'
import { Navigation } from './Navigation'
import QueryProvider from './QueryProvider'

interface LayoutProps {
    children?: JSX.Element | JSX.Element[]
    formTitle?: string
}

export const Layout: React.FC<LayoutProps> = ({ children, formTitle }) => {
    return (
        <QueryProvider>
            <NotificationProvider>
                <div className="flex flex-col gap-2 bg-lynch-50 max-w-[100vw] min-h-screen overflow-x-hidden">
                    <Header formTitle={formTitle} />
                    <div className="flex gap-2 h-full w-full px-2 relative overflow-auto">
                        <Navigation />
                        {children}
                    </div>
                    <Footer />
                </div>
            </NotificationProvider>
        </QueryProvider>
    )
}
