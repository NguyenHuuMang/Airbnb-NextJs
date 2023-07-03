"use client";

import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation";
import axios from "axios";

import { useCallback, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import useRegisterModal from "../../hooks/useRegisterModal";
import Modal from "./Modal";
import Heading from "../Heading";
import Input from "../inputs/Input";
import { toast } from "react-hot-toast";
import Button from "../Button";
import useLoginModal from "@/app/hooks/useLoginModal";

import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";

const LoginModal = () => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    signIn('credentials', {
      ...data,
      redirect: false,
    }).then((callback) => {
      setIsLoading(false);

      if(callback?.ok){
        toast.success("Đăng nhập thành công");
        router.refresh();
        loginModal.onClose();
      }

      if(callback?.error){
        toast.error(callback.error);
      }
    })
  };

  const toggle = useCallback(() => {
    loginModal.onClose();
    registerModal.onOpen()
  }, [loginModal, registerModal])

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading
        title="Chào mừng bạn đến với Airbnb"
        subtitle="Đăng nhập"
      />
      <Input
        id="email"
        label="Email"
        disable={isLoading}
        register={register}
        errors={errors}
        required
      />
     
      <Input
        id="password"
        type="password"
        label="Password"
        disable={isLoading}
        register={register}
        errors={errors}
        required
      />
    </div>
  );

  const footerConent = (
    <div className="flex flex-col gap-4 mt-3">
      <hr />
      <Button
        outline
        label="Tiếp tục với Google"
        icon={FcGoogle}
        onClick={() => signIn("google")}
      />
      <Button
        outline
        label="Tiếp tục với Github"
        icon={AiFillGithub}
        onClick={() => signIn("github")}
      />
      <div className="text-neutral-500 text-center mt-4 font-light">
        <div className="justify-center flex flex-row items-center gap-2">
           <div>
             Chưa có tài khoản ?
           </div>
           <div className="text-neutral-800 cursor-pointer hover:underline" onClick={toggle}>
             Đăng ký
           </div>
        </div>
      </div>
    </div>
  );

  return (
    <Modal
      disable={isLoading}
      isOpen={loginModal.isOpen}
      title="Đăng nhập"
      actionLabel="Tiếp tục"
      onClose={registerModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerConent}
    />
  );
};

export default LoginModal;
