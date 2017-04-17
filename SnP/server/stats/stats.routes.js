
// Stats Routes
module.exports = [
    {
        api: "/api/v1.0/stats/cap/history",
        controller: "main",
        method: {
            get: "capHistory"
        }
    },
    {
        api: "/api/v1.0/stats/sp/history",
        controller: "main",
        method: {
            get: "spHistory"
        }
    },
    {
        api: "/api/v1.0/stats/cap/winloss",
        controller: "main",
        method: {
            get: "winloss"
        }
    }
];
