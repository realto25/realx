import { useState, createContext, useContext, useEffect } from 'react'
import * as SecureStore from 'expo-secure-store'
import { router } from 'expo-router'

type AuthData = {
  user: any | null
  token: string | null
}

type AuthContextType = {
  authData: AuthData
  setUser: (data: any) => Promise<void>
  logout: () => Promise<void>
  getToken: () => Promise<string | null>
}

const AuthContext = createContext<AuthContextType>({
  authData: { user: null, token: null },
  setUser: async () => {},
  logout: async () => {},
  getToken: async () => null,
})

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [authData, setAuthData] = useState<AuthData>({ user: null, token: null })

  useEffect(() => {
    const loadAuthData = async () => {
      const token = await SecureStore.getItemAsync('auth-token')
      const user = await SecureStore.getItemAsync('auth-user')
      
      if (token && user) {
        setAuthData({ token, user: JSON.parse(user) })
      }
    }
    
    loadAuthData()
  }, [])

  const setUser = async (data: any) => {
    await SecureStore.setItemAsync('auth-token', data.jwt)
    await SecureStore.setItemAsync('auth-user', JSON.stringify(data.user))
    setAuthData({ token: data.jwt, user: data.user })
  }

  const logout = async () => {
    await SecureStore.deleteItemAsync('auth-token')
    await SecureStore.deleteItemAsync('auth-user')
    setAuthData({ token: null, user: null })
    router.replace('/(auth)/login')
  }

  const getToken = async () => {
    return await SecureStore.getItemAsync('auth-token')
  }

  return (
    <AuthContext.Provider value={{ authData, setUser, logout, getToken }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)