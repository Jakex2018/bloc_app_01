import axios from "axios";
export const API_URL = "http://localhost:3000";

export const getGoogleSignup = async (accessToken) => {
  try {
    const user = await axios
      .get("https://www.googleapis.com/auth/userinfo.profile", {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .then((res) => res.data);
    if (user?.sub) {
      const data = {
        name: user.name,
        email: user.email,
        emailVerified: user.email_verified,
        image: user.picture,
      };
      const result = await axios.post(`${API_URL}/auth/google-signup`, data);
      return result?.data;
    }
  } catch (error) {
    const err = error?.response?.data || error?.message;
    console.log(error);
    return err;
  }
};
export const getGoogleSignin = async (accessToken) => {
  try {
    const user = await axios
      .get("https://www.googleapis.com/auth/userinfo.profile", {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .then((res) => res.data);
    if (user?.sub) {
      const data = {
        email: user.email,
      };
      const result = await axios.post(`${API_URL}/auth/login`, data);
      return result?.data;
    }
  } catch (error) {
    const err = error?.response?.data || error?.message;
    console.log(error);
    return err;
  }
};
export const emailSignUp = async (data) => {
  try {
    const result = await axios.post(`${API_URL}/auth/register`, data);
    return result.data;
  } catch (error) {
    const err = error?.response?.data || error?.message;
    console.log(err);
    return err;
  }
};
export const emailLogin = async (data) => {
  try {
    const result = await axios.post(`${API_URL}/auth/login`, data);
    return result.data;
  } catch (error) {
    const err = error?.response?.data || error?.message;
    console.log(err);
    return err;
  }
};


///GET https://people.googleapis.com/v1/{resourceName=people/*}
