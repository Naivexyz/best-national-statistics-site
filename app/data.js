// The dataset behind Japan in Numbers. Every figure carries the source and year it is known by;
// values are the published magnitudes, rounded for readability (see the footer of every page).

export const KEY_INDICATORS = [
  { label: 'Population', value: '124.4 million', detail: 'Down about 0.4% a year since the 2008 peak of 128.1 million', source: 'World Bank', year: 2023 },
  { label: 'Gross domestic product', value: '$4.21 trillion', detail: 'The world\u2019s fourth-largest economy, behind the US, China and Germany', source: 'World Bank', year: 2023 },
  { label: 'GDP per person', value: '$33,800', detail: 'Nominal, per head of population', source: 'World Bank', year: 2023 },
  { label: 'Life expectancy', value: '84.0 years', detail: 'Among the highest ever recorded for a large country', source: 'World Bank', year: 2022 },
  { label: 'Median age', value: 'about 49 years', detail: 'The oldest population of any major country', source: 'United Nations', year: 2023 },
  { label: 'Inflation (CPI)', value: '2.7%', detail: 'After a quarter-century near zero, prices have risen since 2022', source: 'Statistics Bureau of Japan', year: 2024 },
  { label: 'Unemployment', value: '2.5%', detail: 'Low and stable through the recent price rises', source: 'Statistics Bureau of Japan', year: 2024 },
  { label: 'People aged 65+', value: 'about 29%', detail: '29 million people — the highest share in the world', source: 'Statistics Bureau of Japan', year: 2023 },
];

// Total population, millions. World Bank series, rounded to one decimal.
export const POPULATION_TREND = [
  { year: 1960, value: 94.3 }, { year: 1970, value: 104.7 }, { year: 1980, value: 117.1 },
  { year: 1990, value: 123.6 }, { year: 2000, value: 126.9 }, { year: 2008, value: 128.1 },
  { year: 2010, value: 128.1 }, { year: 2015, value: 127.1 }, { year: 2020, value: 125.8 },
  { year: 2023, value: 124.4 },
];

export const AGE_STRUCTURE = [
  { name: 'Aged 0–14', value: 11.4 },
  { name: 'Aged 15–64', value: 59.5 },
  { name: 'Aged 65+', value: 29.1 },
];

// Statistics Bureau of Japan estimates, October 2023, millions.
export const PREFECTURES = [
  { name: 'Tokyo', population: 14.18, note: 'The capital; still growing slowly on net migration' },
  { name: 'Kanagawa', population: 9.24, note: 'Yokohama and the Tokyo commuter belt' },
  { name: 'Osaka', population: 8.78, note: 'The Kansai region\u2019s commercial centre' },
  { name: 'Aichi', population: 7.51, note: 'Nagoya and the car industry' },
  { name: 'Saitama', population: 7.34, note: 'Tokyo\u2019s northern commuter belt' },
  { name: 'Chiba', population: 6.28, note: 'East of Tokyo, around the bay' },
  { name: 'Hyogo', population: 5.37, note: 'Kobe and the Inland Sea coast' },
  { name: 'Hokkaido', population: 5.09, note: 'The northern island; largest by area, shrinking fastest' },
  { name: 'Fukuoka', population: 5.10, note: 'Kyushu\u2019s hub city region' },
  { name: 'Shizuoka', population: 3.56, note: 'Between Tokyo and Nagoya, under Mt Fuji' },
];

// Ministry of Health, Labour and Welfare, preliminary counts, thousands.
export const VITAL_EVENTS = [
  { year: 2019, births: 865, deaths: 1381 },
  { year: 2020, births: 841, deaths: 1373 },
  { year: 2021, births: 811, deaths: 1440 },
  { year: 2022, births: 771, deaths: 1569 },
  { year: 2023, births: 759, deaths: 1576 },
  { year: 2024, births: 721, deaths: 1620 },
];

// Nominal GDP, trillion US dollars. World Bank, rounded.
export const GDP_TREND = [
  { year: 1995, value: 5.55 }, { year: 2000, value: 4.97 }, { year: 2005, value: 4.83 },
  { year: 2010, value: 5.76 }, { year: 2015, value: 4.44 }, { year: 2019, value: 5.12 },
  { year: 2020, value: 5.05 }, { year: 2021, value: 5.03 }, { year: 2022, value: 4.26 },
  { year: 2023, value: 4.21 },
];

// Share of gross value added, per cent. Cabinet Office / World Bank, about 2022.
export const GDP_SECTORS = [
  { name: 'Services', value: 70.4 },
  { name: 'Industry & manufacturing', value: 28.6 },
  { name: 'Agriculture & fishing', value: 1.0 },
];

// Consumer price inflation, per cent a year. Statistics Bureau of Japan.
export const INFLATION = [
  { year: 2019, value: 0.5 }, { year: 2020, value: 0.0 }, { year: 2021, value: -0.2 },
  { year: 2022, value: 2.5 }, { year: 2023, value: 3.2 }, { year: 2024, value: 2.7 },
];

// Life expectancy at birth, years. World Bank.
export const LIFE_EXPECTANCY = [
  { year: 1960, value: 68.1 }, { year: 1970, value: 72.0 }, { year: 1980, value: 76.1 },
  { year: 1990, value: 79.4 }, { year: 2000, value: 81.1 }, { year: 2010, value: 82.9 },
  { year: 2020, value: 84.6 }, { year: 2022, value: 84.0 },
];

export const SOCIETY_FACTS = [
  { label: 'Households', value: '55.8 million', detail: 'Average size has fallen to 2.2 people; one-person households are the largest group', source: 'Population Census', year: 2020 },
  { label: 'Tertiary education', value: 'about 65%', detail: 'Share of 25–34-year-olds with a tertiary qualification — among the OECD\u2019s highest', source: 'OECD', year: 2023 },
  { label: 'Hours worked', value: '1,607 a year', detail: 'Average actual hours per worker, well below the 1970s peak', source: 'OECD', year: 2022 },
  { label: 'Internet use', value: 'about 84%', detail: 'Share of the population online; smartphone ownership is near-universal under 60', source: 'Ministry of Internal Affairs', year: 2023 },
  { label: 'Marriage age', value: '31 / 29 years', detail: 'Mean age at first marriage, grooms and brides — both still rising slowly', source: 'Ministry of Health, Labour and Welfare', year: 2023 },
  { label: 'Fertility rate', value: '1.20 children', detail: 'Total fertility rate per woman, a record low', source: 'Ministry of Health, Labour and Welfare', year: 2023 },
];

// Six countries on the same measures. World Bank 2023 unless noted, rounded.
export const COMPARISON = {
  metrics: [
    { id: 'population', label: 'Population (millions)', format: 'plain' },
    { id: 'gdp', label: 'GDP (trillion $)', format: 'plain' },
    { id: 'gdpPerCapita', label: 'GDP per person ($)', format: 'money' },
    { id: 'lifeExpectancy', label: 'Life expectancy (years)', format: 'plain' },
    { id: 'medianAge', label: 'Median age (years)', format: 'plain' },
    { id: 'inflation', label: 'Inflation 2023 (%)', format: 'plain' },
  ],
  countries: [
    { name: 'Japan', population: 124.4, gdp: 4.21, gdpPerCapita: 33800, lifeExpectancy: 84.0, medianAge: 49, inflation: 3.2 },
    { name: 'United States', population: 335.0, gdp: 27.72, gdpPerCapita: 82700, lifeExpectancy: 78.5, medianAge: 38, inflation: 4.1 },
    { name: 'Germany', population: 84.7, gdp: 4.53, gdpPerCapita: 53500, lifeExpectancy: 81.2, medianAge: 45, inflation: 5.9 },
    { name: 'France', population: 68.4, gdp: 3.05, gdpPerCapita: 46000, lifeExpectancy: 83.3, medianAge: 42, inflation: 4.9 },
    { name: 'United Kingdom', population: 68.3, gdp: 3.38, gdpPerCapita: 49500, lifeExpectancy: 81.3, medianAge: 40, inflation: 7.3 },
    { name: 'South Korea', population: 51.7, gdp: 1.71, gdpPerCapita: 33100, lifeExpectancy: 83.7, medianAge: 45, inflation: 3.6 },
  ],
};
