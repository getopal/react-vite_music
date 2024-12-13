import {FC} from "react"
import img from '../assets/img.png'
import {Link} from "react-router-dom";

const ErrorPage: FC = () => {
    return (
        <div className="min-h-screen bg-slate-900 font-roboto flex justify-center items-center flex-col text-white">
            <img src={img} alt="img"/>
            <Link to={'/'} className='bg-sky-500 rounded px-6 py-3 hover:bg-sky-600 mt-2'>
                Назад
            </Link>
        </div>
    )
}

export default ErrorPage