import Note from '../models/Note.js';
// Controller function to get notes
export async function getNotes(req,res){
  try
  {
    const notes = await Note.find().sort({createdAt:-1});// Sort notes by createdAt in descending order
    res.status(200).send(notes);
  }
  catch(err)
  {
    console.log(err);
    // Send a 500 Internal Server Error response with the error message
    res.status(500).send({"error":err.message});
  }

}
export async function getNote(req,res){
  try{
    const {id} = req.params;
    const note = await Note.findById(id);
    if(!note){
      return res.status(404).send({"error":"Note not found"});
    }
    res.status(200).send(note);
  }
  catch(err)
  {
    console.log(err);
    // Send a 500 Internal Server Error response with the error message
    res.status(500).send({"error":err.message});
  }
}

// Controller function to add a new note
export async function addNote(req,res){
   try{
    console.log(req.body);
    const {title,content} = req.body;
    const note = new Note({
      title,
      content
    })
    const saved = await note.save();
    res.status(201).send(saved);
   }
   catch(err)
   {
     console.log(err);
     // Send a 500 Internal Server Error response with the error message
     res.status(500).send({"error":err.message});
   }
}

// Controller function to update a note
export async function updateNote(req,res){
  try{
  console.log(req.body);
  console.log(req.params);
  const {id} = req.params;
  
  const {title,content} = req.body;

  const updated = await Note.findByIdAndUpdate(id,{title,content},{new:true});
  if(!updated){
    return res.status(404).send({"error":"Note not found"});
  }
  res.status(200).send(updated);
  }
  catch(err){
    res.status(500).send({"error":err.message});
  }
  // Send a 200 OK response with the updated note
}

// Controller function to delete a note
export async function deleteNote(req,res){
  try{
  const {id} = req.params;
  const deleted = await Note.findByIdAndDelete(id);
  if(!deleted){
    return res.status(404).send({"error":"Note not found"});
  }
  res.status(200).send({"message":"Deleted Successfully",deleted});
}
catch(err){
  res.status(500).send({"error":err.message});
}
};