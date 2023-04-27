import {
  IdentificationBadge,
  InstagramLogo,
  Keyhole,
  Phone,
  TwitterLogo,
  UserCircle,
} from "phosphor-react";
import { useToast } from "@chakra-ui/react";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";

interface RegisterData {
  email: string;
  password: string;
  name: string;
}

export function Register() {
  const toast = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(false);

  const { login, auth } = useAuth();

  const onFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data: RegisterData = {
      email,
      password,
      name,
    };

    try {
      // if (res.id != null) {
      //   toast({
      //     description: `Welcome ` + res.name,
      //     status: "success",
      //     duration: 4000,
      //     isClosable: true,
      //   });
      // } else {
      //   toast({
      //     description: `Invalid credentials`,
      //     status: "error",
      //     duration: 4000,
      //     isClosable: true,
      //   });
      // }
    } catch (err: any) {
      const errorResponse = err.response;
    }
  };

  return (
    <>
      <div className="flex-col flex items-center w-full justify-center h-full">
        <strong className="text-4xl font-extrabold text-zinc-100">
          Register
        </strong>
        <div className="flex flex-col items-center w-full">
          <form
            onSubmit={onFormSubmit}
            className="flex flex-col items-center w-full"
          >
            <div className="flex items-center justify-center mt-4 w-full">
              <IdentificationBadge size={38} color="#ffffff" className="mr-1" />
              <input
                className="text-white border-solid border-[1px] border-[#ffffff] p-3 rounded flex items-center bg-transparent placeholder:text-white placeholder:font-bold w-1/4 mr-10"
                placeholder="Name"
                autoFocus
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </div>

            <div className="flex items-center justify-center mt-4 w-full">
              <UserCircle size={38} color="#ffffff" className="mr-1" />
              <input
                className="text-white border-solid border-[1px] border-[#ffffff] p-3 rounded flex items-center bg-transparent placeholder:text-white placeholder:font-bold w-1/4 mr-10"
                placeholder="Email"
                autoFocus
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>

            <div className="flex items-center justify-center mt-4 w-full">
              <Keyhole size={38} color="#ffffff" className="mr-1" />
              <input
                type="password"
                className="text-white border-solid border-[1px] border-[#ffffff] p-3 rounded flex items-center bg-transparent placeholder:text-white placeholder:font-bold w-1/4 mr-10"
                placeholder="Password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>

            <div className="flex items-center justify-center mt-4 w-full">
              <Keyhole size={38} color="#ffffff" className="mr-1" />
              <input
                type="password"
                className="text-white border-solid border-[1px] border-[#ffffff] p-3 rounded flex items-center bg-transparent placeholder:text-white placeholder:font-bold w-1/4 mr-10"
                placeholder="Confirm password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>

            <button
              className="text-black bg-white w-[200px] p-4 rounded cursor-pointer mt-8 transition-all font-bold "
              type="submit"
            >
              Create account
            </button>
          </form>
        </div>
      </div>
    </>
  );
}