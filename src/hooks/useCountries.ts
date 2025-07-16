import { COUNTRIES } from '@/lib/constants';

interface CountryOption {
  value: string;
  label: string;
  flag: string;
}

export function useCountries() {
  return {
    countries: COUNTRIES,
    isLoading: false,
    error: null,
  };
} 