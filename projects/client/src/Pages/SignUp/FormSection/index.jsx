import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { API_URL } from "../../../helper";
import { Link } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useState } from "react";

const FormSection = () => {
  const [eyeOpen, setEyeOpen] = useState(false);
  const [eyeOpen2, setEyeOpen2] = useState(false);
  const [isSubmitting, setisSubmitting] = useState(false);

  const eyeStyle = {
    close: {
      top: "50%",
      cursor: "pointer",
    },
    open: {
      top: "45%",
      cursor: "pointer",
    },
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      confirmpassword: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required(),
      email: Yup.string().required().email("Invalid email format"),
      phone: Yup.string()
        .required("phone number is a required field")
        .matches(
          /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/g,
          "Invalid phone number"
        ),
      password: Yup.string()
        .required()
        .min(8, "Should more than 8 characters")
        .matches(/[a-z]/g, "Should contain at least 1 lower case letter")
        .matches(/[A-Z]/g, "Should contain at least 1 upper case letter")
        .matches(/[0-9]/g, "Should contain at least 1 number"),
      confirmpassword: Yup.string()
        .required("confirm password is a required field")
        .oneOf([Yup.ref("password")], "Password doesn't match"),
    }),
    onSubmit: async (values) => {
      try {
        setisSubmitting(true);
        const result = await axios.post(`${API_URL}/user/sign-up`, values);
        setisSubmitting(false);
        alert(result.data.message);
        formik.resetForm();
      } catch (error) {
        console.log(error);
        alert(error.response.data.message);
      }
    },
  });

  return (
    <div className="flex flex-col items-center">
      <div className="text-[#82CD47] font-[600] text-2xl">Sign Up</div>
      <div className="w-full mt-2">
        <form
          onSubmit={formik.handleSubmit}
          className="flex flex-col items-center"
        >
          <div className="w-9/12">
            <label
              htmlFor="name"
              className="text-[20px] opacity-50 place-self-start"
            >
              Name
            </label>
            <input
              className="block border-[#82CD47] border rounded-md w-full h-[35px] px-[16px] "
              id="name"
              name="name"
              type="text"
              {...formik.getFieldProps("name")}
              placeholder="Username"
            />
            {formik.touched.name && formik.errors.name && (
              <div className="text-red-600 text-xs">{formik.errors.name}</div>
            )}
          </div>
          <div className="w-9/12">
            <label htmlFor="email" className="text-[20px] opacity-50 mt-2">
              Email
            </label>
            <input
              className="block border-[#82CD47] border rounded-md w-full h-[35px] px-[16px]"
              id="email"
              name="email"
              type="email"
              {...formik.getFieldProps("email")}
              placeholder="youremail@email.com"
            />
            {formik.touched.email && formik.errors.email && (
              <div className="text-red-600 text-xs">{formik.errors.email}</div>
            )}
          </div>
          <div className="w-9/12">
            <label htmlFor="phone" className="text-[20px] opacity-50 mt-2">
              Phone Number
            </label>
            <input
              className="block border-[#82CD47] border rounded-md w-full h-[35px] px-[16px]"
              id="phone"
              name="phone"
              type="text"
              {...formik.getFieldProps("phone")}
              placeholder="e.g. 081234567890 or +6281234567890"
            />
            {formik.touched.phone && formik.errors.phone && (
              <div className="text-red-600 text-xs">{formik.errors.phone}</div>
            )}
          </div>
          <div className="w-9/12 relative">
            <label htmlFor="password" className="text-[20px] opacity-50 mt-2">
              Password
            </label>
            <input
              className="block border-[#82CD47] border rounded-md w-full h-[35px] px-[16px]"
              id="password"
              name="password"
              type={eyeOpen ? "text" : "password"}
              {...formik.getFieldProps("password")}
              placeholder="▪️▪️▪️▪️▪️▪️▪️▪️▪️▪️▪️▪️"
            />
            {eyeOpen ? (
              <AiOutlineEye
                className="absolute right-3"
                fontSize={25}
                color="gray"
                style={formik.errors.password ? eyeStyle.open : eyeStyle.close}
                onClick={() => setEyeOpen(!eyeOpen)}
              />
            ) : (
              <AiOutlineEyeInvisible
                className="absolute right-3"
                fontSize={25}
                color="gray"
                style={formik.errors.password ? eyeStyle.open : eyeStyle.close}
                onClick={() => setEyeOpen(!eyeOpen)}
              />
            )}
            {formik.touched.password && formik.errors.password && (
              <div className="text-red-600 text-xs">
                {formik.errors.password}
              </div>
            )}
          </div>
          <div className="w-9/12 relative">
            <label
              htmlFor="confirmpassword"
              className="text-[20px] opacity-50 mt-2"
            >
              Confirm Password
            </label>
            <input
              className="block border-[#82CD47] border rounded-md w-full h-[35px] px-[16px]"
              id="confirmpassword"
              name="confirmpassword"
              type={eyeOpen2 ? "text" : "password"}
              {...formik.getFieldProps("confirmpassword")}
              placeholder="▪️▪️▪️▪️▪️▪️▪️▪️▪️▪️▪️▪️"
            />
            {eyeOpen2 ? (
              <AiOutlineEye
                className="absolute right-3"
                fontSize={25}
                color="gray"
                style={
                  formik.errors.confirmpassword ? eyeStyle.open : eyeStyle.close
                }
                onClick={() => setEyeOpen2(!eyeOpen2)}
              />
            ) : (
              <AiOutlineEyeInvisible
                className="absolute right-3"
                fontSize={25}
                color="gray"
                style={
                  formik.errors.confirmpassword ? eyeStyle.open : eyeStyle.close
                }
                onClick={() => setEyeOpen2(!eyeOpen2)}
              />
            )}
            {formik.touched.confirmpassword &&
              formik.errors.confirmpassword && (
                <div className="text-red-600 text-xs">
                  {formik.errors.confirmpassword}
                </div>
              )}
          </div>
          <button
            type="submit"
            className="rounded-full bg-[#82CD47] w-8/12 h-[38px] text-white mt-6 text-[22px] font-[600] leading-6 shadow-md"
            disabled={isSubmitting}
          >
            Sign Up
          </button>
        </form>
        <div className="text-center mt-2">
          Already have an account ?{" "}
          <Link>
            <span className="text-[#689C36]">Sign in</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FormSection;
