import {RouterProvider} from "react-router-dom";
import {router} from "./router/router.tsx";
import {useAppDispatch} from "./store/hooks.ts";
import {useEffect} from "react";
import {getTokenFromLocalStorage} from "./helpers/localstorage.helper.ts";
import {AuthService} from "./services/auth.service.ts";
import {login, logout} from "./store/userSlice.ts";


function App() {
  const dispatch = useAppDispatch();

  const checkAuth = async () => {
    const token = getTokenFromLocalStorage()
    try {
      if (token) {
        const data = await AuthService.getMe()

        if (data) {
          dispatch(login(data))
        } else {
          dispatch(logout())
        }
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    checkAuth()
  }, [])


  return <RouterProvider router={router}/>
}

export default App
