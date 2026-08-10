
import { useState } from "react";
import {Link,useNavigate} from "react-router-dom";
import api from "../../lib/axios.js";
import toast from "react-hot-toast";



const RegisterPage = () => {
   
    const [loading ,setLoading]  =useState(false);
    const [formdata,setFormData] = useState({
        username : "",
        email:"",
        password:"",
        c_password:""
    });
     const navigate = useNavigate();    

    const handleChange = (e)=>{
        
        setFormData({
            ...formdata,[e.target.name]:e.target.value
        });
    }

    const handleRegister = async (e)=>{
        e.preventDefault();
        try {
            const res = await api.post("auth/register",formdata);
            toast.success("register is successfull");
            navigate("/");
        } catch (error) {
            toast.error("internal server");
        }finally{
           setLoading(true);
        }

    }
  return (
    <div className="min-h-screen bg-base-200  flex items-center justify-center px-4">
        <div className="card w-full max-w-md shadow-2xl bg-base-100">
            <div className="card-body">
              <div className="text-center mb-4">
                    <h1 className="text-2xl font-bold">
                      Create account !
                    </h1>
                    <p className="text-base-content/60 mt-4">
                          Create account for Notes 
                    </p>
                </div>
                <form 
                    onSubmit={handleRegister}
                    className="space-y-4"
                >
                    <fieldset className="fieldset">
                        <label className="fieldset-label">
                            Uername
                        </label>
                        <input 
                        type="text"
                        name="username"
                        value={formdata.username}
                        onChange={handleChange}
                        placeholder="Enter username here "
                        className="input input-bordered w-full"
                        autoComplete="current username"
                        />
                    </fieldset>
                    <fieldset className="fieldset">
                        <label className="fieldset-label">
                            Email
                        </label>
                        <input 
                        type="email"
                        name="email"
                        value={formdata.email}
                        onChange={handleChange}
                        placeholder="xyz@gmail.com"
                        className="input input-bordered w-full"
                        autoComplete="email"
                        />

                       

                    </fieldset>
                    <fieldset className="fieldset">
                         <label className="fieldset-label">
                            Password
                        </label>
                        <input 
                        type="password"
                        name="password"
                        value={formdata.password}
                        onChange={handleChange}
                        placeholder="Enter your password !"
                        className="input input-bordered w-full"
                        autoComplete="current-password"
                        />

                    </fieldset>
                    <fieldset className="fieldset">
                         <label className="fieldset-label">
                           Confirm Password
                        </label>
                        <input 
                        type="password"
                        name="c_password"
                        value={formdata.c_password}
                        onChange={handleChange}
                        placeholder="Enter your password again !"
                        className="input input-bordered w-full"
                       
                        />

                    </fieldset>
                    {/* divider */}
                    <div className="divider"></div>
                    <button type="submit" className="btn btn-primary w-full mt-4">
                        {loading ?
                        (
                            <span className="loading loading-spinner loading-sm">Registering in ...</span>
                        )
                        :(
                             "Register"
                        )
                        }
                    </button>
                     
                </form>
                <div className="divider"></div>
                <p className="text-center text-sm">
                    Do u alredy have account !{""}
                     <Link to={"/"} className="link link-primary font font-semibold">Login</Link>
                </p>

            </div>
        </div>
    </div>
  )
}

export default RegisterPage