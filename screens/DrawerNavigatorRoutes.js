//Import React
import React from "react";

//Import Navigators
import { createStackNavigator } from "react-navigation-stack";
import { createDrawerNavigator } from "react-navigation-drawer";

//Import External Screens
import HomeScreen from "./drawerScreens/HomeScreen";
import SettingsScreen from "./drawerScreens/SettingsScreen";
import CustomSidebarMenu from "./Components/CustomSidebarMenu";
import NavigationDrawerHeader from "./Components/NavigationDrawerHeader";
import inventario from "./drawerScreens/inventario";
import inventarioAdd from "./drawerScreens/inventarioAdd";
import bodega from "./drawerScreens/bodega";
import pedido from "./drawerScreens/pedido";

const FirstActivity_StackNavigator = createStackNavigator({
  First: {
    screen: HomeScreen,
    navigationOptions: ({ navigation }) => ({
      title: "Homescreen",
      //headerLeft: () => <NavigationDrawerHeader navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: "#a3003c",
      },
      headerTintColor: "#fff",
    }),
  },
});

const SecondActivity_StackNavigator = createStackNavigator({
  First: {
    screen: SettingsScreen,
    navigationOptions: ({ navigation }) => ({
      title: "Setting Screen",
      //headerLeft: () => <NavigationDrawerHeader navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: "#a3003c",
      },
      headerTintColor: "#fff",
    }),
  },
});
const ThirdActivity_StackNavigator = createStackNavigator({
  First: {
    screen: inventario,
    navigationOptions: ({ navigation }) => ({
      title: "Inventario",
      //headerLeft: () => <NavigationDrawerHeader navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: "#a3003c",
      },
      headerTintColor: "#fff",
    }),
  },
});

const FActivity_StackNavigator = createStackNavigator({
  First: {
    screen: bodega,
    navigationOptions: ({ navigation }) => ({
      title: "Bodega",
      //headerLeft: () => <NavigationDrawerHeader navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: "#a3003c",
      },
      headerTintColor: "#fff",
    }),
  },
});
const hacerPedidos_StackNavigator = createStackNavigator({
  First: {
    screen: pedido,
    navigationOptions: ({ navigation }) => ({
      title: "Pedidos",
      //headerLeft: () => <NavigationDrawerHeader navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: "#a3003c",
      },
      headerTintColor: "#fff",
    }),
  },
});

//  const DActivity_StackNavigator = createStackNavigator({
//    First: {
//      screen: inventarioDel,
//      navigationOptions: ({ navigation }) => ({
//        title: 'inventarioDel',
//        //headerLeft: () => <NavigationDrawerHeader navigationProps={navigation} />,
//        headerStyle: {
//          backgroundColor: '#a3003c',
//        },
//        headerTintColor: '#fff',
//      }),
//    }
//  });
const AgActivity_StackNavigator = createStackNavigator({
  First: {
    screen: inventarioAdd,
    navigationOptions: ({ navigation }) => ({
      title: "inventarioAdd",
      //headerLeft: () => <NavigationDrawerHeader navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: "#a3003c",
      },
      headerTintColor: "#fff",
    }),
  },
});
const DrawerNavigatorRoutes = createDrawerNavigator(
  {
    HomeScreen: {
      screen: FirstActivity_StackNavigator,
      navigationOptions: {
        drawerLabel: "Home Screen",
      },
    },
    SettingsScreen: {
      screen: SecondActivity_StackNavigator,
      navigationOptions: {
        drawerLabel: "Setting Screen",
      },
    },
    inventario: {
      screen: ThirdActivity_StackNavigator,
      navigationOptions: {
        drawerLabel: "inventario",
      },
    },

    bodega: {
      screen: FActivity_StackNavigator,
      navigationOptions: {
        drawerLabel: "bodega",
      },
    },
    pedido: {
      screen: hacerPedidos_StackNavigator,
      navigationOptions: {
        drawerLabel: "pedido",
      },
    },

    inventarioAdd: {
      screen: AgActivity_StackNavigator,
      navigationOptions: {
        drawerLabel: "inventarioAdd",
      },
    },
  },
  {
    contentComponent: CustomSidebarMenu,
    drawerOpenRoute: "DrawerOpen",
    drawerCloseRoute: "DrawerClose",
    drawerToggleRoute: "DrawerToggle",
  }
);
export default DrawerNavigatorRoutes;
