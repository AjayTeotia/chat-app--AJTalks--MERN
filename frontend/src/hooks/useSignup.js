import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

function useSignup() {
  const [loading, setLoading] = useState(false);

  const { setAuthUser } = useAuthContext();

  const signup = async ({
    fullName,
    userName,
    password,
    confirmPassword,
    gender,
  }) => {
    const success = handleInputError({
      fullName,
      userName,
      password,
      confirmPassword,
      gender,
    });

    if (!success) {
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName,
          userName,
          password,
          confirmPassword,
          gender,
        }),
      });

      const data = await res.json();

      {
        /*Error*/
      }
      if (data.error) {
        throw new Error(data.error);
      }

      localStorage.setItem("chat-user", JSON.stringify(data));

      {
        /*Context*/
      }
      setAuthUser(data);

      //console.log(data);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  return { signup, loading };
}

export default useSignup;

function handleInputError({
  fullName,
  userName,
  password,
  confirmPassword,
  gender,
}) {
  {
    /*All fields are fill or not */
  }
  if (!fullName || !userName || !password || !confirmPassword || !gender) {
    toast.error("PLEASE FILLS ALL FIELDS");
    return false;
  }

  {
    /*password and confirm password doesn't match*/
  }
  if (password !== confirmPassword) {
    toast.error("PASSWOR DOESN'T MATCH");
    return false;
  }

  {
    /*password length must be 6*/
  }
  if (password.length < 6) {
    toast.error("PASSWOR LENGTH MUST BE 6");
    return false;
  }

  return true;
}
