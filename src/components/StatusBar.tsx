import { useTheme } from '@hooks/useTheme';
import {
  StatusBar as ExpoStatusBar,
  StatusBarProps as ExpoStatusBarProps,
} from 'expo-status-bar';
import { FC } from 'react';
export type StatusBarProps = ExpoStatusBarProps;
export const StatusBar: FC<StatusBarProps> = ({ ...props }) => {
  const { colorMode } = useTheme();
  return (
    <ExpoStatusBar
      style={colorMode === 'dark' ? 'light' : 'dark'}
      backgroundColor={colorMode === 'dark' ? '#141c30' : '#f5f8ff'}
      translucent
      {...props}
    />
  );
};
