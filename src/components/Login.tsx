import {
  Button,
  Dialog,
  TextField,
  CircularProgress,
  Box,
} from "@mui/material";
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
  const [userExist, setUserExist] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitted },
  } = useForm<LoginFormData>({
    mode: "onSubmit",
    shouldUnregister: true,
  });

  const onSubmit: SubmitHandler<LoginFormData> = (data: LoginFormData) => {
    setIsChecking(true);
    api
      .post("/user/checkuser", data)
      .then((res: any) => {
        if (res.data.user) {
          setUserExist(true);
          setUser(res.data.user);

          if (data.password) {
            api.post("/user/login", data).then((res: any) => {
              if (res.status === 200) {
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
                dispatch(login({ user: res.data.user }));
                navigate("/feed");
                handleClose();
              }
            });
          }
        }
      })
      .finally(() => setIsChecking(false));
  };

  const heights = ["30%", "50%", "60%", "80%", "50%", "90%", "70%", "60%"];

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{
        sx: {
          width: "100%",
          maxWidth: { xs: "95%", sm: "90%", md: "900px" },
          height: { xs: "auto", md: "550px" },
          borderRadius: "15px",
          overflow: "hidden",
          boxShadow: "0px 6px 20px rgba(0,0,0,0.3)",
        },
      }}
    >
      <Box
        className="grid grid-cols-1 md:grid-cols-2 w-full"
        sx={{
          height: { xs: "auto", md: "100%" },
        }}
      >
        <Box
          className="hidden md:flex flex-col justify-center items-center bg-[#06402B] text-white relative"
          sx={{
            px: 2,
            height: "100%",
          }}
        >
          <div className="text-white text-xl md:text-3xl font-semibold absolute top-10 font-[cursive]">
            Simple &amp; Free Investing
          </div>

          <div className="graph mt-10">
            {heights.map((h, i) => (
              <div
                key={i}
                className="bar"
                style={{ "--height": h, "--i": i + 1 } as React.CSSProperties}
              ></div>
            ))}
          </div>
        </Box>
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col items-center gap-6 bg-white w-full overflow-y-auto"
          sx={{
            py: { xs: 4, md: 6 },
            px: { xs: 4, sm: 6, md: 8 },
            maxHeight: { xs: "90vh", md: "100%" },
          }}
        >
          <div className="text-2xl md:text-3xl font-extrabold mt-2 text-gray-700 text-center leading-snug">
            {userExist ? `Welcome Back, ${user?.firstName}` : "Welcome to "}
            <span className="font-[cursive] text-[#046307] text-3xl md:text-4xl">
              nVestGuru
            </span>
          </div>

          {isChecking ? (
            <CircularProgress sx={{ color: "#06402B", mt: 4 }} />
          ) : !isChecking && isSubmitted ? (
            userExist ? (
              <>
                <TextField
                  id="email"
                  label={!user?.email ? "Your Email Address" : ""}
                  variant="standard"
                  disabled
                  value={user?.email || ""}
                  sx={{
                    "& .MuiInputLabel-root.Mui-focused": { color: "#16a34a" },
                    "& .MuiInput-underline:after": {
                      borderBottomColor: "#16a34a",
                    },
                    width: "100%",
                  }}
                  {...register("email")}
                />

                <TextField
                  id="password"
                  type="password"
                  label="Enter Password"
                  variant="standard"
                  sx={{
                    "& .MuiInputLabel-root.Mui-focused": { color: "#16a34a" },
                    "& .MuiInput-underline:after": {
                      borderBottomColor: "#16a34a",
                    },
                    width: "100%",
                  }}
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                  error={!!errors.password}
                  helperText={errors.password?.message}
                />
              </>
            ) : (
              <>
                <TextField
                  id="firstName"
                  label="First Name"
                  variant="standard"
                  sx={{
                    "& .MuiInputLabel-root.Mui-focused": { color: "#16a34a" },
                    "& .MuiInput-underline:after": {
                      borderBottomColor: "#16a34a",
                    },
                    width: "100%",
                  }}
                  {...register("firstName", {
                    required: "First name is required",
                    minLength: { value: 2, message: "Enter a valid name" },
                  })}
                  error={!!errors.firstName}
                  helperText={errors.firstName?.message}
                />

                <TextField
                  id="lastName"
                  label="Last Name"
                  variant="standard"
                  sx={{
                    "& .MuiInputLabel-root.Mui-focused": { color: "#16a34a" },
                    "& .MuiInput-underline:after": {
                      borderBottomColor: "#16a34a",
                    },
                    width: "100%",
                  }}
                  {...register("lastName", {
                    required: "Last name is required",
                  })}
                  error={!!errors.lastName}
                  helperText={errors.lastName?.message}
                />

                <TextField
                  id="phone"
                  label="Mobile No."
                  variant="standard"
                  type="tel"
                  sx={{
                    "& .MuiInputLabel-root.Mui-focused": { color: "#16a34a" },
                    "& .MuiInput-underline:after": {
                      borderBottomColor: "#16a34a",
                    },
                    width: "100%",
                  }}
                  {...register("phone", {
                    required: "Phone number is required",
                    pattern: {
                      value: /^[6-9]\d{9}$/,
                      message: "Enter a valid Indian mobile number",
                    },
                  })}
                  error={!!errors.phone}
                  helperText={errors.phone?.message}
                />

                <TextField
                  id="email"
                  value={user?.email || ""}
                  disabled
                  label="Your Email Address"
                  variant="standard"
                  sx={{
                    "& .MuiInputLabel-root.Mui-focused": { color: "#16a34a" },
                    "& .MuiInput-underline:after": {
                      borderBottomColor: "#16a34a",
                    },
                    width: "100%",
                  }}
                  {...register("email")}
                />

                <TextField
                  id="password"
                  type="password"
                  label="Create Password"
                  variant="standard"
                  sx={{
                    "& .MuiInputLabel-root.Mui-focused": { color: "#16a34a" },
                    "& .MuiInput-underline:after": {
                      borderBottomColor: "#16a34a",
                    },
                    width: "100%",
                  }}
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "At least 6 characters required",
                    },
                  })}
                  error={!!errors.password}
                  helperText={errors.password?.message}
                />
              </>
            )
          ) : (
            <>
              <TextField
                id="email"
                label="Your Email Address"
                variant="standard"
                sx={{
                  "& .MuiInputLabel-root.Mui-focused": { color: "#16a34a" },
                  "& .MuiInput-underline:after": {
                    borderBottomColor: "#16a34a",
                  },
                  width: "100%",
                }}
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Enter a valid email",
                  },
                })}
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            </>
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
        </Box>
      </Box>
    </Dialog>
  );
};

export default LoginDialog;
