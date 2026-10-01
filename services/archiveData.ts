import { SeriesId, HistoricalSeasonStandings } from '../types';

export const HISTORICAL_SEASONS_DATA: Record<number, Record<string, HistoricalSeasonStandings>> = {
    2024: {
        f1: {
            season: 2024,
            series: SeriesId.F1,
            championDriver: "Max Verstappen (Red Bull Racing)",
            championTeam: "McLaren Formula 1 Team",
            seasonSummary: "A thrilling season marked by McLaren's return to the summit of the Constructors Championship for the first time since 1998, while Max Verstappen secured his fourth consecutive Drivers World Title.",
            driverStandings: [
                { pos: 1, driver: "Max Verstappen", nationality: "NED", team: "Red Bull Racing", points: 437, wins: 9, podiums: 14 },
                { pos: 2, driver: "Lando Norris", nationality: "GBR", team: "McLaren", points: 374, wins: 4, podiums: 12 },
                { pos: 3, driver: "Charles Leclerc", nationality: "MON", team: "Ferrari", points: 356, wins: 3, podiums: 13 },
                { pos: 4, driver: "Oscar Piastri", nationality: "AUS", team: "McLaren", points: 292, wins: 2, podiums: 8 },
                { pos: 5, driver: "Carlos Sainz", nationality: "ESP", team: "Ferrari", points: 290, wins: 2, podiums: 8 },
                { pos: 6, driver: "George Russell", nationality: "GBR", team: "Mercedes", points: 245, wins: 2, podiums: 4 },
                { pos: 7, driver: "Lewis Hamilton", nationality: "GBR", team: "Mercedes", points: 223, wins: 2, podiums: 4 },
                { pos: 8, driver: "Sergio Pérez", nationality: "MEX", team: "Red Bull Racing", points: 152, wins: 0, podiums: 4 },
                { pos: 9, driver: "Fernando Alonso", nationality: "ESP", team: "Aston Martin", points: 70, wins: 0, podiums: 0 },
                { pos: 10, driver: "Nico Hülkenberg", nationality: "GER", team: "Haas", points: 41, wins: 0, podiums: 0 }
            ],
            teamStandings: [
                { pos: 1, team: "McLaren", points: 666, wins: 6, engine: "Mercedes-AMG" },
                { pos: 2, team: "Ferrari", points: 652, wins: 5, engine: "Ferrari 066/12" },
                { pos: 3, team: "Red Bull Racing", points: 589, wins: 9, engine: "Honda RBPT" },
                { pos: 4, team: "Mercedes", points: 468, wins: 4, engine: "Mercedes-AMG" },
                { pos: 5, team: "Aston Martin", points: 94, wins: 0, engine: "Mercedes-AMG" },
                { pos: 6, team: "Alpine", points: 53, wins: 0, engine: "Renault" },
                { pos: 7, team: "Haas", points: 58, wins: 0, engine: "Ferrari" },
                { pos: 8, team: "Racing Bulls (RB)", points: 46, wins: 0, engine: "Honda RBPT" },
                { pos: 9, team: "Williams", points: 17, wins: 0, engine: "Mercedes-AMG" },
                { pos: 10, team: "Kick Sauber", points: 4, wins: 0, engine: "Ferrari" }
            ]
        },
        motogp: {
            season: 2024,
            series: SeriesId.MOTOGP,
            championDriver: "Jorge Martín (Prima Pramac Ducati)",
            championTeam: "Ducati Lenovo Team",
            seasonSummary: "Jorge Martín made historic modern MotoGP history by becoming the first independent satellite rider to capture the premier-class World Championship in the four-stroke era.",
            driverStandings: [
                { pos: 1, driver: "Jorge Martín", nationality: "ESP", team: "Prima Pramac Ducati", points: 508, wins: 3, podiums: 16 },
                { pos: 2, driver: "Francesco Bagnaia", nationality: "ITA", team: "Ducati Lenovo Team", points: 498, wins: 11, podiums: 16 },
                { pos: 3, driver: "Marc Márquez", nationality: "ESP", team: "Gresini Racing Ducati", points: 392, wins: 3, podiums: 10 },
                { pos: 4, driver: "Enea Bastianini", nationality: "ITA", team: "Ducati Lenovo Team", points: 386, wins: 2, podiums: 9 },
                { pos: 5, driver: "Brad Binder", nationality: "RSA", team: "Red Bull KTM Factory", points: 217, wins: 0, podiums: 1 },
                { pos: 6, driver: "Pedro Acosta", nationality: "ESP", team: "Red Bull GasGas Tech3", points: 215, wins: 0, podiums: 5 }
            ],
            teamStandings: [
                { pos: 1, team: "Ducati Lenovo Team", points: 884, wins: 13, engine: "Ducati Desmosedici GP24" },
                { pos: 2, team: "Prima Pramac Racing", points: 681, wins: 4, engine: "Ducati Desmosedici GP24" },
                { pos: 3, team: "Gresini Racing MotoGP", points: 565, wins: 3, engine: "Ducati Desmosedici GP23" },
                { pos: 4, team: "Aprilia Racing", points: 355, wins: 1, engine: "Aprilia RS-GP24" },
                { pos: 5, team: "Red Bull KTM Factory", points: 350, wins: 0, engine: "KTM RC16" }
            ]
        },
        wec: {
            season: 2024,
            series: SeriesId.WEC,
            championDriver: "Kévin Estre / André Lotterer / Laurens Vanthoor (Porsche Penske)",
            championTeam: "Porsche Penske Motorsport",
            seasonSummary: "Porsche Penske Motorsport conquered the Hypercar World Endurance Championship with supreme consistency across eight grueling global endurance rounds.",
            driverStandings: [
                { pos: 1, driver: "Kévin Estre / André Lotterer / Laurens Vanthoor", nationality: "FRA/GER/BEL", team: "Porsche Penske #6", points: 152, wins: 2, podiums: 6 },
                { pos: 2, driver: "Antonio Fuoco / Miguel Molina / Nicklas Nielsen", nationality: "ITA/ESP/DEN", team: "Ferrari AF Corse #50", points: 115, wins: 1, podiums: 3 },
                { pos: 3, driver: "Kamui Kobayashi / Nyck de Vries", nationality: "JPN/NED", team: "Toyota Gazoo Racing #7", points: 113, wins: 2, podiums: 3 }
            ],
            teamStandings: [
                { pos: 1, team: "Porsche Penske Motorsport", points: 184, wins: 2, engine: "Porsche 4.6L Twin-Turbo V8 Hybrid" },
                { pos: 2, team: "Toyota Gazoo Racing", points: 178, wins: 2, engine: "Toyota 3.5L Twin-Turbo V6 Hybrid" },
                { pos: 3, team: "Ferrari AF Corse", points: 137, wins: 1, engine: "Ferrari 3.0L Twin-Turbo V6 Hybrid" }
            ]
        },
        imsa: {
            season: 2024,
            series: SeriesId.IMSA,
            championDriver: "Felipe Nasr / Dane Cameron (Porsche Penske 963)",
            championTeam: "Porsche Penske Motorsport",
            seasonSummary: "Porsche Penske Motorsport dominated North American prototype racing, sweeping the Rolex 24 at Daytona and capturing the IMSA WeatherTech GTP championship.",
            driverStandings: [
                { pos: 1, driver: "Felipe Nasr / Dane Cameron", nationality: "BRA/USA", team: "Porsche Penske #7", points: 2982, wins: 3, podiums: 7 },
                { pos: 2, driver: "Jack Aitken / Pipo Derani", nationality: "GBR/BRA", team: "Whelen Cadillac #31", points: 2687, wins: 0, podiums: 4 },
                { pos: 3, driver: "Ricky Taylor / Filipe Albuquerque", nationality: "USA/POR", team: "WTR Cadillac #10", points: 2580, wins: 1, podiums: 4 }
            ],
            teamStandings: [
                { pos: 1, team: "Porsche Penske Motorsport", points: 2982, wins: 3, engine: "Porsche 4.6L V8 Hybrid" },
                { pos: 2, team: "Whelen Cadillac Racing", points: 2687, wins: 0, engine: "GM 5.5L V8" },
                { pos: 3, team: "Wayne Taylor Racing with Andretti", points: 2580, wins: 1, engine: "Acura 2.4L V6 Hybrid" }
            ]
        },
        gtwc: {
            season: 2024,
            series: SeriesId.GT_WORLD_CHALLENGE,
            championDriver: "Charles Weerts / Dries Vanthoor (Team WRT BMW)",
            championTeam: "Team WRT (BMW)",
            seasonSummary: "Team WRT and BMW Motorsport secured the Fanatec GT World Challenge Europe Sprint Cup, while Comtoyou Racing Aston Martin took centenary victory at the 24 Hours of Spa.",
            driverStandings: [
                { pos: 1, driver: "Dries Vanthoor / Charles Weerts", nationality: "BEL/BEL", team: "Team WRT BMW #32", points: 105, wins: 3, podiums: 7 },
                { pos: 2, driver: "Lucas Auer / Maro Engel", nationality: "AUT/GER", team: "Winward Racing Mercedes", points: 98, wins: 2, podiums: 6 },
                { pos: 3, driver: "Mattia Drudi / Nicolas Baert", nationality: "ITA/BEL", team: "Comtoyou Aston Martin", points: 88, wins: 1, podiums: 4 }
            ],
            teamStandings: [
                { pos: 1, team: "Team WRT (BMW)", points: 195, wins: 4, engine: "BMW 3.0L TwinPower Turbo" },
                { pos: 2, team: "Winward Racing (Mercedes)", points: 168, wins: 3, engine: "AMG 6.2L V8" },
                { pos: 3, team: "Comtoyou Racing (Aston Martin)", points: 154, wins: 2, engine: "Aston Martin 4.0L V8" }
            ]
        }
    },

    2025: {
        f1: {
            season: 2025,
            series: SeriesId.F1,
            championDriver: "Lando Norris (McLaren)",
            championTeam: "McLaren Formula 1 Team",
            seasonSummary: "McLaren executed a commanding campaign with Lando Norris claiming his maiden Drivers World Championship after an epic multi-team showdown against Max Verstappen and Ferrari.",
            driverStandings: [
                { pos: 1, driver: "Lando Norris", nationality: "GBR", team: "McLaren", points: 392, wins: 7, podiums: 15 },
                { pos: 2, driver: "Max Verstappen", nationality: "NED", team: "Red Bull Racing", points: 378, wins: 7, podiums: 13 },
                { pos: 3, driver: "Charles Leclerc", nationality: "MON", team: "Ferrari", points: 325, wins: 4, podiums: 11 },
                { pos: 4, driver: "Oscar Piastri", nationality: "AUS", team: "McLaren", points: 285, wins: 3, podiums: 10 },
                { pos: 5, driver: "George Russell", nationality: "GBR", team: "Mercedes", points: 240, wins: 2, podiums: 7 },
                { pos: 6, driver: "Carlos Sainz", nationality: "ESP", team: "Ferrari", points: 215, wins: 1, podiums: 6 },
                { pos: 7, driver: "Lewis Hamilton", nationality: "GBR", team: "Mercedes", points: 190, wins: 0, podiums: 5 }
            ],
            teamStandings: [
                { pos: 1, team: "McLaren", points: 677, wins: 10, engine: "Mercedes-AMG" },
                { pos: 2, team: "Ferrari", points: 540, wins: 5, engine: "Ferrari 066/12" },
                { pos: 3, team: "Red Bull Racing", points: 495, wins: 7, engine: "Honda RBPT" },
                { pos: 4, team: "Mercedes", points: 395, wins: 2, engine: "Mercedes-AMG" },
                { pos: 5, team: "Aston Martin", points: 112, wins: 0, engine: "Mercedes-AMG" },
                { pos: 6, team: "Williams", points: 58, wins: 0, engine: "Mercedes-AMG" }
            ]
        },
        motogp: {
            season: 2025,
            series: SeriesId.MOTOGP,
            championDriver: "Marc Márquez (Ducati Lenovo Team)",
            championTeam: "Ducati Lenovo Team",
            seasonSummary: "Marc Márquez's official arrival alongside Pecco Bagnaia at the factory Ducati Lenovo team created an extraordinary championship battle that concluded with Márquez taking his ninth career World Title.",
            driverStandings: [
                { pos: 1, driver: "Marc Márquez", nationality: "ESP", team: "Ducati Lenovo Team", points: 472, wins: 9, podiums: 15 },
                { pos: 2, driver: "Francesco Bagnaia", nationality: "ITA", team: "Ducati Lenovo Team", points: 445, wins: 8, podiums: 14 },
                { pos: 3, driver: "Jorge Martín", nationality: "ESP", team: "Aprilia Racing", points: 360, wins: 3, podiums: 11 },
                { pos: 4, driver: "Pedro Acosta", nationality: "ESP", team: "Red Bull KTM Factory", points: 285, wins: 2, podiums: 8 },
                { pos: 5, driver: "Enea Bastianini", nationality: "ITA", team: "Red Bull KTM Tech3", points: 240, wins: 1, podiums: 6 }
            ],
            teamStandings: [
                { pos: 1, team: "Ducati Lenovo Team", points: 917, wins: 17, engine: "Ducati Desmosedici GP25" },
                { pos: 2, team: "Aprilia Racing", points: 480, wins: 3, engine: "Aprilia RS-GP25" },
                { pos: 3, team: "Red Bull KTM Factory", points: 420, wins: 2, engine: "KTM RC16" }
            ]
        },
        wec: {
            season: 2025,
            series: SeriesId.WEC,
            championDriver: "Antonio Fuoco / Miguel Molina / Nicklas Nielsen (Ferrari AF Corse)",
            championTeam: "Ferrari AF Corse",
            seasonSummary: "Ferrari AF Corse completed an astonishing triumph, winning the 24 Hours of Le Mans for the third consecutive year and lifting the World Endurance Hypercar Championship.",
            driverStandings: [
                { pos: 1, driver: "Antonio Fuoco / Miguel Molina / Nicklas Nielsen", nationality: "ITA/ESP/DEN", team: "Ferrari AF Corse #50", points: 165, wins: 3, podiums: 6 },
                { pos: 2, driver: "Kévin Estre / Laurens Vanthoor", nationality: "FRA/BEL", team: "Porsche Penske #6", points: 150, wins: 2, podiums: 5 },
                { pos: 3, driver: "Sébastien Buemi / Brendon Hartley", nationality: "SUI/NZL", team: "Toyota Gazoo #8", points: 132, wins: 2, podiums: 4 }
            ],
            teamStandings: [
                { pos: 1, team: "Ferrari AF Corse", points: 195, wins: 3, engine: "Ferrari 3.0L V6 Hybrid" },
                { pos: 2, team: "Porsche Penske Motorsport", points: 178, wins: 2, engine: "Porsche 4.6L V8 Hybrid" },
                { pos: 3, team: "Toyota Gazoo Racing", points: 164, wins: 2, engine: "Toyota 3.5L V6 Hybrid" }
            ]
        },
        imsa: {
            season: 2025,
            series: SeriesId.IMSA,
            championDriver: "Ricky Taylor / Filipe Albuquerque (Wayne Taylor Racing Cadillac)",
            championTeam: "Wayne Taylor Racing with Andretti",
            seasonSummary: "WTR Andretti in partnership with Cadillac Racing delivered a masterclass endurance campaign, capturing Petit Le Mans and the premier IMSA WeatherTech title.",
            driverStandings: [
                { pos: 1, driver: "Ricky Taylor / Filipe Albuquerque", nationality: "USA/POR", team: "WTR Cadillac #10", points: 3040, wins: 3, podiums: 7 },
                { pos: 2, driver: "Felipe Nasr / Dane Cameron", nationality: "BRA/USA", team: "Porsche Penske #7", points: 2950, wins: 3, podiums: 6 },
                { pos: 3, driver: "Tom Blomqvist / Colin Braun", nationality: "GBR/USA", team: "Meyer Shank Acura #60", points: 2790, wins: 2, podiums: 5 }
            ],
            teamStandings: [
                { pos: 1, team: "Wayne Taylor Racing with Andretti", points: 3040, wins: 3, engine: "GM 5.5L V8" },
                { pos: 2, team: "Porsche Penske Motorsport", points: 2950, wins: 3, engine: "Porsche 4.6L V8" },
                { pos: 3, team: "Meyer Shank Racing", points: 2790, wins: 2, engine: "Acura 2.4L V6" }
            ]
        },
        gtwc: {
            season: 2025,
            series: SeriesId.GT_WORLD_CHALLENGE,
            championDriver: "Dries Vanthoor / Charles Weerts (Team WRT BMW)",
            championTeam: "Team WRT (BMW)",
            seasonSummary: "BMW M Team WRT swept both the Endurance and Sprint Cups with relentless aerodynamic pace and clinical pit work.",
            driverStandings: [
                { pos: 1, driver: "Dries Vanthoor / Charles Weerts", nationality: "BEL/BEL", team: "Team WRT BMW #32", points: 145, wins: 4, podiums: 8 },
                { pos: 2, driver: "Alessandro Pier Guidi / Alessio Rovera", nationality: "ITA/ITA", team: "AF Corse Ferrari #51", points: 130, wins: 3, podiums: 6 },
                { pos: 3, driver: "Maro Engel / Luca Stolz", nationality: "GER/GER", team: "GetSpeed Mercedes #2", points: 115, wins: 2, podiums: 5 }
            ],
            teamStandings: [
                { pos: 1, team: "Team WRT (BMW)", points: 215, wins: 5, engine: "BMW 3.0L TwinPower Turbo" },
                { pos: 2, team: "AF Corse Ferrari", points: 185, wins: 3, engine: "Ferrari 3.0L Twin-Turbo V6" },
                { pos: 3, team: "Mercedes-AMG Team GetSpeed", points: 160, wins: 2, engine: "AMG 6.2L V8" }
            ]
        }
    }
};

export const getHistoricalSeason = (season: number, series: SeriesId): HistoricalSeasonStandings | null => {
    const s = String(series || "").toLowerCase();
    const key = s.includes("moto") ? "motogp" :
                s.includes("wec") ? "wec" :
                s.includes("imsa") ? "imsa" :
                s.includes("gt") ? "gtwc" : "f1";
    
    return HISTORICAL_SEASONS_DATA[season]?.[key] || null;
};
