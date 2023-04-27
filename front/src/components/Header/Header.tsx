import {
  useDisclosure,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { UserCircle } from "phosphor-react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export function Header() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { auth, logout } = useAuth();

  return (
    <div className="fixed flex w-full bg-zinc-700 shadow-md shadow-zinc-900 h-20 justify-between items-center">
      <div>
        <strong className="text-white ml-8">EVENTS</strong>
      </div>
      <div>
        <div className="flex">
          <Menu>
            <MenuButton>
              <UserCircle
                size={36}
                className="mr-8 text-white cursor-pointer hover:opacity-80 transition-all rounded-full h-8 w-8"
              />
            </MenuButton>
            <MenuList>
              <Link to="/events/my-events">
                <MenuItem>My events</MenuItem>
              </Link>
              <MenuItem onClick={() => logout()}>Logout</MenuItem>
            </MenuList>
          </Menu>
        </div>
      </div>
    </div>
  );
}
