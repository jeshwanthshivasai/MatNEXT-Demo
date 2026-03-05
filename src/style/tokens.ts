export const COLOR_TOKENS = {
    primary: "#96CC39", // MatNEXT Green
    background: "#F9FAFB", // Soft grey/white
    surface: "#FFFFFF",
    text: "#111827",
    textSecondary: "#4B5563",
    border: "#E5E7EB",
    shadow: "rgba(0, 0, 0, 0.05)",
};

export const ANIMATION_TOKENS = {
    // Fast but smooth, no bounce
    premium: {
        stiffness: 200,
        damping: 30,
        mass: 0.5,
    },
    // For slower, more graceful entries
    slow: {
        stiffness: 50,
        damping: 20,
        mass: 1,
    },
    // Standard spring (updated for less bounce)
    spring: {
        stiffness: 100,
        damping: 20,
        mass: 1,
    },
};
