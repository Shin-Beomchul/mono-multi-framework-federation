import cacheAxiosClient, { axiosClient } from '@hive/rest-client'

// export default TabFive
import { Box, styled, Button, Stack } from '@mui/material'
import { useState } from 'react'

// Sample JSON data
// const sampleData = {
//   name: 'John Doe',
//   age: 30,
//   email: 'john.doe@example.com',
//   address: {
//     street: '123 Main St',
//     city: 'Anytown',
//     zip: '12345',
//   },
//   hobbies: ['reading', 'traveling', 'coding'],
// }

// Styled component for the JSON container
const JsonContainer = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[1],
  height: '100%',
  overflow: 'auto',
  whiteSpace: 'pre-wrap',
  wordWrap: 'break-word',
}))
const axios = axiosClient({ baseURL: 'https://reqres.in' })
const cacheAxios = cacheAxiosClient(axios)

const Layout = () => {
  const [responseJson, setResponseJson] = useState({})
  // const axios = axiosClient({ baseURL: 'https://jsonplaceholder.typicode.com' })

  const onClickAxios = async () => {
    const response = await axios.get('/posts')
    setResponseJson(response)
  }
  const onClickCacheAxios = async () => {
    const response = await cacheAxios.get('http://localhost:8080/users')

    console.log('response.id', response.id)
    console.log('response.cached', response.cached)
    console.log('response.config', response.config)
    console.log(await cacheAxios.storage.get(response.id))
    setResponseJson(response)
  }
  return (
    <Box sx={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
      {/* Left Section: 3 parts */}
      <Box
        sx={{
          flex: 1,
          backgroundColor: '#f5f5f5',
          display: 'flex',
        }}
      >
        <Stack
          spacing={2}
          direction='column'
        >
          <Box>
            <Button
              onClick={async () => {
                setResponseJson({})
              }}
              variant='outlined'
            >
              clear
            </Button>
          </Box>
          <Box>
            <Button
              onClick={async () => {
                onClickAxios()
              }}
              variant='outlined'
            >
              axios
            </Button>
            <span></span>
          </Box>
          <Box>
            <Button
              onClick={async () => {
                onClickCacheAxios()
              }}
              variant='outlined'
            >
              cache-axios
            </Button>
          </Box>
        </Stack>
      </Box>

      {/* Right Section: 7 parts */}
      <Box sx={{ flex: 8, padding: 2 }}>
        <JsonContainer>{JSON.stringify(responseJson, null, 2)}</JsonContainer>
      </Box>
    </Box>
  )
}

export default Layout
