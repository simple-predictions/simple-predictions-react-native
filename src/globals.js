const baseUrl = process.env.REACT_APP_BASE_URL || 'http://192.168.0.16:5000';

export const darkColorScheme = {
  background: '#323232',
  primary: '#defc5f',
  secondary: 'white',
  third: '#5C5C5C',
  fourth: '#858585',
};

export const lightColorScheme = {
  background: '#F3F3F3',
  primary: '#defc5f',
  secondary: 'black',
  third: '#F3F3F3',
  fourth: 'white',
};

// eslint-disable-next-line import/prefer-default-export
export { baseUrl };
