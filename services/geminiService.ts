import { SeriesId, Prediction, AnalysisReport } from "../types";

const fallbackPredictions: Record<SeriesId, Prediction> = {
    [SeriesId.F1]: {
        winner: "Max Verstappen (Red Bull Racing)",
        podium: ["Max Verstappen", "Lando Norris", "Charles Leclerc"],
        reasoning: "Strong high-speed aerodynamic efficiency and low tire degradation make Red Bull and McLaren front-runners for the upcoming grand prix, with Ferrari in tight contention.",
        confidence: 86
    },
    [SeriesId.MOTOGP]: {
        winner: "Francesco Bagnaia (Ducati Lenovo)",
        podium: ["Francesco Bagnaia", "Jorge Martín", "Marc Márquez"],
        reasoning: "Ducati's engine drive out of slow-speed hairpins gives Bagnaia and Martín distinct advantage on heavy braking sectors.",
        confidence: 82
    },
    [SeriesId.WEC]: {
        winner: "Toyota Gazoo Racing #8",
        podium: ["Toyota Gazoo Racing #8", "Ferrari AF Corse #50", "Porsche Penske Motorsport #6"],
        reasoning: "Exceptional tire wear management in endurance stints and rapid pit-stop turnaround time position the GR010 Hybrid favorably.",
        confidence: 79
    },
    [SeriesId.IMSA]: {
        winner: "Porsche Penske Motorsport #7",
        podium: ["Porsche Penske Motorsport #7", "Cadillac Racing #01", "Wayne Taylor Racing with Andretti #10"],
        reasoning: "Porsche 963 mechanical grip in heavy traffic and track temperature adaptation provide superior stint averages.",
        confidence: 81
    },
    [SeriesId.GT_WORLD_CHALLENGE]: {
        winner: "Team WRT (BMW M4 GT3)",
        podium: ["Team WRT (BMW M4 GT3)", "AF Corse (Ferrari 296 GT3)", "Comtoyou Racing (Aston Martin)"],
        reasoning: "BMW's straight-line pace combined with consistent pro driver stints give them an edge in both sprint and endurance cup rounds.",
        confidence: 78
    }
};

const fallbackAnalysis: Record<SeriesId, AnalysisReport> = {
    [SeriesId.F1]: {
        technicalInsight: "Teams have focused on floor tunnel vortex conditioning to minimize porpoising without raising ride heights. Front wing flex regulations remain a key factor in balance across mid-speed transitions.",
        keyFactors: [
            "Ground-effect underfloor suction efficiency",
            "Tire thermal degradation on high-lateral loads",
            "DRS delta and battery deployment strategies"
        ],
        trackConditions: "Track temperature estimated at 38°C, dry ambient conditions with high track evolution as rubber lays down."
    },
    [SeriesId.MOTOGP]: {
        technicalInsight: "Aero development on front downforce wings and ground-effect fairing ducts reduces front-wheel lift on exit while placing unprecedented stress on Michelin front tires.",
        keyFactors: [
            "Ride-height device engagement on acceleration",
            "Front tire pressure operating window management",
            "Engine braking software maps during late trail-braking"
        ],
        trackConditions: "Warm asphalt with low humidity; grip levels steadily increasing following Moto2 support sessions."
    },
    [SeriesId.WEC]: {
        technicalInsight: "Balance of Performance (BoP) power curves above 250 km/h and stint energy allocations (MJ per stint) dictate race pace far more than single-lap qualifying performance.",
        keyFactors: [
            "Virtual Energy Tank monitoring and lift-and-coast efficiency",
            "Tire double-stinting capability into night cycles",
            "Traffic navigation speed differentials between Hypercar and LMGT3"
        ],
        trackConditions: "Cooling ambient temperatures expected into twilight; changing aerodynamic air density."
    },
    [SeriesId.IMSA]: {
        technicalInsight: "LMDh spec hybrid powertrains demand seamless blending between Bosch MGU-K regen and carbon-carbon friction braking into bumpy North American braking zones.",
        keyFactors: [
            "Damper stiffness over curbs and uneven pavement seams",
            "Full-course caution wave-around and pit entry timing",
            "Cold Michelin tire warm-up out of pit exit"
        ],
        trackConditions: "High ambient humidity, bumpy surface characteristics requiring compliant suspension compliance."
    },
    [SeriesId.GT_WORLD_CHALLENGE]: {
        technicalInsight: "GT3 aerodynamics rely on balanced front splitter and rear diffuser airflow under heavy pitch variation, with ABS and traction control mappings tailored to Bronze/Silver drivers.",
        keyFactors: [
            "Mid-engine vs front-engine tire wear distribution",
            "Minimum pit-stop time enforcement and driver change execution",
            "Track limit penalties and safety car restart clusters"
        ],
        trackConditions: "Dry conditions with potential gusty winds affecting braking stability into corner entry."
    }
};

export const getRacePrediction = async (series: SeriesId): Promise<Prediction> => {
    try {
        const response = await fetch(`/api/predict/${encodeURIComponent(series)}`);
        if (response.ok) {
            const data = await response.json();
            if (data && data.winner && data.podium && Array.isArray(data.podium)) {
                return data;
            }
        }
    } catch (error) {
        console.warn("Prediction API failed, using expert fallback:", error);
    }
    return fallbackPredictions[series] || fallbackPredictions[SeriesId.F1];
};

export const getTechnicalAnalysis = async (series: SeriesId): Promise<AnalysisReport> => {
    try {
        const response = await fetch(`/api/analysis/${encodeURIComponent(series)}`);
        if (response.ok) {
            const data = await response.json();
            if (data && data.technicalInsight && Array.isArray(data.keyFactors)) {
                return data;
            }
        }
    } catch (error) {
        console.warn("Technical analysis API failed, using expert fallback:", error);
    }
    return fallbackAnalysis[series] || fallbackAnalysis[SeriesId.F1];
};
