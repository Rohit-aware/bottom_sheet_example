import React from 'react';
import {StatusBar} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {BottomSheetThemeProvider, darkTheme} from '@rn-lab/bottom-sheet';
import {COLORS} from './src/constants';
import {HomeScreen} from './src/screens/HomeScreen';

function App() {
  return (
    <SafeAreaProvider>
      <BottomSheetThemeProvider theme={darkTheme}>
        <StatusBar barStyle="light-content" backgroundColor={COLORS.bg} />
        <HomeScreen />
      </BottomSheetThemeProvider>
    </SafeAreaProvider>
  );
}

export default App;
