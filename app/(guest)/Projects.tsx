import { FlatList, Pressable, View, Text } from 'react-native'
import { Link } from 'expo-router'
import { useQuery } from '@tanstack/react-query'
import { getProjects } from '@/lib/api'

export default function ProjectsScreen() {
  const { data: projects, isLoading } = useQuery({
    queryKey: ['projects'],
    queryFn: getProjects
  })

  return (
    <View className="flex-1 p-4">
      <Text className="text-xl font-bold mb-4">Available Projects</Text>
      
      {isLoading ? (
        <Text>Loading...</Text>
      ) : (
        <FlatList
          data={projects}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Link href={`/(guest)/plots/${item.id}` as any} asChild>
              <Pressable className="border border-gray-200 rounded-lg p-4 mb-3">
                <Text className="font-bold text-lg">{item.name}</Text>
                <Text className="text-gray-600">{item.location}</Text>
                <Text className="text-gray-500 mt-2">
                  {item.plotsAvailable} plots available
                </Text>
              </Pressable>
            </Link>
          )}
        />
      )}
    </View>
  )
}