import { useState, ChangeEvent, FormEvent } from 'react'

import { useNavigate } from 'react-router-dom'

import { useDispatch } from 'react-redux'

import { AppDispatch } from '../redux/store'

import { User, createAccount } from '../redux/slices/users/userSlice'

import { RegisterForm } from './RegisterForm'

import { toast } from 'react-toastify'

const initialUserState: User = {
  id: 0,
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  role: 'user',
  blocked: false
}

export function NewUserWrapper() {
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()
  const [user, setUser] = useState<User>(initialUserState)
  const [firstNameValidation, setFirstNameValidation] = useState('')
  const [lastNameValidation, setLastNameValidation] = useState('')
  const [emailValidation, setEmailValidation] = useState('')
  const [passowrdValidation, setPassowrdValidation] = useState('')
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setUser({
      ...user,
      [name]: value
    })
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    // let's add Id property to the object (usually IDs are generated automatically on the backend)
    user.id = +new Date()
    if (user.firstName.length < 2) {
      setFirstNameValidation('Must be at least 2 Character')
      return
    }
    if (user.lastName.length < 2) {
      setLastNameValidation('Must be at least 2 Character')
      return
    }
    if (!user.email.includes('@')) {
      setEmailValidation('Enter valid Email. Ex:@gmail')
      return
    }
    if (user.password.length < 8) {
      setPassowrdValidation('Must be at least 8 character')
      return
    }
    dispatch(createAccount({ user }))
    toast.success('New account was created')
    navigate('/login-page', { replace: true }) // Reset the form
    setUser(initialUserState)
  }

  return (
    <div>
      <RegisterForm
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        user={user}
        firstNameValidation={firstNameValidation}
        lastNameValidation={lastNameValidation}
        emailValidation={emailValidation}
        passowrdValidation={passowrdValidation}
      />
    </div>
  )
}
