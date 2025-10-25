import { Button, Dialog, TextField } from "@mui/material";
import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import api from "../api/api";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../store/authSlice";

interface LoginDialogProps {
  open: boolean;
  handleClose: () => void;
}

type LoginFormData = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: string;
};

const LoginDialog: React.FC<LoginDialogProps> = ({ open, handleClose }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [user, setUser] = useState({});
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitted },
  } = useForm<LoginFormData>({
    mode: "onSubmit",
    shouldUnregister: true,
  });
  const [userExist, setUserExist] = useState(false);
  const onSubmit: SubmitHandler<LoginFormData> = (data: LoginFormData) => {
    console.log(data);
    api.post("/user/checkuser", data).then((res: any) => {
      if(res.data.user){
        setUserExist(true)
        setUser(res.data.user)

        if(data.password){
           api.post("/user/login", data).then((res:any)=>{
        if(res.status===200){
          console.log("Change Page")
          dispatch(login({user:res.data.user}))
          navigate("/feed")
          handleClose()
        }
      });
        }
      }
      else
      {
        setUserExist(false);
        setUser({})
        if(data.password){
           api.post("/user/signup", data).then((res:any)=>{
        if(res.status===201){
          console.log("Change Page")
          dispatch(login({user:res.data.user}))
          navigate("/feed")
          handleClose()          
        }
      });
        }
      }
    });
  };


  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{
        sx: {
          width: "1000px",
          maxWidth: "90%",
          height: "550px",
          borderRadius: "15px",
        },
      }}
    >
      <div className="grid grid-cols-2 h-full">
        <div className="bg-green-500 text-3xl font-bold text-white">
          <div className=" flex justify-center bg-red-50">
            <img src="dashboard_2.png" alt="chart" className="h-[500px]" />
          </div>
          <div className="p-1 text-center">Simple, Free Investing.</div>
        </div>
        <form
          className="flex flex-col items-center mr-4 ml-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="text-3xl font-bold mt-10 text-gray-400">
            {userExist ? "Welcome Back " + user?.firstName : "Welcome to Grow"}
          </div>

          {isSubmitted ? (
            userExist ? (
              <div>
                <TextField
                  id="email"
                  label={!user?.email?"Your Email Address":""}
                  variant="standard"
                  disabled={true}
                  value={user?.email}
                  sx={{
                    "& .MuiInputLabel-root.Mui-focused": {
                      color: "green", // label turns green on focus
                    },
                    "& .MuiInput-underline:after": {
                      borderBottomColor: "green", // remove the blue underline
                    },
                    width: "100%",
                  }}
                  {...register("email", { required: false })}
                />
                {errors.email && (
                  <span className="text-red-500 text-[12px]">
                    Email is required
                  </span>
                )}
                <TextField
                  id="password"
                  type="password"
                  label="Enter Password"
                  variant="standard"
                  sx={{
                    "& .MuiInputLabel-root.Mui-focused": {
                      color: "green", // label turns green on focus
                    },
                    "& .MuiInput-underline:after": {
                      borderBottomColor: "green", // remove the blue underline
                    },
                    width: "100%",
                  }}
                  {...register("password", {
                    required: userExist ? true : false,
                  })}
                />
                <div className="text-green-400 font-semibold relative left-45 top-10 cursor-pointer">
                  Forgot Password?
                </div>
                {errors.password && (
                  <span className="text-red-500 text-[12px]">
                    Password is required
                  </span>
                )}
              </div>
            ) : (
              <div>
                <TextField
                  id="firstName"
                  label="First Name"
                  variant="standard"
                  sx={{
                    "& .MuiInputLabel-root.Mui-focused": {
                      color: "green", // label turns green on focus
                    },
                    "& .MuiInput-underline:after": {
                      borderBottomColor: "green", // remove the blue underline
                    },
                    width: "100%",
                  }}
                  {...register("firstName", { required: true })}
                />
                <TextField
                  id="lastName"
                  label="Last Name"
                  variant="standard"
                  sx={{
                    "& .MuiInputLabel-root.Mui-focused": {
                      color: "green", // label turns green on focus
                    },
                    "& .MuiInput-underline:after": {
                      borderBottomColor: "green", // remove the blue underline
                    },
                    width: "100%",
                  }}
                  {...register("lastName", { required: true })}
                />
                <TextField
                  id="phone"
                  label="Mobile No."
                  variant="standard"
                  type="number"
                  sx={{
                    "& .MuiInputLabel-root.Mui-focused": {
                      color: "green", // label turns green on focus
                    },
                    "& .MuiInput-underline:after": {
                      borderBottomColor: "green", // remove the blue underline
                    },
                    width: "100%",
                    "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button":
                      {
                        WebkitAppearance: "none",
                        margin: 0,
                      },
                    "& input[type=number]": {
                      MozAppearance: "textfield",
                    },
                  }}
                  {...register("phone", { required: true })}
                />
                <TextField
                  id="email"
                  value={user?.email}
                  disabled={true}
                  label="Your Email Address"
                  variant="standard"
                  sx={{
                    "& .MuiInputLabel-root.Mui-focused": {
                      color: "green", // label turns green on focus
                    },
                    "& .MuiInput-underline:after": {
                      borderBottomColor: "green", // remove the blue underline
                    },
                    width: "100%",
                  }}
                  {...register("email", { required: true })}
                />
                {errors.email && (
                  <span className="text-red-500 text-[12px]">
                    Email is required
                  </span>
                )}
                <TextField
                  id="password"
                  type="password"
                  label="Enter Password"
                  variant="standard"
                  sx={{
                    "& .MuiInputLabel-root.Mui-focused": {
                      color: "green", // label turns green on focus
                    },
                    "& .MuiInput-underline:after": {
                      borderBottomColor: "green", // remove the blue underline
                    },
                    width: "100%",
                  }}
                  {...register("password", {
                    required: userExist ? true : false,
                  })}
                />
              </div>
            )
          ) : (
            <>
              <TextField
                id="email"
                label="Your Email Address"
                variant="standard"
                sx={{
                  "& .MuiInputLabel-root.Mui-focused": {
                    color: "green", // label turns green on focus
                  },
                  "& .MuiInput-underline:after": {
                    borderBottomColor: "green", // remove the blue underline
                  },
                  width: "100%",
                }}
                {...register("email", { required: true })}
              />
              {errors.email && (
                <span className="text-red-500 text-[12px]">
                  Email is required
                </span>
              )}
            </>
          )}
          <Button
            variant="contained"
            sx={{
              textTransform: "none",
              backgroundColor: "#06402B",
              marginTop: "7rem",
              width: "100%",
              ":focus": { outline: "none" },
            }}
            type="submit"
          >
            {userExist ? "Submit" : "Continue"}
          </Button>
        </form>
      </div>
    </Dialog>
  );
};
export default LoginDialog;
