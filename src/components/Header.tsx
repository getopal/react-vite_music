import {FC} from 'react'
import {Link, NavLink, useNavigate} from "react-router-dom"
import {RiMusicAiFill} from 'react-icons/ri'
import {FaSignOutAlt } from "react-icons/fa"
import { CiSquarePlus } from "react-icons/ci"
import '../index.css'
import {useAuth} from "../hooks/useAuth.ts";
import {useAppDispatch} from "../store/hooks.ts";
import {logout} from "../store/userSlice.ts";
import {removeTokenFromLocalStorage} from "../helpers/localstorage.helper.ts";
import {toast} from "react-toastify";


const Header: FC = () => {
    const isAuth = useAuth()
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const  logoutHandler = () => {
        dispatch(logout())
        removeTokenFromLocalStorage('token')
        toast.success('Вы вышли')
        navigate('/')
    }

    return (
        <header className='flex justify-between items-center bg-slate-800 p-4 backdrop-blur-sm shadow-sm '>
            <Link to='/'>
                <RiMusicAiFill size={30} color='white' href='/'></RiMusicAiFill>
            </Link>

            {isAuth && (
                    <nav className="ml-auto mr-10">
                        <ul className="flex items-center gap-5  ">
                            <li>
                                <NavLink
                                    to={'/'}
                                    className={({isActive}) =>
                                        isActive ? 'text-white' : 'text-white/50'
                                    }
                                >
                                    Главная
                                </NavLink>
                            </li>
                            <li >
                                <NavLink
                                    to={'addtrack'}
                                    className={({isActive}) =>
                                        isActive ? 'text-white flex items-center gap-1' : 'text-white/50 flex items-center gap-1'
                                    }
                                >
                                    <CiSquarePlus size={20} color='white' />
                                    <p>Добавить</p>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to={'tracks'}
                                    className={({isActive}) =>
                                        isActive ? 'text-white' : 'text-white/50'
                                    }
                                >
                                    Моя музыка
                                </NavLink>
                            </li>

                        </ul>
                    </nav>
            )}
            {
                isAuth ? (
                    <button className="btn btn-red" onClick={logoutHandler}>
                        <span>Выйти</span>
                        <FaSignOutAlt/>
                    </button>
                ) : (
                    <Link to={'auth'} className='py-2 text-white/50 hover:text-white'>
                        Вход / Регистрация
                    </Link>
                )
            }
        </header>
    )
}
export default Header
