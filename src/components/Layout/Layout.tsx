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
    console.log('formTitle----', formTitle)
    return (
        <QueryProvider>
            <NotificationProvider>
                <App formTitle={formTitle}>{children}</App>
            </NotificationProvider>
        </QueryProvider>
    )
}

export const App: React.FC<LayoutProps> = ({ children, formTitle }) => {
    return (
        <div className="flex flex-col gap-2 bg-lynch-50 max-w-[100vw] min-h-screen overflow-x-hidden">
            <Header formTitle={formTitle} />
            <div className={`flex gap-2 h-full w-full relative overflow-auto`}>
                <Navigation />
                {children}
            </div>
            <Footer />
        </div>
    )
}
