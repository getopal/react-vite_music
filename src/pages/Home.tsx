import {FC} from "react"
import {useAuth} from "../hooks/useAuth.ts";
import s from "./Home.module.scss"
import { IoCloudUploadOutline } from "react-icons/io5";
import { FaRegArrowAltCircleDown, FaRegPlayCircle } from "react-icons/fa";
import { AiOutlineSafetyCertificate } from "react-icons/ai";

const Home: FC = () => {
    const isAuth = useAuth()

    return (
            isAuth ? (
                <h1 className='flex justify-center mt-10 text-xl'>Здравствуйте!<br/>
                    Теперь вы можете добавлять и прослушивать треки.</h1>
            ) : (
                <div className={s.wrapper}>
                    <h1 className={s.h1text}>Загружайте и слушайте музыку
                    без рекламы</h1>
                    <div className={s.itemsWrapper}>
                        <div className={s.items2}>
                            <IoCloudUploadOutline className={s.icons}/>
                            <p>Загружайте</p>
                        </div>
                        <div>
                            <FaRegPlayCircle className={s.icons}/>
                            <p>Слушайте</p>
                        </div>
                        <div>
                            <FaRegArrowAltCircleDown className={s.icons}/>
                            <p>Скачивайте</p>
                        </div>
                    </div>
                    <div className={s.safeBlock}>
                        <p className={s.textBlaock}>Быстрый <br/>и безопасный вход</p>
                        <AiOutlineSafetyCertificate className={s.iconsBlock} />
                    </div>
                </div>
            )
    )
}

export default Home