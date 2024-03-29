import { Feather } from '@expo/vector-icons';
import { useTheme } from '@hooks/useTheme';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home } from '@screens/Home';
import { Settings } from '@screens/Settings/Settings';

const { Navigator, Screen } = createBottomTabNavigator();
export const AppRoutes = () => {
  const { colorMode } = useTheme();
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#0284c7',
        tabBarInactiveTintColor: '#71717a',
        tabBarStyle: {
          borderRadius: 100,
          marginBottom: 20,
          marginHorizontal: 20,
          height: 72,
          position: 'absolute',
          borderTopWidth: 0,
          backgroundColor: colorMode === 'dark' ? '#1f2a48' : '#fefefe',
        },
        tabBarItemStyle: {
          paddingVertical: 10,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontFamily: 'Poppins_400Regular',
        },
      }}
    >
      <Screen
        name="home"
        component={Home}
        options={{
          tabBarIcon: ({ color, size }) => {
            return <Feather name="home" size={size} color={color} />;
          },
          tabBarLabel: 'Home',
        }}
      />
      <Screen
        name="settings"
        component={Settings}
        options={{
          tabBarIcon: ({ color, size }) => {
            return <Feather name="settings" size={size} color={color} />;
          },
          tabBarLabel: 'Configurações',
        }}
      />
    </Navigator>
  );
};
