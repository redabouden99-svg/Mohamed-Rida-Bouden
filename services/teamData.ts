import { SeriesId, Team } from "../types";

export const getTeamsForSeries = (series: SeriesId): Team[] => {
    switch (series) {
        case SeriesId.F1:
            return [
                {
                    id: 'ferrari',
                    name: 'Ferrari',
                    fullName: 'Scuderia Ferrari HP',
                    principal: 'Frédéric Vasseur',
                    base: 'Maranello, Italy',
                    car: 'SF-25',
                    logoColor: '#ff2800',
                    logo: 'https://upload.wikimedia.org/wikipedia/de/c/c0/Scuderia_Ferrari_Logo.svg',
                    image: 'https://images.unsplash.com/photo-1596696142104-633045237731?q=80&w=1200&auto=format&fit=crop',
                    history: 'The oldest and most successful team in F1 history. Founded by Enzo Ferrari, they have competed in every championship since 1950.',
                    points: 400,
                    rank: 2,
                    drivers: [
                        { 
                            name: 'Lewis Hamilton', 
                            number: 44, 
                            nationality: 'GBR',
                            image: 'https://images.unsplash.com/photo-1628185016593-3d0d8299d63c?q=80&w=600&auto=format&fit=crop',
                            stats: { titles: 7, wins: 105, podiums: 201 },
                            bio: 'A legend of the sport, Hamilton makes history by joining Ferrari for 2025. The most successful driver of all time seeks an eighth title in red.'
                        },
                        { 
                            name: 'Charles Leclerc', 
                            number: 16, 
                            nationality: 'MON',
                            image: 'https://images.unsplash.com/photo-1678822971578-831c0e3592c3?q=80&w=600&auto=format&fit=crop',
                            stats: { titles: 0, wins: 8, podiums: 41 },
                            bio: 'Ferrari\'s homegrown star. Known for blistering qualifying speed, he aims to lead the Scuderia back to championship glory.'
                        }
                    ]
                },
                {
                    id: 'rb',
                    name: 'Red Bull Racing',
                    fullName: 'Oracle Red Bull Racing',
                    principal: 'Christian Horner',
                    base: 'Milton Keynes, UK',
                    car: 'RB21',
                    logoColor: '#0000cc',
                    logo: 'https://upload.wikimedia.org/wikipedia/de/c/c4/Red_Bull_Racing_logo.svg',
                    image: 'https://images.unsplash.com/photo-1649931818231-50e8d0e0638c?q=80&w=1200&auto=format&fit=crop',
                    history: 'Entered F1 in 2005. They dominated the sport with Sebastian Vettel (2010-2013) and established a new era of dominance with Max Verstappen.',
                    points: 450,
                    rank: 1,
                    drivers: [
                        { 
                            name: 'Max Verstappen', 
                            number: 1, 
                            nationality: 'NED',
                            image: 'https://images.unsplash.com/photo-1678971169641-f4d0f0473a24?q=80&w=600&auto=format&fit=crop',
                            stats: { titles: 4, wins: 63, podiums: 112 },
                            bio: 'The reigning dominant force in Formula 1. Verstappen combines raw aggression with metronomic consistency.'
                        },
                        { 
                            name: 'Liam Lawson', 
                            number: 30, 
                            nationality: 'NZL',
                            image: 'https://images.unsplash.com/photo-1599558235453-2624b4556488?q=80&w=600&auto=format&fit=crop',
                            stats: { titles: 0, wins: 0, podiums: 0 },
                            bio: 'The young Kiwi talent steps up to the senior team full-time, looking to prove he belongs among the elite.'
                        }
                    ]
                },
                {
                    id: 'mercedes',
                    name: 'Mercedes',
                    fullName: 'Mercedes-AMG PETRONAS F1 Team',
                    principal: 'Toto Wolff',
                    base: 'Brackley, UK',
                    car: 'W16',
                    logoColor: '#00d2be',
                    logo: 'https://upload.wikimedia.org/wikipedia/commons/f/fb/Mercedes_AMG_Petronas_F1_Logo.svg',
                    image: 'https://images.unsplash.com/photo-1625902347278-651d69db2992?q=80&w=1200&auto=format&fit=crop',
                    history: 'Returned to F1 in 2010. They achieved an unprecedented 8 consecutive Constructors\' Championships from 2014 to 2021.',
                    points: 350,
                    rank: 3,
                    drivers: [
                        { 
                            name: 'George Russell', 
                            number: 63, 
                            nationality: 'GBR',
                            image: 'https://images.unsplash.com/photo-1655070265691-18e404097479?q=80&w=600&auto=format&fit=crop',
                            stats: { titles: 0, wins: 2, podiums: 15 },
                            bio: 'Now the team leader at Mercedes. Russell has the speed and intellect to lead the Silver Arrows\' resurgence.'
                        },
                        { 
                            name: 'Kimi Antonelli', 
                            number: 12, 
                            nationality: 'ITA',
                            image: 'https://images.unsplash.com/photo-1599558235453-2624b4556488?q=80&w=600&auto=format&fit=crop',
                            stats: { titles: 0, wins: 0, podiums: 0 },
                            bio: 'The most hyped rookie since Hamilton. A Mercedes junior prodigy fast-tracked to the top seat.'
                        }
                    ]
                }
            ];

        case SeriesId.WEC:
            return [
                // Hypercar Class
                {
                    id: 'porsche',
                    name: 'Porsche Penske',
                    fullName: 'Porsche Penske Motorsport',
                    principal: 'Urs Kuratle',
                    base: 'Weissach, Germany',
                    car: 'Porsche 963',
                    category: 'Hypercar',
                    logoColor: '#d5001c',
                    logo: 'https://upload.wikimedia.org/wikipedia/de/2/2d/Porsche_Wappen.svg',
                    image: 'https://newsroom.porsche.com/.imaging/mte/porsche-templating-theme/image_1290x726/dam/pnr/2023/Motorsports/WEC/Le-Mans-Test-Day/02-Porsche-963-Porsche-Penske-Motorsport.jpg/jcr:content/02-Porsche-963-Porsche-Penske-Motorsport.jpg',
                    history: 'Porsche is the most successful manufacturer at Le Mans. The 963 program marks their return to the top class with Penske.',
                    points: 150,
                    rank: 1,
                    drivers: [
                        { name: 'Kévin Estre', number: 6, nationality: 'FRA', image: '', stats: { titles: 1, wins: 15, podiums: 40 }, bio: 'Factory ace.' },
                        { name: 'André Lotterer', number: 6, nationality: 'GER', image: '', stats: { titles: 1, wins: 10, podiums: 30 }, bio: 'Le Mans legend.' }
                    ]
                },
                {
                    id: 'toyota',
                    name: 'Toyota Gazoo',
                    fullName: 'Toyota Gazoo Racing',
                    principal: 'Kamui Kobayashi',
                    base: 'Cologne, Germany',
                    car: 'GR010 Hybrid',
                    category: 'Hypercar',
                    logoColor: '#eb001e',
                    logo: 'https://upload.wikimedia.org/wikipedia/commons/e/e7/Toyota_Gazoo_Racing_logo_2020.svg',
                    image: 'https://images.unsplash.com/photo-1629219356886-c322b724497e?q=80&w=1200&auto=format&fit=crop',
                    history: 'Dominant force in WEC during the Hybrid era, winning 5 consecutive Le Mans titles.',
                    points: 140,
                    rank: 2,
                    drivers: [
                        { name: 'Sébastien Buemi', number: 8, nationality: 'SUI', image: '', stats: { titles: 4, wins: 24, podiums: 50 }, bio: 'WEC Record holder.' },
                        { name: 'Brendon Hartley', number: 8, nationality: 'NZL', image: '', stats: { titles: 3, wins: 20, podiums: 45 }, bio: 'Technical master.' }
                    ]
                },
                {
                    id: 'ferrari_wec',
                    name: 'Ferrari AF Corse',
                    fullName: 'Ferrari AF Corse',
                    principal: 'Antonello Coletta',
                    base: 'Piacenza, Italy',
                    car: 'Ferrari 499P',
                    category: 'Hypercar',
                    logoColor: '#ff2800',
                    logo: 'https://upload.wikimedia.org/wikipedia/de/c/c0/Scuderia_Ferrari_Logo.svg',
                    image: 'https://images.unsplash.com/photo-1686481776510-449757602331?q=80&w=1200&auto=format&fit=crop',
                    history: 'Returned to the top class after 50 years and won Le Mans immediately in 2023 and 2024.',
                    points: 135,
                    rank: 3,
                    drivers: [
                        { name: 'Antonio Fuoco', number: 50, nationality: 'ITA', image: '', stats: { titles: 0, wins: 2, podiums: 8 }, bio: 'Pole position specialist.' },
                        { name: 'Miguel Molina', number: 50, nationality: 'ESP', image: '', stats: { titles: 0, wins: 5, podiums: 15 }, bio: 'Experienced GT vet.' }
                    ]
                },
                {
                    id: 'peugeot',
                    name: 'Peugeot',
                    fullName: 'Peugeot TotalEnergies',
                    principal: 'Olivier Jansonnie',
                    base: 'Versailles, France',
                    car: 'Peugeot 9X8 2024',
                    category: 'Hypercar',
                    logoColor: '#ffffff',
                    logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/f/f7/Peugeot_Logo.svg/1200px-Peugeot_Logo.svg.png',
                    image: 'https://images.unsplash.com/photo-1660570494488-842245b73489?q=80&w=1200&auto=format&fit=crop',
                    history: 'Historic Le Mans winners with the 905 and 908. Returned with the radical wingless 9X8 concept, now updated with a rear wing.',
                    points: 40,
                    rank: 7,
                    drivers: [
                        { name: 'Paul Di Resta', number: 93, nationality: 'GBR', image: '', stats: { titles: 0, wins: 0, podiums: 1 }, bio: 'Ex-F1 driver.' },
                        { name: 'Stoffel Vandoorne', number: 93, nationality: 'BEL', image: '', stats: { titles: 0, wins: 0, podiums: 1 }, bio: 'Formula E Champion.' }
                    ]
                },
                {
                    id: 'alpine_wec',
                    name: 'Alpine',
                    fullName: 'Alpine Endurance Team',
                    principal: 'Philippe Sinault',
                    base: 'Viry-Châtillon, France',
                    car: 'Alpine A424',
                    category: 'Hypercar',
                    logoColor: '#0055a4',
                    logo: 'https://upload.wikimedia.org/wikipedia/fr/b/b7/Alpine_F1_Team_2021_Logo.svg',
                    image: 'https://images.unsplash.com/photo-1596564619376-793570327464?q=80&w=1200&auto=format&fit=crop',
                    history: 'French brand with deep Le Mans roots. Moved from LMP1 (rebadged) to a custom LMDh chassis for 2024.',
                    points: 55,
                    rank: 5,
                    drivers: [
                        { name: 'Mick Schumacher', number: 36, nationality: 'GER', image: '', stats: { titles: 0, wins: 0, podiums: 1 }, bio: 'Schumacher name returns to sportscars.' },
                        { name: 'Nicolas Lapierre', number: 36, nationality: 'FRA', image: '', stats: { titles: 2, wins: 15, podiums: 30 }, bio: 'Alpine veteran.' }
                    ]
                },
                // LMGT3 Class
                {
                    id: 'manthey',
                    name: 'Manthey',
                    fullName: 'Manthey EMA/PureRxcing',
                    principal: 'Nicolas Raeder',
                    base: 'Nurburgring, Germany',
                    car: 'Porsche 911 GT3 R',
                    category: 'LMGT3',
                    logoColor: '#d5001c',
                    logo: 'https://upload.wikimedia.org/wikipedia/de/2/2d/Porsche_Wappen.svg',
                    image: 'https://images.unsplash.com/photo-1629219356886-c322b724497e?q=80&w=1200&auto=format&fit=crop',
                    history: 'The most successful Porsche team in GT racing, partly owned by Porsche.',
                    points: 110,
                    rank: 1,
                    drivers: [
                        { name: 'Richard Lietz', number: 91, nationality: 'AUT', image: '', stats: { titles: 4, wins: 15, podiums: 40 }, bio: 'Porsche stalwart.' },
                        { name: 'Klaus Bachler', number: 92, nationality: 'AUT', image: '', stats: { titles: 0, wins: 5, podiums: 15 }, bio: 'GT specialist.' }
                    ]
                },
                 {
                    id: 'wrt_lmgt3',
                    name: 'Team WRT',
                    fullName: 'Team WRT (BMW)',
                    principal: 'Vincent Vosse',
                    base: 'Belgium',
                    car: 'BMW M4 GT3',
                    category: 'LMGT3',
                    logoColor: '#005b95',
                    logo: 'https://upload.wikimedia.org/wikipedia/commons/4/44/BMW.svg',
                    image: 'https://images.unsplash.com/photo-1629219356886-c322b724497e?q=80&w=1200&auto=format&fit=crop',
                    history: 'Switched from Audi to BMW to lead their WEC assault.',
                    points: 98,
                    rank: 2,
                    drivers: [
                        { name: 'Valentino Rossi', number: 46, nationality: 'ITA', image: '', stats: { titles: 0, wins: 0, podiums: 2 }, bio: 'The Doctor.' },
                        { name: 'Augusto Farfus', number: 31, nationality: 'BRA', image: '', stats: { titles: 0, wins: 5, podiums: 15 }, bio: 'BMW legend.' }
                    ]
                }
            ];

        case SeriesId.IMSA:
            return [
                // GTP Class
                {
                    id: 'porsche_imsa',
                    name: 'Porsche Penske',
                    fullName: 'Porsche Penske Motorsport',
                    principal: 'Jonathan Diuguid',
                    base: 'Mooresville, NC',
                    car: 'Porsche 963',
                    category: 'GTP',
                    logoColor: '#d5001c',
                    logo: 'https://upload.wikimedia.org/wikipedia/de/2/2d/Porsche_Wappen.svg',
                    image: 'https://newsroom.porsche.com/.imaging/mte/porsche-templating-theme/image_1290x726/dam/pnr/2023/Motorsports/WEC/Le-Mans-Test-Day/02-Porsche-963-Porsche-Penske-Motorsport.jpg/jcr:content/02-Porsche-963-Porsche-Penske-Motorsport.jpg',
                    history: 'The revived partnership between Roger Penske and Porsche. Won the Daytona 24 Hours in 2024.',
                    points: 2500,
                    rank: 1,
                    drivers: [
                        { name: 'Dane Cameron', number: 7, nationality: 'USA', image: '', stats: { titles: 3, wins: 15, podiums: 40 }, bio: 'IMSA Champion.' },
                        { name: 'Felipe Nasr', number: 7, nationality: 'BRA', image: '', stats: { titles: 2, wins: 10, podiums: 30 }, bio: 'Ex-F1 driver.' }
                    ]
                },
                {
                    id: 'cadillac_imsa',
                    name: 'Cadillac Racing',
                    fullName: 'Cadillac V-Series.R',
                    principal: 'Chip Ganassi',
                    base: 'Detroit, MI',
                    car: 'V-Series.R',
                    category: 'GTP',
                    logoColor: '#f1b434',
                    logo: 'https://upload.wikimedia.org/wikipedia/en/e/e3/Cadillac_V-Series_logo.svg',
                    image: 'https://images.unsplash.com/photo-1549921296-3a6b5b3b7b25?q=80&w=1200&auto=format&fit=crop',
                    history: 'Cadillac has dominated the DPi era and continues to be a top contender in GTP with their thunderous V8.',
                    points: 2350,
                    rank: 2,
                    drivers: [
                        { name: 'Sebastien Bourdais', number: 0o1, nationality: 'FRA', image: '', stats: { titles: 4, wins: 40, podiums: 60 }, bio: 'IndyCar legend.' },
                        { name: 'Renger van der Zande', number: 0o1, nationality: 'NED', image: '', stats: { titles: 0, wins: 10, podiums: 30 }, bio: 'Endurance specialist.' }
                    ]
                },
                // GTD / GTD Pro Class (Including Mercedes)
                {
                    id: 'winward',
                    name: 'Winward Racing',
                    fullName: 'Winward Racing (Mercedes)',
                    principal: 'Christian Hohenadel',
                    base: 'Houston, TX',
                    car: 'Mercedes-AMG GT3',
                    category: 'GTD',
                    logoColor: '#00d2be',
                    logo: 'https://upload.wikimedia.org/wikipedia/commons/f/fb/Mercedes_AMG_Petronas_F1_Logo.svg',
                    image: 'https://images.unsplash.com/photo-1629219356886-c322b724497e?q=80&w=1200&auto=format&fit=crop',
                    history: 'A powerhouse in the GTD class, Winward Racing consistently puts the Mercedes-AMG GT3 at the front, known for winning the Rolex 24.',
                    points: 2100,
                    rank: 1,
                    drivers: [
                        { name: 'Philip Ellis', number: 57, nationality: 'SUI', image: '', stats: { titles: 0, wins: 6, podiums: 15 }, bio: 'AMG Factory driver.' },
                        { name: 'Russell Ward', number: 57, nationality: 'USA', image: '', stats: { titles: 0, wins: 5, podiums: 12 }, bio: 'Team owner/driver.' }
                    ]
                },
                 {
                    id: 'korthoff',
                    name: 'Korthoff Preston',
                    fullName: 'Korthoff Preston Motorsports (Mercedes)',
                    principal: 'Walt Preston',
                    base: 'USA',
                    car: 'Mercedes-AMG GT3',
                    category: 'GTD',
                    logoColor: '#000000',
                    logo: 'https://upload.wikimedia.org/wikipedia/commons/f/fb/Mercedes_AMG_Petronas_F1_Logo.svg',
                    image: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?q=80&w=1200&auto=format&fit=crop',
                    history: 'A highly competitive privateer Mercedes team fighting for the GTD championship.',
                    points: 1950,
                    rank: 3,
                    drivers: [
                        { name: 'Mikael Grenier', number: 32, nationality: 'CAN', image: '', stats: { titles: 0, wins: 2, podiums: 10 }, bio: 'Rapid Canadian.' },
                        { name: 'Mike Skeen', number: 32, nationality: 'USA', image: '', stats: { titles: 0, wins: 3, podiums: 8 }, bio: 'Veteran racer.' }
                    ]
                },
                {
                    id: 'rexym',
                    name: 'AO Racing',
                    fullName: 'AO Racing (Rexy)',
                    principal: 'Gunnar Jeannette',
                    base: 'Chicago, IL',
                    car: 'Porsche 911 GT3 R',
                    category: 'GTD Pro',
                    logoColor: '#44aa44',
                    logo: 'https://upload.wikimedia.org/wikipedia/de/2/2d/Porsche_Wappen.svg',
                    image: 'https://images.unsplash.com/photo-1629219356886-c322b724497e?q=80&w=1200&auto=format&fit=crop',
                    history: 'Fan favorites with their "Rexy" dinosaur livery. A new team that quickly became front-runners in GTD Pro.',
                    points: 2050,
                    rank: 1,
                    drivers: [
                        { name: 'Sebastian Priaulx', number: 77, nationality: 'GBR', image: '', stats: { titles: 0, wins: 3, podiums: 8 }, bio: 'Multimatic driver.' },
                        { name: 'Laurin Heinrich', number: 77, nationality: 'GER', image: '', stats: { titles: 0, wins: 2, podiums: 6 }, bio: 'Porsche Junior.' }
                    ]
                },
                 {
                    id: 'vasser_sullivan',
                    name: 'Vasser Sullivan',
                    fullName: 'Vasser Sullivan (Lexus)',
                    principal: 'Jimmy Vasser',
                    base: 'Charlotte, NC',
                    car: 'Lexus RC F GT3',
                    category: 'GTD Pro',
                    logoColor: '#000000',
                    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Lexus_logo_black.svg/2560px-Lexus_logo_black.svg.png',
                    image: 'https://images.unsplash.com/photo-1629219356886-c322b724497e?q=80&w=1200&auto=format&fit=crop',
                    history: 'The factory Lexus effort in North America. GTD Pro Champions in 2023.',
                    points: 1800,
                    rank: 4,
                    drivers: [
                        { name: 'Jack Hawksworth', number: 14, nationality: 'GBR', image: '', stats: { titles: 1, wins: 10, podiums: 25 }, bio: 'The benchmark.' },
                        { name: 'Ben Barnicoat', number: 14, nationality: 'GBR', image: '', stats: { titles: 1, wins: 8, podiums: 20 }, bio: 'Ultra consistent.' }
                    ]
                }
            ];

        case SeriesId.GT_WORLD_CHALLENGE:
            return [
                // Europe
                {
                    id: 'wrt_europe',
                    name: 'Team WRT',
                    fullName: 'Team WRT (Europe)',
                    principal: 'Vincent Vosse',
                    base: 'Belgium',
                    car: 'BMW M4 GT3',
                    category: 'Europe',
                    logoColor: '#005b95',
                    logo: 'https://upload.wikimedia.org/wikipedia/commons/4/44/BMW.svg',
                    image: 'https://images.unsplash.com/photo-1629219356886-c322b724497e?q=80&w=1200&auto=format&fit=crop',
                    history: 'The dominant force in European GT racing. Multiple time champions.',
                    points: 120,
                    rank: 1,
                    drivers: [
                        { name: 'Dries Vanthoor', number: 32, nationality: 'BEL', image: '', stats: { titles: 4, wins: 20, podiums: 50 }, bio: 'One of the fastest GT drivers globally.' },
                        { name: 'Charles Weerts', number: 32, nationality: 'BEL', image: '', stats: { titles: 3, wins: 15, podiums: 40 }, bio: 'Young star.' }
                    ]
                },
                {
                    id: 'akkodis_asp',
                    name: 'Akkodis ASP',
                    fullName: 'Akkodis ASP Team (Lexus/Mercedes)',
                    principal: 'Jerome Policand',
                    base: 'France',
                    car: 'Lexus RC F GT3',
                    category: 'Europe',
                    logoColor: '#ffffff',
                    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Lexus_logo_black.svg/2560px-Lexus_logo_black.svg.png',
                    image: 'https://images.unsplash.com/photo-1629219356886-c322b724497e?q=80&w=1200&auto=format&fit=crop',
                    history: 'Long-time Mercedes partner now switching to Lexus for the WEC/GTWC integration. Always a title threat.',
                    points: 95,
                    rank: 3,
                    drivers: [
                        { name: 'Raffaele Marciello', number: 88, nationality: 'SUI', image: '', stats: { titles: 2, wins: 18, podiums: 45 }, bio: 'Regarded as the GT benchmark.' },
                        { name: 'Timur Boguslavskiy', number: 88, nationality: 'RUS', image: '', stats: { titles: 1, wins: 8, podiums: 20 }, bio: 'Consistent AM/Pro.' }
                    ]
                },
                {
                    id: 'mercedes_europe',
                    name: 'GetSpeed',
                    fullName: 'Mercedes-AMG Team GetSpeed',
                    principal: 'Adam Osieka',
                    base: 'Nurburgring, Germany',
                    car: 'Mercedes-AMG GT3',
                    category: 'Europe',
                    logoColor: '#00d2be',
                    logo: 'https://upload.wikimedia.org/wikipedia/commons/f/fb/Mercedes_AMG_Petronas_F1_Logo.svg',
                    image: 'https://images.unsplash.com/photo-1629219356886-c322b724497e?q=80&w=1200&auto=format&fit=crop',
                    history: 'A top-tier Mercedes customer team, famous for their Nurburgring 24H performances.',
                    points: 88,
                    rank: 4,
                    drivers: [
                        { name: 'Maro Engel', number: 2, nationality: 'GER', image: '', stats: { titles: 1, wins: 12, podiums: 35 }, bio: 'Mercedes Legend.' },
                        { name: 'Luca Stolz', number: 2, nationality: 'GER', image: '', stats: { titles: 0, wins: 8, podiums: 25 }, bio: 'Very fast and reliable.' }
                    ]
                },
                // America
                {
                    id: 'crowdstrike',
                    name: 'CrowdStrike',
                    fullName: 'CrowdStrike Racing by Riley (Mercedes)',
                    principal: 'Bill Riley',
                    base: 'USA',
                    car: 'Mercedes-AMG GT3',
                    category: 'America',
                    logoColor: '#ff0000',
                    logo: 'https://upload.wikimedia.org/wikipedia/commons/f/fb/Mercedes_AMG_Petronas_F1_Logo.svg',
                    image: 'https://images.unsplash.com/photo-1629219356886-c322b724497e?q=80&w=1200&auto=format&fit=crop',
                    history: 'A pro-am powerhouse in GT World Challenge America.',
                    points: 150,
                    rank: 1,
                    drivers: [
                        { name: 'George Kurtz', number: 0o4, nationality: 'USA', image: '', stats: { titles: 1, wins: 10, podiums: 25 }, bio: 'CEO and Racer.' },
                        { name: 'Colin Braun', number: 0o4, nationality: 'USA', image: '', stats: { titles: 2, wins: 20, podiums: 50 }, bio: 'Prototype pace in a GT car.' }
                    ]
                },
                // Asia
                {
                    id: 'craft_bamboo',
                    name: 'Craft-Bamboo',
                    fullName: 'Craft-Bamboo Racing (Mercedes)',
                    principal: 'Darryl O\'Young',
                    base: 'Hong Kong',
                    car: 'Mercedes-AMG GT3',
                    category: 'Asia',
                    logoColor: '#00d2be',
                    logo: 'https://upload.wikimedia.org/wikipedia/commons/f/fb/Mercedes_AMG_Petronas_F1_Logo.svg',
                    image: 'https://images.unsplash.com/photo-1629219356886-c322b724497e?q=80&w=1200&auto=format&fit=crop',
                    history: 'One of the most successful teams in Asian motorsport, official Mercedes performance team.',
                    points: 110,
                    rank: 1,
                    drivers: [
                        { name: 'Daniel Juncadella', number: 77, nationality: 'ESP', image: '', stats: { titles: 1, wins: 10, podiums: 30 }, bio: 'Factory Mercedes driver.' },
                        { name: 'Anthony Liu', number: 77, nationality: 'CHN', image: '', stats: { titles: 1, wins: 5, podiums: 15 }, bio: 'Top Bronze driver.' }
                    ]
                },
                // Australia
                {
                    id: 'triple_eight',
                    name: 'Triple Eight',
                    fullName: 'Triple Eight Race Engineering (Mercedes)',
                    principal: 'Jamie Whincup',
                    base: 'Brisbane, Australia',
                    car: 'Mercedes-AMG GT3',
                    category: 'Australia',
                    logoColor: '#0000aa',
                    logo: 'https://upload.wikimedia.org/wikipedia/commons/f/fb/Mercedes_AMG_Petronas_F1_Logo.svg',
                    image: 'https://images.unsplash.com/photo-1629219356886-c322b724497e?q=80&w=1200&auto=format&fit=crop',
                    history: 'The Supercars giants also dominate GT racing in Australia with Mercedes.',
                    points: 130,
                    rank: 1,
                    drivers: [
                        { name: 'Broc Feeney', number: 88, nationality: 'AUS', image: '', stats: { titles: 0, wins: 5, podiums: 15 }, bio: 'Supercars young gun.' },
                        { name: 'Prince Jefri Ibrahim', number: 88, nationality: 'MAS', image: '', stats: { titles: 1, wins: 8, podiums: 20 }, bio: 'Experienced GT racer.' }
                    ]
                }
            ];
            
        case SeriesId.MOTOGP:
             return [
                {
                    id: 'ducati',
                    name: 'Ducati Lenovo',
                    fullName: 'Ducati Lenovo Team',
                    principal: 'Davide Tardozzi',
                    base: 'Bologna, Italy',
                    car: 'Desmosedici GP25',
                    logoColor: '#cc0000',
                    history: 'Founded in 2003, Ducati has risen to become the dominant force in modern MotoGP with their Desmosedici project.',
                    points: 500,
                    rank: 1,
                    logo: 'https://upload.wikimedia.org/wikipedia/commons/3/30/Ducati_red_logo.svg',
                    image: 'https://images.unsplash.com/photo-1599058917212-d750089bc07e?q=80&w=1200&auto=format&fit=crop',
                    drivers: [
                        { 
                            name: 'Francesco Bagnaia', 
                            number: 63, 
                            nationality: 'ITA', 
                            image: 'https://images.unsplash.com/photo-1599558235453-2624b4556488?q=80&w=600&auto=format&fit=crop',
                            stats: { titles: 3, wins: 25, podiums: 50 }, 
                            bio: 'The quiet assassin. Pecco combines technical precision with explosive late-braking.' 
                        },
                        { 
                            name: 'Marc Márquez', 
                            number: 93, 
                            nationality: 'ESP', 
                            image: 'https://images.unsplash.com/photo-1599558235453-2624b4556488?q=80&w=600&auto=format&fit=crop',
                            stats: { titles: 8, wins: 85, podiums: 140 }, 
                            bio: 'The alien returns to a factory team. Marquez on a factory Ducati is the story of the year.' 
                        }
                    ]
                },
                // ... (Previous MotoGP teams can be kept, adding history/points/rank to them implicitly or explicit for brevity in this response)
                {
                    id: 'aprilia',
                    name: 'Aprilia',
                    fullName: 'Aprilia Racing',
                    principal: 'Massimo Rivola',
                    base: 'Noale, Italy',
                    car: 'RS-GP25',
                    history: 'Aprilia has a rich history in lower classes. Since returning to MotoGP, they have built a race-winning machine.',
                    points: 300,
                    rank: 3,
                    logoColor: '#000000',
                    logo: 'https://upload.wikimedia.org/wikipedia/commons/9/9f/Aprilia_logo.svg',
                    image: 'https://images.unsplash.com/photo-1625841165860-252989b53119?q=80&w=1200&auto=format&fit=crop',
                    drivers: [
                        { 
                            name: 'Jorge Martín', 
                            number: 89, 
                            nationality: 'ESP', 
                            image: 'https://images.unsplash.com/photo-1599558235453-2624b4556488?q=80&w=600&auto=format&fit=crop',
                            stats: { titles: 1, wins: 8, podiums: 30 }, 
                            bio: 'The "Martinator". Reigning World Champion taking his #1 plate to Aprilia.' 
                        },
                        { 
                            name: 'Marco Bezzecchi', 
                            number: 72, 
                            nationality: 'ITA', 
                            image: 'https://images.unsplash.com/photo-1599558235453-2624b4556488?q=80&w=600&auto=format&fit=crop',
                            stats: { titles: 0, wins: 3, podiums: 12 }, 
                            bio: 'VR46 academy graduate stepping up to a factory rider role for the first time.' 
                        }
                    ]
                }
            ];
            
        default:
            return [];
    }
}