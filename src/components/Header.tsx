import {FC} from 'react'
import {Link, NavLink} from "react-router-dom"
import {RiMusicAiFill} from 'react-icons/ri'
import {FaSignOutAlt } from "react-icons/fa"
import '../index.css'


const Header: FC = () => {
    const isAuth = true
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
                                    className={( {isActive} ) =>
                                        isActive ? 'text-white' : 'text-white/50'
                                    }
                                >
                                    Home
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to={'categories'}
                                    className={( {isActive} ) =>
                                        isActive ? 'text-white' : 'text-white/50'
                                    }
                                >
                                    Categories
                                </NavLink>
                            </li>
                        </ul>
                    </nav>
                )}
            {
                isAuth ? (
                    <button className="btn btn-red">
                        <span>Выйти</span>
                        <FaSignOutAlt />
                    </button>
                ) : (
                    <Link to={'auth'} className='py-2 text-white/50 hover:text-white'>
                        Войти / Зарегестрироваться
                    </Link>
                )
            }
        </header>
    )
}
export default Header
