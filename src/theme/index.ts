import { createTheme } from "@aws-amplify/ui-react";
import { colors } from "./colors";

export const theme = createTheme({
  name: 'story-theme',
  primaryColor: 'indigo',
  tokens: {
    colors: {
      ...colors,
      font: {
        primary: 'white',
        tertiary: '{colors.primary.40}',
        inverse: '{colors.primary.10}'
      },
      background: {
        primary: '{colors.primary.90}',
        secondary: '{colors.primary.80}',
        tertiary: '{colors.primary.70}',
      },
      border: {
        primary: '{colors.primary.60}',
        secondary: '{colors.primary.60}',
        tertiary: '{colors.primary.60}',
        focus: '{colors.primary.20}'
      }
    },
    components: {
      dropzone: {
        backgroundColor: 'transparent'
      },
      button: {
        _hover: {
          backgroundColor: '{colors.primary.80}',
          color: '{colors.primary.10}'
        },
        primary: {
          _disabled: {
            backgroundColor: '{colors.primary.90}',
            color: '{colors.primary.70}'
          }
        }
      }
    }
  }
})
