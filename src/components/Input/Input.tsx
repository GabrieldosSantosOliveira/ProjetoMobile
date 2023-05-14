import { useInput } from '@hooks/useInput';
import { useTheme } from '@hooks/useTheme';
import { FC } from 'react';
import { TextInput, TextInputProps, StyleSheet } from 'react-native';
export type InputProps = TextInputProps;
export const Input: FC<InputProps> = ({ style, onFocus, onBlur, ...props }) => {
  const { changeHasFocus, changeNoHasFocus } = useInput();
  const { colorMode } = useTheme();
  return (
    <TextInput
      style={[
        styles.input,
        { color: colorMode === 'dark' ? '#fff' : '#000' },
        style,
      ]}
      {...props}
      onFocus={(e) => {
        changeHasFocus();
        onFocus ? onFocus(e) : null;
      }}
      onBlur={(e) => {
        changeNoHasFocus();
        onBlur ? onBlur(e) : null;
      }}
    />
  );
};
const styles = StyleSheet.create({
  input: {
    flex: 1,
    fontFamily: 'Poppins_400Regular',
    height: 56,
    paddingHorizontal: 16,
  },
});
