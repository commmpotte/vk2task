import React, { FC } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@vkontakte/vkui'

const HomePage: FC = () => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        margin: 'auto',
      }}
    >
      <Link to="/cat-fact">
        <Button appearance={'neutral'} size="l" style={{ margin: 20 }}>
          CatFact
        </Button>
      </Link>
      <Link to="/get-age">
        <Button appearance={'neutral'} size="l">
          GetAge
        </Button>
      </Link>
    </div>
  )
}

export default HomePage
