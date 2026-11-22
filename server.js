
const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const Note = require("./models/Note");
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB connected successfully");
    })
    .catch((error) => {
        console.log("MongoDB connection failed:", error);
    });
const app = express();
app.use(express.json());

app.get("/api/notes", async (req, res) => {
    try {
        if (
            req.query.completed !== undefined &&
            req.query.completed !== "true" &&
            req.query.completed !== "false"
        ) {
            return res.status(400).json({
                message: "Invalid completed value. Use true or false."
            });
        }
        if (
            req.query.sort !== undefined &&
            req.query.sort !== "latest" &&
            req.query.sort !== "oldest"
        ) {
            return res.status(400).json({
                message: "Invalid sort value. Use latest or oldest."
            });
        }
        if (
            (req.query.page !== undefined &&
                (!Number.isInteger(Number(req.query.page)) || Number(req.query.page) < 1)) ||
            (req.query.limit !== undefined &&
                (!Number.isInteger(Number(req.query.limit)) || Number(req.query.limit) < 1))
        ) {
            return res.status(400).json({
                message: "Page and limit must be positive integers."
            });
        }
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 5;

        const skip = (page - 1) * limit;
        if (limit > 100) {
            return res.status(400).json({
                message: "Limit cannot exceed 100."
            });
        }
        if (req.query.search && req.query.search.length > 100) {
            return res.status(400).json({
                message: "Search query cannot exceed 100 characters."
            });
        }
        const filter = {};
        if (req.query.search) {
            filter.$or = [
                { title: { $regex: req.query.search, $options: "i" } },
                { content: { $regex: req.query.search, $options: "i" } }
            ];
        }
        if (req.query.completed !== undefined) {
            filter.completed = req.query.completed === "true";
        }

        let sortOption = {};

        if (req.query.sort === "latest") {
            sortOption.createdAt = -1;
        } else if (req.query.sort === "oldest") {
            sortOption.createdAt = 1;
        }
        const totalNotes = await Note.countDocuments(filter);
        const totalPages = Math.ceil(totalNotes / limit);
        const notes = await Note.find(filter)
            .sort(sortOption)
            .skip(skip)
            .limit(limit);
        if (notes.length === 0 && page > totalPages) {
            return res.status(200).json({
                message: "No notes found on this page.",
                totalPages,
                currentPage: page,
                notes: []
            });
        }
        const hasNextPage = page < totalPages;
        const hasPreviousPage = page > 1;
        res.status(200).json({
            totalNotes,
            totalPages,
            currentPage: page,
            hasNextPage,
            hasPreviousPage,
            notes
        });


    } catch (error) {
        res.status(500).json({
            message: "Error fetching notes",
            error: error.message
        });
    }
});

app.get("/api/notes/:id", async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({
                message: "Invalid note ID."
            });
        }
        const note = await Note.findById(req.params.id);

        if (!note) {
            return res.status(404).json({
                message: "Note not found"
            });
        }

        res.status(200).json({
            message: "Note fetched successfully",
            note: note
        });

    } catch (error) {
        res.status(500).json({
            message: "Error fetching note",
            error: error.message
        });
    }
});

app.post("/api/notes", async (req, res) => {
    try {
        const { title, content, completed } = req.body;

        if (
            typeof title !== "string" ||
            !title.trim() ||
            typeof content !== "string" ||
            !content.trim()
        ) {
            return res.status(400).json({
                message: "Title and content are required"
            });
        }
        if (completed !== undefined && typeof completed !== "boolean") {
            return res.status(400).json({
                message: "Completed must be a boolean"
            });
        }

        const note = await Note.create({
            title: title,
            content: content,
            completed: completed
        });

        res.status(201).json({
            message: "Note created successfully",
            note: note
        });

    } catch (error) {
        res.status(500).json({
            message: "Error creating note",
            error: error.message
        });
    }
});
app.put("/api/notes/:id", async (req, res) => {
    try {
        const { title, content, completed } = req.body;
        if (
            (title !== undefined && (typeof title !== "string" || !title.trim())) ||
            (content !== undefined && (typeof content !== "string" || !content.trim()))
        ) {
            return res.status(400).json({
                message: "Title and content must be non-empty strings"
            });
        }

        if (completed !== undefined && typeof completed !== "boolean") {
            return res.status(400).json({
                message: "Completed must be a boolean"
            });
        }

        const updatedNote = await Note.findByIdAndUpdate(
            req.params.id,
            { title, content, completed },
            { new: true, runValidators: true }
        );

        if (!updatedNote) {
            return res.status(404).json({
                message: "Note not found"
            });
        }

        res.status(200).json({
            message: "Note updated successfully",
            note: updatedNote
        });

    } catch (error) {
        if (error.name === "CastError") {
            return res.status(400).json({
                message: "Invalid note ID"
            });
        }

        res.status(500).json({
            message: "Error updating note",
            error: error.message
        });
    }
});
app.delete("/api/notes/:id", async (req, res) => {
    try {
        const deletedNote = await Note.findByIdAndDelete(req.params.id);

        if (!deletedNote) {
            return res.status(404).json({
                message: "Note not found"
            });
        }

        res.status(200).json({
            message: "Note deleted successfully",
            note: deletedNote
        });

    } catch (error) {
        if (error.name === "CastError") {
            return res.status(400).json({
                message: "Invalid note ID"
            });
        }

        res.status(500).json({
            message: "Error deleting note",
            error: error.message
        });
    }
});
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

