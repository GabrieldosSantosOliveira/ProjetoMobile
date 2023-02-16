import { useTheme } from '@hooks/useTheme';
import { StatusBar as ExpoStatusBar, StatusBarProps } from 'expo-status-bar';
import { FC } from 'react';
type IStatusBar = StatusBarProps;
export const StatusBar: FC<IStatusBar> = ({ ...props }) => {
  const { colorMode } = useTheme();
  return (
    <ExpoStatusBar
      style={colorMode === 'dark' ? 'light' : 'dark'}
      backgroundColor="transparent"
      translucent
      {...props}
    />
  );
};
