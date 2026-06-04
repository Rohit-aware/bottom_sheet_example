# @mypcot/reusable-bottom-sheet

A premium, framework-agnostic, production-grade bottom sheet component for React Native. Built with performance, accessibility, and high visual excellence in mind.

Powered by `react-native-reanimated` and `react-native-gesture-handler` for smooth, native-thread interactions.

---

## Features

- 🚀 **Performant & Native**: Run gestures and calculations on the UI thread for 60fps scrolling and snapping.
- 📐 **Flexible Snapping**: Support numbers (px) or string percentage snap points (`snapPoints={[300, '50%', '90%']}`).
- 🛠️ **Imperative Ref API**: Access common state controls via a ref (`open()`, `close()`, `expand()`, `collapse()`, `snapToIndex()`).
- 🎭 **Render Props**: Use function-as-children to dynamically render internal states (like current snap index).
- 🎨 **Theming System**: Structured theme design tokens with out-of-the-box light/dark presets.
- 📐 **Dynamic Content Sizing**: Fits layout size to content when enabled (`enableDynamicSizing={true}`).
- 💤 **Lazy Loading**: Defers loading heavy child components until the sheet settles.
- ⌨️ **Keyboard Aware**: Automatically shifts layout dynamically on iOS when the keyboard pops up.

---

## Installation

Install using npm or yarn:

```bash
# npm
npm install @mypcot/reusable-bottom-sheet

# yarn
yarn add @mypcot/reusable-bottom-sheet
```

### Peer Dependencies

Ensure your project also has the necessary peer dependencies installed:

```bash
yarn add react-native-gesture-handler react-native-reanimated react-native-safe-area-context
```

> [!IMPORTANT]
> Make sure to wrap your application root with `<GestureHandlerRootView>` from `react-native-gesture-handler`.

---

## Usage

### 1. Basic Setup

```tsx
import React, { useState } from 'react';
import { Button, Text, View } from 'react-native';
import { BottomSheet } from '@mypcot/reusable-bottom-sheet';

export default function App() {
  const [visible, setVisible] = useState(false);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button title="Open Sheet" onPress={() => setVisible(true)} />

      <BottomSheet
        visible={visible}
        onClose={() => setVisible(false)}
        snapPoints={[300, '50%']}
      >
        <View style={{ padding: 24, alignItems: 'center' }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Hello Bottom Sheet!</Text>
        </View>
      </BottomSheet>
    </View>
  );
}
```

### 2. Imperative Control (Refs)

```tsx
import React, { useRef, useState } from 'react';
import { Button, View } from 'react-native';
import { BottomSheet, BottomSheetRef } from '@mypcot/reusable-bottom-sheet';

export default function App() {
  const [visible, setVisible] = useState(false);
  const sheetRef = useRef<BottomSheetRef>(null);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button title="Show Sheet" onPress={() => setVisible(true)} />

      <BottomSheet
        ref={sheetRef}
        visible={visible}
        onClose={() => setVisible(false)}
        snapPoints={[300, 600]}
      >
        <View style={{ padding: 24 }}>
          <Button title="Expand to Max" onPress={() => sheetRef.current?.expand()} />
          <Button title="Collapse to Base" onPress={() => sheetRef.current?.collapse()} />
          <Button title="Close Sheet" onPress={() => sheetRef.current?.close()} />
        </View>
      </BottomSheet>
    </View>
  );
}
```

### 3. Render Props (Function-as-Children)

Get access to controller functions and values directly within your children rendering context:

```tsx
<BottomSheet visible={visible} onClose={handleClose} snapPoints={[300, '80%']}>
  {({ close, snapToIndex, currentSnapIndex }) => (
    <View style={{ padding: 24 }}>
      <Text>Active Snap Index: {currentSnapIndex.value}</Text>
      <Button title="Close" onPress={() => close()} />
      <Button title="Snap to High" onPress={() => snapToIndex(1)} />
    </View>
  )}
</BottomSheet>
```

### 4. Customizing Themes

Apply custom style variables globally using the context provider or locally using the `theme` prop:

```tsx
import { BottomSheetThemeProvider, darkTheme } from '@mypcot/reusable-bottom-sheet';

// Wrap your app root:
<BottomSheetThemeProvider theme={darkTheme}>
  <App />
</BottomSheetThemeProvider>
```

Or pass theme attributes directly to a specific sheet instance:

```tsx
<BottomSheet
  visible={visible}
  onClose={handleClose}
  snapPoints={[400]}
  theme={{
    colors: {
      background: '#2A0E35',
      backdrop: 'rgba(0, 0, 0, 0.8)',
      handle: '#FF79C6',
    },
    radius: {
      container: 24,
      handle: 8,
    }
  }}
>
  <MyCustomThemedContent />
</BottomSheet>
```

---

## Props Reference

| Prop | Type | Default | Description |
|---|---|---|---|
| `snapPoints` | `SnapPoint[]` | *Required* | Array of snap heights. e.g. `[300, '50%']`. |
| `visible` | `boolean` | *Required* | Controls sheet visibility. |
| `onClose` | `() => void` | *Required* | Fired when the sheet completes its close animation. |
| `initialSnapIndex` | `number` | `0` | Snap index to align with when opening. |
| `enableDynamicSizing` | `boolean` | `false` | Dynamically size the first snap point to content height. |
| `lazy` | `boolean` | `false` | Defer rendering of children until open settles. |
| `enableDragToClose` | `boolean` | `true` | Allows dragging down to close the sheet. |
| `enableBackdropDismiss` | `boolean` | `true` | Allows backdrop clicks to close. |
| `theme` | `Partial<BottomSheetTheme>` | `undefined` | Inline styling tokens override. |
| `style` | `BottomSheetStyleOverrides` | `undefined` | Custom StyleSheet overrides. |
| `animationConfig` | `BottomSheetAnimationConfig`| `undefined` | Override speed or easings. |
| `onSnap` | `(index: number) => void` | `undefined` | Fired when the sheet snaps to an index. |
| `renderHandle` | `(props: { theme }) => ReactNode` | `undefined` | Custom handle renderer. |
| `renderBackdrop` | `(props: { onPress, animatedStyle }) => ReactNode` | `undefined` | Custom backdrop renderer. |

---

## Migration Guide (from Stream Chat BottomSheetModal)

### Before (Stream Chat SDK implementation)

```tsx
import { BottomSheetModal } from 'stream-chat-react-native-core';

<BottomSheetModal
  visible={visible}
  onClose={handleClose}
  height={450}
  enableDynamicSizing
>
  <MyContent />
</BottomSheetModal>
```

### After (Stand-alone package)

```tsx
import { BottomSheet } from '@mypcot/reusable-bottom-sheet';

<BottomSheet
  visible={visible}
  onClose={handleClose}
  snapPoints={[450]}
  enableDynamicSizing
>
  <MyContent />
</BottomSheet>
```

### Major changes to note:
1. `height` prop is replaced by `snapPoints`. Use `snapPoints={[450]}` instead of `height={450}`.
2. Context `BottomSheetProvider` wraps inner children automatically; you no longer need external setup providers to query ref coordinates.
