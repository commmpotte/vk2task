import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {
  Button,
  Card,
  CardGrid,
  FormItem,
  Group,
  Panel,
  PanelHeader,
  View,
} from '@vkontakte/vkui'
import { Link } from 'react-router-dom'

interface CatFactResponse {
  fact: string
}

const CatFact: React.FC = () => {
  const [catFact, setCatFact] = useState<string>('')

  const fetchCatFact = async () => {
    try {
      const response = await axios.get<CatFactResponse>(
        'https://catfact.ninja/fact'
      )
      const fact = response.data.fact
      console.log('Fetched fact:', fact)
      setCatFact(fact)
    } catch (error) {
      console.error('Error fetching cat fact:', error)
    }
  }

  useEffect(() => {
    const timerId = setTimeout(() => {
      const textArea = document.getElementById(
        'catFactTextArea'
      ) as HTMLTextAreaElement
      if (textArea && catFact) {
        const firstSpaceIndex = catFact.indexOf(' ')
        textArea.focus()
        textArea.setSelectionRange(firstSpaceIndex + 1, firstSpaceIndex + 1)
      }
    }, 100)

    return () => clearTimeout(timerId)
  }, [catFact])

  return (
    <View
      activePanel="card"
      style={{
        textAlign: 'center',
      }}
    >
      <Panel id="card">
        <PanelHeader>Cat Fact</PanelHeader>

        <Group>
          <Button
            mode={'primary'}
            size={'m'}
            appearance={'positive'}
            stretched={false}
            onClick={fetchCatFact}
          >
            Get Cat Fact
          </Button>

          <CardGrid
            size={'l'}
            style={{
              justifyContent: 'center',
            }}
          >
            <Card style={{ margin: 20 }}>
              <FormItem>
                <textarea
                  disabled={false}
                  id="catFactTextArea"
                  value={catFact}
                  style={{
                    width: '90%',
                    minHeight: '250px',
                    padding: 10,
                    borderRadius: 8,
                    border: '1px solid #ccc',
                    resize: 'none',
                    fontSize: 16,
                    lineHeight: '1.5',
                  }}
                />
              </FormItem>
            </Card>

            <Link to="/">
              <Button
                mode={'primary'}
                size={'m'}
                appearance={'negative'}
                stretched={false}
              >
                Go Home
              </Button>
            </Link>
          </CardGrid>
        </Group>
      </Panel>
    </View>
  )
}

export default CatFact
