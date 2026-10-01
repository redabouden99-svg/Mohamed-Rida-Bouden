export interface HistoricalStandingItem {
    rank: number;
    name: string; // driver or team name
    team?: string;
    points: number;
    wins?: number;
    podiums?: number;
    nationality?: string;
    car?: string;
    category?: string;
}

export interface SeasonArchive {
    year: number;
    drivers: HistoricalStandingItem[];
    constructors: HistoricalStandingItem[];
    summary: string;
    championDriver: string;
    championConstructor: string;
}

export const HISTORICAL_SEASONS_DATA: Record<string, Record<number, SeasonArchive>> = {
    // Formula 1
    f1: {
        2025: {
            year: 2025,
            summary: "A thrilling championship season characterized by intense multi-team battles between McLaren, Ferrari, and Red Bull, setting the stage for 2026.",
            championDriver: "Max Verstappen",
            championConstructor: "McLaren F1 Team",
            drivers: [
                { rank: 1, name: "Max Verstappen", team: "Red Bull Racing", points: 429, wins: 9, podiums: 15, nationality: "NED" },
                { rank: 2, name: "Lando Norris", team: "McLaren", points: 408, wins: 7, podiums: 17, nationality: "GBR" },
                { rank: 3, name: "Charles Leclerc", team: "Scuderia Ferrari", points: 365, wins: 4, podiums: 13, nationality: "MON" },
                { rank: 4, name: "Oscar Piastri", team: "McLaren", points: 310, wins: 3, podiums: 11, nationality: "AUS" },
                { rank: 5, name: "George Russell", team: "Mercedes-AMG", points: 265, wins: 2, podiums: 8, nationality: "GBR" },
                { rank: 6, name: "Lewis Hamilton", team: "Mercedes-AMG", points: 242, wins: 2, podiums: 6, nationality: "GBR" },
                { rank: 7, name: "Carlos Sainz", team: "Scuderia Ferrari", points: 230, wins: 1, podiums: 7, nationality: "ESP" },
                { rank: 8, name: "Sergio Perez", team: "Red Bull Racing", points: 152, wins: 0, podiums: 4, nationality: "MEX" },
                { rank: 9, name: "Fernando Alonso", team: "Aston Martin", points: 88, wins: 0, podiums: 1, nationality: "ESP" },
                { rank: 10, name: "Pierre Gasly", team: "Alpine", points: 52, wins: 0, podiums: 1, nationality: "FRA" },
                { rank: 11, name: "Nico Hülkenberg", team: "Haas F1", points: 41, wins: 0, podiums: 0, nationality: "GER" },
                { rank: 12, name: "Yuki Tsunoda", team: "Visa Cash App RB", points: 36, wins: 0, podiums: 0, nationality: "JPN" }
            ],
            constructors: [
                { rank: 1, name: "McLaren F1 Team", points: 718, wins: 10, podiums: 28, car: "MCL39" },
                { rank: 2, name: "Scuderia Ferrari", points: 595, wins: 5, podiums: 20, car: "SF-25" },
                { rank: 3, name: "Red Bull Racing", points: 581, wins: 9, podiums: 19, car: "RB21" },
                { rank: 4, name: "Mercedes-AMG Petronas", points: 507, wins: 4, podiums: 14, car: "F1 W16" },
                { rank: 5, name: "Aston Martin Aramco", points: 106, wins: 0, podiums: 1, car: "AMR25" },
                { rank: 6, name: "Alpine F1 Team", points: 68, wins: 0, podiums: 1, car: "A525" },
                { rank: 7, name: "Haas F1 Team", points: 54, wins: 0, podiums: 0, car: "VF-25" },
                { rank: 8, name: "Visa Cash App RB", points: 48, wins: 0, podiums: 0, car: "VCARB 02" },
                { rank: 9, name: "Williams Racing", points: 24, wins: 0, podiums: 0, car: "FW47" },
                { rank: 10, name: "Stake F1 Team Kick Sauber", points: 4, wins: 0, podiums: 0, car: "C45" }
            ]
        },
        2024: {
            year: 2024,
            summary: "McLaren secured their first World Constructors Championship since 1998 in Abu Dhabi, while Max Verstappen claimed his 4th Drivers Championship title.",
            championDriver: "Max Verstappen",
            championConstructor: "McLaren F1 Team",
            drivers: [
                { rank: 1, name: "Max Verstappen", team: "Red Bull Racing", points: 437, wins: 9, podiums: 14, nationality: "NED" },
                { rank: 2, name: "Lando Norris", team: "McLaren", points: 374, wins: 4, podiums: 12, nationality: "GBR" },
                { rank: 3, name: "Charles Leclerc", team: "Scuderia Ferrari", points: 356, wins: 3, podiums: 13, nationality: "MON" },
                { rank: 4, name: "Oscar Piastri", team: "McLaren", points: 292, wins: 2, podiums: 8, nationality: "AUS" },
                { rank: 5, name: "Carlos Sainz", team: "Scuderia Ferrari", points: 290, wins: 2, podiums: 9, nationality: "ESP" },
                { rank: 6, name: "George Russell", team: "Mercedes-AMG", points: 245, wins: 2, podiums: 4, nationality: "GBR" },
                { rank: 7, name: "Lewis Hamilton", team: "Mercedes-AMG", points: 223, wins: 2, podiums: 4, nationality: "GBR" },
                { rank: 8, name: "Sergio Perez", team: "Red Bull Racing", points: 152, wins: 0, podiums: 4, nationality: "MEX" },
                { rank: 9, name: "Fernando Alonso", team: "Aston Martin", points: 70, wins: 0, podiums: 0, nationality: "ESP" },
                { rank: 10, name: "Pierre Gasly", team: "Alpine", points: 42, wins: 0, podiums: 1, nationality: "FRA" }
            ],
            constructors: [
                { rank: 1, name: "McLaren F1 Team", points: 666, wins: 6, podiums: 20, car: "MCL38" },
                { rank: 2, name: "Scuderia Ferrari", points: 652, wins: 5, podiums: 22, car: "SF-24" },
                { rank: 3, name: "Red Bull Racing", points: 589, wins: 9, podiums: 18, car: "RB20" },
                { rank: 4, name: "Mercedes-AMG Petronas", points: 468, wins: 4, podiums: 8, car: "F1 W15" },
                { rank: 5, name: "Aston Martin Aramco", points: 94, wins: 0, podiums: 0, car: "AMR24" },
                { rank: 6, name: "Alpine F1 Team", points: 65, wins: 0, podiums: 2, car: "A524" },
                { rank: 7, name: "Haas F1 Team", points: 58, wins: 0, podiums: 0, car: "VF-24" },
                { rank: 8, name: "Visa Cash App RB", points: 46, wins: 0, podiums: 0, car: "VCARB 01" },
                { rank: 9, name: "Williams Racing", points: 17, wins: 0, podiums: 0, car: "FW46" },
                { rank: 10, name: "Kick Sauber", points: 4, wins: 0, podiums: 0, car: "C44" }
            ]
        }
    },

    // MotoGP
    motogp: {
        2025: {
            year: 2025,
            summary: "Marc Marquez's debut year with Ducati Lenovo factory team ignited one of the greatest title fights in motorcycle racing history against Pecco Bagnaia.",
            championDriver: "Marc Marquez",
            championConstructor: "Ducati Lenovo Team",
            drivers: [
                { rank: 1, name: "Marc Marquez", team: "Ducati Lenovo Team", points: 512, wins: 11, podiums: 18, nationality: "ESP" },
                { rank: 2, name: "Francesco Bagnaia", team: "Ducati Lenovo Team", points: 494, wins: 9, podiums: 17, nationality: "ITA" },
                { rank: 3, name: "Jorge Martin", team: "Aprilia Racing", points: 382, wins: 3, podiums: 12, nationality: "ESP" },
                { rank: 4, name: "Pedro Acosta", team: "Red Bull KTM Factory", points: 340, wins: 2, podiums: 10, nationality: "ESP" },
                { rank: 5, name: "Enea Bastianini", team: "Red Bull KTM Tech3", points: 310, wins: 1, podiums: 8, nationality: "ITA" },
                { rank: 6, name: "Brad Binder", team: "Red Bull KTM Factory", points: 268, wins: 0, podiums: 5, nationality: "RSA" },
                { rank: 7, name: "Maverick Viñales", team: "Red Bull KTM Tech3", points: 245, wins: 1, podiums: 4, nationality: "ESP" },
                { rank: 8, name: "Marco Bezzecchi", team: "Aprilia Racing", points: 220, wins: 0, podiums: 3, nationality: "ITA" }
            ],
            constructors: [
                { rank: 1, name: "Ducati Lenovo Team", points: 1006, wins: 20, podiums: 35, car: "Desmosedici GP25" },
                { rank: 2, name: "Aprilia Racing", points: 602, wins: 3, podiums: 15, car: "RS-GP 25" },
                { rank: 3, name: "Red Bull KTM Factory Racing", points: 608, wins: 2, podiums: 15, car: "RC16" },
                { rank: 4, name: "Red Bull KTM Tech3", points: 555, wins: 2, podiums: 12, car: "RC16" },
                { rank: 5, name: "Gresini Racing MotoGP", points: 390, wins: 0, podiums: 6, car: "Desmosedici GP24" },
                { rank: 6, name: "Pertamina Enduro VR46", points: 320, wins: 0, podiums: 4, car: "Desmosedici GP25" }
            ]
        },
        2024: {
            year: 2024,
            summary: "Jorge Martin made history with Prima Pramac Racing as the first independent rider in the modern MotoGP era to clinch the World Championship.",
            championDriver: "Jorge Martin",
            championConstructor: "Ducati Lenovo Team",
            drivers: [
                { rank: 1, name: "Jorge Martin", team: "Prima Pramac Racing (Ducati)", points: 508, wins: 3, podiums: 16, nationality: "ESP" },
                { rank: 2, name: "Francesco Bagnaia", team: "Ducati Lenovo Team", points: 498, wins: 11, podiums: 16, nationality: "ITA" },
                { rank: 3, name: "Marc Marquez", team: "Gresini Racing MotoGP", points: 392, wins: 3, podiums: 10, nationality: "ESP" },
                { rank: 4, name: "Enea Bastianini", team: "Ducati Lenovo Team", points: 386, wins: 2, podiums: 9, nationality: "ITA" },
                { rank: 5, name: "Brad Binder", team: "Red Bull KTM Factory", points: 217, wins: 0, podiums: 1, nationality: "RSA" },
                { rank: 6, name: "Pedro Acosta", team: "Red Bull GASGAS Tech3", points: 215, wins: 0, podiums: 5, nationality: "ESP" },
                { rank: 7, name: "Maverick Viñales", team: "Aprilia Racing", points: 190, wins: 1, podiums: 2, nationality: "ESP" },
                { rank: 8, name: "Franco Morbidelli", team: "Prima Pramac Racing", points: 173, wins: 0, podiums: 0, nationality: "ITA" }
            ],
            constructors: [
                { rank: 1, name: "Ducati Lenovo Team", points: 884, wins: 13, podiums: 25, car: "Desmosedici GP24" },
                { rank: 2, name: "Prima Pramac Racing", points: 681, wins: 3, podiums: 16, car: "Desmosedici GP24" },
                { rank: 3, name: "Gresini Racing MotoGP", points: 565, wins: 3, podiums: 11, car: "Desmosedici GP23" },
                { rank: 4, name: "Aprilia Racing", points: 343, wins: 1, podiums: 4, car: "RS-GP 24" },
                { rank: 5, name: "Red Bull KTM Factory Racing", points: 327, wins: 0, podiums: 2, car: "RC16" }
            ]
        }
    },

    // WEC
    wec: {
        2025: {
            year: 2025,
            summary: "Aston Martin Valkyrie AMR-LMH joined the Hypercar grid in 2025 as Porsche Penske Motorsport defended their title against Ferrari AF Corse.",
            championDriver: "Kevin Estre / Laurens Vanthoor (#6)",
            championConstructor: "Porsche Penske Motorsport",
            drivers: [
                { rank: 1, name: "K. Estre / L. Vanthoor / M. Campbell", team: "Porsche Penske Motorsport #6", points: 178, wins: 3, podiums: 6 },
                { rank: 2, name: "A. Pier Guidi / J. Calado / A. Giovinazzi", team: "Ferrari AF Corse #51", points: 162, wins: 2, podiums: 5 },
                { rank: 3, name: "S. Buemi / B. Hartley / R. Hirakawa", team: "Toyota Gazoo Racing #8", points: 154, wins: 2, podiums: 4 },
                { rank: 4, name: "A. Fuoco / M. Molina / N. Nielsen", team: "Ferrari AF Corse #50", points: 148, wins: 1, podiums: 5 },
                { rank: 5, name: "M. Christensen / J. Andlauer", team: "Porsche Penske Motorsport #5", points: 125, wins: 1, podiums: 3 }
            ],
            constructors: [
                { rank: 1, name: "Porsche Penske Motorsport", points: 198, wins: 4, podiums: 9, car: "Porsche 963" },
                { rank: 2, name: "Ferrari AF Corse", points: 184, wins: 3, podiums: 10, car: "Ferrari 499P" },
                { rank: 3, name: "Toyota Gazoo Racing", points: 172, wins: 2, podiums: 7, car: "Toyota GR010 Hybrid" },
                { rank: 4, name: "BMW M Team WRT", points: 110, wins: 0, podiums: 3, car: "BMW M Hybrid V8" },
                { rank: 5, name: "Cadillac Racing", points: 88, wins: 0, podiums: 2, car: "Cadillac V-Series.R" },
                { rank: 6, name: "Aston Martin THOR Team", points: 74, wins: 0, podiums: 1, car: "Valkyrie AMR-LMH" }
            ]
        },
        2024: {
            year: 2024,
            summary: "Porsche Penske Motorsport won both the Hypercar World Drivers and World Manufacturers Championship titles, while Ferrari #50 took 24 Hours of Le Mans glory.",
            championDriver: "Kevin Estre / Andre Lotterer / Laurens Vanthoor (#6)",
            championConstructor: "Toyota Gazoo Racing (Manufacturers)",
            drivers: [
                { rank: 1, name: "K. Estre / A. Lotterer / L. Vanthoor", team: "Porsche Penske Motorsport #6", points: 152, wins: 2, podiums: 6 },
                { rank: 2, name: "A. Fuoco / M. Molina / N. Nielsen", team: "Ferrari AF Corse #50", points: 115, wins: 1, podiums: 4 },
                { rank: 3, name: "K. Kobayashi / N. de Vries", team: "Toyota Gazoo Racing #7", points: 113, wins: 2, podiums: 3 },
                { rank: 4, name: "S. Buemi / B. Hartley / R. Hirakawa", team: "Toyota Gazoo Racing #8", points: 109, wins: 2, podiums: 3 },
                { rank: 5, name: "M. Campbell / M. Christensen / F. Makowiecki", team: "Porsche Penske Motorsport #5", points: 104, wins: 1, podiums: 4 }
            ],
            constructors: [
                { rank: 1, name: "Toyota Gazoo Racing", points: 190, wins: 4, podiums: 6, car: "Toyota GR010 Hybrid" },
                { rank: 2, name: "Porsche Penske Motorsport", points: 188, wins: 3, podiums: 10, car: "Porsche 963" },
                { rank: 3, name: "Ferrari AF Corse", points: 137, wins: 2, podiums: 7, car: "Ferrari 499P" },
                { rank: 4, name: "Alpine Endurance Team", points: 70, wins: 0, podiums: 1, car: "Alpine A424" },
                { rank: 5, name: "BMW M Team WRT", points: 64, wins: 0, podiums: 1, car: "BMW M Hybrid V8" }
            ]
        }
    },

    // IMSA
    imsa: {
        2025: {
            year: 2025,
            summary: "Porsche Penske Motorsport swept both Sprint and Endurance Cups in GTP, with intense challenges from Meyer Shank Racing Acura.",
            championDriver: "Dane Cameron / Felipe Nasr (#7)",
            championConstructor: "Porsche Penske Motorsport",
            drivers: [
                { rank: 1, name: "Dane Cameron / Felipe Nasr", team: "Porsche Penske Motorsport #7", points: 3010, wins: 3, podiums: 7 },
                { rank: 2, name: "Ricky Taylor / Filipe Albuquerque", team: "Wayne Taylor Racing Andretti #10", points: 2890, wins: 2, podiums: 6 },
                { rank: 3, name: "Tom Blomqvist / Colin Braun", team: "Meyer Shank Racing #60", points: 2820, wins: 2, podiums: 5 },
                { rank: 4, name: "Mathieu Jaminet / Nick Tandy", team: "Porsche Penske Motorsport #6", points: 2790, wins: 2, podiums: 5 }
            ],
            constructors: [
                { rank: 1, name: "Porsche Penske Motorsport (GTP)", points: 3240, wins: 5, podiums: 12, car: "Porsche 963" },
                { rank: 2, name: "Acura Wayne Taylor / MSR (GTP)", points: 3080, wins: 3, podiums: 9, car: "Acura ARX-06" },
                { rank: 3, name: "Cadillac Racing (GTP)", points: 2950, wins: 2, podiums: 7, car: "Cadillac V-Series.R" },
                { rank: 4, name: "BMW M Team RLL (GTP)", points: 2810, wins: 1, podiums: 5, car: "BMW M Hybrid V8" }
            ]
        },
        2024: {
            year: 2024,
            summary: "Dane Cameron and Felipe Nasr claimed the 2024 IMSA WeatherTech SportsCar GTP Championship for Porsche Penske Motorsport.",
            championDriver: "Dane Cameron / Felipe Nasr (#7)",
            championConstructor: "Porsche Penske Motorsport",
            drivers: [
                { rank: 1, name: "Dane Cameron / Felipe Nasr", team: "Porsche Penske Motorsport #7", points: 2982, wins: 2, podiums: 7 },
                { rank: 2, name: "Mathieu Jaminet / Nick Tandy", team: "Porsche Penske Motorsport #6", points: 2889, wins: 2, podiums: 6 },
                { rank: 3, name: "Jack Aitken / Pipo Derani", team: "Whelen Cadillac Racing #31", points: 2687, wins: 0, podiums: 4 },
                { rank: 4, name: "Louis Deletraz / Jordan Taylor", team: "WTR Andretti #40", points: 2603, wins: 1, podiums: 3 }
            ],
            constructors: [
                { rank: 1, name: "Porsche Penske Motorsport", points: 3257, wins: 4, podiums: 13, car: "Porsche 963" },
                { rank: 2, name: "Cadillac Racing", points: 3051, wins: 2, podiums: 8, car: "Cadillac V-Series.R" },
                { rank: 3, name: "Acura (WTR Andretti)", points: 2963, wins: 2, podiums: 7, car: "Acura ARX-06" },
                { rank: 4, name: "BMW Team RLL", points: 2842, wins: 1, podiums: 4, car: "BMW M Hybrid V8" }
            ]
        }
    },

    // GT World Challenge
    gtwc: {
        2025: {
            year: 2025,
            summary: "Team WRT BMW and AF Corse Ferrari clashed across Sprint and Endurance Cups in an electrifying GT3 battle across Europe.",
            championDriver: "Dries Vanthoor / Charles Weerts",
            championConstructor: "Team WRT (BMW M4 GT3)",
            drivers: [
                { rank: 1, name: "Dries Vanthoor / Charles Weerts", team: "Team WRT #32", points: 185, wins: 4, podiums: 8 },
                { rank: 2, name: "Alessandro Pier Guidi / Alessio Rovera", team: "AF Corse Ferrari #51", points: 168, wins: 3, podiums: 7 },
                { rank: 3, name: "Philipp Eng / Marco Wittmann", team: "Rowe Racing #98", points: 152, wins: 2, podiums: 6 }
            ],
            constructors: [
                { rank: 1, name: "Team WRT (BMW)", points: 242, wins: 5, podiums: 11, car: "BMW M4 GT3 EVO" },
                { rank: 2, name: "AF Corse (Ferrari)", points: 218, wins: 4, podiums: 9, car: "Ferrari 296 GT3" },
                { rank: 3, name: "Rowe Racing (BMW)", points: 185, wins: 2, podiums: 7, car: "BMW M4 GT3 EVO" },
                { rank: 4, name: "Manthey EMA (Porsche)", points: 164, wins: 1, podiums: 5, car: "Porsche 911 GT3 R" }
            ]
        },
        2024: {
            year: 2024,
            summary: "Lucas Auer, Maro Engel and Winward Racing Mercedes-AMG battled Team WRT BMW down to the wire in the Fanatec GT Europe Championship.",
            championDriver: "Lucas Auer / Maro Engel",
            championConstructor: "Winward Racing (Mercedes-AMG)",
            drivers: [
                { rank: 1, name: "Lucas Auer / Maro Engel", team: "Winward Racing Team Mann-Filter #48", points: 166.5, wins: 3, podiums: 7 },
                { rank: 2, name: "Dries Vanthoor / Charles Weerts", team: "Team WRT #32", points: 159, wins: 3, podiums: 6 },
                { rank: 3, name: "Mattia Drudi / Ricardo Feller", team: "Comtoyou Racing #7", points: 138, wins: 2, podiums: 5 }
            ],
            constructors: [
                { rank: 1, name: "Winward Racing (Mercedes-AMG)", points: 215, wins: 4, podiums: 9, car: "Mercedes-AMG GT3 Evo" },
                { rank: 2, name: "Team WRT (BMW)", points: 208, wins: 4, podiums: 8, car: "BMW M4 GT3" },
                { rank: 3, name: "Comtoyou Racing (Aston Martin)", points: 172, wins: 2, podiums: 6, car: "Vantage AMR GT3 Evo" },
                { rank: 4, name: "AF Corse (Ferrari)", points: 160, wins: 2, podiums: 5, car: "Ferrari 296 GT3" }
            ]
        }
    }
};

export const getSeriesHistoricalKey = (series: string): string => {
    const s = series.toLowerCase();
    if (s.includes('formula') || s.includes('f1')) return 'f1';
    if (s.includes('motogp') || s.includes('moto')) return 'motogp';
    if (s.includes('wec') || s.includes('endurance')) return 'wec';
    if (s.includes('imsa') || s.includes('sportscar')) return 'imsa';
    if (s.includes('gt') || s.includes('challenge')) return 'gtwc';
    return 'f1';
};
