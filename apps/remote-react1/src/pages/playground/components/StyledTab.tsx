import React from 'react'
import { Box, Button } from '@mui/material'
import cacheAxiosClient, { axiosClient } from '@hive/rest-client'

const axios = axiosClient({ baseURL: 'https://reqres.in' })
const cacheAxios = cacheAxiosClient(axios)
const TabFive: React.FC = () => {
  return (
    <Box p={2}>
      <Button
        onClick={async () => {
          const response = await cacheAxios.get('http://localhost:8080/users')
          console.log('response.id', response.id)
          console.log('response.cached', response.cached)
          console.log('response.config', response.config)
          console.log(await cacheAxios.storage.get(response.id))
        }}
      >
        cache?
      </Button>
      This is Styled Tab Content
    </Box>
  )
}

export default TabFive
