import React from 'react';
import MainStack from './src/Navigation/MainStack';
import { StatusBar } from 'react-native';
import Constant from './src/Constant/Constant';
import app from './Firebase/Firebase'
const App = () => {
  return (
    <>
    <StatusBar backgroundColor={Constant.Colors.purple}/>
    <MainStack/>
    </>
  );
};

export default App;
