"use client"

import { useEffect, useState } from "react"
import { getProfile, updateProfile } from "@/config/actions"
import { PostProfileType, ResponseType } from "@/utils/types"
import { _calculateAge, checkWhitespace, formatDate, handleInputChange } from "@/utils/functions"
import { ButtonComponent, InputComponent, Notification } from "@/components"
import { URL_IMAGE } from "@/config/constants"
import Image from "next/image"
import { useRouter } from "next/navigation"

export default function Profile() {
  const { push } = useRouter()

  const [form, setForm] = useState<PostProfileType>({
    name: '',
    birthday: '',
    height: 0,
    weight: 0,
    interests: []
  })
  const [responseList, setResponseList] = useState<string[]>([])
  const [interest, setInterest] = useState<string>('')
  const [interestList, setInterestList] = useState<string[]>([])

  const [showFormAbout, setShowFormAbout] = useState(false)
  const [showFormInterest, setShowFormInterest] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleInputChange(e, form, setForm);
  };

  const addInterest = () => {
    setInterestList(prev => [...prev, interest])
    setInterest('')
  }

  const removeInterest = (data: string) => {
    const newInterestList = interestList.filter((element) => element !== data)
    setInterestList(newInterestList)
  }

  const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    e.stopPropagation()

    const token = localStorage.getItem('youapp-token')

    form.height = Number(form.height)
    form.weight = Number(form.weight)
    form.interests = interestList

    // const { message, data }: ResponseType = await createProfile(token ?? '', form)
    const { message }: ResponseType = await updateProfile(token ?? '', form)

    if (!Array.isArray(message)) {
      setResponseList([message])
    } else {
      setResponseList(message)
    }
    window.location.reload();
  }

  const toggleForm = () => {
    setInterestList([])
    setShowFormInterest(!showFormInterest)

    if (showFormInterest && form.interests) setInterestList(form.interests)
  }

  const renderInput = (label: string, name: string, type: 'submit' | 'text' | 'number', value: string, placeholder: string = "", disabled = false, styles = "", sizing = "", parentWidth = "") => (
    <div className="flex items-center w-full gap-3">
      <label htmlFor={name} className="w-[30%] text-sm">{label}</label>
      <InputComponent
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        disabled={disabled}
        styles={styles}
        sizing={sizing}
        parentWidth={parentWidth}
      />
    </div>
  );

  const DetailItem: React.FC<{ label: string, value: string }> = ({ label, value }) => (
    <div className="flex items-start text-sm gap-1">
      <span className="text-[#4C5559]">{label}</span>
      <span className="flex-1 font-semibold">{value}</span>
    </div>
  );

  const renderForm = () => (
    <div className="flex flex-col mt-4 gap-4">
      <div className="flex items-center w-full gap-3">
        <div className="w-[60px] h-[60px] overflow-hidden rounded-xl">
          <Image src={URL_IMAGE} width={100} height={100} className="w-full h-full object-cover" alt="photo's" />
        </div>
        <span className="text-sm font-semibold">Add Image</span>
      </div>

      {renderInput("Display Name:", "name", "text", form.name, "Enter Name", false, 'text-right rounded-xl px-3 py-2 border-2 border-[#4C5559]', '', 'w-[70%]')}
      {renderInput("Birthday:", "birthday", "text", form.birthday, "Enter Birthday", false, 'text-right rounded-xl px-3 py-2 border-2 border-[#4C5559]', '', 'w-[70%]')}
      {renderInput("Horoscope:", "horoscope", "text", form.horoscope ?? "-", "", true, 'text-right rounded-xl px-3 py-2 border-2 border-[#4C5559]', '', 'w-[70%]')}
      {renderInput("Zodiac:", "zodiac", "text", form.zodiac ?? "-", "", true, 'text-right rounded-xl px-3 py-2 border-2 border-[#4C5559]', '', 'w-[70%]')}
      {renderInput("Height:", "height", "number", form.height?.toString() || '0', "Enter Height", false, "pr-12 text-right rounded-xl px-3 py-2 border-2 border-[#4C5559]", "cm", 'w-[70%]')}
      {renderInput("Weight:", "weight", "number", form.weight?.toString() || '0', "Enter Weight", false, "pr-12 text-right rounded-xl px-3 py-2 border-2 border-[#4C5559]", "kg", 'w-[70%]')}
    </div>
  );

  const renderDetails = () => (
    <div className="flex flex-col mt-4 pt-2 gap-3">
      <DetailItem label="Birthday:" value={`${form?.birthday ?? '-'} (Age ${form?.birthday ? _calculateAge(new Date(formatDate(form.birthday ?? '25-04-2005'))) : '0'})`} />
      <DetailItem label="Horoscope:" value={form?.horoscope ?? '-'} />
      <DetailItem label="Zodiac:" value={form?.zodiac ?? '-'} />
      <DetailItem label="Height:" value={`${form?.height ?? 0} cm`} />
      <DetailItem label="Weight:" value={`${form?.weight ?? 0} kg`} />
    </div>
  );

  useEffect(() => {
    const fetchProfile = async() => {
      const token = localStorage.getItem('youapp-token');
      const { message, data }: ResponseType = await getProfile(token ?? '')
      
      if (!Array.isArray(message)) {
        setResponseList([message])
      } else {
        setResponseList(message)
      }
      
      
      if (data) {
        if (checkWhitespace(data.birthday)) data.birthday = data.birthday.replace(/ /g,"-");

        setForm({
          name: data.name,
          username: data.username,
          birthday: data.birthday,
          height: data.height,
          weight: data.weight,
          horoscope: data.horoscope,
          zodiac: data.zodiac,
          interests: data.interests
        })
        setInterestList(data.interests)
      }
    }

    fetchProfile()
  }, [])

  return(
    <div className="px-2 py-4 overflow-auto relative">
      <div id="navbar" className="flex items-center justify-between py-4">
        <ButtonComponent type="button" name="btn-back" styles="flex items-center" onClick={() => push('/') }>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-7">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
          </svg>

          <span className="text-sm font-semibold">Back</span>
        </ButtonComponent>

        <h5 className="font-semibold text-sm">@{form.username ?? 'johndoe'}</h5>

        <span className="text-black text-opacity-0">setting bar</span>
      </div>

      {responseList.length > 0 && <Notification messages={responseList} />}

      <div className="rounded-3xl h-[200px] my-3 flex relative overflow-hidden">
        <Image src={URL_IMAGE} width={100} height={100} className="w-full h-full object-cover" alt="banner photo profile" />

        <div className="flex flex-col absolute bottom-3 left-5">
          <h3 className="text-lg font-semibold text-white">@{form.username ?? 'johndoe, 30'}</h3>
          <span className="text-sm">Male</span>
          <div className="flex items-center gap-2 mt-2">
            {form.horoscope && <span className="px-5 py-3 font-bold text-sm rounded-full bg-black bg-opacity-75">{form.horoscope}</span>}
            {form.zodiac && <span className="px-5 py-3 font-bold text-sm rounded-full bg-black bg-opacity-75">{form.zodiac}</span>}
          </div>
        </div>
      </div>

      <div className="flex flex-col bg-[#0E191F] text-white rounded-3xl min-h-[150px] px-5 py-4 mt-6">
        <form onSubmit={handleSubmit} className="">
          <div className="flex items-center justify-between">
            <h5 className="text-base font-semibold text-white">About</h5>
            {showFormAbout 
              ? <InputComponent type="submit" name="save_update" styles="text-sm text-opacity-50" value="Save & Update" placeholder="" />
              : <ButtonComponent type="button" name="show_form_about" onClick={() => setShowFormAbout(!showFormAbout)}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                  </svg>
                </ButtonComponent>}
          </div>

          { 
            showFormAbout 
              ? renderForm()
              : !form || !form.birthday 
                ? <p className="mt-5 text-center text-sm">Add in your about to help others know you better</p> 
                : renderDetails()
          }

        </form>
      </div>

      <div className="flex flex-col bg-[#0E191F] text-white rounded-3xl min-h-[150px] px-5 py-4 mt-4">
        <div className="flex items-center justify-between">
          <h5 className="text-base font-semibold text-white">Interest</h5>
          <ButtonComponent type="button" name="" onClick={() => setShowFormInterest(!showFormInterest)}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
            </svg>
          </ButtonComponent>
        </div>

        <div className="flex items-center flex-wrap gap-3 py-3">
            {form.interests && form.interests.length > 0 
              ?  form.interests.map((data, idx) => (
                <span key={idx} className="flex items-center gap-2 bg-[#1c272c] rounded-full px-3 py-1">{data}</span>))
              : <span className="text-sm font-semibold text-center w-full mt-4">Add in your interest to find better match</span>}
        </div>
      </div>

      <form id="form-interest" onSubmit={handleSubmit} className={`${showFormInterest ? 'flex' : 'hidden'} flex-col bg-gradient-to-tr from-[#091319] to-[#1c3c41] z-10 px-3 py-2 absolute top-0 bottom-0 left-0 right-0 h-screen`}>
        <div className="flex items-center justify-between py-4">
          <ButtonComponent type="button" name="" onClick={toggleForm} styles="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-7">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
            </svg>

            <span className="text-sm font-semibold">Back</span>
          </ButtonComponent>

          <ButtonComponent type="submit" name="">Save</ButtonComponent>
        </div>

        <div className="flex flex-col mt-10">
          <h5 className="text-lg">Tell everyone about yourself</h5>
          <h3 className="text-2xl font-bold mt-2">What interest you ?</h3>

          <div className="flex items-center flex-wrap gap-2 bg-[#1A252A] rounded-xl px-4 py-5 mt-8">
            {interestList.length > 0 ? interestList.map((data, idx) => (
              <span key={idx} className="bg-[#334347] text-sm flex items-center gap-1 px-2 py-1 rounded-md">
                <span>{data}</span>
                <ButtonComponent type="button" name="" onClick={() => removeInterest(data)}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="size-5 text-white">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                  </svg>
                </ButtonComponent>
              </span>
              )) : '' }
            <input type="text" name="interest" value={interest} className="px-3 text-sm bg-transparent focus:outline-none" onChange={(e) => setInterest(e.target.value)} />
            {interest 
              && <ButtonComponent type="button" name="" onClick={addInterest} styles="px-2 py-2">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="size-5 text-white">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                  </svg>
                </ButtonComponent>
            }
          </div>
          
        </div>
      </form>
    </div>
  )
}