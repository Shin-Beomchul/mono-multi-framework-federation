import React, { useEffect, useRef, useState } from 'react'
import { Tabs, Tab, Box, TabsActions } from '@mui/material'

// 각 탭 컴포넌트 가져오기
import StyledTab from './components/StyledTab'
import EmotionTab from './components/EmotionTab'
import RestClientTab from './components/RestClientTab'
import { useLocation } from 'react-router-dom'

// 탭의 인덱스를 기반으로 적절한 컴포넌트 렌더링
const renderTabContent = (index: number) => {
  switch (index) {
    case 0:
      return <StyledTab />
    case 1:
      return <EmotionTab />
    case 2:
      return <RestClientTab />
    default:
      return null
  }
}
const useQuery = () => {
  const { search } = useLocation()
  const query = new URLSearchParams(search)
  return query
}

const PlaygroundPage: React.FC = () => {
  const [currentTab, setCurrentTab] = useState<number>(0)
  const tabsActions = useRef<TabsActions>(null)

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue)
  }
  const query = useQuery()
  const tab = query.get('tab')
  useEffect(() => {
    setCurrentTab(Number.parseInt(tab ?? '0'))
  }, [tab])

  return (
    <div>
      <Tabs
        action={tabsActions}
        value={currentTab}
        onChange={handleTabChange}
      >
        <Tab label='Styled' />
        <Tab label='Emotion' />
        <Tab label='Rest-Client' />
      </Tabs>
      <Box mt={2}>{renderTabContent(currentTab)}</Box>
    </div>
  )
}

export default PlaygroundPage
