import React from 'react'
import { Image, StyleProp, ViewStyle } from 'react-native'
import { createAppContainer, BottomTabNavigatorConfig } from 'react-navigation' // 1.0.0-beta.27
import { createBottomTabNavigator } from 'react-navigation-tabs'
import HomePage from './home/HomePage'
import { sicklyYellow } from './styles/colors'
import UnderConstructionPage from './UnderConstructionPage'

// Custom Type until PR get merged and add @types definition
// https://github.com/react-navigation/tabs/pull/147/files
type JarmotionBottomTabNavigatorConfig = BottomTabNavigatorConfig & {
  tabBarOptions: {
    activeTabButtonStyle: StyleProp<ViewStyle>
  }
}

const TabbarIcon = ({ source }) => (
  <Image
    style={{ height: 19, width: 22, resizeMode: 'contain' }}
    source={source}
  />
)

const bottomTabNavigatorConfig: JarmotionBottomTabNavigatorConfig = {
  defaultNavigationOptions: ({ navigation }) => ({
    tabBarIcon: () => {
      switch (navigation.state.routeName) {
        case 'Home':
          return (
            <TabbarIcon source={require('../assets/tabbar_dashboard.png')} />
          )
        case 'Calendar':
          return (
            <TabbarIcon source={require('../assets/tabbar_calendar.png')} />
          )
        case 'Diary':
          return <TabbarIcon source={require('../assets/tabbar_diary.png')} />
        case 'Settings':
          return (
            <TabbarIcon source={require('../assets/tabbar_settings.png')} />
          )
        default:
          return null
      }
    }
  }),
  tabBarOptions: {
    showLabel: false,
    tabStyle: {
      borderTopWidth: 2,
      borderTopColor: 'transparent'
    },
    activeTabButtonStyle: {
      borderTopColor: sicklyYellow,
      borderTopWidth: 2
    }
  }
}

const TabNavigator = createBottomTabNavigator(
  {
    Home: {
      screen: HomePage,
      navigationOptions: ({ navigation }) => ({})
    },
    Calendar: UnderConstructionPage,
    Diary: UnderConstructionPage,
    Settings: UnderConstructionPage
  },
  bottomTabNavigatorConfig
)

export default createAppContainer(TabNavigator)