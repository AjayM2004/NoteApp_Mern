import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import NoteCard from "../components/NoteCard";
import RateLimited from "../components/RateLimited";
import api from "../lib/axios";
import NotesNotFound from "../components/NotesNotFound";
import { toast } from "react-hot-toast";
function HomePage() {
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await api.get("/notesapp/");
        setNotes(res.data);
        setIsRateLimited(false);
      } catch (error) {
        if (error.response && error.response.status === 429) {
          setIsRateLimited(true);
        } else {
          toast.error("Error fetching notes");
          setIsRateLimited(false);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchNotes(); // <-- Call the function here
  }, []);
  return (
    <div className="min-h-screen ">
      <NavBar />
         {notes.length === 0 && !isRateLimited && <NotesNotFound />}
      {isRateLimited && <RateLimited />}
      {loading && (
        <div className="text-center text-primary py-1">Loading notes...</div>
      )}
      {notes.length > 0 && !isRateLimited && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {notes.map((note) => (
            <NoteCard key={note._id} note={note} setNotes={setNotes} />
          ))}
        </div>
      )}
    </div>
  );
}

export default HomePage;
