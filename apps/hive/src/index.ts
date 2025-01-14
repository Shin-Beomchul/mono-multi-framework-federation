const loadReactApp1 = (targetContainer: HTMLElement) => {
  try {
    if (targetContainer) {
      import('reactApp1/App').then((module) => {
        module.default.mount(targetContainer)
      })
    } else {
      console.error('Target container not found.')
    }
  } catch (error) {
    console.error('Failed to load the React app:', error)
  }
}

const loadReactApp2 = async (targetContainer: HTMLElement) => {
  try {
    if (targetContainer) {
      const module = await import('reactApp2/App')
      module.default.mount(targetContainer)
    } else {
      console.error('Target container not found.')
    }
  } catch (error) {
    console.error('Failed to load the React app:', error)
  }
}

export { loadReactApp1, loadReactApp2 }
