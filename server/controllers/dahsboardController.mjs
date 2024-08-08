/*
    GET /
    HOME PAGE
*/

export const dashboardController = (req, res) => {
    const local = {
        title: "dashboard",
        description: "Welcome to dashboard"
    }
    res.render("dashboard/index", {
        local,
        layout: "../views/layouts/dashboard.ejs"
    });
}
