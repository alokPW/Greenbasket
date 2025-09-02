import  { useEffect, useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';


function SellerLogin() {
    const { isSeller, setIsSeller, navigate,axios } = useAppContext();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const onSubmitHandler = async (event) => {
       try{
             event.preventDefault();
             const {data}=await axios.post('/api/seller/login',{email,password})
             if(data.success){
                setIsSeller(true)
                navigate('/seller')
             }
             else{
                toast.error(data.message)
             }
        }
       catch(error){
            toast.error(data.message)
       }
        
    };

    useEffect(() => {
        if (isSeller) {
            navigate("/seller");
        }
    }, [isSeller]);

    return !isSeller && (
        <form onSubmit={onSubmitHandler} className='min-h-screen flex items-center justify-center bg-gray-50 px-4'>
            <div className='flex flex-col gap-5 bg-white items-start p-8 py-10 w-full max-w-md rounded-lg shadow-xl border border-gray-200'>
                <p className='text-2xl font-semibold text-center w-full'>
                    <span className='text-primary'>Seller</span> Login
                </p>

                <div className='w-full'>
                    <p className='mb-1'>Email</p>
                    <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder='Enter your Email'
                        type="email"
                        className='border border-gray-300 rounded w-full p-2 mt-1 outline-primary focus:outline-none focus:ring-2 focus:ring-primary'
                        required
                    />
                </div>

                <div className='w-full'>
                    <p className='mb-1'>Password</p>
                    <input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder='Enter your Password'
                        type="password"
                        className='border border-gray-300 rounded w-full p-2 mt-1 outline-primary focus:outline-none focus:ring-2 focus:ring-primary'
                        required
                    />
                </div>

                <button
                    type="submit"
                    className='bg-primary hover:bg-primary-dark text-white w-full py-2 rounded-md transition duration-200'
                >
                    Login
                </button>
            </div>
        </form>
    );
}

export default SellerLogin;
