import { InputProvider } from '@contexts/InputContext';
import { useInput } from '@hooks/useInput';
import { FC, memo } from 'react';
import { View, ViewProps } from 'react-native';
export interface Root extends ViewProps {
  _focus?: ViewProps['style'];
}
export const RootBase: FC<Root> = ({ _focus, style, ...props }) => {
  const { isFocus } = useInput();
  return (
    <View
      style={[
        {
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderColor: '#bfdbfe',
          borderWidth: 1,
          borderRadius: 4,
          width: '100%',
          paddingHorizontal: 12,
          gap: 4,
        },
        style,
        isFocus ? _focus : {},
      ]}
      {...props}
    />
  );
};
export const RootWithProvider: FC<Root> = (props) => (
  <InputProvider>
    <RootBase {...props} />
  </InputProvider>
);
export const Root = memo(RootWithProvider);
