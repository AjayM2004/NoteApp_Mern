import mongoose from "mongoose";
// step 1: Create a schema (blueprint)
// step 2: Create a model of that schema (object; same blueprint can have multiple instances)
const noteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);
const Note = mongoose.model("Note", noteSchema);
export default Note;
//note
/*noteSchema → defines the structure (blueprint).
Note → is the Model class (like a factory).
new Note({...}) → creates a document (object) you can use and save.*/