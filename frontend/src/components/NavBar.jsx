
import { Link ,useNavigate} from 'react-router-dom'
import { PlusIcon,LogOut  } from 'lucide-react'
import api from '../lib/axios.js'
import toast from 'react-hot-toast'

const NavBar = () => {
    const navigate = useNavigate();
    const handleLogout = async () =>{
    try {
        const res = await api.post("auth/logout");
       navigate("/", { replace: true });
        toast.success("Logout successfull")
    } catch (error) {
        toast.error("unable to logout");
    }
    };
    
  return (
//    <header className="bg-base-300 border-b border-base-content/10">
   <header className=" bg-base-300 border-b border-base-content/10">
    <div className="mx-auto max-w-7xl p-4" >
        <div className="flex items-center justify-between">

            <h1 className="text-3xl font-bold text-primary font-mono tracking-tighter ">my project </h1>
            <div className="flex items-center gap-4 justify-between">
                <Link to={"/create"}    className="btn btn-primary">
                <PlusIcon className="size-5"/>
                <span>New Note</span>
                </Link>

                 <Link onClick={handleLogout}   className="btn btn-error">
                <LogOut className="size-5"/>
                <span>Logout</span>
                </Link>

            </div>
           
        </div>
    </div>
   </header>
  )
}

export default NavBar