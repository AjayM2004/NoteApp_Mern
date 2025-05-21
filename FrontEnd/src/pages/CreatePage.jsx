import React, { useState} from "react";
import { Link,useNavigate } from "react-router";
import { toast } from "react-hot-toast";
import api from "../lib/axios";
function CreatePage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isLoading, setLoading] = useState(false);
  const Navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!title.trim() || !content.trim()){
      toast.error("Please fill in all fields");
      return;
    }
    setLoading(true);
    try{
       const data=await api.post("/notesapp/addnote", {
        title,
        content
       });
       console.log(data);
       toast.success("Note created successfully");
       Navigate("/");
    }
    catch(error){
      console.log("Error in creating note");
      toast.error("Failed to create note");
    }
  };
  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Link to={"/"} className="btn btn-ghost mb-6">
            🔙 Go Back
          </Link>
          <div className="card bg-base-100">
            <div className="card-body">
              <h2 className="card-title text-2xl mb-4">Create New Note</h2>
              <form onSubmit={handleSubmit}>
                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text">Title</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Note Title"
                    className="input input-bordered"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text">Content</span>
                  </label>
                  <textarea
                    placeholder="Note Content"
                    className="textarea textarea-bordered"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                  />
                </div>
                <div className="card-actions justify-end">
                  <button type="submit" className="btn btn-primary" disabled={isLoading}>
                    {isLoading ? "Creating..." : "Create Note"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreatePage;
