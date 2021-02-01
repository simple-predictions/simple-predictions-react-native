const baseUrl = process.env.REACT_APP_BASE_URL || 'http://192.168.0.16:5000';

export const darkColorScheme = {
  background: '#323232',
  primary: '#defc5f',
  secondary: 'white',
};

export const lightColorScheme = {
  background: 'white',
  primary: '#defc5f',
  secondary: 'black',
};

// eslint-disable-next-line import/prefer-default-export
export { baseUrl };
