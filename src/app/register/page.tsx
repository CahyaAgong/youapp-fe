'use client'

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"

import { SignUp } from "@/config/actions"
import { ResponseType, LoginRegisterPayload } from "@/utils/types"
import { handleInputChange } from "@/utils/functions"
import { ButtonComponent, InputComponent, Notification } from "@/components"

export default function Register() {
  const { push } = useRouter()

  const [form, setForm] = useState<LoginRegisterPayload>({
    username: '',
    email: '',
    password: '',
    confirm_password: ''
  })

  const [responseList, setResponseList] = useState<string[]>([])
  const [isSubmit, setIsSubmit] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleInputChange(e, form, setForm);
  };

  const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setResponseList([])
    setIsSubmit(true)

    // const { password, confirm_password } = form

    // if (confirm_password !== password) {
    //   setIsSubmit(false)
    //   setResponseList(['confirm password wrong!'])
    //   return
    // }

    const { message }: ResponseType = await SignUp(form)

    if (!Array.isArray(message)) {
      setResponseList([message])
    } else {
      setResponseList(message)
    }
    setIsSubmit(false)

    // setForm({
    //   username: '',
    //   email: '',
    //   password: '',
    //   confirm_password: ''
    // })
  }

  return (
    <div className="flex flex-col px-2 py-4 bg-gradient-to-tr from-[#091319] to-[#1c3c41] h-screen">
      <ButtonComponent type="button" name="btn-back" styles="flex items-center" onClick={() => push('/') }>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-7">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
        </svg>

        <span className="text-sm font-semibold">Back</span>
      </ButtonComponent>

      <div className="mt-10 px-4">
        <h1 className="text-2xl font-semibold mb-3">Register</h1>

        {responseList.length > 0 && <Notification messages={responseList} />}

        <form method="post" onSubmit={handleSubmit} className='flex flex-col mt-5 gap-3'>
          <InputComponent type='email' placeholder='Enter Email' name='email' value={form.email} onChange={handleChange} styles='px-5 py-3 rounded-lg' required />
          <InputComponent type='text' placeholder='Create Username' name='username' value={form.username} onChange={handleChange} styles='px-5 py-3 rounded-lg' required />
          <InputComponent type='password' placeholder='Create Password' name='password' value={form.password} onChange={handleChange} styles='px-5 py-3 rounded-lg' required />
          <InputComponent type='password' placeholder='Confirm Password' name='confirm_password' value={form?.confirm_password ?? ''} onChange={handleChange} styles='px-5 py-3 rounded-lg' required />

          <ButtonComponent type='submit' name='btn-submit' styles='px-4 py-3 bg-gradient-to-bl from-[#4599DB] to-[#61CDCB] text-lg font-bold rounded-xl' disabled={isSubmit}>Register</ButtonComponent>
        </form>

        <p className='text-center text-sm mt-5'>Have an account ? <span className="underline"><Link href="/">Login here</Link></span></p>
      </div>
    </div>
  )
}