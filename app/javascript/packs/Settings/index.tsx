import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react'

interface Setting {
  color?: string
  theme?: string
  sidebar?: boolean
}

const Settings: React.FC = () => {
  const [setting, setSetting] = useState<Setting>({})
  const [loading, setLoading] = useState<boolean>(true)

  const root = document.getElementById('Settings')
  const id = root?.getAttribute('data-id') as string
  const csrfTokenElement = document.querySelector('meta[name="csrf-token"]')
  const csrfToken = csrfTokenElement?.getAttribute('content')

  useEffect(() => {
    fetch(`/users/${id}/user_settings/json`)
      .then(response => response.json())
      .then(data => {
        setSetting({
          color: data.color,
          theme: data.theme,
          sidebar: data.sidebar,
        })
        setLoading(false)
      })
  }, [])

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    fetch(`/users/${id}/user_settings`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': csrfToken as string
      },
      body: JSON.stringify({ setting }),
    }).then((response) => {
      if (response.status === 200) {
        window.location.reload()
      }
    })
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = event.target
    let newValue: any = value
    if (type === "checkbox") {
      newValue = checked
    } else if (type === "range") {
      newValue = Number(value)
    }
    setSetting(prevSetting => ({ ...prevSetting, [name]: newValue }))
  }

  if (loading) {
    return <div>Loading...</div>
  }

  const generateGradientBackground = () => {
    const gradientColors: string[] = []
    for (let i = 0; i <= 360; i += 1) {
      gradientColors.push(`hsl(${i}, 75%, 50%) ${i/3.6}%`)
    }
    return `linear-gradient(to right, ${gradientColors.join(', ')})`
  }

  console.log(setting)

  return (
    <form className='form' onSubmit={handleSubmit}>
      <div>
        <label>Color:</label>
        <input type="range" min={0} max={360} step={1} name="color" value={setting.color || ''} onChange={handleChange} style={{
          accentColor: `hsl(${setting.color || ''}, 75%, 50%)`,
          background: generateGradientBackground(),
        }}/>
      </div>
      <div>
        <label>Theme:</label>
        <input type="text" name="theme" value={setting.theme || ''} onChange={handleChange} />
      </div>
      <div>
        <label>Sidebar:</label>
        <input type="checkbox" name="sidebar" checked={setting.sidebar || false} onChange={handleChange} style={{
          accentColor: `hsl(${setting.color || ''}, 75%, 50%)`,
        }}/>
      </div>
      <input type="submit" value='Save' />
    </form>
  )
}

export default Settings
