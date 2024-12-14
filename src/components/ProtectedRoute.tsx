import {FC} from "react";
import {useAuth} from "../hooks/useAuth.ts";

interface Props {
    children: JSX.Element
}

export const ProtectedRoute: FC<Props> = ({ children }) => {
    const isAuth = useAuth()
    return (
        <>
        {isAuth ? (
            children
        ): (
            <div className="flex flex-col items-center justify-center pt-14">
                <h1 className='text-2xl'>Чтобы просмотреть эту страницу вы должны войти</h1>

                <img src="" alt=""/>
        </div>
        )}
    </>
    )
}
