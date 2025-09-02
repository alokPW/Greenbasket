import React, { useEffect, useState } from 'react';
import { assets } from "../assets/greencart_assets/greencart_assets/assets";
import { useAppContext } from '../context/AppContext';
import toast from 'react-hot-toast';

function AddAddress() {
  const {axios,user,navigate}=useAppContext();
  const [address, setAddress] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    phone: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddress((prev) => ({
      ...prev,
      [name]: value,
    }));
    console.log(address)
  };

  const onSubmitHandler = async (e) => {
     e.preventDefault();
    try{
      const {data}=await axios.post('/api/address/add',{address, userId: user._id,});
      if(data.success){
        toast.success(data.message)
        navigate('/cart');
      }
      else{
        toast.error(data.message);
      }
    }
    catch(error){
        toast.error(data.message);
    }
  };

useEffect(() => {
  if (!user) {
    toast.error("Please login to continue");
    navigate('/login');
  }
}, [user, navigate]);


  return (
    <div className="mt-16 pb-16 px-4 md:px-20">
      <p className="text-2xl md:text-3xl text-gray-600 mb-8">
        Add Shipping <span className="font-semibold text-primary">Address</span>
      </p>

      <div className="flex flex-col-reverse md:flex-row justify-between items-center gap-10">
        {/* Form Section */}
        <form className="w-full md:w-1/2 space-y-4" onSubmit={onSubmitHandler}>
          <div className="flex gap-4">
            <input
              type="text"
              name="firstName"
              value={address.firstName}
              onChange={handleChange}
              placeholder="First Name"
              className="w-1/2 border border-gray-300 px-4 py-2 rounded"
            />
            <input
              type="text"
              name="lastName"
              value={address.lastName}
              onChange={handleChange}
              placeholder="Last Name"
              className="w-1/2 border border-gray-300 px-4 py-2 rounded"
            />
          </div>
          <input
            type="email"
            name="email"
            value={address.email}
            onChange={handleChange}
            placeholder="Email address"
            className="w-full border border-gray-300 px-4 py-2 rounded"
          />
          <input
            type="text"
            name="street"
            value={address.street}
            onChange={handleChange}
            placeholder="Street"
            className="w-full border border-gray-300 px-4 py-2 rounded"
          />
          <div className="flex gap-4">
            <input
              type="text"
              name="city"
              value={address.city}
              onChange={handleChange}
              placeholder="City"
              className="w-1/2 border border-gray-300 px-4 py-2 rounded"
            />
            <input
              type="text"
              name="state"
              value={address.state}
              onChange={handleChange}
              placeholder="State"
              className="w-1/2 border border-gray-300 px-4 py-2 rounded"
            />
          </div>
          <div className="flex gap-4">
            <input
              type="text"
              name="zipcode"
              value={address.zipcode}
              onChange={handleChange}
              placeholder="Zip code"
              className="w-1/2 border border-gray-300 px-4 py-2 rounded"
            />
            <input
              type="text"
              name="country"
              value={address.country}
              onChange={handleChange}
              placeholder="Country"
              className="w-1/2 border border-gray-300 px-4 py-2 rounded"
            />
          </div>
          <input
            type="text"
            name="phone"
            value={address.phone}
            onChange={handleChange}
            placeholder="Phone"
            className="w-full border border-gray-300 px-4 py-2 rounded"
          />
          <button
            type="submit"
            className="w-full bg-primary text-white py-2 rounded hover:bg-green-600 transition"
          >
            SAVE ADDRESS
          </button>
        </form>

        {/* Image Section */}
        <div className="w-full md:w-1/2 flex justify-center">
          <img src={assets.add_address_iamge} alt="Add Address Illustration" className="max-w-md w-full" />
        </div>
      </div>
    </div>
  );
}

export default AddAddress;
