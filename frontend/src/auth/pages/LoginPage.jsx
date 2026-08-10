import { useState } from "react";
import {Link,useNavigate} from "react-router-dom";
import api from "../../lib/axios.js";
import toast from "react-hot-toast";


const LoginPage = () => {

    const navigate = useNavigate();
    const [loading , setLoading] = useState(false);
    const [formdata , setFormdata] = useState(
        {
            email:"",
            password:""

        }
    )

    const handleChange = (e)=>{
        setFormdata({
            ...formdata,[e.target.name]:e.target.value,
        });

    };

    const handleSubmit = async (e)=>{
        e.preventDefault();
        try {
            const res = await api.post("/auth/login",formdata);
            toast.success("login successfull");
            navigate("/notes")
        } catch (error) {
            if(error.response){
                toast.error(error.response.data.message)
            }else{
                toast.error("internal server error");
            }
            
        }finally{
            setLoading(false);
        }

    };


  return (
       <div className="min-h-screen flex items-center justify-center  bg-base-200 px-4 ">

        <div className="card w-full max-w-md bg-base-100 shadow-2xl">
            <div className="card-body">
                <div className="text-center mb-4">
                    <h1 className="text-2xl font-bold">
                       Welcome ! back
                    </h1>
                    <p className="text-base-content/60 mt-4">
                           Login to your Notes App
                    </p>
                </div>
                <form 
                    onSubmit={handleSubmit}
                    className="space-y-4"
                >
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
                    {/* divider */}
                    <div className="divider"></div>
                    <button type="submit" className="btn btn-primary w-full mt-4">
                        {loading ?
                        (
                            <span className="loading loading-spinner loading-sm">loggin in ...</span>
                        )
                        :(
                             "Login"
                        )
                        }
                    </button>
                     
                </form>
                 {/* divider */}
                <div className="divider"></div>
                <p className="text-center text-sm">
                    Don't have account?{" "}
                    <Link to={"/"} className="link link-primary font font-semibold">Create account</Link>
                </p>
            </div>    

        </div>
       </div>
  );
}

export default LoginPage