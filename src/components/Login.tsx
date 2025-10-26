import { Button, Dialog, TextField } from "@mui/material";
import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import api from "../api/api";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../store/authSlice";
import "../css/Graph.css";
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

interface UserData {
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  balance: number;
  quantity: number;
  watchlist: string[];
}

const LoginDialog: React.FC<LoginDialogProps> = ({ open, handleClose }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [user, setUser] = useState<UserData>();
  const [isChecking, setIsChecking] = useState(false);
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
    setIsChecking(true);
    api.post("/user/checkuser", data).then((res: any) => {
      if (res.data.user) {
        setUserExist(true);
        setUser(res.data.user);

        if (data.password) {
          api.post("/user/login", data).then((res: any) => {
            if (res.status === 200) {
              console.log("Change Page");
              dispatch(login({ user: res.data.user }));
              navigate("/feed");
              handleClose();
            }
          });
        }
      } else {
        setUserExist(false);
        if (data.password) {
          api.post("/user/signup", data).then((res: any) => {
            if (res.status === 201) {
              console.log("Change Page");
              dispatch(login({ user: res.data.user }));
              navigate("/feed");
              handleClose();
            }
          });
        }
      }
    }).finally(() => setIsChecking(false));
  };

  const heights = ["30%", "50%", "60%", "80%", "50%", "90%", "70%", "60%"];

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
      <div className="grid grid-cols-2 overflow-hidden">
        <div className="graph-container">
          <div className="overlay-text">Simple &amp; Free Investing</div>

          <div className="graph ">
            {heights.map((h, i) => (
              <div
                key={i}
                className="bar"
                style={{ "--height": h, "--i": i + 1 } as React.CSSProperties}
              ></div>
            ))}
          </div>
        </div>
        <form
  className="flex flex-col items-center gap-6 px-6 py-8 bg-white max-w-md mx-auto"
  onSubmit={handleSubmit(onSubmit)}
>
  <div className="text-3xl font-extrabold mt-2 text-gray-700 text-center">
    {userExist ? `Welcome Back, ${user?.firstName}` : "Welcome to Invest Guru"}
  </div>

  {!isChecking && isSubmitted ? (
    userExist ? (
      <div className="flex flex-col gap-4 w-full">
        <TextField
          id="email"
          label={!user?.email ? "Your Email Address" : ""}
          variant="standard"
          disabled={true}
          value={user?.email || ""}
          sx={{
            "& .MuiInputLabel-root.Mui-focused": { color: "#16a34a" },
            "& .MuiInput-underline:after": { borderBottomColor: "#16a34a" },
            width: "100%",
          }}
          {...register("email", { required: false })}
        />
        {errors.email && <span className="text-red-500 text-sm">Email is required</span>}

        <TextField
          id="password"
          type="password"
          label="Enter Password"
          variant="standard"
          sx={{
            "& .MuiInputLabel-root.Mui-focused": { color: "#16a34a" },
            "& .MuiInput-underline:after": { borderBottomColor: "#16a34a" },
            width: "100%",
          }}
          {...register("password", { required: userExist ? true : false })}
        />
        {errors.password && <span className="text-red-500 text-sm">Password is required</span>}

        {/* <div className="text-green-600 font-medium text-right cursor-pointer hover:underline">
          Forgot Password?
        </div> */}
      </div>
    ) : (
      <div className="flex flex-col gap-4 w-full">
        <TextField
          id="firstName"
          label="First Name"
          variant="standard"
          sx={{
            "& .MuiInputLabel-root.Mui-focused": { color: "#16a34a" },
            "& .MuiInput-underline:after": { borderBottomColor: "#16a34a" },
            width: "100%",
          }}
          {...register("firstName", { required: true })}
        />
        <TextField
          id="lastName"
          label="Last Name"
          variant="standard"
          sx={{
            "& .MuiInputLabel-root.Mui-focused": { color: "#16a34a" },
            "& .MuiInput-underline:after": { borderBottomColor: "#16a34a" },
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
            "& .MuiInputLabel-root.Mui-focused": { color: "#16a34a" },
            "& .MuiInput-underline:after": { borderBottomColor: "#16a34a" },
            width: "100%",
            "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
              WebkitAppearance: "none",
              margin: 0,
            },
            "& input[type=number]": { MozAppearance: "textfield" },
          }}
          {...register("phone", { required: true })}
        />
        <TextField
          id="email"
          value={user?.email || ""}
          disabled={true}
          label="Your Email Address"
          variant="standard"
          sx={{
            "& .MuiInputLabel-root.Mui-focused": { color: "#16a34a" },
            "& .MuiInput-underline:after": { borderBottomColor: "#16a34a" },
            width: "100%",
          }}
          {...register("email", { required: true })}
        />
        {errors.email && <span className="text-red-500 text-sm">Email is required</span>}
        <TextField
          id="password"
          type="password"
          label="Enter Password"
          variant="standard"
          sx={{
            "& .MuiInputLabel-root.Mui-focused": { color: "#16a34a" },
            "& .MuiInput-underline:after": { borderBottomColor: "#16a34a" },
            width: "100%",
          }}
          {...register("password", { required: userExist ? true : false })}
        />
      </div>
    )
  ) : (
    <div className="flex flex-col gap-4 w-full">
      <TextField
        id="email"
        label="Your Email Address"
        variant="standard"
        sx={{
          "& .MuiInputLabel-root.Mui-focused": { color: "#16a34a" },
          "& .MuiInput-underline:after": { borderBottomColor: "#16a34a" },
          width: "100%",
        }}
        {...register("email", { required: true })}
      />
      {errors.email && <span className="text-red-500 text-sm">Email is required</span>}
    </div>
  )}

  <Button
    variant="contained"
    sx={{
      textTransform: "none",
      backgroundColor: "#06402B",
      marginTop: "3rem",
      width: "100%",
      paddingY: 1.5,
      borderRadius: 2,
      fontWeight: 600,
      ":focus": { outline: "none" },
      ":hover": { backgroundColor: "#0a5a36" },
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
