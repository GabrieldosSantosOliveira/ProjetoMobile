import {
  memo,
  forwardRef,
  ForwardRefRenderFunction,
  ReactNode,
  useState,
} from 'react';
import { TextInput, TextInputProps, StyleSheet, View } from 'react-native';

interface InputProps extends TextInputProps {
  LeftElement?: ReactNode;
  RightElement?: ReactNode;
}
export const InputBase: ForwardRefRenderFunction<TextInput, InputProps> = (
  { RightElement, LeftElement, ...props },
  ref,
) => {
  const [isFocus, setIsFocus] = useState<boolean>(false);
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderColor: '#bfdbfe',
        borderWidth: 1,
        borderRadius: 4,
      }}
    >
      {LeftElement ? LeftElement : <></>}
      <TextInput
        onFocus={() => setIsFocus((prev) => !prev)}
        onBlur={() => setIsFocus((prev) => !prev)}
        ref={ref}
        {...props}
        style={
          isFocus
            ? styles.input
            : [
                styles.input,
                {
                  backgroundColor: 'red',
                },
              ]
        }
      />
      {RightElement ? RightElement : <></>}
    </View>
  );
};
const styles = StyleSheet.create({
  input: {
    width: '100%',
    fontFamily: 'Poppins_400Regular',
    height: 56,
    paddingHorizontal: 16,
  },
});
export const Input = memo(forwardRef(InputBase));
