import { SeriesId, Team } from "../types";

export const getTeamsForSeries = (series: SeriesId): Team[] => {
    switch (series) {
        // ==========================================
        // 1. FORMULA 1 - OFFICIAL 2026 FULL GRID
        // ==========================================
        case SeriesId.F1:
            return [
                {
                    id: 'mclaren',
                    name: 'McLaren',
                    fullName: 'McLaren Formula 1 Team',
                    principal: 'Andrea Stella',
                    base: 'Woking, Surrey, United Kingdom',
                    car: 'MCL40',
                    engine: 'Mercedes-AMG F1 M17 E Performance (1.6L V6 Turbo Hybrid)',
                    chassis: 'McLaren Carbon Fibre Composite Monocoque',
                    technicalDirector: 'Peter Prodromou / Rob Marshall',
                    sponsors: ['OKX', 'Google Android/Chrome', 'Monster Energy', 'Cisco', 'Mastercard'],
                    firstEntry: '1966 Monaco GP',
                    worldChampionships: 9,
                    logoColor: '#ff8000',
                    logo: 'https://upload.wikimedia.org/wikipedia/en/6/66/McLaren_Racing_logo.svg',
                    image: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?q=80&w=1200&auto=format&fit=crop',
                    history: 'Reigning Constructors World Champions. Founded by Bruce McLaren in 1963, McLaren is one of the most storied names in motorsport history.',
                    points: 385,
                    rank: 1,
                    drivers: [
                        { 
                            name: 'Lando Norris', 
                            number: 4, 
                            nationality: 'GBR',
                            image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600&auto=format&fit=crop',
                            stats: { titles: 0, wins: 4, podiums: 26 },
                            bio: 'McLaren\'s long-term leader and Grand Prix winner. Known for razor-sharp qualifying pace and exceptional tire management.'
                        },
                        { 
                            name: 'Oscar Piastri', 
                            number: 81, 
                            nationality: 'AUS',
                            image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop',
                            stats: { titles: 0, wins: 2, podiums: 10 },
                            bio: 'The ice-cool Australian prodigy. Won F3 and F2 championships as a rookie and already a multiple F1 race winner.'
                        }
                    ]
                },
                {
                    id: 'ferrari',
                    name: 'Ferrari',
                    fullName: 'Scuderia Ferrari HP',
                    principal: 'Frédéric Vasseur',
                    base: 'Maranello, Emilia-Romagna, Italy',
                    car: 'SF-26',
                    engine: 'Ferrari 066/13 Hybrid (1.6L V6 Turbo)',
                    chassis: 'Scuderia Ferrari Carbon Composite Honeycomb',
                    technicalDirector: 'Loic Serra',
                    sponsors: ['HP', 'Shell', 'Ray-Ban', 'Santander', 'Puma'],
                    firstEntry: '1950 Monaco GP',
                    worldChampionships: 16,
                    logoColor: '#ff2800',
                    logo: 'https://upload.wikimedia.org/wikipedia/de/c/c0/Scuderia_Ferrari_Logo.svg',
                    image: 'https://images.unsplash.com/photo-1596696142104-633045237731?q=80&w=1200&auto=format&fit=crop',
                    history: 'The oldest and most decorated constructor in Formula 1 history, competing in every season since 1950. The 2026 season marks the historic dream partnership with Lewis Hamilton.',
                    points: 362,
                    rank: 2,
                    drivers: [
                        { 
                            name: 'Lewis Hamilton', 
                            number: 44, 
                            nationality: 'GBR',
                            image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=600&auto=format&fit=crop',
                            stats: { titles: 7, wins: 105, podiums: 202 },
                            bio: 'Seven-time World Champion and statistically the greatest driver in F1 history. The Briton embarks on a legendary chapter wearing the iconic Maranello red.'
                        },
                        { 
                            name: 'Charles Leclerc', 
                            number: 16, 
                            nationality: 'MON',
                            image: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?q=80&w=600&auto=format&fit=crop',
                            stats: { titles: 0, wins: 8, podiums: 43 },
                            bio: 'Monaco\'s hometown hero and Ferrari\'s emotional core. Revered for blistering qualifying speed and supreme technical mastery on street circuits.'
                        }
                    ]
                },
                {
                    id: 'red_bull',
                    name: 'Red Bull Racing',
                    fullName: 'Oracle Red Bull Racing',
                    principal: 'Christian Horner',
                    base: 'Milton Keynes, Buckinghamshire, United Kingdom',
                    car: 'RB22',
                    engine: 'Red Bull Ford Powertrains (Next-Gen 2026 Spec PU)',
                    chassis: 'Red Bull Racing Carbon Honeycomb',
                    technicalDirector: 'Pierre Waché',
                    sponsors: ['Oracle', 'Ford Motor Company', 'Bybit', 'Mobil 1', 'TAG Heuer'],
                    firstEntry: '2005 Australian GP',
                    worldChampionships: 6,
                    logoColor: '#0000cc',
                    logo: 'https://upload.wikimedia.org/wikipedia/de/c/c4/Red_Bull_Racing_logo.svg',
                    image: 'https://images.unsplash.com/photo-1649931818231-50e8d0e0638c?q=80&w=1200&auto=format&fit=crop',
                    history: 'A dynamic powerhouse that reshaped F1 modern engineering. Dominant champion in multiple eras with Vettel and Verstappen, now partnering with Ford for the 2026 PU regulations.',
                    points: 318,
                    rank: 3,
                    drivers: [
                        { 
                            name: 'Max Verstappen', 
                            number: 1, 
                            nationality: 'NED', 
                            image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=600&auto=format&fit=crop',
                            stats: { titles: 4, wins: 64, podiums: 114 },
                            bio: 'Four-time World Champion and the benchmark of ruthless precision and aggression. Holds all-time records for single-season dominance.'
                        },
                        { 
                            name: 'Liam Lawson', 
                            number: 30, 
                            nationality: 'NZL',
                            image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=600&auto=format&fit=crop',
                            stats: { titles: 0, wins: 0, podiums: 1 },
                            bio: 'The combative Kiwi racer earns a full-time senior seat after proving his tenacity in high-pressure substitute appearances and sprint battles.'
                        }
                    ]
                },
                {
                    id: 'mercedes',
                    name: 'Mercedes',
                    fullName: 'Mercedes-AMG PETRONAS F1 Team',
                    principal: 'Toto Wolff',
                    base: 'Brackley & Brixworth, Northamptonshire, UK',
                    car: 'W17',
                    engine: 'Mercedes-AMG F1 M17 E Performance',
                    chassis: 'Mercedes-AMG Carbon Composite Monocoque',
                    technicalDirector: 'James Allison',
                    sponsors: ['PETRONAS', 'INEOS', 'CrowdStrike', 'TeamViewer', 'Tommy Hilfiger'],
                    firstEntry: '1954 French GP (Modern return: 2010)',
                    worldChampionships: 8,
                    logoColor: '#00d2be',
                    logo: 'https://upload.wikimedia.org/wikipedia/commons/f/fb/Mercedes_AMG_Petronas_F1_Logo.svg',
                    image: 'https://images.unsplash.com/photo-1625902347278-651d69db2992?q=80&w=1200&auto=format&fit=crop',
                    history: 'Engineered an unprecedented eight consecutive Constructors World Titles (2014-2021). Enters 2026 with an all-new dynamic youthful British-Italian lineup.',
                    points: 215,
                    rank: 4,
                    drivers: [
                        { 
                            name: 'George Russell', 
                            number: 63, 
                            nationality: 'GBR', 
                            image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop',
                            stats: { titles: 0, wins: 3, podiums: 16 },
                            bio: 'Now the established team leader at Mercedes. Combines blistering single-lap speed with methodical engineering feedback.'
                        },
                        { 
                            name: 'Kimi Antonelli', 
                            number: 12, 
                            nationality: 'ITA',
                            image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=600&auto=format&fit=crop',
                            stats: { titles: 0, wins: 0, podiums: 0 },
                            bio: 'The most anticipated Italian teenage prodigy in decades. Fast-tracked through junior formulae into the premier Silver Arrows seat.'
                        }
                    ]
                },
                {
                    id: 'aston_martin',
                    name: 'Aston Martin',
                    fullName: 'Aston Martin Aramco F1 Team',
                    principal: 'Mike Krack',
                    base: 'Silverstone, Northamptonshire, United Kingdom',
                    car: 'AMR26',
                    engine: 'Honda HRC Factory Works Power Unit (Exclusive Partnership)',
                    chassis: 'Aston Martin Carbon Composite AMR Spec',
                    technicalDirector: 'Adrian Newey / Dan Fallows',
                    sponsors: ['Aramco', 'Cognizant', 'JCB', 'Valvoline', 'Hugo Boss'],
                    firstEntry: '1959 Dutch GP (Rebranded 2021)',
                    worldChampionships: 0,
                    logoColor: '#006f62',
                    logo: 'https://upload.wikimedia.org/wikipedia/de/e/e0/Aston_Martin_Lagonda_Logo.svg',
                    image: 'https://images.unsplash.com/photo-1563720223185-11003d516935?q=80&w=1200&auto=format&fit=crop',
                    history: 'Operating out of an ultra-modern smart AMR technology campus in Silverstone with a state-of-the-art wind tunnel, powered exclusively by Honda factory works engines with design visionary Adrian Newey.',
                    points: 64,
                    rank: 6,
                    drivers: [
                        { 
                            name: 'Fernando Alonso', 
                            number: 14, 
                            nationality: 'ESP', 
                            image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=600&auto=format&fit=crop',
                            stats: { titles: 2, wins: 32, podiums: 106 },
                            bio: 'Two-time World Champion and eternal gladiator. Revered for incomparable racecraft, tire preservation, and unmatched tactical vision in the cockpit.'
                        },
                        { 
                            name: 'Lance Stroll', 
                            number: 18, 
                            nationality: 'CAN',
                            image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=600&auto=format&fit=crop',
                            stats: { titles: 0, wins: 0, podiums: 3 },
                            bio: 'Experienced Canadian driver with natural wet-weather prowess, committed to propelling the Silverstone squad forward.'
                        }
                    ]
                },
                {
                    id: 'williams',
                    name: 'Williams',
                    fullName: 'Williams Racing',
                    principal: 'James Vowles',
                    base: 'Grove, Oxfordshire, United Kingdom',
                    car: 'FW48',
                    engine: 'Mercedes-AMG F1 M17',
                    chassis: 'Williams Advanced Carbon Monocoque',
                    technicalDirector: 'Pat Fry',
                    sponsors: ['Komatsu', 'Gulf Oil', 'Stephens', 'Myprotein', 'Kraken'],
                    firstEntry: '1977 Spanish GP',
                    worldChampionships: 9,
                    logoColor: '#00a0dd',
                    logo: 'https://upload.wikimedia.org/wikipedia/de/a/ab/Williams_F1_Logo.svg',
                    image: 'https://images.unsplash.com/photo-1629219356886-c322b724497e?q=80&w=1200&auto=format&fit=crop',
                    history: 'One of the true heritage titans of F1 with 9 Constructors and 7 Drivers championships. Under James Vowles leadership and Carlos Sainz signing, Grove enters a modern renaissance.',
                    points: 98,
                    rank: 5,
                    drivers: [
                        { 
                            name: 'Carlos Sainz', 
                            number: 55, 
                            nationality: 'ESP', 
                            image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop',
                            stats: { titles: 0, wins: 4, podiums: 25 },
                            bio: 'The Smooth Operator joins Williams on a multi-year project. Celebrated for cerebral race management, meticulous engineering focus, and Grand Prix-winning caliber.'
                        },
                        { 
                            name: 'Alexander Albon', 
                            number: 23, 
                            nationality: 'THA', 
                            image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=600&auto=format&fit=crop',
                            stats: { titles: 0, wins: 0, podiums: 2 },
                            bio: 'The Thai talisman whose tenacious defensive driving and qualifying speed spearheaded Williams\' resurgence into regular points scoring.'
                        }
                    ]
                },
                {
                    id: 'alpine',
                    name: 'Alpine',
                    fullName: 'BWT Alpine F1 Team',
                    principal: 'Oliver Oakes',
                    base: 'Enstone, Oxfordshire, UK & Viry-Châtillon, France',
                    car: 'A526',
                    engine: 'Mercedes-AMG Customer Power Unit',
                    chassis: 'Alpine Carbon Composite Enstone Tub',
                    technicalDirector: 'David Sanchez',
                    sponsors: ['BWT', 'Castrol', 'Canal+', 'Microsoft', 'Eni'],
                    firstEntry: '1977 (As Renault; Alpine rebranded 2021)',
                    worldChampionships: 2,
                    logoColor: '#0055a4',
                    logo: 'https://upload.wikimedia.org/wikipedia/fr/b/b7/Alpine_F1_Team_2021_Logo.svg',
                    image: 'https://images.unsplash.com/photo-1596564619376-793570327464?q=80&w=1200&auto=format&fit=crop',
                    history: 'Operating out of Enstone (former Benetton and Renault champions). Switching to Mercedes power units provides a fresh technological foundation.',
                    points: 14,
                    rank: 10,
                    drivers: [
                        { 
                            name: 'Pierre Gasly', 
                            number: 10, 
                            nationality: 'FRA', 
                            image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=600&auto=format&fit=crop',
                            stats: { titles: 0, wins: 1, podiums: 5 },
                            bio: 'Monza Grand Prix winner and tenacious team spearhead. Known for snatching podiums in chaotic races.'
                        },
                        { 
                            name: 'Jack Doohan', 
                            number: 7, 
                            nationality: 'AUS', 
                            image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600&auto=format&fit=crop',
                            stats: { titles: 0, wins: 0, podiums: 0 },
                            bio: 'Son of MotoGP legend Mick Doohan. Stepped up through the Alpine Academy to claim his rightful full-time seat in F1.'
                        }
                    ]
                },
                {
                    id: 'racing_bulls',
                    name: 'Racing Bulls',
                    fullName: 'Visa Cash App RB Formula One Team',
                    principal: 'Laurent Mekies',
                    base: 'Faenza, Ravenna, Italy & Milton Keynes, UK',
                    car: 'VCARB 03',
                    engine: 'Red Bull Ford Powertrains',
                    chassis: 'VCARB Carbon Composite',
                    technicalDirector: 'Jody Egginton',
                    sponsors: ['Visa', 'Cash App', 'Hugo', 'Tudor Watches', 'Red Bull'],
                    firstEntry: '1985 (As Minardi; AlphaTauri/RB)',
                    worldChampionships: 0,
                    logoColor: '#1634b0',
                    logo: 'https://upload.wikimedia.org/wikipedia/de/c/c4/Red_Bull_Racing_logo.svg',
                    image: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?q=80&w=1200&auto=format&fit=crop',
                    history: 'Faenza-based sister team to Red Bull Racing, acting as an elite incubator for world-class young talent with aggressive development cycles.',
                    points: 32,
                    rank: 8,
                    drivers: [
                        { 
                            name: 'Yuki Tsunoda', 
                            number: 22, 
                            nationality: 'JPN', 
                            image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop',
                            stats: { titles: 0, wins: 0, podiums: 0 },
                            bio: 'Fiery Japanese talent who has matured into a dependable and rapid team leader, frequently punching above the car\'s weight.'
                        },
                        { 
                            name: 'Isack Hadjar', 
                            number: 6, 
                            nationality: 'FRA', 
                            image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=600&auto=format&fit=crop',
                            stats: { titles: 0, wins: 0, podiums: 0 },
                            bio: 'Red Bull Junior sensation dubbed "little Prost". Promoted to F1 following an exceptional Formula 2 championship campaign.'
                        }
                    ]
                },
                {
                    id: 'audi',
                    name: 'Audi F1 Team',
                    fullName: 'Audi Revolut F1 Team',
                    principal: 'Mattia Binotto / Jonathan Wheatley',
                    base: 'Hinwil, Zurich, Switzerland & Neuburg, Germany',
                    car: 'Audi R26',
                    engine: 'Audi Neuburg 2026 Factory Hybrid Power Unit',
                    chassis: 'Audi Sauber Engineered Carbon Monocoque',
                    technicalDirector: 'James Key',
                    sponsors: ['Revolut', 'BP / Castrol', 'Pirelli', 'Adidas', 'Sonax'],
                    firstEntry: '1993 (As Sauber; Official Audi Works 2026)',
                    worldChampionships: 0,
                    logoColor: '#e00000',
                    logo: 'https://upload.wikimedia.org/wikipedia/commons/9/92/Audi-Logo_2016.svg',
                    image: 'https://images.unsplash.com/photo-1549921296-3a6b5b3b7b25?q=80&w=1200&auto=format&fit=crop',
                    history: 'German automotive giant Audi enters Formula 1 as a full 100% factory works team for the revolutionary 2026 engine regulations, having acquired the Sauber operation.',
                    points: 38,
                    rank: 7,
                    drivers: [
                        { 
                            name: 'Nico Hülkenberg', 
                            number: 27, 
                            nationality: 'GER', 
                            image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=600&auto=format&fit=crop',
                            stats: { titles: 0, wins: 0, podiums: 0 },
                            bio: 'Seasoned German master of qualifying and tire strategy. Selected as the cornerstone driver to spearhead Audi\'s foundational F1 development.'
                        },
                        { 
                            name: 'Gabriel Bortoleto', 
                            number: 5, 
                            nationality: 'BRA', 
                            image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=600&auto=format&fit=crop',
                            stats: { titles: 0, wins: 0, podiums: 0 },
                            bio: 'Brazilian rising star, 2023 FIA F3 Champion and 2024 F2 title winner. Managed by Fernando Alonso\'s A14 academy and trusted with Audi\'s future.'
                        }
                    ]
                },
                {
                    id: 'haas',
                    name: 'Haas',
                    fullName: 'MoneyGram Haas F1 Team',
                    principal: 'Ayao Komatsu',
                    base: 'Kannapolis, NC, USA & Banbury, Oxfordshire, UK',
                    car: 'VF-26',
                    engine: 'Ferrari 066/13 Hybrid',
                    chassis: 'Dallara Carbon Honeycomb',
                    technicalDirector: 'Andrea De Zordo',
                    sponsors: ['MoneyGram', 'Toyota Gazoo Racing', 'Chipotle', 'Haas Automation', 'Oakley'],
                    firstEntry: '2016 Australian GP',
                    worldChampionships: 0,
                    logoColor: '#e60000',
                    logo: 'https://upload.wikimedia.org/wikipedia/commons/e/ed/Haas_F1_Team_Logo.svg',
                    image: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?q=80&w=1200&auto=format&fit=crop',
                    history: 'The sole American team in F1. Under Ayao Komatsu and backed by a comprehensive technical alliance with Toyota Gazoo Racing, Haas enters 2026 with high aspirations.',
                    points: 22,
                    rank: 9,
                    drivers: [
                        { 
                            name: 'Esteban Ocon', 
                            number: 31, 
                            nationality: 'FRA', 
                            image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop',
                            stats: { titles: 0, wins: 1, podiums: 4 },
                            bio: 'Grand Prix winner who brings battle-tested frontline experience and fierce defensive racecraft to the American outfit.'
                        },
                        { 
                            name: 'Oliver Bearman', 
                            number: 87, 
                            nationality: 'GBR', 
                            image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600&auto=format&fit=crop',
                            stats: { titles: 0, wins: 0, podiums: 0 },
                            bio: 'Ferrari Academy protégé who stunned the paddock with sensational points-scoring substitute drives as a teenager, earning his full rookie season.'
                        }
                    ]
                }
            ];

        // ==========================================
        // 2. MOTOGP - OFFICIAL 2026 FULL GRID
        // ==========================================
        case SeriesId.MOTOGP:
            return [
                {
                    id: 'ducati_lenovo',
                    name: 'Ducati Lenovo',
                    fullName: 'Ducati Lenovo Team',
                    principal: 'Davide Tardozzi / Luigi Dall\'Igna',
                    base: 'Borgo Panigale, Bologna, Italy',
                    car: 'Desmosedici GP26',
                    engine: 'Ducati 1000cc 90° V4 Desmodromic (Over 300 hp)',
                    chassis: 'Ducati Carbon-Fibre Twin Spar Monocoque',
                    technicalDirector: 'Gigi Dall\'Igna',
                    sponsors: ['Lenovo', 'Monster Energy', 'Shell Advance', 'Riello', 'Akrapovič'],
                    firstEntry: '2003 Suzuka',
                    worldChampionships: 5,
                    points: 485,
                    rank: 1,
                    logoColor: '#cc0000',
                    logo: 'https://upload.wikimedia.org/wikipedia/commons/3/30/Ducati_red_logo.svg',
                    image: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?q=80&w=1200&auto=format&fit=crop',
                    history: 'The reigning superpower of premier-class motorcycle racing. Dall\'Igna\'s engineering revolutionized aerodynamics and ride-height devices in MotoGP.',
                    drivers: [
                        { 
                            name: 'Francesco Bagnaia', 
                            number: 63, 
                            nationality: 'ITA', 
                            image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=600&auto=format&fit=crop',
                            stats: { titles: 3, wins: 30, podiums: 58 }, 
                            bio: 'Double MotoGP Premier Class World Champion. Known for unrivaled front-end braking stability and blistering Sunday race consistency.' 
                        },
                        { 
                            name: 'Marc Márquez', 
                            number: 93, 
                            nationality: 'ESP', 
                            image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=600&auto=format&fit=crop',
                            stats: { titles: 8, wins: 88, podiums: 148 }, 
                            bio: 'Eight-time World Champion and racing icon. Having completed his redemption arc, Márquez on the official factory red Ducati forms MotoGP\'s ultimate super-team.' 
                        }
                    ]
                },
                {
                    id: 'aprilia_racing',
                    name: 'Aprilia',
                    fullName: 'Aprilia Racing',
                    principal: 'Massimo Rivola',
                    base: 'Noale, Venice, Italy',
                    car: 'RS-GP26',
                    engine: 'Aprilia 1000cc 90° V4 DOHC',
                    chassis: 'Aprilia Twin-Spar Aluminium & Carbon Swingarm',
                    technicalDirector: 'Fabiano Sterlacchini',
                    sponsors: ['Castrol', 'SC-Project', 'Marsh', 'Lifenet', 'Sky'],
                    firstEntry: '2002 (Modern Factory: 2015)',
                    worldChampionships: 0,
                    points: 342,
                    rank: 2,
                    logoColor: '#2b2b2b',
                    logo: 'https://upload.wikimedia.org/wikipedia/commons/9/9f/Aprilia_logo.svg',
                    image: 'https://images.unsplash.com/photo-1599058917212-d750089bc07e?q=80&w=1200&auto=format&fit=crop',
                    history: 'From underdog privateers to premier class title contenders with unmatched corner-speed aerodynamics. Now armed with reigning champion Jorge Martín.',
                    drivers: [
                        { 
                            name: 'Jorge Martín', 
                            number: 89, 
                            nationality: 'ESP', 
                            image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop',
                            stats: { titles: 2, wins: 12, podiums: 36 }, 
                            bio: 'The "Martinator" and 2024 MotoGP World Champion. Renowned for supreme qualifying explosiveness and aggression in Sprint races.' 
                        },
                        { 
                            name: 'Marco Bezzecchi', 
                            number: 72, 
                            nationality: 'ITA', 
                            image: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?q=80&w=600&auto=format&fit=crop',
                            stats: { titles: 0, wins: 3, podiums: 14 }, 
                            bio: 'VR46 Academy ace making the transition to factory Aprilia. Exceptional rider on high-grip flowing circuits.' 
                        }
                    ]
                },
                {
                    id: 'ktm_factory',
                    name: 'Red Bull KTM',
                    fullName: 'Red Bull KTM Factory Racing',
                    principal: 'Francesco Guidotti / Pit Beirer',
                    base: 'Mattighofen, Austria',
                    car: 'KTM RC16',
                    engine: 'KTM 1000cc V4 (Steel Hybrid/Carbon Chassis)',
                    chassis: 'KTM Steel Hybrid Backbone Frame with Carbon Subframe',
                    technicalDirector: 'Sebastian Risse',
                    sponsors: ['Red Bull', 'Motorex', 'Akrapovič', 'WP Suspension', 'KTM PowerParts'],
                    firstEntry: '2017 Qatar GP',
                    worldChampionships: 0,
                    points: 278,
                    rank: 3,
                    logoColor: '#ff6600',
                    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/KTM-Logo.svg/2560px-KTM-Logo.svg.png',
                    image: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?q=80&w=1200&auto=format&fit=crop',
                    history: 'Austrian powerhouse famous for its "Ready to Race" ethos. The only manufacturer utilizing WP suspension and a proprietary steel/carbon trellis frame.',
                    drivers: [
                        { 
                            name: 'Pedro Acosta', 
                            number: 31, 
                            nationality: 'ESP', 
                            image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600&auto=format&fit=crop',
                            stats: { titles: 2, wins: 1, podiums: 9 }, 
                            bio: 'The generational phenom. Moto3 and Moto2 champion who shattered premier-class rookie records, now leading the factory Austrian effort.' 
                        },
                        { 
                            name: 'Brad Binder', 
                            number: 33, 
                            nationality: 'RSA', 
                            image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=600&auto=format&fit=crop',
                            stats: { titles: 1, wins: 2, podiums: 18 }, 
                            bio: 'South Africa\'s fearless warrior. Master of the opening-lap overtakes and tire-sliding rear brake modulation.' 
                        }
                    ]
                },
                {
                    id: 'ktm_tech3',
                    name: 'Red Bull Tech3',
                    fullName: 'Red Bull KTM Tech3',
                    principal: 'Hervé Poncharal / Nicolas Goyon',
                    base: 'Bormes-les-Mimosas, Var, France',
                    car: 'KTM RC16 (Factory Spec)',
                    engine: 'KTM 1000cc V4 Factory Engine',
                    chassis: 'KTM Steel Hybrid Spec Frame',
                    technicalDirector: 'Guy Coulon',
                    sponsors: ['Red Bull', 'Motorex', 'ELF', 'KTM'],
                    firstEntry: '2001 (KTM Partner: 2019)',
                    worldChampionships: 0,
                    points: 245,
                    rank: 4,
                    logoColor: '#ff6600',
                    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/KTM-Logo.svg/2560px-KTM-Logo.svg.png',
                    image: 'https://images.unsplash.com/photo-1599058917212-d750089bc07e?q=80&w=1200&auto=format&fit=crop',
                    history: 'Veteran French outfit fielding identical factory-spec machinery, boasting multiple Grand Prix winners in Bastianini and Viñales.',
                    drivers: [
                        { 
                            name: 'Enea Bastianini', 
                            number: 23, 
                            nationality: 'ITA', 
                            image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop',
                            stats: { titles: 1, wins: 7, podiums: 18 }, 
                            bio: '"The Beast" is celebrated for devastating late-race pace and tire conservation that crushes rivals in the closing laps.' 
                        },
                        { 
                            name: 'Maverick Viñales', 
                            number: 12, 
                            nationality: 'ESP', 
                            image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=600&auto=format&fit=crop',
                            stats: { titles: 1, wins: 10, podiums: 35 }, 
                            bio: '"Top Gun". Holds the modern record for premier class wins across three different manufacturers, seeking to add KTM as a fourth.' 
                        }
                    ]
                },
                {
                    id: 'gresini',
                    name: 'Gresini Racing',
                    fullName: 'Gresini Racing MotoGP',
                    principal: 'Nadia Padovani',
                    base: 'Faenza, Ravenna, Italy',
                    car: 'Desmosedici GP25',
                    engine: 'Ducati 1000cc V4 Desmodromic',
                    chassis: 'Ducati Twin-Spar Carbon/Aluminium',
                    technicalDirector: 'Michele Masini',
                    sponsors: ['Federal Oil', 'Red Bull', 'Estrella Galicia 0,0', 'Oli Oil', 'MSI'],
                    firstEntry: '1997',
                    worldChampionships: 2,
                    points: 162,
                    rank: 6,
                    logoColor: '#78a2cc',
                    logo: 'https://upload.wikimedia.org/wikipedia/commons/3/30/Ducati_red_logo.svg',
                    image: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?q=80&w=1200&auto=format&fit=crop',
                    history: 'Founded by the late Fausto Gresini and guided triumphantly by his widow Nadia Padovani. The team has become one of the premier race-winning independent teams in modern MotoGP.',
                    drivers: [
                        { 
                            name: 'Alex Márquez', 
                            number: 73, 
                            nationality: 'ESP', 
                            image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=600&auto=format&fit=crop',
                            stats: { titles: 2, wins: 0, podiums: 6 }, 
                            bio: 'Double World Champion (Moto3 & Moto2) and Sprint race victor, possessing superb machine balance on low-grip asphalt.' 
                        },
                        { 
                            name: 'Fermín Aldeguer', 
                            number: 54, 
                            nationality: 'ESP', 
                            image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=600&auto=format&fit=crop',
                            stats: { titles: 0, wins: 0, podiums: 0 }, 
                            bio: 'Sensational teenage signing secured on a multi-year direct Ducati factory contract. Fast, fearless, and explosive in corner entries.' 
                        }
                    ]
                },
                {
                    id: 'vr46',
                    name: 'VR46 Racing',
                    fullName: 'Pertamina Enduro VR46 Racing Team',
                    principal: 'Alessio Salucci / Valentino Rossi',
                    base: 'Tavullia, Pesaro and Urbino, Italy',
                    car: 'Desmosedici GP26 Factory Spec',
                    engine: 'Ducati 1000cc V4 Factory Engine',
                    chassis: 'Ducati Carbon/Aluminium Monocoque',
                    technicalDirector: 'Matteo Flamigni',
                    sponsors: ['Pertamina Enduro', 'eBay', 'Monster Energy', 'Cupra', 'Dainese'],
                    firstEntry: '2022',
                    worldChampionships: 0,
                    points: 184,
                    rank: 5,
                    logoColor: '#d6fe00',
                    logo: 'https://upload.wikimedia.org/wikipedia/commons/3/30/Ducati_red_logo.svg',
                    image: 'https://images.unsplash.com/photo-1599058917212-d750089bc07e?q=80&w=1200&auto=format&fit=crop',
                    history: 'Owned by nine-time World Champion Valentino Rossi, the Tavullia squad was elevated to official factory-supported satellite status for Ducati.',
                    drivers: [
                        { 
                            name: 'Fabio Di Giannantonio', 
                            number: 49, 
                            nationality: 'ITA', 
                            image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop',
                            stats: { titles: 0, wins: 1, podiums: 3 }, 
                            bio: 'Roman rider who secured factory machinery through sheer determination and stunning Grand Prix victories under floodlights in Qatar.' 
                        },
                        { 
                            name: 'Franco Morbidelli', 
                            number: 21, 
                            nationality: 'ITA', 
                            image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=600&auto=format&fit=crop',
                            stats: { titles: 1, wins: 3, podiums: 9 }, 
                            bio: 'Moto2 World Champion and 2020 MotoGP runner-up, returning home to the VR46 family fold.' 
                        }
                    ]
                },
                {
                    id: 'yamaha_factory',
                    name: 'Monster Yamaha',
                    fullName: 'Monster Energy Yamaha MotoGP Team',
                    principal: 'Lin Jarvis / Massimo Meregalli',
                    base: 'Gerno di Lesmo, Monza, Italy & Iwata, Japan',
                    car: 'Yamaha YZR-M1',
                    engine: 'Yamaha 1000cc Crossplane (with next-gen V4 prototype development)',
                    chassis: 'Yamaha Aluminium Twin-Tube Delta Box',
                    technicalDirector: 'Max Bartolini',
                    sponsors: ['Monster Energy', 'Eneos', 'Yamalube', 'Akrapovič', 'Brembo'],
                    firstEntry: '1973',
                    worldChampionships: 18,
                    points: 118,
                    rank: 7,
                    logoColor: '#0026a3',
                    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/Yamaha_Motor_Logo_%28full%29.svg/2560px-Yamaha_Motor_Logo_%28full%29.svg.png',
                    image: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?q=80&w=1200&auto=format&fit=crop',
                    history: 'One of motorcycle racing\'s most iconic marques, home to legends Agostini, Roberts, Rainey, and Rossi. Restructuring under technical director Max Bartolini.',
                    drivers: [
                        { 
                            name: 'Fabio Quartararo', 
                            number: 20, 
                            nationality: 'FRA', 
                            image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=600&auto=format&fit=crop',
                            stats: { titles: 1, wins: 11, podiums: 31 }, 
                            bio: '"El Diablo". 2021 World Champion who commits his peak years to returning Yamaha to the summit of motorcycle engineering.' 
                        },
                        { 
                            name: 'Álex Rins', 
                            number: 42, 
                            nationality: 'ESP', 
                            image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=600&auto=format&fit=crop',
                            stats: { titles: 0, wins: 6, podiums: 18 }, 
                            bio: 'Silky smooth inline-4 rider who won on both Suzuki and Honda machinery, renowned for unmatched mid-corner speed.' 
                        }
                    ]
                },
                {
                    id: 'pramac_yamaha',
                    name: 'Prima Pramac',
                    fullName: 'Prima Pramac Yamaha Factory Racing',
                    principal: 'Paolo Campinoti / Gino Borsoi',
                    base: 'Casole d\'Elsa, Siena, Italy',
                    car: 'Yamaha YZR-M1 Factory Spec',
                    engine: 'Yamaha 1000cc Full Factory Engine',
                    chassis: 'Yamaha Aluminium Twin-Tube',
                    technicalDirector: 'Giacomo Guidotti',
                    sponsors: ['Prima Assicurazioni', 'Generac', 'Motul', 'Yamaha'],
                    firstEntry: '2002',
                    worldChampionships: 1,
                    points: 64,
                    rank: 9,
                    logoColor: '#6c0082',
                    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/Yamaha_Motor_Logo_%28full%29.svg/2560px-Yamaha_Motor_Logo_%28full%29.svg.png',
                    image: 'https://images.unsplash.com/photo-1599058917212-d750089bc07e?q=80&w=1200&auto=format&fit=crop',
                    history: 'Former Independent Team World Champions who made a monumental manufacturer switch to become Yamaha\'s full factory-backed satellite operation.',
                    drivers: [
                        { 
                            name: 'Miguel Oliveira', 
                            number: 88, 
                            nationality: 'POR', 
                            image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop',
                            stats: { titles: 0, wins: 5, podiums: 7 }, 
                            bio: 'Portuguese dental surgeon turned MotoGP master. Five-time Grand Prix winner celebrated for wet-weather sorcery and calm technical feedback.' 
                        },
                        { 
                            name: 'Jack Miller', 
                            number: 43, 
                            nationality: 'AUS', 
                            image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=600&auto=format&fit=crop',
                            stats: { titles: 0, wins: 4, podiums: 23 }, 
                            bio: '"Jackass" Miller brings invaluable multi-manufacturer experience (Honda, Ducati, KTM, Yamaha) back to the Pramac family.' 
                        }
                    ]
                },
                {
                    id: 'trackhouse',
                    name: 'Trackhouse Racing',
                    fullName: 'Trackhouse Racing MotoGP',
                    principal: 'Justin Marks / Davide Brivio',
                    base: 'Concord, North Carolina, USA & Noale, Italy',
                    car: 'Aprilia RS-GP26 Factory Spec',
                    engine: 'Aprilia 1000cc 90° V4',
                    chassis: 'Aprilia Twin-Spar Aluminium',
                    technicalDirector: 'Wilco Zeelenberg',
                    sponsors: ['Sterilgarda', 'Gulf Oil', 'Aprilia', 'Trackhouse Entertainment'],
                    firstEntry: '2024',
                    worldChampionships: 0,
                    points: 82,
                    rank: 8,
                    logoColor: '#0055ff',
                    logo: 'https://upload.wikimedia.org/wikipedia/commons/9/9f/Aprilia_logo.svg',
                    image: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?q=80&w=1200&auto=format&fit=crop',
                    history: 'American NASCAR powerhouse brings bold stars-and-stripes branding and F1 championship-winning team boss Davide Brivio to MotoGP.',
                    drivers: [
                        { 
                            name: 'Raúl Fernández', 
                            number: 25, 
                            nationality: 'ESP', 
                            image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=600&auto=format&fit=crop',
                            stats: { titles: 0, wins: 0, podiums: 0 }, 
                            bio: 'Record-shattering Moto2 rookie winner whose raw speed and aggressive turn-in style is unlocking the Aprilia RS-GP.' 
                        },
                        { 
                            name: 'Ai Ogura', 
                            number: 79, 
                            nationality: 'JPN', 
                            image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600&auto=format&fit=crop',
                            stats: { titles: 1, wins: 0, podiums: 0 }, 
                            bio: '2024 Moto2 World Champion. Revered for unflappable mental composure, precision lines, and surgical overtaking accuracy.' 
                        }
                    ]
                },
                {
                    id: 'honda_lcr',
                    name: 'LCR Honda',
                    fullName: 'Castrol Honda LCR / Idemitsu',
                    principal: 'Lucio Cecchinello',
                    base: 'Monte Carlo, Monaco',
                    car: 'Honda RC213V',
                    engine: 'Honda 1000cc 90° V4 DOHC',
                    chassis: 'Honda Aluminium Twin-Tube',
                    technicalDirector: 'Christophe Bourguignon',
                    sponsors: ['Castrol', 'Idemitsu', 'GIVI', 'Sidi', 'Dell\'Orto'],
                    firstEntry: '2006',
                    worldChampionships: 0,
                    points: 44,
                    rank: 10,
                    logoColor: '#008751',
                    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Honda_Logo.svg/2560px-Honda_Logo.svg.png',
                    image: 'https://images.unsplash.com/photo-1599058917212-d750089bc07e?q=80&w=1200&auto=format&fit=crop',
                    history: 'Lucio Cecchinello\'s respected squad represents Honda\'s frontline development outpost, carrying race-winning pedigree.',
                    drivers: [
                        { 
                            name: 'Johann Zarco', 
                            number: 5, 
                            nationality: 'FRA', 
                            image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop',
                            stats: { titles: 2, wins: 1, podiums: 21 }, 
                            bio: 'Double Moto2 World Champion and premier-class winner. His deep technical sensitivity makes him the catalyst of Honda\'s development comeback.' 
                        },
                        { 
                            name: 'Somkiat Chantra', 
                            number: 35, 
                            nationality: 'THA', 
                            image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=600&auto=format&fit=crop',
                            stats: { titles: 0, wins: 0, podiums: 0 }, 
                            bio: 'First Thai rider to compete in MotoGP premier class full-time, following historic Moto2 Grand Prix victories.' 
                        }
                    ]
                },
                {
                    id: 'honda_repsol',
                    name: 'Repsol Honda',
                    fullName: 'Repsol Honda Team (HRC)',
                    principal: 'Alberto Puig',
                    base: 'Asaka, Saitama, Japan & Barcelona, Spain',
                    car: 'Honda RC213V',
                    engine: 'Honda 1000cc V4 (Major 2026 Engine Redesign)',
                    chassis: 'HRC Carbon-Reinforced Aluminium Twin-Tube',
                    technicalDirector: 'Ken Kawauchi',
                    sponsors: ['Repsol', 'Red Bull', 'SC-Project', 'Snap-on', 'Showa'],
                    firstEntry: '1995',
                    worldChampionships: 15,
                    points: 38,
                    rank: 11,
                    logoColor: '#ff5500',
                    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Honda_Logo.svg/2560px-Honda_Logo.svg.png',
                    image: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?q=80&w=1200&auto=format&fit=crop',
                    history: 'Statistically the most triumphant factory squad in premier class history (Doohan, Rossi, Hayden, Stoner, Márquez). Commits unmatched HRC resources to reclaim its crown.',
                    drivers: [
                        { 
                            name: 'Joan Mir', 
                            number: 36, 
                            nationality: 'ESP', 
                            image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=600&auto=format&fit=crop',
                            stats: { titles: 2, wins: 1, podiums: 13 }, 
                            bio: '2020 MotoGP World Champion. Known for relentless tenacity and willingness to ride right on the ragged edge.' 
                        },
                        { 
                            name: 'Luca Marini', 
                            number: 10, 
                            nationality: 'ITA', 
                            image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=600&auto=format&fit=crop',
                            stats: { titles: 0, wins: 0, podiums: 2 }, 
                            bio: 'The engineer in leathers. Methodical, analytical, and central to HRC\'s telemetry re-architecting.' 
                        }
                    ]
                }
            ];

        // ==========================================
        // 3. WEC - WORLD ENDURANCE CHAMPIONSHIP 2026
        // ==========================================
        case SeriesId.WEC:
            return [
                {
                    id: 'porsche_penske_wec',
                    name: 'Porsche Penske',
                    fullName: 'Porsche Penske Motorsport',
                    principal: 'Urs Kuratle / Jonathan Diuguid',
                    base: 'Weissach, Germany & Mooresville, NC, USA',
                    car: 'Porsche 963',
                    category: 'Hypercar',
                    engine: 'Porsche 4.6L Twin-Turbo 90° V8 Hybrid (670 hp)',
                    chassis: 'Multimatic Carbon-Fibre Monocoque (LMDh)',
                    technicalDirector: 'Christian Eckerlin',
                    sponsors: ['Penske', 'PUMA', 'Mobil 1', 'Michelin', 'Tag Heuer'],
                    firstEntry: '2023',
                    worldChampionships: 1,
                    points: 142,
                    rank: 1,
                    logoColor: '#d5001c',
                    logo: 'https://upload.wikimedia.org/wikipedia/de/2/2d/Porsche_Wappen.svg',
                    image: 'https://newsroom.porsche.com/.imaging/mte/porsche-templating-theme/image_1290x726/dam/pnr/2023/Motorsports/WEC/Le-Mans-Test-Day/02-Porsche-963-Porsche-Penske-Motorsport.jpg/jcr:content/02-Porsche-963-Porsche-Penske-Motorsport.jpg',
                    history: 'Porsche is the all-time undisputed king of Le Mans with 19 overall victories. Partnered with legendary Roger Penske, the 963 is the reigning benchmark of endurance balance.',
                    drivers: [
                        { name: 'Kévin Estre', number: 6, nationality: 'FRA', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=600&auto=format&fit=crop', stats: { titles: 2, wins: 18, podiums: 45 }, bio: 'WEC World Champion and Nürburgring master. Regarded as one of the fiercest GT and prototype drivers on earth.' },
                        { name: 'Laurens Vanthoor', number: 6, nationality: 'BEL', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop', stats: { titles: 3, wins: 16, podiums: 42 }, bio: 'Belgian factory ace possessing metronomic consistency across grueling multi-stint night runs.' },
                        { name: 'Matt Campbell', number: 5, nationality: 'AUS', image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=600&auto=format&fit=crop', stats: { titles: 1, wins: 12, podiums: 34 }, bio: 'Australian qualifying specialist capable of extracting ungodly lap times on cold tires.' }
                    ]
                },
                {
                    id: 'ferrari_af_corse',
                    name: 'Ferrari AF Corse',
                    fullName: 'Ferrari AF Corse',
                    principal: 'Antonello Coletta / Batti Pregliasco',
                    base: 'Maranello & Piacenza, Italy',
                    car: 'Ferrari 499P',
                    category: 'Hypercar',
                    engine: 'Ferrari 3.0L Twin-Turbo 120° V6 Hybrid (Front MGU AWD)',
                    chassis: 'Ferrari In-House LMH Carbon Monocoque',
                    technicalDirector: 'Ferdinando Cannizzo',
                    sponsors: ['Richard Mille', 'Ray-Ban', 'Shell', 'Adler Plastic', 'Michelin'],
                    firstEntry: '2023 (Historic Le Mans Winner: 1949-1965, 2023, 2024)',
                    worldChampionships: 2,
                    points: 128,
                    rank: 2,
                    logoColor: '#ff2800',
                    logo: 'https://upload.wikimedia.org/wikipedia/de/c/c0/Scuderia_Ferrari_Logo.svg',
                    image: 'https://images.unsplash.com/photo-1592634976722-13b3c3c78864?q=80&w=1200&auto=format&fit=crop',
                    history: 'Ferrari returned to top-tier sports car racing after a 50-year absence and immediately captured historic back-to-back victories at the 24 Hours of Le Mans in 2023 and 2024.',
                    drivers: [
                        { name: 'Antonio Fuoco', number: 50, nationality: 'ITA', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=600&auto=format&fit=crop', stats: { titles: 1, wins: 4, podiums: 14 }, bio: 'Le Mans 24 Hours winner and undisputed pole position king of the Hypercar class.' },
                        { name: 'Miguel Molina', number: 50, nationality: 'ESP', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=600&auto=format&fit=crop', stats: { titles: 1, wins: 8, podiums: 24 }, bio: 'Spanish veteran who piloted Ferrari to their glorious centenary Le Mans triumph.' },
                        { name: 'Nicklas Nielsen', number: 50, nationality: 'DEN', image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600&auto=format&fit=crop', stats: { titles: 2, wins: 10, podiums: 28 }, bio: 'Danish phenom who famously nursed an open door in the torrential rain to win Le Mans.' }
                    ]
                },
                {
                    id: 'toyota_gazoo_wec',
                    name: 'Toyota Gazoo',
                    fullName: 'Toyota Gazoo Racing',
                    principal: 'Kamui Kobayashi / David Floury',
                    base: 'Cologne, North Rhine-Westphalia, Germany',
                    car: 'GR010 Hybrid',
                    category: 'Hypercar',
                    engine: 'Toyota 3.5L Twin-Turbo V6 Hybrid (Aisin AWD)',
                    chassis: 'Toyota TMG LMH Carbon Composite',
                    technicalDirector: 'John Litjens',
                    sponsors: ['Denso', 'Mobil 1', 'Zent', 'Michelin', 'Panasonic'],
                    firstEntry: '2012',
                    worldChampionships: 5,
                    points: 116,
                    rank: 3,
                    logoColor: '#eb001e',
                    logo: 'https://upload.wikimedia.org/wikipedia/commons/e/e7/Toyota_Gazoo_Racing_logo_2020.svg',
                    image: 'https://images.unsplash.com/photo-1629219356886-c322b724497e?q=80&w=1200&auto=format&fit=crop',
                    history: 'Five-time consecutive 24 Hours of Le Mans champions. Built on unparalleled hybrid reliability, precision pit work, and tactical endurance strategy.',
                    drivers: [
                        { name: 'Sébastien Buemi', number: 8, nationality: 'SUI', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop', stats: { titles: 4, wins: 25, podiums: 52 }, bio: 'Four-time Le Mans overall champion and the all-time winningest driver in WEC history.' },
                        { name: 'Brendon Hartley', number: 8, nationality: 'NZL', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=600&auto=format&fit=crop', stats: { titles: 4, wins: 21, podiums: 48 }, bio: 'Former F1 driver and endurance savant with titles across Porsche and Toyota programs.' },
                        { name: 'Ryo Hirakawa', number: 8, nationality: 'JPN', image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=600&auto=format&fit=crop', stats: { titles: 2, wins: 8, podiums: 22 }, bio: 'Japanese sensation and Le Mans victor possessing devastating tire-management ability.' }
                    ]
                },
                {
                    id: 'aston_martin_thor',
                    name: 'Aston Martin Valkyrie',
                    fullName: 'Aston Martin THOR Team',
                    principal: 'Ian James / Adam Carter',
                    base: 'Silverstone, United Kingdom & Phoenix, Arizona, USA',
                    car: 'Valkyrie AMR-LMH',
                    category: 'Hypercar',
                    engine: 'Cosworth 6.5L Naturally Aspirated V12 (11,000+ RPM Pure Sound)',
                    chassis: 'Aston Martin Carbon Fibre Monocoque (Pure LMH, Non-Hybrid)',
                    technicalDirector: 'Ian James',
                    sponsors: ['Heart of Racing', 'Valvoline', 'Gabe\'s', 'Aston Martin'],
                    firstEntry: '2026',
                    worldChampionships: 0,
                    points: 84,
                    rank: 4,
                    logoColor: '#00665e',
                    logo: 'https://upload.wikimedia.org/wikipedia/de/e/e0/Aston_Martin_Lagonda_Logo.svg',
                    image: 'https://images.unsplash.com/photo-1563720223185-11003d516935?q=80&w=1200&auto=format&fit=crop',
                    history: 'The most anticipated hypercar entry in modern history. The Valkyrie AMR-LMH is powered by a howling naturally aspirated 6.5L Cosworth V12, bringing raw acoustic emotion back to Le Mans.',
                    drivers: [
                        { name: 'Harry Tincknell', number: 7, nationality: 'GBR', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=600&auto=format&fit=crop', stats: { titles: 2, wins: 11, podiums: 29 }, bio: 'Multimatic and Aston Martin factory driver with multiple 24h Le Mans class crowns.' },
                        { name: 'Alex Riberas', number: 7, nationality: 'ESP', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop', stats: { titles: 0, wins: 7, podiums: 21 }, bio: 'Spanish endurance stalwart trusted with testing the Valkyrie\'s radical aerodynamic envelope.' },
                        { name: 'Ross Gunn', number: 9, nationality: 'GBR', image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=600&auto=format&fit=crop', stats: { titles: 1, wins: 9, podiums: 26 }, bio: 'Homegrown Aston Martin talent renowned for relentless stint-long consistency.' }
                    ]
                },
                {
                    id: 'cadillac_jota',
                    name: 'Cadillac JOTA',
                    fullName: 'Cadillac Hertz Team JOTA',
                    principal: 'Sam Hignett / David Clark',
                    base: 'Kent, United Kingdom',
                    car: 'Cadillac V-Series.R',
                    category: 'Hypercar',
                    engine: 'GM 5.5L Naturally Aspirated V8 Hybrid (Thunderous cross-plane)',
                    chassis: 'Dallara Carbon Monocoque (LMDh)',
                    technicalDirector: 'Tom Bowdridge',
                    sponsors: ['Hertz', 'Brady Brand', 'Singer Group', 'Mobil 1'],
                    firstEntry: '2023',
                    worldChampionships: 0,
                    points: 62,
                    rank: 6,
                    logoColor: '#f1b434',
                    logo: 'https://upload.wikimedia.org/wikipedia/en/e/e3/Cadillac_V-Series_logo.svg',
                    image: 'https://images.unsplash.com/photo-1549921296-3a6b5b3b7b25?q=80&w=1200&auto=format&fit=crop',
                    history: 'Britain\'s premier sportscar squad JOTA became the official Cadillac factory works operation for WEC, fielding the glorious roaring 5.5-liter American V8.',
                    drivers: [
                        { name: 'Will Stevens', number: 12, nationality: 'GBR', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=600&auto=format&fit=crop', stats: { titles: 1, wins: 6, podiums: 19 }, bio: 'Former F1 racer and Spa 6 Hours overall winner.' },
                        { name: 'Callum Ilott', number: 12, nationality: 'GBR', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop', stats: { titles: 0, wins: 2, podiums: 8 }, bio: 'Ferrari Academy graduate and overall WEC race winner in Hypercar.' },
                        { name: 'Jenson Button', number: 38, nationality: 'GBR', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=600&auto=format&fit=crop', stats: { titles: 1, wins: 15, podiums: 50 }, bio: '2009 Formula 1 World Champion bringing unmatched experience and star power.' }
                    ]
                },
                {
                    id: 'bmw_wrt_wec',
                    name: 'BMW M Team WRT',
                    fullName: 'BMW M Team WRT',
                    principal: 'Vincent Vosse',
                    base: 'Baudour, Belgium & Munich, Germany',
                    car: 'BMW M Hybrid V8',
                    category: 'Hypercar',
                    engine: 'BMW P66/3 4.0L Twin-Turbo V8 Hybrid',
                    chassis: 'Dallara Carbon Monocoque',
                    technicalDirector: 'Kurt Treml',
                    sponsors: ['Shell', 'Roborock', 'Puma', 'Endress+Hauser'],
                    firstEntry: '2024',
                    worldChampionships: 0,
                    points: 68,
                    rank: 5,
                    logoColor: '#005b95',
                    logo: 'https://upload.wikimedia.org/wikipedia/commons/4/44/BMW.svg',
                    image: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?q=80&w=1200&auto=format&fit=crop',
                    history: 'BMW returned to the top prototype class with Belgian endurance powerhouse Team WRT, featuring art car heritage and twin-turbo V8 firepower.',
                    drivers: [
                        { name: 'Dries Vanthoor', number: 15, nationality: 'BEL', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop', stats: { titles: 4, wins: 22, podiums: 55 }, bio: 'Regarded by peers as one of the three fastest GT/prototype racers in the world.' },
                        { name: 'Raffaele Marciello', number: 15, nationality: 'SUI', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=600&auto=format&fit=crop', stats: { titles: 3, wins: 20, podiums: 50 }, bio: 'Macau Grand Prix and Spa 24h champion, benchmark of precision.' },
                        { name: 'Marco Wittmann', number: 15, nationality: 'GER', image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=600&auto=format&fit=crop', stats: { titles: 2, wins: 18, podiums: 40 }, bio: 'Two-time DTM Champion and longtime BMW factory stalwart.' }
                    ]
                },
                {
                    id: 'alpine_wec_hypercar',
                    name: 'Alpine Endurance',
                    fullName: 'Alpine Endurance Team',
                    principal: 'Philippe Sinault',
                    base: 'Bourges & Viry-Châtillon, France',
                    car: 'Alpine A424',
                    category: 'Hypercar',
                    engine: 'Mecachrome 3.4L Single-Turbo V6 Hybrid',
                    chassis: 'ORECA Carbon Monocoque (LMDh)',
                    technicalDirector: 'Christophe Chapelain',
                    sponsors: ['Elf', 'Matmut', 'Mobilis', 'Michelin'],
                    firstEntry: '2024',
                    worldChampionships: 0,
                    points: 54,
                    rank: 7,
                    logoColor: '#0055a4',
                    logo: 'https://upload.wikimedia.org/wikipedia/fr/b/b7/Alpine_F1_Team_2021_Logo.svg',
                    image: 'https://images.unsplash.com/photo-1596564619376-793570327464?q=80&w=1200&auto=format&fit=crop',
                    history: 'Carrying French national racing pride, the striking A424 features distinctive arrow-light styling and podium-level prototype pace.',
                    drivers: [
                        { name: 'Mick Schumacher', number: 36, nationality: 'GER', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=600&auto=format&fit=crop', stats: { titles: 1, wins: 0, podiums: 2 }, bio: 'Former F1 racer whose blazing night stints earned Alpine its maiden WEC Hypercar podium.' },
                        { name: 'Matthieu Vaxiviere', number: 36, nationality: 'FRA', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=600&auto=format&fit=crop', stats: { titles: 1, wins: 6, podiums: 18 }, bio: 'French endurance veteran with extensive experience at the Circuit de la Sarthe.' },
                        { name: 'Charles Milesi', number: 35, nationality: 'FRA', image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=600&auto=format&fit=crop', stats: { titles: 1, wins: 5, podiums: 14 }, bio: 'Former LMP2 Le Mans winner and pure qualifying gun.' }
                    ]
                },
                {
                    id: 'peugeot_totalenergies',
                    name: 'Peugeot',
                    fullName: 'Peugeot TotalEnergies',
                    principal: 'Olivier Jansonnie',
                    base: 'Satory, Versailles, France',
                    car: 'Peugeot 9X8 2026',
                    category: 'Hypercar',
                    engine: 'Peugeot 2.6L Twin-Turbo 90° V6 Hybrid (AWD)',
                    chassis: 'Peugeot Carbon Monocoque',
                    technicalDirector: 'Jean-Marc Finot',
                    sponsors: ['TotalEnergies', 'Capgemini', 'Modis', 'Michelin'],
                    firstEntry: '2022',
                    worldChampionships: 0,
                    points: 38,
                    rank: 8,
                    logoColor: '#1a1a1a',
                    logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/f/f7/Peugeot_Logo.svg/1200px-Peugeot_Logo.svg.png',
                    image: 'https://images.unsplash.com/photo-1660570494488-842245b73489?q=80&w=1200&auto=format&fit=crop',
                    history: 'Three-time Le Mans champions (1992, 1993, 2009) racing their dramatically re-engineered winged 9X8 with symmetrical 29/34 rubber.',
                    drivers: [
                        { name: 'Stoffel Vandoorne', number: 94, nationality: 'BEL', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop', stats: { titles: 1, wins: 3, podiums: 12 }, bio: 'Formula E World Champion and former McLaren F1 driver.' },
                        { name: 'Paul Di Resta', number: 93, nationality: 'GBR', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=600&auto=format&fit=crop', stats: { titles: 1, wins: 6, podiums: 15 }, bio: 'DTM Champion and Le Mans class victor with deep technical insight.' },
                        { name: 'Jean-Éric Vergne', number: 93, nationality: 'FRA', image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=600&auto=format&fit=crop', stats: { titles: 2, wins: 8, podiums: 20 }, bio: 'Double Formula E World Champion and fierce street fighter.' }
                    ]
                },
                // LMGT3 Class Contenders
                {
                    id: 'manthey_wec',
                    name: 'Manthey Porsche',
                    fullName: 'Manthey EMA / PureRxcing',
                    principal: 'Nicolas Raeder',
                    base: 'Meuspath, Nürburgring, Germany',
                    car: 'Porsche 911 GT3 R (992)',
                    category: 'LMGT3',
                    engine: 'Porsche 4.2L Naturally Aspirated Flat-6 (565 hp)',
                    chassis: 'Porsche 992 Aluminum-Steel Composite',
                    technicalDirector: 'Patrick Arkenau',
                    sponsors: ['EMA Motorsport', 'PureRxcing', 'Mobil 1'],
                    firstEntry: '2024',
                    worldChampionships: 3,
                    points: 170,
                    rank: 1,
                    logoColor: '#d5001c',
                    logo: 'https://upload.wikimedia.org/wikipedia/de/2/2d/Porsche_Wappen.svg',
                    image: 'https://images.unsplash.com/photo-1629219356886-c322b724497e?q=80&w=1200&auto=format&fit=crop',
                    history: 'The most victorious GT racing squad in Porsche history. Clinched both the LMGT3 World Championship and 24h Le Mans class crown in 2024.',
                    drivers: [
                        { name: 'Richard Lietz', number: 91, nationality: 'AUT', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=600&auto=format&fit=crop', stats: { titles: 5, wins: 20, podiums: 50 }, bio: 'Five-time Le Mans class winner and undisputed Porsche grandmaster.' },
                        { name: 'Morris Schuring', number: 91, nationality: 'NED', image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600&auto=format&fit=crop', stats: { titles: 1, wins: 4, podiums: 10 }, bio: 'Youngest class winner in 24 Hours of Le Mans history at age 19.' }
                    ]
                },
                {
                    id: 'wrt_lmgt3',
                    name: 'Team WRT (Rossi)',
                    fullName: 'Team WRT (BMW Motorsport)',
                    principal: 'Vincent Vosse',
                    base: 'Baudour, Belgium',
                    car: 'BMW M4 GT3 EVO',
                    category: 'LMGT3',
                    engine: 'BMW 3.0L M TwinPower Turbo Inline-6 (590 hp)',
                    chassis: 'BMW Motorsport Steel Tub with Carbon Roll Cage',
                    technicalDirector: 'Kurt Treml',
                    sponsors: ['Mooney VR46', 'Monster Energy', 'BMW M Motorsport'],
                    firstEntry: '2024',
                    worldChampionships: 1,
                    points: 145,
                    rank: 2,
                    logoColor: '#005b95',
                    logo: 'https://upload.wikimedia.org/wikipedia/commons/4/44/BMW.svg',
                    image: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?q=80&w=1200&auto=format&fit=crop',
                    history: 'Fan favorites worldwide featuring MotoGP legend Valentino Rossi behind the wheel of the championship-winning BMW M4 GT3 EVO.',
                    drivers: [
                        { name: 'Valentino Rossi', number: 46, nationality: 'ITA', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop', stats: { titles: 9, wins: 115, podiums: 235 }, bio: '"The Doctor". Nine-time motorcycle World Champion turned podium-finishing GT3 endurance maestro.' },
                        { name: 'Maxime Martin', number: 46, nationality: 'BEL', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=600&auto=format&fit=crop', stats: { titles: 2, wins: 15, podiums: 38 }, bio: 'Belgian factory ace and Spa 24 Hours winner.' },
                        { name: 'Augusto Farfus', number: 31, nationality: 'BRA', image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=600&auto=format&fit=crop', stats: { titles: 2, wins: 12, podiums: 30 }, bio: 'Daytona 24 Hours winner and longtime BMW legend.' }
                    ]
                },
                {
                    id: 'vista_af_corse',
                    name: 'Vista AF Corse',
                    fullName: 'Vista AF Corse (Ferrari)',
                    principal: 'Amato Ferrari',
                    base: 'Piacenza, Italy',
                    car: 'Ferrari 296 LMGT3',
                    category: 'LMGT3',
                    engine: 'Ferrari 3.0L Twin-Turbo 120° V6 (600 hp)',
                    chassis: 'Ferrari Aluminum & Carbon Spaceframe',
                    technicalDirector: 'Ferdinando Cannizzo',
                    sponsors: ['VistaJet', 'Ferrari', 'Richard Mille'],
                    firstEntry: '2024',
                    worldChampionships: 6,
                    points: 130,
                    rank: 3,
                    logoColor: '#ff2800',
                    logo: 'https://upload.wikimedia.org/wikipedia/de/c/c0/Scuderia_Ferrari_Logo.svg',
                    image: 'https://images.unsplash.com/photo-1592634976722-13b3c3c78864?q=80&w=1200&auto=format&fit=crop',
                    history: 'Ferrari\'s factory-sanctioned LMGT3 team representing the legendary Prancing Horse with the mid-rear turbocharged 296.',
                    drivers: [
                        { name: 'Alessio Rovera', number: 55, nationality: 'ITA', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop', stats: { titles: 2, wins: 12, podiums: 28 }, bio: 'Ferrari factory driver and Le Mans class winner with blistering one-lap qualifying pace.' },
                        { name: 'Simon Mann', number: 55, nationality: 'USA', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=600&auto=format&fit=crop', stats: { titles: 1, wins: 6, podiums: 18 }, bio: 'Silver-rated endurance ace delivering consistent race stints.' }
                    ]
                },
                {
                    id: 'united_autosports_wec',
                    name: 'United Autosports',
                    fullName: 'United Autosports (McLaren)',
                    principal: 'Richard Dean / Zak Brown',
                    base: 'Garforth, Leeds, United Kingdom',
                    car: 'McLaren 720S LMGT3 Evo',
                    category: 'LMGT3',
                    engine: 'McLaren M840T 4.0L Twin-Turbo V8',
                    chassis: 'McLaren Monocell II-S Carbon Monocoque',
                    technicalDirector: 'Ian Smith',
                    sponsors: ['McLaren Automotive', 'AERO', 'Motul'],
                    firstEntry: '2024',
                    worldChampionships: 2,
                    points: 120,
                    rank: 4,
                    logoColor: '#ff8000',
                    logo: 'https://upload.wikimedia.org/wikipedia/en/6/66/McLaren_Racing_logo.svg',
                    image: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?q=80&w=1200&auto=format&fit=crop',
                    history: 'Led by Zak Brown and Richard Dean, United returned McLaren to the 24 Hours of Le Mans for the first time since their famous 1995 overall F1 victory.',
                    drivers: [
                        { name: 'Marino Sato', number: 95, nationality: 'JPN', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=600&auto=format&fit=crop', stats: { titles: 1, wins: 4, podiums: 12 }, bio: 'Former F2 racer who transformed into a frontline GT endurance frontrunner.' },
                        { name: 'Grégoire Saucy', number: 59, nationality: 'SUI', image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=600&auto=format&fit=crop', stats: { titles: 1, wins: 3, podiums: 8 }, bio: 'Swiss single-seater champion demonstrating rapid adaptation to GT aerodynamics.' }
                    ]
                },
                {
                    id: 'tf_sport_corvette_wec',
                    name: 'TF Sport Corvette',
                    fullName: 'TF Sport (Corvette Racing)',
                    principal: 'Tom Ferrier',
                    base: 'Chiddingfold, Surrey, United Kingdom',
                    car: 'Chevrolet Corvette Z06 GT3.R',
                    category: 'LMGT3',
                    engine: 'GM 5.5L DOHC Flat-Plane Crank Naturally Aspirated V8',
                    chassis: 'Pratt Miller Aluminum Spaceframe',
                    technicalDirector: 'Ben Ebrahim',
                    sponsors: ['Chevrolet', 'Mobil 1', 'Michelin'],
                    firstEntry: '2024',
                    worldChampionships: 2,
                    points: 110,
                    rank: 5,
                    logoColor: '#ffcc00',
                    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Chevrolet-logo.png/1200px-Chevrolet-logo.png',
                    image: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?q=80&w=1200&auto=format&fit=crop',
                    history: 'Former Le Mans winners TF Sport partnered directly with General Motors and Pratt Miller to field the thunderous mid-engine Corvette Z06 GT3.R in the FIA WEC.',
                    drivers: [
                        { name: 'Daniel Juncadella', number: 82, nationality: 'ESP', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop', stats: { titles: 2, wins: 14, podiums: 36 }, bio: 'Corvette factory driver and 24-hour endurance specialist.' },
                        { name: 'Charlie Eastwood', number: 81, nationality: 'IRL', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=600&auto=format&fit=crop', stats: { titles: 2, wins: 8, podiums: 20 }, bio: '24 Hours of Le Mans class champion with razor-sharp wheel-to-wheel racecraft.' }
                    ]
                },
                {
                    id: 'iron_lynx_wec',
                    name: 'Iron Lynx',
                    fullName: 'Iron Lynx (Lamborghini)',
                    principal: 'Andrea Piccini',
                    base: 'Cesena, Forlì-Cesena, Italy',
                    car: 'Lamborghini Huracán GT3 EVO2',
                    category: 'LMGT3',
                    engine: 'Lamborghini 5.2L Naturally Aspirated V10 (585 hp)',
                    chassis: 'Lamborghini Hybrid Aluminum/Carbon Fiber Chassis',
                    technicalDirector: 'Tiziano Minuti',
                    sponsors: ['Lamborghini Squadra Corse', 'Iron Dames', 'Roger Dubuis'],
                    firstEntry: '2021',
                    worldChampionships: 1,
                    points: 102,
                    rank: 6,
                    logoColor: '#d6fe00',
                    logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/d/df/Lamborghini_Logo.svg/1200px-Lamborghini_Logo.svg.png',
                    image: 'https://images.unsplash.com/photo-1549921296-3a6b5b3b7b25?q=80&w=1200&auto=format&fit=crop',
                    history: 'Italian racing operation running both the Lamborghini SC63 Hypercar and the glorious naturally aspirated V10 Huracán in LMGT3.',
                    drivers: [
                        { name: 'Matteo Cressoni', number: 60, nationality: 'ITA', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=600&auto=format&fit=crop', stats: { titles: 1, wins: 7, podiums: 22 }, bio: 'Veteran Italian GT racer and endurance strategist.' },
                        { name: 'Franck Perera', number: 60, nationality: 'FRA', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=600&auto=format&fit=crop', stats: { titles: 1, wins: 10, podiums: 28 }, bio: 'Lamborghini factory driver and Daytona 24h winner.' }
                    ]
                },
                {
                    id: 'proton_competition_wec',
                    name: 'Proton Competition',
                    fullName: 'Proton Competition (Ford Mustang)',
                    principal: 'Christian Ried',
                    base: 'Ummendorf, Baden-Württemberg, Germany',
                    car: 'Ford Mustang GT3',
                    category: 'LMGT3',
                    engine: 'Ford Coyote-based 5.4L Naturally Aspirated V8 (Built by M-Sport)',
                    chassis: 'Multimatic Motorsports Bespoke GT3 Spaceframe',
                    technicalDirector: 'Larry Holt',
                    sponsors: ['Ford Performance', 'Multimatic', 'Mobil 1'],
                    firstEntry: '2006',
                    worldChampionships: 3,
                    points: 95,
                    rank: 7,
                    logoColor: '#003399',
                    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Ford_motor_company_Logo.svg/2560px-Ford_motor_company_Logo.svg.png',
                    image: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?q=80&w=1200&auto=format&fit=crop',
                    history: 'Christian Ried\'s squad partnered with Ford Performance and Multimatic to unleash the roaring American Mustang GT3 onto the world endurance stage.',
                    drivers: [
                        { name: 'Dennis Olsen', number: 88, nationality: 'NOR', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop', stats: { titles: 1, wins: 8, podiums: 24 }, bio: 'Bathurst 12h winner and factory driver renowned for overtaking aggression.' },
                        { name: 'Mikkel Pedersen', number: 88, nationality: 'DEN', image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=600&auto=format&fit=crop', stats: { titles: 0, wins: 3, podiums: 9 }, bio: 'Danish endurance talent with proven speed on high-downforce circuits.' }
                    ]
                }
            ];

        // ==========================================
        // 4. IMSA WEATHERTECH SPORTSCAR CHAMPIONSHIP
        // ==========================================
        case SeriesId.IMSA:
            return [
                {
                    id: 'porsche_penske_imsa',
                    name: 'Porsche Penske',
                    fullName: 'Porsche Penske Motorsport (IMSA)',
                    principal: 'Jonathan Diuguid',
                    base: 'Mooresville, North Carolina, USA',
                    car: 'Porsche 963',
                    category: 'GTP',
                    engine: 'Porsche 4.6L Twin-Turbo V8 Hybrid (670 hp)',
                    chassis: 'Multimatic Carbon-Composite Monocoque',
                    technicalDirector: 'Tyler Gibbs',
                    sponsors: ['Penske', 'Mobil 1', 'Michelin', 'Hugo Boss'],
                    firstEntry: '2023',
                    worldChampionships: 2,
                    points: 2480,
                    rank: 1,
                    logoColor: '#d5001c',
                    logo: 'https://upload.wikimedia.org/wikipedia/de/2/2d/Porsche_Wappen.svg',
                    image: 'https://newsroom.porsche.com/.imaging/mte/porsche-templating-theme/image_1290x726/dam/pnr/2023/Motorsports/WEC/Le-Mans-Test-Day/02-Porsche-963-Porsche-Penske-Motorsport.jpg/jcr:content/02-Porsche-963-Porsche-Penske-Motorsport.jpg',
                    history: 'Reigning IMSA GTP Champions and Rolex 24 at Daytona winners. Roger Penske\'s outfit sets the gold standard in North American sports car competition.',
                    drivers: [
                        { name: 'Felipe Nasr', number: 7, nationality: 'BRA', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=600&auto=format&fit=crop', stats: { titles: 3, wins: 14, podiums: 35 }, bio: 'Multiple IMSA Champion and Rolex 24 winner. Former Sauber F1 driver.' },
                        { name: 'Dane Cameron', number: 7, nationality: 'USA', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=600&auto=format&fit=crop', stats: { titles: 4, wins: 18, podiums: 46 }, bio: 'One of the most decorated American sports car champions in modern history.' },
                        { name: 'Nick Tandy', number: 6, nationality: 'GBR', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop', stats: { titles: 1, wins: 20, podiums: 48 }, bio: 'Le Mans 24 Hours overall winner and ruthless rain racer.' }
                    ]
                },
                {
                    id: 'wtr_andretti',
                    name: 'WTR Andretti',
                    fullName: 'Wayne Taylor Racing with Andretti (Cadillac)',
                    principal: 'Wayne Taylor / Michael Andretti',
                    base: 'Brownsburg & Indianapolis, Indiana, USA',
                    car: 'Cadillac V-Series.R',
                    category: 'GTP',
                    engine: 'GM 5.5L Naturally Aspirated V8 Hybrid',
                    chassis: 'Dallara Carbon Tub (LMDh)',
                    technicalDirector: 'Brian Pillar',
                    sponsors: ['Konica Minolta', 'Gainbridge', 'Cadillac Racing', 'DEX Imaging'],
                    firstEntry: '2004',
                    worldChampionships: 3,
                    points: 2340,
                    rank: 2,
                    logoColor: '#002244',
                    logo: 'https://upload.wikimedia.org/wikipedia/en/e/e3/Cadillac_V-Series_logo.svg',
                    image: 'https://images.unsplash.com/photo-1549921296-3a6b5b3b7b25?q=80&w=1200&auto=format&fit=crop',
                    history: 'An endurance dynasty with four overall Rolex 24 victories, joining forces with Cadillac and Michael Andretti for a fearsome twin-car GTP assault.',
                    drivers: [
                        { name: 'Ricky Taylor', number: 10, nationality: 'USA', image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=600&auto=format&fit=crop', stats: { titles: 2, wins: 30, podiums: 65 }, bio: 'Two-time IMSA Champion and qualifying record holder.' },
                        { name: 'Filipe Albuquerque', number: 10, nationality: 'POR', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop', stats: { titles: 2, wins: 18, podiums: 45 }, bio: 'Daytona and Le Mans winner celebrated for daring night restarts.' },
                        { name: 'Jordan Taylor', number: 40, nationality: 'USA', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=600&auto=format&fit=crop', stats: { titles: 4, wins: 34, podiums: 70 }, bio: 'Four-time champion across prototype and Corvette GT classes.' }
                    ]
                },
                {
                    id: 'meyer_shank',
                    name: 'Meyer Shank',
                    fullName: 'Meyer Shank Racing with Curb-Agajanian',
                    principal: 'Mike Shank / Jim Meyer',
                    base: 'Pataskala, Ohio, USA',
                    car: 'Acura ARX-06',
                    category: 'GTP',
                    engine: 'Acura 2.4L Twin-Turbo 90° V6 Hybrid (Highest revving GTP PU)',
                    chassis: 'ORECA Carbon Monocoque',
                    technicalDirector: 'Vincent Pard',
                    sponsors: ['Acura', 'SiriusXM', 'AutoNation', 'Curb Records'],
                    firstEntry: '2004',
                    worldChampionships: 2,
                    points: 2290,
                    rank: 3,
                    logoColor: '#d6001c',
                    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Acura_logo.svg/2560px-Acura_logo.svg.png',
                    image: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?q=80&w=1200&auto=format&fit=crop',
                    history: 'Former overall Rolex 24 winners and IMSA champions, reunited with Honda Racing Corporation (HRC) to operate the factory Acura ARX-06 program.',
                    drivers: [
                        { name: 'Tom Blomqvist', number: 60, nationality: 'GBR', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=600&auto=format&fit=crop', stats: { titles: 1, wins: 8, podiums: 24 }, bio: 'Back-to-back Daytona 24 winner with blistering one-lap speed.' },
                        { name: 'Colin Braun', number: 60, nationality: 'USA', image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=600&auto=format&fit=crop', stats: { titles: 3, wins: 26, podiums: 60 }, bio: 'Prototype veteran celebrated for extraordinary overtakes.' },
                        { name: 'Nick Yelloly', number: 93, nationality: 'GBR', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop', stats: { titles: 1, wins: 5, podiums: 15 }, bio: 'Spa 24h & Nürburgring 24h winner joining Acura\'s factory squad.' }
                    ]
                },
                {
                    id: 'bmw_rll_imsa',
                    name: 'BMW Team RLL',
                    fullName: 'BMW M Team RLL',
                    principal: 'Bobby Rahal',
                    base: 'Hilliard, Ohio, USA',
                    car: 'BMW M Hybrid V8',
                    category: 'GTP',
                    engine: 'BMW P66/3 4.0L Twin-Turbo V8 Hybrid',
                    chassis: 'Dallara Carbon Monocoque',
                    technicalDirector: 'Brandon Fry',
                    sponsors: ['BMW M', 'Motul', 'DeVilbiss', 'United Rentals'],
                    firstEntry: '2009',
                    worldChampionships: 2,
                    points: 2140,
                    rank: 4,
                    logoColor: '#005b95',
                    logo: 'https://upload.wikimedia.org/wikipedia/commons/4/44/BMW.svg',
                    image: 'https://images.unsplash.com/photo-1629219356886-c322b724497e?q=80&w=1200&auto=format&fit=crop',
                    history: 'Bobby Rahal\'s outfit has represented BMW in North America for over 15 years, taking multiple Daytona and Sebring 12h triumphs.',
                    drivers: [
                        { name: 'Connor De Phillippi', number: 25, nationality: 'USA', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=600&auto=format&fit=crop', stats: { titles: 1, wins: 12, podiums: 30 }, bio: 'Nürburgring 24h and Daytona winner from California.' },
                        { name: 'Philipp Eng', number: 24, nationality: 'AUT', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=600&auto=format&fit=crop', stats: { titles: 2, wins: 9, podiums: 25 }, bio: 'Austrian factory ace with clinical technical precision.' }
                    ]
                },
                {
                    id: 'whelen_cadillac',
                    name: 'Whelen Cadillac',
                    fullName: 'Whelen Cadillac Racing (Action Express)',
                    principal: 'Gary Nelson',
                    base: 'Denver, North Carolina, USA',
                    car: 'Cadillac V-Series.R',
                    category: 'GTP',
                    engine: 'GM 5.5L Naturally Aspirated V8',
                    chassis: 'Dallara Carbon Monocoque',
                    technicalDirector: 'Iain Watt',
                    sponsors: ['Whelen Engineering', 'Cadillac', 'Lucas Oil'],
                    firstEntry: '2010',
                    worldChampionships: 5,
                    points: 2060,
                    rank: 5,
                    logoColor: '#e00000',
                    logo: 'https://upload.wikimedia.org/wikipedia/en/e/e3/Cadillac_V-Series_logo.svg',
                    image: 'https://images.unsplash.com/photo-1549921296-3a6b5b3b7b25?q=80&w=1200&auto=format&fit=crop',
                    history: 'Action Express Racing is one of the winningest teams in IMSA history, boasting five Drivers and Team Championships in the premier class.',
                    drivers: [
                        { name: 'Jack Aitken', number: 31, nationality: 'GBR', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop', stats: { titles: 1, wins: 4, podiums: 12 }, bio: 'Former Williams F1 driver and reigning IMSA champion.' },
                        { name: 'Earl Bamber', number: 31, nationality: 'NZL', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=600&auto=format&fit=crop', stats: { titles: 2, wins: 15, podiums: 38 }, bio: 'Two-time 24h Le Mans overall champion and Sebring winner.' }
                    ]
                },
                // GTD Pro & GTD Fan Favorites
                {
                    id: 'ao_racing_rexy',
                    name: 'AO Racing "Rexy"',
                    fullName: 'AO Racing',
                    principal: 'Gunnar Jeannette',
                    base: 'St. Charles, Illinois, USA',
                    car: 'Porsche 911 GT3 R (992)',
                    category: 'GTD Pro',
                    engine: 'Porsche 4.2L Flat-6',
                    chassis: 'Porsche 992 GT3 R',
                    technicalDirector: 'Gunnar Jeannette',
                    sponsors: ['Rexy', 'Spike the Dragon', 'Mobil 1'],
                    firstEntry: '2023',
                    worldChampionships: 1,
                    points: 2850,
                    rank: 1,
                    logoColor: '#2ca02c',
                    logo: 'https://upload.wikimedia.org/wikipedia/de/2/2d/Porsche_Wappen.svg',
                    image: 'https://images.unsplash.com/photo-1629219356886-c322b724497e?q=80&w=1200&auto=format&fit=crop',
                    history: 'Crowned IMSA GTD Pro Champions. The roaring green T-Rex dinosaur livery captured hearts worldwide alongside supreme race-winning pace.',
                    drivers: [
                        { name: 'Laurin Heinrich', number: 77, nationality: 'GER', image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600&auto=format&fit=crop', stats: { titles: 1, wins: 5, podiums: 14 }, bio: 'IMSA GTD Pro Champion and Porsche Selected Driver of the Year.' },
                        { name: 'Sebastian Priaulx', number: 77, nationality: 'GBR', image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=600&auto=format&fit=crop', stats: { titles: 1, wins: 6, podiums: 15 }, bio: 'Second-generation champion with scorching qualifying speed.' }
                    ]
                },
                {
                    id: 'corvette_racing',
                    name: 'Corvette Racing',
                    fullName: 'Corvette Racing by Pratt Miller Motorsports',
                    principal: 'Marc Maurini',
                    base: 'New Hudson, Michigan, USA',
                    car: 'Chevrolet Corvette Z06 GT3.R',
                    category: 'GTD Pro',
                    engine: 'GM 5.5L DOHC Flat-Plane Crank V8',
                    chassis: 'Pratt Miller Aluminum Spaceframe',
                    technicalDirector: 'Ben Johnson',
                    sponsors: ['Mobil 1', 'Chevrolet', 'SiriusXM', 'Michelin'],
                    firstEntry: '1999',
                    worldChampionships: 14,
                    points: 2710,
                    rank: 2,
                    logoColor: '#ffcc00',
                    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Chevrolet-logo.png/1200px-Chevrolet-logo.png',
                    image: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?q=80&w=1200&auto=format&fit=crop',
                    history: 'American sports car royalty. Over 125 race victories, 9 Le Mans class wins, and dozens of championships over a quarter-century.',
                    drivers: [
                        { name: 'Antonio García', number: 3, nationality: 'ESP', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=600&auto=format&fit=crop', stats: { titles: 5, wins: 30, podiums: 70 }, bio: 'Five-time IMSA Champion and undisputed king of Corvette racecraft.' },
                        { name: 'Alexander Sims', number: 3, nationality: 'GBR', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=600&auto=format&fit=crop', stats: { titles: 1, wins: 10, podiums: 28 }, bio: 'IMSA GTP Champion returning to GT3 to lead the Z06 charge.' }
                    ]
                },
                {
                    id: 'winward_racing',
                    name: 'Winward Racing',
                    fullName: 'Winward Racing (Mercedes-AMG)',
                    principal: 'Christian Hohenadel',
                    base: 'Houston, Texas, USA & Altendiez, Germany',
                    car: 'Mercedes-AMG GT3 EVO',
                    category: 'GTD',
                    engine: 'AMG 6.2L Naturally Aspirated V8',
                    chassis: 'Mercedes-AMG Aluminum Spaceframe',
                    technicalDirector: 'Russell Ward',
                    sponsors: ['Puma', 'Mercedes-AMG', 'Tuscan'],
                    firstEntry: '2021',
                    worldChampionships: 2,
                    points: 2900,
                    rank: 1,
                    logoColor: '#00d2be',
                    logo: 'https://upload.wikimedia.org/wikipedia/commons/f/fb/Mercedes_AMG_Petronas_F1_Logo.svg',
                    image: 'https://images.unsplash.com/photo-1629219356886-c322b724497e?q=80&w=1200&auto=format&fit=crop',
                    history: 'IMSA GTD Champions and Rolex 24 winners. The #57 Winward machine is widely feared for its consistency, pit-stop speed, and the thunderous roar of its 6.2L AMG V8.',
                    drivers: [
                        { name: 'Philip Ellis', number: 57, nationality: 'SUI', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop', stats: { titles: 1, wins: 8, podiums: 22 }, bio: 'Mercedes-AMG factory ace and Rolex 24 winner.' },
                        { name: 'Russell Ward', number: 57, nationality: 'USA', image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=600&auto=format&fit=crop', stats: { titles: 1, wins: 7, podiums: 20 }, bio: 'Co-owner and driver who has developed into one of GT racing\'s elite qualifiers.' }
                    ]
                },
                {
                    id: 'aston_martin_thor_imsa',
                    name: 'Aston Martin Valkyrie',
                    fullName: 'Aston Martin THOR Team (IMSA GTP)',
                    principal: 'Ian James',
                    base: 'Phoenix, Arizona, USA & Silverstone, UK',
                    car: 'Valkyrie AMR-LMH',
                    category: 'GTP',
                    engine: 'Cosworth 6.5L Naturally Aspirated V12 (11,000 RPM)',
                    chassis: 'Aston Martin Carbon Fibre Monocoque (LMH Spec)',
                    technicalDirector: 'Adam Carter',
                    sponsors: ['Heart of Racing', 'Valvoline', 'Aston Martin'],
                    firstEntry: '2026',
                    worldChampionships: 0,
                    points: 2320,
                    rank: 6,
                    logoColor: '#00665e',
                    logo: 'https://upload.wikimedia.org/wikipedia/de/e/e0/Aston_Martin_Lagonda_Logo.svg',
                    image: 'https://images.unsplash.com/photo-1563720223185-11003d516935?q=80&w=1200&auto=format&fit=crop',
                    history: 'Aston Martin\'s thunderous naturally aspirated V12 hypercar enters the IMSA GTP premier class, taking on Daytona and Sebring.',
                    drivers: [
                        { name: 'Ross Gunn', number: 23, nationality: 'GBR', image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=600&auto=format&fit=crop', stats: { titles: 1, wins: 9, podiums: 26 }, bio: 'Aston Martin factory driver bringing exceptional qualifying speed to GTP.' },
                        { name: 'Alex Riberas', number: 23, nationality: 'ESP', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop', stats: { titles: 0, wins: 7, podiums: 21 }, bio: 'Spanish endurance ace trusted with the developmental heart of the Valkyrie.' }
                    ]
                },
                {
                    id: 'iron_lynx_imsa',
                    name: 'Iron Lynx Lamborghini',
                    fullName: 'Lamborghini Iron Lynx (GTP)',
                    principal: 'Emmanuel Esnault',
                    base: 'Cesena, Italy & Mooresville, NC, USA',
                    car: 'Lamborghini SC63',
                    category: 'GTP',
                    engine: 'Lamborghini 3.8L Twin-Turbo 90° V8 Hybrid',
                    chassis: 'Ligier Carbon-Composite Monocoque (LMDh)',
                    technicalDirector: 'Rouven Mohr',
                    sponsors: ['Lamborghini Squadra Corse', 'Roger Dubuis', 'Automobili Lamborghini'],
                    firstEntry: '2024',
                    worldChampionships: 0,
                    points: 2280,
                    rank: 7,
                    logoColor: '#d6fe00',
                    logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/d/df/Lamborghini_Logo.svg/1200px-Lamborghini_Logo.svg.png',
                    image: 'https://images.unsplash.com/photo-1549921296-3a6b5b3b7b25?q=80&w=1200&auto=format&fit=crop',
                    history: 'Lamborghini Squadra Corse\'s apex prototype racer, featuring bespoke Ligier tub and roaring twin-turbo V8 hybrid propulsion.',
                    drivers: [
                        { name: 'Andrea Caldarelli', number: 63, nationality: 'ITA', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=600&auto=format&fit=crop', stats: { titles: 3, wins: 18, podiums: 42 }, bio: 'Lamborghini chief test and development driver, multiple GT3 champion.' },
                        { name: 'Romain Grosjean', number: 63, nationality: 'FRA', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=600&auto=format&fit=crop', stats: { titles: 1, wins: 2, podiums: 14 }, bio: 'Ten-time F1 podium finisher bringing blistering frontline racing experience.' }
                    ]
                },
                {
                    id: 'pfaff_motorsports',
                    name: 'Pfaff Motorsports',
                    fullName: 'Pfaff Motorsports (McLaren)',
                    principal: 'Chris Pfaff / Steve Bortolotti',
                    base: 'Markham, Ontario, Canada',
                    car: 'McLaren 720S GT3 Evo',
                    category: 'GTD Pro',
                    engine: 'McLaren 4.0L Twin-Turbo V8',
                    chassis: 'McLaren Carbon Monocell',
                    technicalDirector: 'Andrew Barnes',
                    sponsors: ['Pfaff Auto', 'Driveway', 'Motul'],
                    firstEntry: '2019',
                    worldChampionships: 2,
                    points: 2650,
                    rank: 3,
                    logoColor: '#ff8000',
                    logo: 'https://upload.wikimedia.org/wikipedia/en/6/66/McLaren_Racing_logo.svg',
                    image: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?q=80&w=1200&auto=format&fit=crop',
                    history: 'The iconic Canadian "Plaid" squad and multiple IMSA GT champions, spearheading McLaren\'s works presence in North American GTD Pro.',
                    drivers: [
                        { name: 'Oliver Jarvis', number: 9, nationality: 'GBR', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop', stats: { titles: 2, wins: 15, podiums: 40 }, bio: 'Daytona 24 Hours overall winner and Le Mans LMP2 champion.' },
                        { name: 'Marvin Kirchhöfer', number: 9, nationality: 'GER', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=600&auto=format&fit=crop', stats: { titles: 1, wins: 8, podiums: 22 }, bio: 'McLaren factory ace with clinical precision in qualifying sessions.' }
                    ]
                },
                {
                    id: 'paul_miller_racing',
                    name: 'Paul Miller Racing',
                    fullName: 'Paul Miller Racing (BMW)',
                    principal: 'Mitchell Miller',
                    base: 'Buford, Georgia, USA',
                    car: 'BMW M4 GT3 EVO',
                    category: 'GTD Pro',
                    engine: 'BMW 3.0L M TwinPower Turbo Inline-6',
                    chassis: 'BMW Motorsport Steel/Carbon Chassis',
                    technicalDirector: 'Alastair Macqueen',
                    sponsors: ['BMW M Motorsport', 'Fullpath', 'Quartz'],
                    firstEntry: '2010',
                    worldChampionships: 2,
                    points: 2600,
                    rank: 4,
                    logoColor: '#005b95',
                    logo: 'https://upload.wikimedia.org/wikipedia/commons/4/44/BMW.svg',
                    image: 'https://images.unsplash.com/photo-1629219356886-c322b724497e?q=80&w=1200&auto=format&fit=crop',
                    history: 'Perennial IMSA champions, Paul Miller Racing transitioned to the GTD Pro category with the BMW M4 GT3 EVO, retaining their metronomic execution.',
                    drivers: [
                        { name: 'Bryan Sellers', number: 1, nationality: 'USA', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=600&auto=format&fit=crop', stats: { titles: 3, wins: 20, podiums: 55 }, bio: 'Multi-time IMSA Champion and master of race management.' },
                        { name: 'Madison Snow', number: 1, nationality: 'USA', image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=600&auto=format&fit=crop', stats: { titles: 3, wins: 19, podiums: 50 }, bio: 'Record-setting qualifying ace and IMSA champion.' }
                    ]
                },
                {
                    id: 'vasser_sullivan',
                    name: 'Vasser Sullivan',
                    fullName: 'Vasser Sullivan Racing (Lexus)',
                    principal: 'Jimmy Vasser / James Sullivan',
                    base: 'Concord, North Carolina, USA',
                    car: 'Lexus RC F GT3',
                    category: 'GTD Pro',
                    engine: 'Toyota 5.4L Naturally Aspirated 90° V8',
                    chassis: 'Lexus Carbon/Aluminum Spaceframe',
                    technicalDirector: 'Jeff Swartwout',
                    sponsors: ['Lexus', 'SealMaster', 'Mobil 1'],
                    firstEntry: '2019',
                    worldChampionships: 1,
                    points: 2570,
                    rank: 5,
                    logoColor: '#e00000',
                    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Lexus_division_emblem.svg/1200px-Lexus_division_emblem.svg.png',
                    image: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?q=80&w=1200&auto=format&fit=crop',
                    history: 'Crowned IMSA GTD Pro Champions, Vasser Sullivan combines IndyCar championship leadership with Lexus factory V8 firepower.',
                    drivers: [
                        { name: 'Jack Hawksworth', number: 14, nationality: 'GBR', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop', stats: { titles: 1, wins: 12, podiums: 32 }, bio: 'IMSA GTD Pro Champion and undisputed master of the Lexus RC F.' },
                        { name: 'Ben Barnicoat', number: 14, nationality: 'GBR', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=600&auto=format&fit=crop', stats: { titles: 1, wins: 11, podiums: 30 }, bio: 'Le Mans winner and IMSA Champion with electric qualifying speed.' }
                    ]
                }
            ];

        // ==========================================
        // 5. GT WORLD CHALLENGE - GLOBAL 2026 GRID
        // ==========================================
        case SeriesId.GT_WORLD_CHALLENGE:
            return [
                {
                    id: 'wrt_gtwc_europe',
                    name: 'Team WRT (BMW)',
                    fullName: 'Team WRT (GT World Challenge Europe)',
                    principal: 'Vincent Vosse',
                    base: 'Baudour, Wallonia, Belgium',
                    car: 'BMW M4 GT3 EVO',
                    category: 'Europe',
                    engine: 'BMW 3.0L M TwinPower Turbo Inline-6 (590 hp)',
                    chassis: 'BMW Motorsport Carbon Roll-Cage Chassis',
                    technicalDirector: 'Kurt Treml',
                    sponsors: ['BMW M', 'Alpinestars', 'Motul', 'Ravenol'],
                    firstEntry: '2010',
                    worldChampionships: 10,
                    points: 154,
                    rank: 1,
                    logoColor: '#005b95',
                    logo: 'https://upload.wikimedia.org/wikipedia/commons/4/44/BMW.svg',
                    image: 'https://images.unsplash.com/photo-1629219356886-c322b724497e?q=80&w=1200&auto=format&fit=crop',
                    history: 'The most decorated team in SRO GT World Challenge history with over 50 championship titles across Sprint and Endurance Cups.',
                    drivers: [
                        { name: 'Dries Vanthoor', number: 32, nationality: 'BEL', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop', stats: { titles: 5, wins: 25, podiums: 58 }, bio: 'Multiple GT World Challenge overall champion and Sprint Cup benchmark.' },
                        { name: 'Charles Weerts', number: 32, nationality: 'BEL', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=600&auto=format&fit=crop', stats: { titles: 4, wins: 20, podiums: 48 }, bio: 'Youngest ever Sprint Cup champion, celebrated for precision under pressure.' }
                    ]
                },
                {
                    id: 'af_corse_gtwc',
                    name: 'AF Corse Ferrari',
                    fullName: 'AF Corse - Francorchamps Motors',
                    principal: 'Amato Ferrari',
                    base: 'Piacenza, Emilia-Romagna, Italy',
                    car: 'Ferrari 296 GT3',
                    category: 'Europe',
                    engine: 'Ferrari 3.0L 120° Twin-Turbo V6 (600 hp)',
                    chassis: 'Ferrari Aluminum and Carbon Monocoque',
                    technicalDirector: 'Filippo Petrucci',
                    sponsors: ['Francorchamps Motors', 'Ferrari SpA', 'Pirelli'],
                    firstEntry: '2006',
                    worldChampionships: 8,
                    points: 138,
                    rank: 2,
                    logoColor: '#ff2800',
                    logo: 'https://upload.wikimedia.org/wikipedia/de/c/c0/Scuderia_Ferrari_Logo.svg',
                    image: 'https://images.unsplash.com/photo-1592634976722-13b3c3c78864?q=80&w=1200&auto=format&fit=crop',
                    history: 'Ferrari\'s trusted factory representative in global GT racing, fresh off 24h Nürburgring and Spa 24h triumphs with the mid-rear 296 GT3.',
                    drivers: [
                        { name: 'Alessandro Pier Guidi', number: 51, nationality: 'ITA', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=600&auto=format&fit=crop', stats: { titles: 4, wins: 22, podiums: 52 }, bio: '24h Le Mans & Spa 24h overall winner, regarded as a maestro of wet tarmac.' },
                        { name: 'Alessio Rovera', number: 51, nationality: 'ITA', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop', stats: { titles: 2, wins: 14, podiums: 32 }, bio: 'Lap record holder across Monza, Spa, and Paul Ricard.' }
                    ]
                },
                {
                    id: 'getspeed_gtwc',
                    name: 'Team GetSpeed',
                    fullName: 'Mercedes-AMG Team GetSpeed',
                    principal: 'Adam Osieka',
                    base: 'Meuspath, Nürburgring, Germany',
                    car: 'Mercedes-AMG GT3 EVO',
                    category: 'Europe',
                    engine: 'AMG 6.2L Naturally Aspirated V8 (550 hp)',
                    chassis: 'Mercedes-AMG Aluminum Spaceframe',
                    technicalDirector: 'Martin Schwenk',
                    sponsors: ['Mercedes-AMG', 'BWT', 'Bilstein', 'Ravenol'],
                    firstEntry: '2019',
                    worldChampionships: 1,
                    points: 98,
                    rank: 6,
                    logoColor: '#00d2be',
                    logo: 'https://upload.wikimedia.org/wikipedia/commons/f/fb/Mercedes_AMG_Petronas_F1_Logo.svg',
                    image: 'https://images.unsplash.com/photo-1625902347278-651d69db2992?q=80&w=1200&auto=format&fit=crop',
                    history: 'Top-tier Mercedes-AMG Performance Team based in the shadow of the Nürburgring Nordschleife, renowned for podium consistency in 24-hour classics.',
                    drivers: [
                        { name: 'Maro Engel', number: 2, nationality: 'GER', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=600&auto=format&fit=crop', stats: { titles: 3, wins: 19, podiums: 50 }, bio: 'FIA GT World Cup Macau winner and the ultimate Mercedes-AMG specialist.' },
                        { name: 'Luca Stolz', number: 2, nationality: 'GER', image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=600&auto=format&fit=crop', stats: { titles: 2, wins: 14, podiums: 40 }, bio: 'Bathurst 12 Hour winner and endurance qualifying ace.' }
                    ]
                },
                {
                    id: 'comtoyou_gtwc',
                    name: 'Comtoyou Racing',
                    fullName: 'Comtoyou Racing (Aston Martin)',
                    principal: 'Jean-Michel Baert / François Verbist',
                    base: 'Gembloux, Belgium',
                    car: 'Aston Martin Vantage AMR GT3 EVO',
                    category: 'Europe',
                    engine: 'Aston Martin 4.0L Twin-Turbo V8',
                    chassis: 'Aston Martin Bonded Aluminum',
                    technicalDirector: 'Sébastien Breuil',
                    sponsors: ['Aston Martin Racing', 'Cyberion', 'AMR'],
                    firstEntry: '2023',
                    worldChampionships: 1,
                    points: 106,
                    rank: 5,
                    logoColor: '#00665e',
                    logo: 'https://upload.wikimedia.org/wikipedia/de/e/e0/Aston_Martin_Lagonda_Logo.svg',
                    image: 'https://images.unsplash.com/photo-1563720223185-11003d516935?q=80&w=1200&auto=format&fit=crop',
                    history: 'Clinched the prestigious 100th anniversary CrowdStrike 24 Hours of Spa overall victory in 2024 with the new Vantage AMR GT3 EVO.',
                    drivers: [
                        { name: 'Mattia Drudi', number: 0o7, nationality: 'ITA', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop', stats: { titles: 1, wins: 8, podiums: 22 }, bio: 'Reigning GT World Challenge Europe Sprint Cup champion.' },
                        { name: 'Nicki Thiim', number: 0o7, nationality: 'DEN', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=600&auto=format&fit=crop', stats: { titles: 2, wins: 15, podiums: 35 }, bio: '"Danski". Two-time WEC World Champion and Spa 24h winner.' }
                    ]
                },
                {
                    id: 'crowdstrike_riley',
                    name: 'CrowdStrike Riley',
                    fullName: 'CrowdStrike Racing by Riley (Mercedes)',
                    principal: 'Bill Riley',
                    base: 'Mooresville, North Carolina, USA',
                    car: 'Mercedes-AMG GT3 EVO',
                    category: 'America',
                    engine: 'AMG 6.2L Naturally Aspirated V8',
                    chassis: 'Mercedes-AMG Spaceframe',
                    technicalDirector: 'Bill Riley',
                    sponsors: ['CrowdStrike', 'Amazon Web Services', 'Mercedes-AMG'],
                    firstEntry: '2022',
                    worldChampionships: 2,
                    points: 155,
                    rank: 1,
                    logoColor: '#ff0000',
                    logo: 'https://upload.wikimedia.org/wikipedia/commons/f/fb/Mercedes_AMG_Petronas_F1_Logo.svg',
                    image: 'https://images.unsplash.com/photo-1629219356886-c322b724497e?q=80&w=1200&auto=format&fit=crop',
                    history: 'Dominant champions in GT World Challenge America, pairing cybersecurity mogul George Kurtz with prototype ace Colin Braun.',
                    drivers: [
                        { name: 'George Kurtz', number: 0o4, nationality: 'USA', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=600&auto=format&fit=crop', stats: { titles: 2, wins: 16, podiums: 34 }, bio: 'CrowdStrike CEO and Le Mans LMP2 Pro-Am winner.' },
                        { name: 'Colin Braun', number: 0o4, nationality: 'USA', image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=600&auto=format&fit=crop', stats: { titles: 3, wins: 25, podiums: 60 }, bio: 'Daytona winner with prototype speed in a GT cockpit.' }
                    ]
                },
                {
                    id: 'craft_bamboo_gtwc',
                    name: 'Craft-Bamboo',
                    fullName: 'Craft-Bamboo Racing (Mercedes)',
                    principal: 'Darryl O\'Young',
                    base: 'Cyberport, Hong Kong',
                    car: 'Mercedes-AMG GT3 EVO',
                    category: 'Asia',
                    engine: 'AMG 6.2L Naturally Aspirated V8',
                    chassis: 'Mercedes-AMG Spaceframe',
                    technicalDirector: 'Russell O\'Hagan',
                    sponsors: ['J-Fly Racing', 'Mercedes-AMG', 'KeePer'],
                    firstEntry: '2014',
                    worldChampionships: 3,
                    points: 145,
                    rank: 1,
                    logoColor: '#00d2be',
                    logo: 'https://upload.wikimedia.org/wikipedia/commons/f/fb/Mercedes_AMG_Petronas_F1_Logo.svg',
                    image: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?q=80&w=1200&auto=format&fit=crop',
                    history: 'The undisputed heavyweights of Asian GT racing and Bathurst 12h podium finishers, official Mercedes-AMG Performance Team.',
                    drivers: [
                        { name: 'Daniel Juncadella', number: 77, nationality: 'ESP', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop', stats: { titles: 2, wins: 14, podiums: 36 }, bio: 'Spa 24h & Daytona 24h winner, factory Mercedes ace.' },
                        { name: 'Anthony Liu', number: 77, nationality: 'CHN', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=600&auto=format&fit=crop', stats: { titles: 2, wins: 9, podiums: 20 }, bio: 'GT World Challenge Asia champion and China\'s leading GT driver.' }
                    ]
                },
                {
                    id: 'triple_eight_gtwc',
                    name: 'Triple Eight JMR',
                    fullName: 'Triple Eight Race Engineering (Mercedes)',
                    principal: 'Jamie Whincup',
                    base: 'Banyo, Brisbane, Queensland, Australia',
                    car: 'Mercedes-AMG GT3 EVO',
                    category: 'Australia',
                    engine: 'AMG 6.2L Naturally Aspirated V8',
                    chassis: 'Mercedes-AMG Spaceframe',
                    technicalDirector: 'Jeromy Moore',
                    sponsors: ['Johor Motorsports Racing', 'Red Bull Ampol', 'Mercedes-AMG'],
                    firstEntry: '2019',
                    worldChampionships: 2,
                    points: 160,
                    rank: 1,
                    logoColor: '#002288',
                    logo: 'https://upload.wikimedia.org/wikipedia/commons/f/fb/Mercedes_AMG_Petronas_F1_Logo.svg',
                    image: 'https://images.unsplash.com/photo-1629219356886-c322b724497e?q=80&w=1200&auto=format&fit=crop',
                    history: 'Australia\'s Supercars record-breakers brought their ruthless engineering dominance to GT World Challenge Australia and Asia with royal Malaysian backing.',
                    drivers: [
                        { name: 'Broc Feeney', number: 88, nationality: 'AUS', image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600&auto=format&fit=crop', stats: { titles: 1, wins: 12, podiums: 28 }, bio: 'Australia\'s hottest young racing star across Supercars and GT3.' },
                        { name: 'Prince Jefri Ibrahim', number: 88, nationality: 'MAS', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop', stats: { titles: 1, wins: 10, podiums: 24 }, bio: 'Johor royalty who has developed into an elite pro-am race winner.' }
                    ]
                },
                {
                    id: 'rowe_racing_gtwc',
                    name: 'ROWE Racing',
                    fullName: 'ROWE Racing (BMW M)',
                    principal: 'Hans-Peter Naundorf',
                    base: 'St. Ingbert, Saarland, Germany',
                    car: 'BMW M4 GT3 EVO',
                    category: 'Europe',
                    engine: 'BMW 3.0L M TwinPower Turbo Inline-6 (590 hp)',
                    chassis: 'BMW Motorsport Steel Tub with Roll Cage',
                    technicalDirector: 'Florian Flatau',
                    sponsors: ['ROWE Motor Oil', 'BMW M Motorsport', 'Pirelli'],
                    firstEntry: '2011',
                    worldChampionships: 3,
                    points: 150,
                    rank: 3,
                    logoColor: '#e00000',
                    logo: 'https://upload.wikimedia.org/wikipedia/commons/4/44/BMW.svg',
                    image: 'https://images.unsplash.com/photo-1629219356886-c322b724497e?q=80&w=1200&auto=format&fit=crop',
                    history: 'Legendary 24 Hours of Spa and Nürburgring 24h overall winners, representing BMW factory works presence with tactical excellence.',
                    drivers: [
                        { name: 'Philipp Eng', number: 98, nationality: 'AUT', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=600&auto=format&fit=crop', stats: { titles: 2, wins: 10, podiums: 28 }, bio: 'Two-time 24 Hours of Spa winner and master of changing weather conditions.' },
                        { name: 'Marco Wittmann', number: 98, nationality: 'GER', image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=600&auto=format&fit=crop', stats: { titles: 2, wins: 18, podiums: 42 }, bio: 'Two-time DTM champion bringing steel-trap focus to endurance GT racing.' }
                    ]
                },
                {
                    id: 'manthey_ema_gtwc',
                    name: 'Manthey EMA',
                    fullName: 'Manthey EMA (Porsche)',
                    principal: 'Nicolas Raeder',
                    base: 'Meuspath, Nürburgring, Germany',
                    car: 'Porsche 911 GT3 R (992)',
                    category: 'Europe',
                    engine: 'Porsche 4.2L Water-Cooled Flat-6 (565 hp)',
                    chassis: 'Porsche 992 GT3 R',
                    technicalDirector: 'Patrick Arkenau',
                    sponsors: ['EMA Motorsport', 'Manthey Racing', 'Mobil 1'],
                    firstEntry: '2013',
                    worldChampionships: 4,
                    points: 148,
                    rank: 4,
                    logoColor: '#d5001c',
                    logo: 'https://upload.wikimedia.org/wikipedia/de/2/2d/Porsche_Wappen.svg',
                    image: 'https://images.unsplash.com/photo-1629219356886-c322b724497e?q=80&w=1200&auto=format&fit=crop',
                    history: 'Seven-time Nürburgring 24h champions and reigning DTM title holders, fielding the iconic "Grello" Porsche 911 GT3 R.',
                    drivers: [
                        { name: 'Matt Campbell', number: 911, nationality: 'AUS', image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=600&auto=format&fit=crop', stats: { titles: 2, wins: 14, podiums: 38 }, bio: 'Bathurst 12h winner and Daytona champion with lightning pace.' },
                        { name: 'Laurens Vanthoor', number: 911, nationality: 'BEL', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop', stats: { titles: 3, wins: 16, podiums: 45 }, bio: 'World champion endurance driver with unrivaled multi-stint stamina.' }
                    ]
                },
                {
                    id: 'tresor_attempto_gtwc',
                    name: 'Tresor Attempto',
                    fullName: 'Tresor Attempto Racing (Audi)',
                    principal: 'Ferdinando Geri / Arkin Aka',
                    base: 'Hanover, Germany & Rome, Italy',
                    car: 'Audi R8 LMS GT3 EVO II',
                    category: 'Europe',
                    engine: 'Audi 5.2L Naturally Aspirated V10 (585 hp)',
                    chassis: 'Audi Space Frame (ASF) Aluminum with Carbon Fiber Components',
                    technicalDirector: 'Christian Bülles',
                    sponsors: ['Tresor', 'San Carlo', 'Audi Sport customer racing'],
                    firstEntry: '2018',
                    worldChampionships: 2,
                    points: 130,
                    rank: 5,
                    logoColor: '#e00000',
                    logo: 'https://upload.wikimedia.org/wikipedia/commons/9/92/Audi-Logo_2016.svg',
                    image: 'https://images.unsplash.com/photo-1549921296-3a6b5b3b7b25?q=80&w=1200&auto=format&fit=crop',
                    history: 'Reigning GT World Challenge Europe Sprint Cup Silver & Gold champions, keeping the screaming Audi V10 at the sharp end of international GT competition.',
                    drivers: [
                        { name: 'Ricardo Feller', number: 99, nationality: 'SUI', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=600&auto=format&fit=crop', stats: { titles: 2, wins: 11, podiums: 30 }, bio: 'Swiss phenom known for miraculous qualifying laps and razor-close overtakes.' },
                        { name: 'Alex Aka', number: 99, nationality: 'GER', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop', stats: { titles: 1, wins: 6, podiums: 18 }, bio: 'Silver Cup champion who has matured into a podium regular.' }
                    ]
                },
                {
                    id: 'dxdt_racing_gtwc',
                    name: 'DXDT Racing',
                    fullName: 'DXDT Racing (Corvette)',
                    principal: 'David Askew',
                    base: 'Statesville, North Carolina, USA',
                    car: 'Chevrolet Corvette Z06 GT3.R',
                    category: 'America',
                    engine: 'GM 5.5L Flat-Plane Crank Naturally Aspirated V8',
                    chassis: 'Pratt Miller Aluminum Spaceframe',
                    technicalDirector: 'Erin Gahagan',
                    sponsors: ['CrowdStrike', 'Chevrolet', 'Mobil 1'],
                    firstEntry: '2014',
                    worldChampionships: 1,
                    points: 140,
                    rank: 2,
                    logoColor: '#ffcc00',
                    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Chevrolet-logo.png/1200px-Chevrolet-logo.png',
                    image: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?q=80&w=1200&auto=format&fit=crop',
                    history: 'Set an unprecedented win streak in GT World Challenge America with the Corvette Z06 GT3.R, conquering tracks across North America.',
                    drivers: [
                        { name: 'Tommy Milner', number: 63, nationality: 'USA', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=600&auto=format&fit=crop', stats: { titles: 3, wins: 24, podiums: 60 }, bio: 'Two-time 24 Hours of Le Mans class winner and longtime Corvette factory legend.' },
                        { name: 'Alec Udell', number: 63, nationality: 'USA', image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=600&auto=format&fit=crop', stats: { titles: 1, wins: 12, podiums: 28 }, bio: 'Mechanical engineer and championship driver with exceptional technical feedback.' }
                    ]
                },
                {
                    id: 'absolute_racing_gtwc',
                    name: 'Absolute Racing',
                    fullName: 'Absolute Racing (Porsche)',
                    principal: 'Ingo Matter / Fabien Fior',
                    base: 'Shanghai, China & Sepang, Malaysia',
                    car: 'Porsche 911 GT3 R (992)',
                    category: 'Asia',
                    engine: 'Porsche 4.2L Naturally Aspirated Flat-6',
                    chassis: 'Porsche 992 GT3 R',
                    technicalDirector: 'Fabien Fior',
                    sponsors: ['Porsche Motorsport Asia Pacific', 'Singha', 'Bangkok Airways'],
                    firstEntry: '2010',
                    worldChampionships: 4,
                    points: 138,
                    rank: 2,
                    logoColor: '#d5001c',
                    logo: 'https://upload.wikimedia.org/wikipedia/de/2/2d/Porsche_Wappen.svg',
                    image: 'https://images.unsplash.com/photo-1629219356886-c322b724497e?q=80&w=1200&auto=format&fit=crop',
                    history: 'Asian endurance juggernaut and multiple GT World Challenge Asia champions with factory Porsche backing.',
                    drivers: [
                        { name: 'Alessio Picariello', number: 911, nationality: 'BEL', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop', stats: { titles: 2, wins: 15, podiums: 34 }, bio: 'Porsche Selected Driver and reigning GT World Challenge Asia champion.' },
                        { name: 'Vutthikorn Inthraphuvasak', number: 911, nationality: 'THA', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=600&auto=format&fit=crop', stats: { titles: 2, wins: 8, podiums: 25 }, bio: 'Thailand\'s most successful international GT driver.' }
                    ]
                }
            ];

        default:
            return [];
    }
};
