import mongoose from "mongoose";
import Note from "../models/Note.mjs";

/*
    GET /
    HOME PAGE
*/

const dashboardController = async (req, res) => {
    let perpage = 12;
    let page = req.query.page || 1;
    const local = {
        title: "dashboard",
        description: "Welcome to dashboard",
        username: req.user.familyName
    }

    try {
        // Ensure the user ID is an ObjectId
        const userId = new mongoose.Types.ObjectId(req.user._id);
        console.log(userId);

        const notes = await Note.aggregate([
            {
                $match: {
                    user: userId // Explicitly use the ObjectId here
                }
            },
            {
                $sort: {
                    createdAt: -1
                }
            },
            {
                $project: {
                    title: 1,
                    content: { $substr: ["$content", 0, 100] },
                    createdAt: 1,
                    user: 1,
                }
            }
        ])
            .skip((perpage * page) - perpage)
            .limit(perpage)
            .exec();

        const count = await Note.countDocuments({ user: userId }).exec(); // Count only documents for this user

        res.render("dashboard/index", {
            local,
            notes,
            current: page,
            pages: Math.ceil(count / perpage),
            layout: "../views/layouts/dashboard.ejs"
        });

    } catch (error) {
        console.error(error);
    }
}

const viewNoteController = async (req, res) => {
    const noteId = req.params.id;
    try {
        const note = await Note.findById(noteId).where({ user: req.user._id }).lean();
        if (!note) {
            return res.status(404).send("Note not found");
        }
        res.render("dashboard/viewNote", {
            local: {
                title: note.title,
                description: note.content,
                username: req.user.familyName
            },
            note,
            noteId,
            layout: "../views/layouts/dashboard.ejs"
        });
    } catch (error) {

    }
}

const updateNoteController = async (req, res) => {
    try {
        const noteId = req.params.id;
        const { title, content } = req.body;
        const updatedAt = new Date();
        const note = await Note.findByIdAndUpdate(noteId, { title, content, updatedAt }, { new: true }).where({ user: req.user._id });
        res.redirect(`/dashboard`);

    } catch (error) {
        console.error(error);
    }
}

const deleteNoteController = async (req, res) => {
    try {
        const noteId = req.params.id;
        await Note.findByIdAndDelete(noteId).where({ user: req.user._id });
        res.redirect("/dashboard");
    } catch (error) {
        console.error(error);
    }
}

const addNoteController = async (req, res) => {
    res.render("dashboard/addNote", {
        local: {
            title: "Add Note",
            description: "Add a new note",
            username: req.user.familyName
        },
        layout: "../views/layouts/dashboard.ejs"
    });
}

const SubmitNoteController = async (req, res) => {
    try {
        const { title, content } = req.body;
        const note = new Note({
            title,
            content,
            user: req.user._id
        });
        await note.save();
        res.redirect("/dashboard");
    } catch (error) {
        console.error(error);
    }
}

const Search = async (req, res) => {

    res.render("dashboard/search", {
        local: {
            title: "Search",
            description: "Search for notes",
            username: req.user.familyName
        },
        searchResults: '',
        layout: "../views/layouts/dashboard.ejs"
    });

}

const SearchSubmit = async (req, res) => {
    try {
        let keywords = req.body.keywords;
        const keywordsClean = keywords.replace(/[^a-zA-Z0-9 ]/g, '');

        const searchResults = await Note.find({
            $or: [
                { title: { $regex: keywordsClean, $options: 'i' } },
                { content: { $regex: keywordsClean, $options: 'i' } }
            ]
        }).where({ user: req.user._id }).lean();
        res.render("dashboard/search", {
            local: {
                title: "Search",
                description: "Search for notes",
                username: req.user.familyName
            },
            searchResults,
            layout: "../views/layouts/dashboard.ejs"
        });
    } catch (error) {
        console.error(error);
    }


}
export { dashboardController, viewNoteController, updateNoteController, deleteNoteController, addNoteController, SubmitNoteController, SearchSubmit, Search };