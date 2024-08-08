/*
    GET /
    HOME PAGE
*/

export const homepage = (req, res) => {
    const local = {
        title: "Home",
        description: "Welcome to home"
    }
    res.render("index", {
        local,
        layout: "../views/layouts/front.ejs"
    });
}


/*
    GET /
    HOME PAGE
*/

export const about = (req, res) => {
    const local = {
        title: "about",
        description: "Welcome to about"
    }
    res.render("about", local);
}


