"use client";
import { AiOutlineMenu } from "react-icons/ai";
import { useCallback, useState } from "react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

import Avatar from "../Avatar";
import MenuItem from "./MenuItem";
import useRegisterModal from "../../hooks/useRegisterModal";
import useLoginModal from "@/app/hooks/useLoginModal";
import { SafeUser } from "@/app/types";
import useRentModal from "@/app/hooks/useRentModal";

interface UserMenuProps{
  currentUser?: SafeUser | null
}

const UserMenu: React.FC<UserMenuProps> = ({
  currentUser,
}) => {
  const router = useRouter()
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal()
  const rentModal = useRentModal()
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  const onRent = useCallback(() => {
    if (!currentUser) {
      return  loginModal.onOpen();
    }
    
    rentModal.onOpen()
  }, [currentUser, loginModal, rentModal]);

  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <div
          className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 cursor-pointer"
          onClick={rentModal.onOpen}
        >
          Cho thuê chỗ ở qua Airbnb
        </div>
        <div
          className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-sm transition"
          onClick={toggleOpen}
        >
          <AiOutlineMenu />
          <div className="hidden md:block">
            <Avatar src={currentUser?.image}/>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="absolute rounded-xl border-[1px] shadow-sm w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm">
          <div className="flex flex-col cursor-pointer">
            {currentUser ? (
               <>
               <MenuItem onClick={() => router.push("/trips")} label="Hành trình của tôi" />
               <MenuItem onClick={() => router.push("/favorites")} label="Danh sách yêu thích" />
               <MenuItem onClick={() => router.push("/reservations")} label="Chuyến đi" />
               <hr />
               <MenuItem onClick={rentModal.onOpen} label="Cho thuê chỗ ở qua Airbnb" />
               <MenuItem onClick={() => router.push("/properties")} label="Tài khoản" />
               <hr />
               <MenuItem onClick={() => {}} label="Trợ giúp" />
               <MenuItem onClick={() => signOut()} label="Đăng xuất" />
             </> 
            ) : (
            <>
              <MenuItem onClick={loginModal.onOpen} label="Đăng nhập" />
              <MenuItem onClick={registerModal.onOpen} label="Đăng ký" />
            </>
             )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
