import { FaFacebookF, FaGoogle, FaGithub } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { useContext } from 'react';
import { AuthContext } from './Provider.jsx/AuthContext';
import Swal from 'sweetalert2';
import axios from 'axios';

const Register = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const { createUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const onSubmit = (data) => {
    createUser(data.email, data.password)
      .then((result) => {
        const newUser = {
          name: data.name,
          email: data.email,
          role: 'user',
          createdAt: new Date()
        };
        axios.post('http://localhost:5000/user', newUser)
          .then(() => {
            reset();
            Swal.fire({
              title: "Register Done",
              color: "#716add",
              background: "#fff url(/images/trees.png)",
              backdrop: `
                rgba(0,0,123,0.4)
                url("/images/nyan-cat.gif")
                left top
                no-repeat
              `
            });
            navigate('/');
          })
          .catch(() => {
            Swal.fire('Error', 'Failed to save user data', 'error');
          });
      })
      .catch(() => {
        Swal.fire('Error', 'Something went wrong during registration', 'error');
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f1f60]">
      <div className="bg-[#0e1c4b]  p-8 rounded-2xl shadow-lg w-full max-w-md text-white">
        <h2 className="text-2xl font-bold text-center mb-6">
          SmartFit <span className="ml-1">🏋️‍♂️</span>
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label className="block mb-1 text-sm">Name</label>
            <input
              type="text"
              {...register("name", { required: "Name is required" })}
              className="w-full px-4 py-2 rounded-md bg-[#2c2c54] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
              placeholder="Your Name"
            />
            {errors.name && <p className="text-pink-400 text-sm mt-1">{errors.name.message}</p>}
          </div>

          <div>
            <label className="block mb-1 text-sm">Email</label>
            <input
              type="email"
              {...register("email", { required: "Email is required" })}
              className="w-full px-4 py-2 rounded-md bg-[#2c2c54] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
              placeholder="you@example.com"
            />
            {errors.email && <p className="text-pink-400 text-sm mt-1">{errors.email.message}</p>}
          </div>

          <div>
            <label className="block mb-1 text-sm">Password</label>
            <input
              type="password"
              {...register("password", { required: "Password is required" })}
              className="w-full px-4 py-2 rounded-md bg-[#2c2c54] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
              placeholder="••••••••"
            />
            {errors.password && <p className="text-pink-400 text-sm mt-1">{errors.password.message}</p>}
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-gradient-to-r from-pink-400 to-pink-600 hover:from-pink-500 hover:to-pink-700 transition-all text-white rounded-md font-semibold"
          >
            Register
          </button>

          <div className="divider text-gray-400 text-sm">Or sign up with</div>
          <div className="flex justify-center space-x-4">
            <button className="btn btn-circle bg-pink-500 text-white hover:bg-gray-800">
              <FaFacebookF />
            </button>
            <button className="btn btn-circle bg-pink-500 text-white hover:bg-gray-800">
              <FaGoogle />
            </button>
            <button className="btn btn-circle bg-pink-500 text-white hover:bg-gray-800">
              <FaGithub />
            </button>
          </div>
        </form>
        <p className="text-center text-sm mt-6 text-gray-400">
          Already have an account?
          <Link to="/login" className="underline ml-1 text-pink-400 hover:text-pink-300">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
