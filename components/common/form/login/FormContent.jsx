"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import useAuth from "@/utils/useAuth";
import { useSearchParams } from "next/navigation";

const FormContent = () => {
  const router = useRouter();
  const { login } = useAuth();

  // Get the redirect URL from search params
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirect") || "/";

  const [adminData, setAdminData] = useState({
    email: "",
    password: "",
    rememberMe: false
  });


  const handleChange = (e) => {

    setAdminData({
      ...adminData,
      [e.target.name]: e.target.type === "checkbox" ? e.target.checked : e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    login(process.env.NEXT_PUBLIC_TOKEN, adminData.rememberMe)
    router.push(redirectUrl)
  };

  return (
    <div className="form-inner">
      <h3>Login to Admin Dashboard</h3>

      {/* <!--Login Form--> */}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="email"
            required
            value={adminData.email}
            onChange={handleChange}
          />
        </div>
        {/* email */}

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            value={adminData.password}
            onChange={handleChange}
          />
        </div>
        {/* password */}

        <div className="form-group">
          <div className="field-outer">
            <div className="input-group checkboxes square">
              <input type="checkbox" name="rememberMe" id="rememberMe" checked={adminData.rememberMe} onChange={handleChange} />
              <label htmlFor="rememberMe" className="remember">
                <span className="custom-checkbox"></span> Remember me
              </label>
            </div>
            <a href="#" className="pwd">
              Forgot password?
            </a>
          </div>
        </div>
        {/* forgot password */}

        <div className="form-group">
          <button
            className="theme-btn btn-style-one"
            type="submit"
            name="log-in"
            data-bs-dismiss={false && "modal"}
          >
            Log In
            {false && (
              <span
                className="spinner-border spinner-border-sm mx-2"
                role="status"
                aria-live="polite"
              ></span>
            )}
          </button>
        </div>
        {/* login */}
      </form>
      {/* End form */}

      {/* <div className="bottom-box">
        <div className="text">
          Don&apos;t have an account?{" "}
          <Link
            href="#"
            className="call-modal signup"
            data-bs-toggle="modal"
            data-bs-target="#registerModal"
          >
            Signup
          </Link>
        </div>
        

        <div className="divider">
          <span>or</span>
        </div>

        <LoginWithSocial />
      </div> */}
      {/* End bottom-box LoginWithSocial */}
    </div>
  );
};

export default FormContent;
