import { Link } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const FormSection = () => {
  const [eyeOpen, setEyeOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const login = () => {
    axios
      .post("http://localhost:8000/user/login", {
        email,
        password,
      })
      .then(function (_) {
        navigate("/");
      })
      .catch(function (error) {
        toast.error(error.response.data.message);
      });
  };
  return (
    <div className="flex flex-col items-center">
      <div className="text-[#82CD47] font-[600] text-2xl">Sign In</div>
      <div className="w-full mt-2">
        <form className="flex flex-col items-center">
          <div className="w-9/12">
            {/* EMAIL */}
            <div>
              <label
                htmlFor="email"
                className="text-[20px] opacity-50 place-self-start"
              >
                Email
              </label>

              <input
                className="block border-[#82CD47] border rounded-md w-full h-[35px] px-[16px] "
                id="email"
                name="email"
                type="text"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* PASSWORD */}
            <div className="relative">
              <label
                htmlFor="password"
                className="text-[20px] opacity-50 place-self-start"
              >
                Password
              </label>
              <input
                className="block border-[#82CD47] border rounded-md w-full h-[35px] px-[16px] "
                id="password"
                name="password"
                type={eyeOpen ? "text" : "password"}
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {eyeOpen ? (
                <AiOutlineEye
                  className="absolute right-3 bottom-1"
                  fontSize={25}
                  color="gray"
                  onClick={() => setEyeOpen(!eyeOpen)}
                />
              ) : (
                <AiOutlineEyeInvisible
                  className="absolute right-3 bottom-1"
                  fontSize={25}
                  color="gray"
                  onClick={() => setEyeOpen(!eyeOpen)}
                />
              )}
            </div>
          </div>
        </form>
        <div className="text-right mr-12">
          <Link>
            <span className="text-xs text-lime-500 ">Forgot Password?</span>
          </Link>
        </div>
        <div className="flex flex-col items-center">
          <button
            type="submit"
            className="rounded-full bg-[#82CD47] w-8/12 h-[38px] text-white mt-6 text-[22px] font-[600] leading-6 shadow-md"
            onClick={login}
          >
            Sign In
          </button>
        </div>
        <div className="text-center mt-2">
          Don't have an account?{" "}
          <Link>
            <span className="text-[#689C36]">Sign up</span>
          </Link>
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default FormSection;
