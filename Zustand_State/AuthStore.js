import { create } from "zustand";
import { axiosInstance } from "../AxiosInstance/axios_instance";
import toast from "react-hot-toast";

const useAuthStore = create((set) => (
    {
        // authUser: {
        //     name: "John Doe",
        //     email: "123@gmail.com",
        //     picture: "https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250"
        // },
        authUser: null,
        isCheaking: false,

        checkAuth: async () => {
            try {
                const res = await axiosInstance.get('/api/auth/check')
                set({ authUser: res.data });
            } catch (error) {
                console.log("Error in checkAuth:", error);
                set({ authUser: null });
            } finally {
                set({ isCheckingAuth: false });
            }
        },

        signup: async (data) => {
            try {
                // const res = await axiosInstance.post("/auth/signup", data);
                // set({ authUser: res.data });
                set({ authUser: data });
                toast.success("Account created successfully");
            } catch (error) {
                toast.error(error.response.data.message);
            } 
        },

        logout: async () => {
            try {
                // await axiosInstance.post("/auth/logout");
                set({ authUser: null });
                toast.success("Logged out successfully");
            } catch (error) {
                toast.error(error.response.data.message);
            }
        },

    }));

export default useAuthStore;