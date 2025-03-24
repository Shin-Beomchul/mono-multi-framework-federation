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

const loadVueApp = async (targetContainer: HTMLElement) => {
  try {
    if (targetContainer) {
      const module = await import('vueApp/App')
      console.log(' module.default', module.default)
      module.default.mount(targetContainer)
    } else {
      console.error('Target container not found.')
    }
  } catch (error) {
    console.error('Failed to load the Vue app:', error)
  }
}

export { loadReactApp1, loadReactApp2, loadVueApp }
