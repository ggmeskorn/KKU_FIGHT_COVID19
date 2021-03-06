import { StyleSheet } from 'react-native';

const OtherCountryStyles = StyleSheet.create({
  otherCountryContainer: {
    flex: 1,
    padding: 14,
  },
  logoContainer: {
    height: 50,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  sizeLogo: {
    width: 175,
    height: 30,
  },
  searchCountryContainer: {
    padding: 14,
    backgroundColor: '#2B7A78',
    marginTop: 14,
    marginBottom: 14,
    borderRadius: 10,
  },
  inputCountry: {
    height: 40,
    borderWidth: 1,
    paddingLeft: 10,
    borderColor: '#2B7A78',
    backgroundColor: '#FFFFFF',
  },
  itemCountryContainer: {
    backgroundColor: '#2B7A78',
    flexWrap: 'nowrap',
    padding: 14,
    borderRadius: 10,
  },
  titleOtherCountry: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  statusOtherCountryContainer: {
    backgroundColor: '#fff',
    padding: 4,
    borderRadius: 10,
    marginTop: 8,
  },
  textCountry: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  textStatus: {
    fontSize: 14,
  },
});

export default OtherCountryStyles;
