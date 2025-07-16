import cls from './App.module.scss';
import { PropsWithChildren } from "react"
import { Footer } from "../Footer/Footer"
import { Header } from "../Header/Header"
import "./Index.css"
import { TranslationsContextProvider } from '@app/context/TranslationsContext/TranslationsContext';

function App({ children }: PropsWithChildren) {

    return (
        <TranslationsContextProvider>
            <div className={cls.root}>
                <Header />
                <div className={cls.body}>
                    {children}
                </div>
                <Footer />
            </div>
        </TranslationsContextProvider>
    )
}
export {
    App
}