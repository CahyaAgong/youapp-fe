import { ChangeEvent, SetStateAction } from "react";

export const handleInputChange = <T>(e: ChangeEvent<HTMLInputElement>, form: T, setForm: React.Dispatch<SetStateAction<T>>) => {
  const { name, value } = e.target;
  setForm({
    ...form,
    [name]: value
  });
};

export const formatDate = (dateString: string): string => {
  const [day, month, year] = dateString.split('-');
  return `${year}-${month}-${day}`;
};

export const _calculateAge = (birthday: Date) => {
  const ageDifMs = Date.now() - birthday.getTime();
  const ageDate = new Date(ageDifMs);
  return Math.abs(ageDate.getUTCFullYear() - 1970);
}

export const checkWhitespace = (str: string) => {
  console.log(str)
  return /\s/.test(str);
}