import React, { useState, useRef } from 'react'
import {
  Input,
  FormItem,
  Group,
  Button,
  View,
  PanelHeader,
  Panel,
} from '@vkontakte/vkui'
import axios from 'axios'
import { Link } from 'react-router-dom'

const GetAge: React.FC = () => {
  const [name, setName] = useState<string>('')
  const [age, setAge] = useState<number | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [previousName, setPreviousName] = useState<string | null>(null)
  const [currentRequest, setCurrentRequest] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!validateName(name)) {
      setError('Имя может содержать только буквы')
      return
    }

    if (name === previousName && currentRequest === name) {
      setError('Вы уже получили возраст для этого имени')
      return
    }

    setCurrentRequest(name)
    setPreviousName(name)
    setError(null)
    setLoading(true)

    try {
      const response = await axios.get<{ age: number | null }>(
        `https://api.agify.io/?name=${name}`
      )
      if (response.data.age === null) {
        setError('Странное имя, попробуйте еще раз')
        setAge(null)
      } else {
        setAge(response.data.age)
        setError(null)
      }
    } catch (error) {
      setError('Ошибка при получении возраста')
    }

    setLoading(false)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value)
  }

  const validateName = (name: string): boolean => {
    const regex = /^[a-zA-Zа-яА-ЯёЁ\s]*$/
    return regex.test(name)
  }

  return (
    <View
      activePanel="card"
      style={{
        textAlign: 'center',
      }}
    >
      <Panel id="card">
        <PanelHeader>Get Age</PanelHeader>
        <Group>
          <form onSubmit={handleSubmit}>
            <FormItem
              style={{
                justifyContent: 'center',
              }}
              status={error ? 'error' : undefined}
              bottom={error || ''}
            >
              <Input
                style={{ margin: 'auto', maxWidth: '60%' }}
                width="200"
                type="text"
                value={name}
                onChange={handleChange}
                placeholder="Введите ваше имя"
                required
                getRef={inputRef}
                disabled={loading}
              />
            </FormItem>
            {(age !== null || error) && !loading && (
              <p style={{ marginTop: '10px' }}>
                {age && `Ваш Возраст: ${age}`}
              </p>
            )}

            {loading ? (
              <Button size={'m'} loading={loading}></Button>
            ) : (
              <Button
                size={'m'}
                type="submit"
                disabled={!name || loading}
                placeholder={'Узнать Возраст'}
              >
                Узнать Возраст

              </Button>
            )}
          </form>
          <Link to="/">
            <Button
              style={{ marginTop: 10 }}
              mode={'primary'}
              size={'m'}
              appearance={'negative'}
              stretched={false}
            >
              Go Home
            </Button>
          </Link>
        </Group>
      </Panel>
    </View>
  )
}

export default GetAge
