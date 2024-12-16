import {FC} from "react"
import {useAuth} from "../hooks/useAuth.ts";

const Home: FC = () => {
    const isAuth = useAuth()

    return (
            isAuth ? (
                <h1 className='flex justify-center mt-10 text-xl '>Здравствуйте!<br/>
                    Теперь вы можете добавлять и прослушивать треки.</h1>
            ) : (
                <h1 className='flex justify-center mt-10 text-xl '>Войдите, чтобы увидеть больше</h1>
            )
    )

}

export default Home