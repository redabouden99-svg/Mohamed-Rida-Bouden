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
    // ==========================================
    // 1. FORMULA 1 HISTORICAL ARCHIVES (2018 - 2025)
    // ==========================================
    f1: {
        2025: {
            year: 2025,
            summary: "A thrilling championship season characterized by intense multi-team battles between McLaren, Ferrari, and Red Bull, setting the stage for the 2026 technical dawn.",
            championDriver: "Max Verstappen (Red Bull Racing)",
            championConstructor: "McLaren Formula 1 Team",
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
                { rank: 10, name: "Pierre Gasly", team: "Alpine", points: 52, wins: 0, podiums: 1, nationality: "FRA" }
            ],
            constructors: [
                { rank: 1, name: "McLaren F1 Team", points: 718, wins: 10, podiums: 28, car: "MCL39" },
                { rank: 2, name: "Scuderia Ferrari", points: 595, wins: 5, podiums: 20, car: "SF-25" },
                { rank: 3, name: "Red Bull Racing", points: 581, wins: 9, podiums: 19, car: "RB21" },
                { rank: 4, name: "Mercedes-AMG Petronas", points: 507, wins: 4, podiums: 14, car: "F1 W16" },
                { rank: 5, name: "Aston Martin Aramco", points: 106, wins: 0, podiums: 1, car: "AMR25" },
                { rank: 6, name: "Alpine F1 Team", points: 68, wins: 0, podiums: 1, car: "A525" },
                { rank: 7, name: "Haas F1 Team", points: 54, wins: 0, podiums: 0, car: "VF-25" },
                { rank: 8, name: "Visa Cash App RB", points: 48, wins: 0, podiums: 0, car: "VCARB 02" }
            ]
        },
        2024: {
            year: 2024,
            summary: "McLaren captured their first World Constructors Championship since 1998 in Abu Dhabi, while Max Verstappen claimed his fourth consecutive Drivers Championship title.",
            championDriver: "Max Verstappen (Red Bull Racing)",
            championConstructor: "McLaren Formula 1 Team",
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
                { rank: 8, name: "Visa Cash App RB", points: 46, wins: 0, podiums: 0, car: "VCARB 01" }
            ]
        },
        2023: {
            year: 2023,
            summary: "The most statistically dominant campaign in Formula 1 history, as Red Bull Racing and Max Verstappen broke records with 21 victories out of 22 Grands Prix.",
            championDriver: "Max Verstappen (Red Bull Racing)",
            championConstructor: "Red Bull Racing",
            drivers: [
                { rank: 1, name: "Max Verstappen", team: "Red Bull Racing", points: 575, wins: 19, podiums: 21, nationality: "NED" },
                { rank: 2, name: "Sergio Perez", team: "Red Bull Racing", points: 285, wins: 2, podiums: 9, nationality: "MEX" },
                { rank: 3, name: "Lewis Hamilton", team: "Mercedes", points: 234, wins: 0, podiums: 6, nationality: "GBR" },
                { rank: 4, name: "Fernando Alonso", team: "Aston Martin", points: 206, wins: 0, podiums: 8, nationality: "ESP" },
                { rank: 5, name: "Charles Leclerc", team: "Ferrari", points: 206, wins: 0, podiums: 6, nationality: "MON" },
                { rank: 6, name: "Lando Norris", team: "McLaren", points: 205, wins: 0, podiums: 7, nationality: "GBR" },
                { rank: 7, name: "Carlos Sainz", team: "Ferrari", points: 200, wins: 1, podiums: 3, nationality: "ESP" },
                { rank: 8, name: "George Russell", team: "Mercedes", points: 175, wins: 0, podiums: 2, nationality: "GBR" }
            ],
            constructors: [
                { rank: 1, name: "Red Bull Racing", points: 860, wins: 21, podiums: 30, car: "RB19" },
                { rank: 2, name: "Mercedes", points: 409, wins: 0, podiums: 8, car: "F1 W14" },
                { rank: 3, name: "Ferrari", points: 406, wins: 1, podiums: 9, car: "SF-23" },
                { rank: 4, name: "McLaren", points: 302, wins: 0, podiums: 9, car: "MCL60" },
                { rank: 5, name: "Aston Martin", points: 280, wins: 0, podiums: 8, car: "AMR23" }
            ]
        },
        2022: {
            year: 2022,
            summary: "The start of the ground-effect aerodynamic era. Ferrari challenged early, but Red Bull Racing mastered the regulatory revolution to sweep both titles.",
            championDriver: "Max Verstappen (Red Bull Racing)",
            championConstructor: "Red Bull Racing",
            drivers: [
                { rank: 1, name: "Max Verstappen", team: "Red Bull Racing", points: 454, wins: 15, podiums: 17, nationality: "NED" },
                { rank: 2, name: "Charles Leclerc", team: "Ferrari", points: 308, wins: 3, podiums: 11, nationality: "MON" },
                { rank: 3, name: "Sergio Perez", team: "Red Bull Racing", points: 305, wins: 2, podiums: 11, nationality: "MEX" },
                { rank: 4, name: "George Russell", team: "Mercedes", points: 275, wins: 1, podiums: 8, nationality: "GBR" },
                { rank: 5, name: "Carlos Sainz", team: "Ferrari", points: 246, wins: 1, podiums: 9, nationality: "ESP" },
                { rank: 6, name: "Lewis Hamilton", team: "Mercedes", points: 240, wins: 0, podiums: 9, nationality: "GBR" }
            ],
            constructors: [
                { rank: 1, name: "Red Bull Racing", points: 759, wins: 17, podiums: 28, car: "RB18" },
                { rank: 2, name: "Ferrari", points: 554, wins: 4, podiums: 20, car: "F1-75" },
                { rank: 3, name: "Mercedes", points: 515, wins: 1, podiums: 17, car: "F1 W13" },
                { rank: 4, name: "Alpine", points: 173, wins: 0, podiums: 0, car: "A522" },
                { rank: 5, name: "McLaren", points: 159, wins: 0, podiums: 1, car: "MCL36" }
            ]
        },
        2021: {
            year: 2021,
            summary: "One of the most dramatic, legendary title fights in sporting history, climaxing in an unforgettable final lap showdown in Abu Dhabi between Verstappen and Hamilton.",
            championDriver: "Max Verstappen (Red Bull Racing)",
            championConstructor: "Mercedes-AMG Petronas",
            drivers: [
                { rank: 1, name: "Max Verstappen", team: "Red Bull Racing", points: 395.5, wins: 10, podiums: 18, nationality: "NED" },
                { rank: 2, name: "Lewis Hamilton", team: "Mercedes", points: 387.5, wins: 8, podiums: 17, nationality: "GBR" },
                { rank: 3, name: "Valtteri Bottas", team: "Mercedes", points: 226, wins: 1, podiums: 11, nationality: "FIN" },
                { rank: 4, name: "Sergio Perez", team: "Red Bull Racing", points: 190, wins: 1, podiums: 5, nationality: "MEX" },
                { rank: 5, name: "Carlos Sainz", team: "Ferrari", points: 164.5, wins: 0, podiums: 4, nationality: "ESP" },
                { rank: 6, name: "Lando Norris", team: "McLaren", points: 160, wins: 0, podiums: 4, nationality: "GBR" },
                { rank: 7, name: "Charles Leclerc", team: "Ferrari", points: 159, wins: 0, podiums: 1, nationality: "MON" }
            ],
            constructors: [
                { rank: 1, name: "Mercedes-AMG Petronas", points: 613.5, wins: 9, podiums: 28, car: "F1 W12" },
                { rank: 2, name: "Red Bull Racing Honda", points: 585.5, wins: 11, podiums: 23, car: "RB16B" },
                { rank: 3, name: "Ferrari", points: 323.5, wins: 0, podiums: 5, car: "SF21" },
                { rank: 4, name: "McLaren Mercedes", points: 275, wins: 1, podiums: 5, car: "MCL35M" }
            ]
        },
        2020: {
            year: 2020,
            summary: "Lewis Hamilton equalled Michael Schumacher's all-time record of seven World Championships in the iconic black Silver Arrow W11.",
            championDriver: "Lewis Hamilton (Mercedes-AMG)",
            championConstructor: "Mercedes-AMG Petronas",
            drivers: [
                { rank: 1, name: "Lewis Hamilton", team: "Mercedes", points: 347, wins: 11, podiums: 14, nationality: "GBR" },
                { rank: 2, name: "Valtteri Bottas", team: "Mercedes", points: 223, wins: 2, podiums: 11, nationality: "FIN" },
                { rank: 3, name: "Max Verstappen", team: "Red Bull Racing", points: 214, wins: 2, podiums: 11, nationality: "NED" },
                { rank: 4, name: "Sergio Perez", team: "Racing Point", points: 125, wins: 1, podiums: 2, nationality: "MEX" },
                { rank: 5, name: "Daniel Ricciardo", team: "Renault", points: 119, wins: 0, podiums: 2, nationality: "AUS" }
            ],
            constructors: [
                { rank: 1, name: "Mercedes-AMG Petronas", points: 573, wins: 13, podiums: 25, car: "F1 W11 EQ Performance" },
                { rank: 2, name: "Red Bull Racing", points: 319, wins: 2, podiums: 13, car: "RB16" },
                { rank: 3, name: "McLaren Renault", points: 202, wins: 0, podiums: 2, car: "MCL35" },
                { rank: 4, name: "Racing Point", points: 195, wins: 1, podiums: 4, car: "RP20" }
            ]
        }
    },

    // ==========================================
    // 2. MOTOGP HISTORICAL ARCHIVES (2020 - 2025)
    // ==========================================
    motogp: {
        2025: {
            year: 2025,
            summary: "Marc Marquez's debut year with Ducati Lenovo factory team ignited one of the greatest title fights in motorcycle racing history against Pecco Bagnaia.",
            championDriver: "Marc Marquez (Ducati Lenovo)",
            championConstructor: "Ducati Lenovo Team",
            drivers: [
                { rank: 1, name: "Marc Marquez", team: "Ducati Lenovo Team", points: 512, wins: 11, podiums: 18, nationality: "ESP" },
                { rank: 2, name: "Francesco Bagnaia", team: "Ducati Lenovo Team", points: 494, wins: 9, podiums: 17, nationality: "ITA" },
                { rank: 3, name: "Jorge Martin", team: "Aprilia Racing", points: 382, wins: 3, podiums: 12, nationality: "ESP" },
                { rank: 4, name: "Pedro Acosta", team: "Red Bull KTM Factory", points: 340, wins: 2, podiums: 10, nationality: "ESP" },
                { rank: 5, name: "Enea Bastianini", team: "Red Bull KTM Tech3", points: 310, wins: 1, podiums: 8, nationality: "ITA" },
                { rank: 6, name: "Brad Binder", team: "Red Bull KTM Factory", points: 268, wins: 0, podiums: 5, nationality: "RSA" }
            ],
            constructors: [
                { rank: 1, name: "Ducati Lenovo Team", points: 1006, wins: 20, podiums: 35, car: "Desmosedici GP25" },
                { rank: 2, name: "Aprilia Racing", points: 602, wins: 3, podiums: 15, car: "RS-GP 25" },
                { rank: 3, name: "Red Bull KTM Factory Racing", points: 608, wins: 2, podiums: 15, car: "RC16" }
            ]
        },
        2024: {
            year: 2024,
            summary: "Jorge Martin made history with Prima Pramac Racing as the first independent rider in the modern MotoGP era to clinch the World Championship.",
            championDriver: "Jorge Martin (Prima Pramac Ducati)",
            championConstructor: "Ducati Lenovo Team",
            drivers: [
                { rank: 1, name: "Jorge Martin", team: "Prima Pramac Racing (Ducati)", points: 508, wins: 3, podiums: 16, nationality: "ESP" },
                { rank: 2, name: "Francesco Bagnaia", team: "Ducati Lenovo Team", points: 498, wins: 11, podiums: 16, nationality: "ITA" },
                { rank: 3, name: "Marc Marquez", team: "Gresini Racing MotoGP", points: 392, wins: 3, podiums: 10, nationality: "ESP" },
                { rank: 4, name: "Enea Bastianini", team: "Ducati Lenovo Team", points: 386, wins: 2, podiums: 9, nationality: "ITA" },
                { rank: 5, name: "Brad Binder", team: "Red Bull KTM Factory", points: 217, wins: 0, podiums: 1, nationality: "RSA" },
                { rank: 6, name: "Pedro Acosta", team: "Red Bull GASGAS Tech3", points: 215, wins: 0, podiums: 5, nationality: "ESP" }
            ],
            constructors: [
                { rank: 1, name: "Ducati Lenovo Team", points: 884, wins: 13, podiums: 25, car: "Desmosedici GP24" },
                { rank: 2, name: "Prima Pramac Racing", points: 681, wins: 3, podiums: 16, car: "Desmosedici GP24" },
                { rank: 3, name: "Gresini Racing MotoGP", points: 565, wins: 3, podiums: 11, car: "Desmosedici GP23" },
                { rank: 4, name: "Aprilia Racing", points: 343, wins: 1, podiums: 4, car: "RS-GP 24" }
            ]
        },
        2023: {
            year: 2023,
            summary: "Francesco Bagnaia defended his World Crown in a sensational Valencia finale against Jorge Martin, cementing Ducati's premier class supremacy.",
            championDriver: "Francesco Bagnaia (Ducati Lenovo)",
            championConstructor: "Ducati Lenovo Team",
            drivers: [
                { rank: 1, name: "Francesco Bagnaia", team: "Ducati Lenovo Team", points: 467, wins: 7, podiums: 15, nationality: "ITA" },
                { rank: 2, name: "Jorge Martin", team: "Prima Pramac Racing", points: 428, wins: 4, podiums: 8, nationality: "ESP" },
                { rank: 3, name: "Marco Bezzecchi", team: "Mooney VR46 Racing", points: 329, wins: 3, podiums: 7, nationality: "ITA" },
                { rank: 4, name: "Brad Binder", team: "Red Bull KTM Factory", points: 293, wins: 0, podiums: 5, nationality: "RSA" },
                { rank: 5, name: "Johann Zarco", team: "Prima Pramac Racing", points: 225, wins: 1, podiums: 6, nationality: "FRA" }
            ],
            constructors: [
                { rank: 1, name: "Ducati Lenovo Team", points: 700, wins: 17, podiums: 43, car: "Desmosedici GP23" },
                { rank: 2, name: "KTM Factory Racing", points: 373, wins: 2, podiums: 7, car: "RC16" },
                { rank: 3, name: "Aprilia Racing", points: 326, wins: 2, podiums: 6, car: "RS-GP 23" }
            ]
        },
        2022: {
            year: 2022,
            summary: "Pecco Bagnaia executed the biggest points deficit comeback in modern MotoGP history, overturning a 91-point deficit to win Ducati's first riders title in 15 years.",
            championDriver: "Francesco Bagnaia (Ducati Lenovo)",
            championConstructor: "Ducati Lenovo Team",
            drivers: [
                { rank: 1, name: "Francesco Bagnaia", team: "Ducati Lenovo Team", points: 265, wins: 7, podiums: 10, nationality: "ITA" },
                { rank: 2, name: "Fabio Quartararo", team: "Monster Energy Yamaha", points: 248, wins: 3, podiums: 8, nationality: "FRA" },
                { rank: 3, name: "Enea Bastianini", team: "Gresini Racing", points: 219, wins: 4, podiums: 6, nationality: "ITA" },
                { rank: 4, name: "Aleix Espargaro", team: "Aprilia Racing", points: 212, wins: 1, podiums: 6, nationality: "ESP" }
            ],
            constructors: [
                { rank: 1, name: "Ducati", points: 448, wins: 12, podiums: 32, car: "Desmosedici GP22" },
                { rank: 2, name: "Yamaha", points: 256, wins: 3, podiums: 8, car: "YZR-M1" },
                { rank: 3, name: "Aprilia", points: 248, wins: 1, podiums: 9, car: "RS-GP 22" }
            ]
        }
    },

    // ==========================================
    // 3. WEC HISTORICAL ARCHIVES (2021 - 2025)
    // ==========================================
    wec: {
        2025: {
            year: 2025,
            summary: "Aston Martin Valkyrie AMR-LMH joined the Hypercar grid as Porsche Penske Motorsport defended their world title against Ferrari AF Corse.",
            championDriver: "Kevin Estre / Laurens Vanthoor (#6)",
            championConstructor: "Porsche Penske Motorsport",
            drivers: [
                { rank: 1, name: "K. Estre / L. Vanthoor / M. Campbell", team: "Porsche Penske Motorsport #6", points: 178, wins: 3, podiums: 6 },
                { rank: 2, name: "A. Pier Guidi / J. Calado / A. Giovinazzi", team: "Ferrari AF Corse #51", points: 162, wins: 2, podiums: 5 },
                { rank: 3, name: "S. Buemi / B. Hartley / R. Hirakawa", team: "Toyota Gazoo Racing #8", points: 154, wins: 2, podiums: 4 },
                { rank: 4, name: "A. Fuoco / M. Molina / N. Nielsen", team: "Ferrari AF Corse #50", points: 148, wins: 1, podiums: 5 }
            ],
            constructors: [
                { rank: 1, name: "Porsche Penske Motorsport", points: 198, wins: 4, podiums: 9, car: "Porsche 963" },
                { rank: 2, name: "Ferrari AF Corse", points: 184, wins: 3, podiums: 10, car: "Ferrari 499P" },
                { rank: 3, name: "Toyota Gazoo Racing", points: 172, wins: 2, podiums: 7, car: "Toyota GR010 Hybrid" }
            ]
        },
        2024: {
            year: 2024,
            summary: "Porsche Penske Motorsport secured the Hypercar World Drivers Championship, while Ferrari #50 took 24 Hours of Le Mans glory.",
            championDriver: "Kevin Estre / Andre Lotterer / Laurens Vanthoor (#6)",
            championConstructor: "Toyota Gazoo Racing (Manufacturers)",
            drivers: [
                { rank: 1, name: "K. Estre / A. Lotterer / L. Vanthoor", team: "Porsche Penske Motorsport #6", points: 152, wins: 2, podiums: 6 },
                { rank: 2, name: "A. Fuoco / M. Molina / N. Nielsen", team: "Ferrari AF Corse #50", points: 115, wins: 1, podiums: 4 },
                { rank: 3, name: "K. Kobayashi / N. de Vries", team: "Toyota Gazoo Racing #7", points: 113, wins: 2, podiums: 3 }
            ],
            constructors: [
                { rank: 1, name: "Toyota Gazoo Racing", points: 190, wins: 4, podiums: 6, car: "Toyota GR010 Hybrid" },
                { rank: 2, name: "Porsche Penske Motorsport", points: 188, wins: 3, podiums: 10, car: "Porsche 963" },
                { rank: 3, name: "Ferrari AF Corse", points: 137, wins: 2, podiums: 7, car: "Ferrari 499P" }
            ]
        },
        2023: {
            year: 2023,
            summary: "The Centenary 24 Hours of Le Mans saw Ferrari triumph on its top-flight endurance return after 50 years with the sensational 499P Hypercar.",
            championDriver: "Brendon Hartley / Ryo Hirakawa / Sebastien Buemi (#8)",
            championConstructor: "Toyota Gazoo Racing",
            drivers: [
                { rank: 1, name: "S. Buemi / B. Hartley / R. Hirakawa", team: "Toyota Gazoo Racing #8", points: 172, wins: 2, podiums: 6 },
                { rank: 2, name: "M. Conway / K. Kobayashi / J. Lopez", team: "Toyota Gazoo Racing #7", points: 145, wins: 4, podiums: 4 },
                { rank: 3, name: "A. Pier Guidi / J. Calado / A. Giovinazzi", team: "Ferrari AF Corse #51", points: 114, wins: 1, podiums: 4 }
            ],
            constructors: [
                { rank: 1, name: "Toyota Gazoo Racing", points: 217, wins: 6, podiums: 10, car: "Toyota GR010 Hybrid" },
                { rank: 2, name: "Ferrari AF Corse", points: 161, wins: 1, podiums: 9, car: "Ferrari 499P" },
                { rank: 3, name: "Porsche Penske Motorsport", points: 99, wins: 0, podiums: 2, car: "Porsche 963" }
            ]
        }
    },

    // ==========================================
    // 4. IMSA HISTORICAL ARCHIVES (2022 - 2025)
    // ==========================================
    imsa: {
        2025: {
            year: 2025,
            summary: "Porsche Penske Motorsport swept both Sprint and Endurance Cups in GTP with the Porsche 963 across iconic North American circuits.",
            championDriver: "Dane Cameron / Felipe Nasr (#7)",
            championConstructor: "Porsche Penske Motorsport",
            drivers: [
                { rank: 1, name: "Dane Cameron / Felipe Nasr", team: "Porsche Penske Motorsport #7", points: 3010, wins: 3, podiums: 7 },
                { rank: 2, name: "Ricky Taylor / Filipe Albuquerque", team: "Wayne Taylor Racing Andretti #10", points: 2890, wins: 2, podiums: 6 },
                { rank: 3, name: "Tom Blomqvist / Colin Braun", team: "Meyer Shank Racing #60", points: 2820, wins: 2, podiums: 5 }
            ],
            constructors: [
                { rank: 1, name: "Porsche Penske Motorsport (GTP)", points: 3240, wins: 5, podiums: 12, car: "Porsche 963" },
                { rank: 2, name: "Acura Wayne Taylor / MSR (GTP)", points: 3080, wins: 3, podiums: 9, car: "Acura ARX-06" },
                { rank: 3, name: "Cadillac Racing (GTP)", points: 2950, wins: 2, podiums: 7, car: "Cadillac V-Series.R" }
            ]
        },
        2024: {
            year: 2024,
            summary: "Dane Cameron and Felipe Nasr claimed the IMSA WeatherTech SportsCar GTP Championship for Porsche Penske Motorsport.",
            championDriver: "Dane Cameron / Felipe Nasr (#7)",
            championConstructor: "Porsche Penske Motorsport",
            drivers: [
                { rank: 1, name: "Dane Cameron / Felipe Nasr", team: "Porsche Penske Motorsport #7", points: 2982, wins: 2, podiums: 7 },
                { rank: 2, name: "Mathieu Jaminet / Nick Tandy", team: "Porsche Penske Motorsport #6", points: 2889, wins: 2, podiums: 6 },
                { rank: 3, name: "Jack Aitken / Pipo Derani", team: "Whelen Cadillac Racing #31", points: 2687, wins: 0, podiums: 4 }
            ],
            constructors: [
                { rank: 1, name: "Porsche Penske Motorsport", points: 3257, wins: 4, podiums: 13, car: "Porsche 963" },
                { rank: 2, name: "Cadillac Racing", points: 3051, wins: 2, podiums: 8, car: "Cadillac V-Series.R" },
                { rank: 3, name: "Acura (WTR Andretti)", points: 2963, wins: 2, podiums: 7, car: "Acura ARX-06" }
            ]
        },
        2023: {
            year: 2023,
            summary: "The dawn of the GTP hybrid era in North America saw Whelen Engineering Cadillac Racing claim the inaugural modern GTP Championship.",
            championDriver: "Pipo Derani / Alexander Sims (#31)",
            championConstructor: "Cadillac Racing",
            drivers: [
                { rank: 1, name: "Pipo Derani / Alexander Sims", team: "Whelen Cadillac Racing #31", points: 2733, wins: 1, podiums: 3 },
                { rank: 2, name: "Ricky Taylor / Filipe Albuquerque", team: "WTR Andretti Acura #10", points: 2712, wins: 0, podiums: 3 },
                { rank: 3, name: "Mathieu Jaminet / Nick Tandy", team: "Porsche Penske Motorsport #6", points: 2691, wins: 2, podiums: 4 }
            ],
            constructors: [
                { rank: 1, name: "Cadillac Racing", points: 3096, wins: 2, podiums: 8, car: "Cadillac V-Series.R" },
                { rank: 2, name: "Porsche Penske Motorsport", points: 3080, wins: 3, podiums: 9, car: "Porsche 963" },
                { rank: 3, name: "Acura (Wayne Taylor / MSR)", points: 3048, wins: 3, podiums: 6, car: "Acura ARX-06" }
            ]
        }
    },

    // ==========================================
    // 5. GT WORLD CHALLENGE HISTORICAL ARCHIVES
    // ==========================================
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
                { rank: 3, name: "Rowe Racing (BMW)", points: 185, wins: 2, podiums: 7, car: "BMW M4 GT3 EVO" }
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
                { rank: 3, name: "AF Corse (Ferrari)", points: 160, wins: 2, podiums: 5, car: "Ferrari 296 GT3" }
            ]
        },
        2023: {
            year: 2023,
            summary: "Akkodis ASP Team and Raffaele Marciello dominated the overall GT World Challenge Europe with Mercedes-AMG before his historic move to BMW.",
            championDriver: "Raffaele Marciello / Timur Boguslavskiy",
            championConstructor: "Akkodis ASP Team (Mercedes-AMG)",
            drivers: [
                { rank: 1, name: "Raffaele Marciello / Timur Boguslavskiy", team: "Akkodis ASP Team #88", points: 215, wins: 5, podiums: 10 },
                { rank: 2, name: "Dries Vanthoor / Charles Weerts", team: "Team WRT #32", points: 184, wins: 3, podiums: 7 },
                { rank: 3, name: "Ricardo Feller / Mattia Drudi", team: "Tresor Orange1 Audi #40", points: 162, wins: 2, podiums: 5 }
            ],
            constructors: [
                { rank: 1, name: "Akkodis ASP Team (Mercedes-AMG)", points: 260, wins: 6, podiums: 12, car: "Mercedes-AMG GT3 Evo" },
                { rank: 2, name: "Team WRT (BMW)", points: 220, wins: 4, podiums: 9, car: "BMW M4 GT3" },
                { rank: 3, name: "Tresor Orange1 (Audi)", points: 175, wins: 2, podiums: 6, car: "Audi R8 LMS GT3 Evo II" }
            ]
        }
    },

    // ==========================================
    // 6. DTM HISTORICAL ARCHIVES (2020 - 2025)
    // ==========================================
    dtm: {
        2025: {
            year: 2025,
            summary: "Abt Sportsline Lamborghini and Kelvin van der Linde edged out Schubert Motorsport BMW and René Rast in a dramatic Hockenheim finale.",
            championDriver: "Kelvin van der Linde (Abt Sportsline)",
            championConstructor: "Schubert Motorsport (BMW)",
            drivers: [
                { rank: 1, name: "Kelvin van der Linde", team: "Abt Sportsline (Lamborghini)", points: 228, wins: 4, podiums: 9, nationality: "RSA" },
                { rank: 2, name: "René Rast", team: "Schubert Motorsport (BMW)", points: 216, wins: 3, podiums: 8, nationality: "GER" },
                { rank: 3, name: "Maro Engel", team: "Mercedes-AMG Team Winward", points: 202, wins: 3, podiums: 7, nationality: "GER" },
                { rank: 4, name: "Thomas Preining", team: "Manthey EMA (Porsche)", points: 190, wins: 2, podiums: 6, nationality: "AUT" },
                { rank: 5, name: "Mirko Bortolotti", team: "SSR Performance (Lamborghini)", points: 185, wins: 2, podiums: 6, nationality: "ITA" }
            ],
            constructors: [
                { rank: 1, name: "Schubert Motorsport (BMW)", points: 368, wins: 4, podiums: 12, car: "BMW M4 GT3 EVO" },
                { rank: 2, name: "Abt Sportsline (Lamborghini)", points: 354, wins: 5, podiums: 11, car: "Lamborghini Huracán GT3 EVO2" },
                { rank: 3, name: "Mercedes-AMG Team Winward", points: 342, wins: 4, podiums: 10, car: "Mercedes-AMG GT3" }
            ]
        },
        2024: {
            year: 2024,
            summary: "Mirko Bortolotti clinched the 2024 DTM Drivers Championship for SSR Performance Lamborghini in an edge-of-the-seat showdown.",
            championDriver: "Mirko Bortolotti (SSR Performance)",
            championConstructor: "Schubert Motorsport (BMW)",
            drivers: [
                { rank: 1, name: "Mirko Bortolotti", team: "SSR Performance (Lamborghini)", points: 238, wins: 1, podiums: 7, nationality: "ITA" },
                { rank: 2, name: "Kelvin van der Linde", team: "Abt Sportsline (Audi)", points: 221, wins: 3, podiums: 6, nationality: "RSA" },
                { rank: 3, name: "Maro Engel", team: "Mercedes-AMG Team Winward", points: 203, wins: 1, podiums: 7, nationality: "GER" },
                { rank: 4, name: "René Rast", team: "Schubert Motorsport (BMW)", points: 172, wins: 2, podiums: 4, nationality: "GER" },
                { rank: 5, name: "Thomas Preining", team: "Manthey EMA (Porsche)", points: 158, wins: 1, podiums: 3, nationality: "AUT" }
            ],
            constructors: [
                { rank: 1, name: "Schubert Motorsport (BMW)", points: 350, wins: 4, podiums: 9, car: "BMW M4 GT3" },
                { rank: 2, name: "Abt Sportsline (Audi)", points: 326, wins: 3, podiums: 8, car: "Audi R8 LMS GT3 Evo II" },
                { rank: 3, name: "Winward Racing (Mercedes-AMG)", points: 316, wins: 2, podiums: 9, car: "Mercedes-AMG GT3" }
            ]
        },
        2023: {
            year: 2023,
            summary: "Thomas Preining and 'Grello' Manthey EMA Porsche wrote history, winning both the Drivers and Teams DTM Championships in dominant fashion.",
            championDriver: "Thomas Preining (Manthey EMA)",
            championConstructor: "Manthey EMA (Porsche)",
            drivers: [
                { rank: 1, name: "Thomas Preining", team: "Manthey EMA (Porsche)", points: 246, wins: 3, podiums: 8, nationality: "AUT" },
                { rank: 2, name: "Mirko Bortolotti", team: "SSR Performance (Lamborghini)", points: 213, wins: 3, podiums: 5, nationality: "ITA" },
                { rank: 3, name: "Ricardo Feller", team: "Abt Sportsline (Audi)", points: 179, wins: 1, podiums: 4, nationality: "SUI" },
                { rank: 4, name: "Sheldon van der Linde", team: "Schubert Motorsport (BMW)", points: 151, wins: 1, podiums: 4, nationality: "RSA" }
            ],
            constructors: [
                { rank: 1, name: "Manthey EMA (Porsche)", points: 356, wins: 4, podiums: 10, car: "Porsche 911 GT3 R (992)" },
                { rank: 2, name: "SSR Performance (Lamborghini)", points: 291, wins: 3, podiums: 6, car: "Lamborghini Huracán GT3 EVO2" },
                { rank: 3, name: "Abt Sportsline (Audi)", points: 288, wins: 2, podiums: 7, car: "Audi R8 LMS GT3" }
            ]
        },
        2022: {
            year: 2022,
            summary: "Sheldon van der Linde took BMW's new M4 GT3 to the DTM title, becoming the first South African champion in DTM history.",
            championDriver: "Sheldon van der Linde (Schubert Motorsport)",
            championConstructor: "Schubert Motorsport (BMW)",
            drivers: [
                { rank: 1, name: "Sheldon van der Linde", team: "Schubert Motorsport (BMW)", points: 164, wins: 3, podiums: 6, nationality: "RSA" },
                { rank: 2, name: "Lucas Auer", team: "Winward Racing (Mercedes-AMG)", points: 153, wins: 2, podiums: 4, nationality: "AUT" },
                { rank: 3, name: "René Rast", team: "Team Abt (Audi)", points: 149, wins: 1, podiums: 6, nationality: "GER" },
                { rank: 4, name: "Mirko Bortolotti", team: "GRT Grasser (Lamborghini)", points: 121, wins: 0, podiums: 5, nationality: "ITA" }
            ],
            constructors: [
                { rank: 1, name: "Schubert Motorsport (BMW)", points: 226, wins: 3, podiums: 7, car: "BMW M4 GT3" },
                { rank: 2, name: "Mercedes-AMG Team Winward", points: 152, wins: 2, podiums: 4, car: "Mercedes-AMG GT3" },
                { rank: 3, name: "Team Abt Sportsline (Audi)", points: 149, wins: 1, podiums: 6, car: "Audi R8 LMS GT3" }
            ]
        },
        2021: {
            year: 2021,
            summary: "The inaugural season of DTM's GT3 era saw Maximilian Götz dramatically capture the championship crown for Mercedes-AMG at the Norisring.",
            championDriver: "Maximilian Götz (Team HRT Mercedes-AMG)",
            championConstructor: "Team Winward (Mercedes-AMG)",
            drivers: [
                { rank: 1, name: "Maximilian Götz", team: "Mercedes-AMG Team HRT", points: 230, wins: 3, podiums: 9, nationality: "GER" },
                { rank: 2, name: "Liam Lawson", team: "Red Bull AF Corse (Ferrari)", points: 227, wins: 3, podiums: 10, nationality: "NZL" },
                { rank: 3, name: "Kelvin van der Linde", team: "Team Abt Sportsline (Audi)", points: 208, wins: 4, podiums: 5, nationality: "RSA" },
                { rank: 4, name: "Marco Wittmann", team: "Walkenhorst Motorsport (BMW)", points: 171, wins: 2, podiums: 5, nationality: "GER" }
            ],
            constructors: [
                { rank: 1, name: "Mercedes-AMG Team Winward", points: 278, wins: 4, podiums: 9, car: "Mercedes-AMG GT3" },
                { rank: 2, name: "Red Bull AF Corse (Ferrari)", points: 268, wins: 3, podiums: 10, car: "Ferrari 488 GT3 Evo" },
                { rank: 3, name: "Team Abt Sportsline (Audi)", points: 254, wins: 4, podiums: 7, car: "Audi R8 LMS GT3" }
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
    if (s.includes('dtm') || s.includes('tourenwagen')) return 'dtm';
    if (s.includes('gt') || s.includes('challenge')) return 'gtwc';
    return 'f1';
};
