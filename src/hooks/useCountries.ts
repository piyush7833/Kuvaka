import { useState, useEffect } from 'react';

interface CountryOption {
  value: string;
  label: string;
  flag: string;
}

export function useCountries() {
  const [countries, setCountries] = useState<CountryOption[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch('https://restcountries.com/v3.1/all?fields=name,flags,idd');
        const data = await response.json();
        
        const formattedCountries: CountryOption[] = data
          .filter((country: any) => country.idd.root && country.idd.suffixes?.[0])
          .map((country: any) => ({
            value: `${country.idd.root}${country.idd.suffixes[0]}`,
            label: country.name.common,
            flag: country.flags.png,
          }))
          .sort((a: CountryOption, b: CountryOption) => a.label.localeCompare(b.label));

        setCountries(formattedCountries);
        setError(null);
      } catch (error) {
        setError('Failed to fetch countries');
        console.error('Error fetching countries:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCountries();
  }, []);

  return { countries, isLoading, error };
} 