import { FC, useState } from 'react'
import * as React from "react";
import {AuthService} from "../services/auth.service.ts";
import {toast} from "react-toastify";
import {setTokenToLocalStorage} from "../helpers/localstorage.helper.ts";
import {useDispatch} from "react-redux";
import {useAppDispatch} from "../store/hooks.ts";
import {login} from "../store/userSlice.ts";
import {useNavigate} from "react-router-dom";

const Auth: FC = () => {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [isLogin, setIsLogin] = useState<boolean>(false)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const loginHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        try {
            e.preventDefault();
            const data = await AuthService.login({email, password})

            if(data) {
                setTokenToLocalStorage('token', data.token)
                dispatch(login(data))
                toast.success('Вы успешно вошли')
                navigate('/')
            }
        } catch (err: any) {
            const error = err.response?.data.error
            toast.error(error.toString())
        }
    }

    const registrationHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        try {
            e.preventDefault()
            const data = await AuthService.registration({email, password})
            if(data) {
                toast.success('Аккаунт успешно создан')
                setIsLogin(!isLogin)
            }
        } catch (err: any) {
            const error = err.response?.data.message
            toast.error(error.toString())
        }
    }

    return (
        <div className="mt-40 flex flex-col items-center justify-center bg-slate-900 text-white">
            <h1 className="mb-10 text-center text-xl">
                {isLogin ? 'Вход' : 'Регистрация'}
            </h1>

            <form
                onSubmit={isLogin ? loginHandler : registrationHandler}
            className="mx-auto flex w-1/3 flex-col gap-5">
                <input
                    type="text"
                    className="input"
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input type="password"
                       className="input"
                       placeholder="Пароль"
                       onChange={(e) => setPassword(e.target.value)}
                />

                <button className="btn btn-green mx-auto" >{isLogin ? 'Войти' : 'Зарегестрироваться'}</button>
            </form>

            <div className='flex justify-center mt-5'>
                {
                    isLogin ? (
                        <button
                            onClick={() => setIsLogin(!isLogin)}
                            className='text-slate-300 hover:text-white'
                        >
                            Нет аккаунта?
                        </button>
                    ) : (
                        <button
                            onClick={() => setIsLogin(!isLogin)}
                            className='text-slate-300 hover:text-white'
                        >
                            Уже есть аккаунт?
                        </button>
                    )
                }
            </div>
        </div>
    )
}

export default Auth;