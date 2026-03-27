import { useState, useRef, useMemo, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import parse from "html-react-parser";
import { ArrowLeft, Save, Eye, EyeOff, Image as ImageIcon } from "lucide-react";

const API_URL = "http://localhost:5001/api/blogs";
const UPLOAD_URL = "http://localhost:5001/api/blogs/upload";

const BlogEditor = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(slug);
  
  const [title, setTitle] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [content, setContent] = useState("");
  const [status, setStatus] = useState("published");
  const [isPreview, setIsPreview] = useState(true);
  const [id, setId] = useState("");

  const quillRef = useRef<ReactQuill>(null);

  useEffect(() => {
    if (isEditing && slug) {
      axios.get(`${API_URL}/${slug}`).then(({ data }) => {
        setTitle(data.title);
        setCoverImage(data.coverImage);
        setContent(data.content);
        setStatus(data.status);
        setId(data._id);
      }).catch(console.error);
    }
  }, [slug, isEditing]);

  const imageHandler = () => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.onchange = async () => {
      if (input.files && input.files[0]) {
        const file = input.files[0];
        const formData = new FormData();
        formData.append("image", file);
        
        try {
          const res = await axios.post(UPLOAD_URL, formData, {
            headers: { "Content-Type": "multipart/form-data" },
          });
          const url = res.data.url;
          const quill = quillRef.current?.getEditor();
          if (quill) {
            const range = quill.getSelection(true);
            quill.insertEmbed(range ? range.index : 0, "image", url);
            quill.insertText(range ? range.index + 1 : 1, "\n");
          }
        } catch (error) {
          console.error("Upload failed", error);
          alert("Image upload failed. Ensure backend is running.");
        }
      }
    };
  };

  const handleCoverUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const formData = new FormData();
      formData.append("image", file);
      try {
        const res = await axios.post(UPLOAD_URL, formData);
        setCoverImage(res.data.url);
      } catch (error) {
        alert("Cover upload failed");
      }
    }
  };

  const modules = useMemo(() => ({
    toolbar: {
      container: [
        [{ header: [1, 2, 3, false] }],
        ["bold", "italic", "underline", "strike", "blockquote"],
        [{ list: "ordered" }, { list: "bullet" }],
        ["link", "image"],
        ["clean"]
      ],
      handlers: {
        image: imageHandler
      }
    }
  }), []);

  const saveBlog = async () => {
    if (!title || !content) {
      alert("Please provide both a title and content.");
      return;
    }
    const payload = { title, content, coverImage, status };
    try {
      if (isEditing) {
        await axios.put(`${API_URL}/${id}`, payload);
      } else {
        await axios.post(API_URL, payload);
      }
      navigate('/admin/blogs');
    } catch (error) {
      alert("Failed to save blog");
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-tan flex flex-col font-body">
      <div className="sticky top-0 z-50 bg-secondary/80 backdrop-blur-xl border-b border-border px-6 py-4 flex items-center justify-between shadow-warm">
        <Link to="/admin/blogs" className="flex items-center text-muted-foreground hover:text-gold transition-colors font-semibold tracking-wide uppercase text-sm">
          <ArrowLeft size={16} className="mr-2" /> Back to List
        </Link>
        <div className="flex items-center gap-4">
          <button onClick={() => setIsPreview(!isPreview)} className="flex items-center gap-2 px-6 py-2 rounded-full border border-border bg-background hover:bg-white/5 transition-colors text-sm font-semibold">
            {isPreview ? <EyeOff size={16} /> : <Eye size={16} />}
            {isPreview ? "Hide Preview" : "Show Preview"}
          </button>
          <button onClick={saveBlog} className="flex items-center gap-2 px-8 py-2.5 rounded-full bg-primary text-primary-foreground font-semibold hover:bg-coffee-warm transition-transform active:scale-95 shadow-lg border border-transparent hover:border-gold">
            <Save size={16} /> Publish Idea
          </button>
        </div>
      </div>

      <div className={`flex-1 flex flex-col lg:flex-row max-w-[1800px] mx-auto w-full p-6 lg:p-10 gap-10`}>
        {/* Editor Side */}
        <div className={`flex flex-col gap-6 w-full ${isPreview ? 'lg:w-1/2' : 'max-w-4xl mx-auto'}`}>
          <input
            type="text"
            placeholder="A compelling title for your blog..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full bg-background/50 border border-border hover:border-gold/50 rounded-2xl p-6 text-3xl font-display font-bold text-foreground focus:outline-none focus:border-gold transition-colors shadow-inner"
          />
          
          <div className="flex items-center gap-4 bg-background/50 border border-border rounded-2xl p-4 shadow-inner">
            <label className="flex items-center gap-3 cursor-pointer bg-secondary/80 hover:bg-secondary text-foreground px-6 py-3 rounded-xl transition-all border border-transparent hover:border-gold/30 shrink-0 font-medium font-body">
              <ImageIcon size={18} className="text-gold" /> Upload Cover Image
              <input type="file" accept="image/*" onChange={handleCoverUpload} className="hidden" />
            </label>
            {coverImage && (
              <div className="flex-1 overflow-hidden rounded border border-border h-12 relative flex items-center">
                 <img src={coverImage} className="absolute inset-0 w-full h-full object-cover opacity-50 blur-sm" />
                 <span className="relative z-10 px-4 text-sm font-medium text-white truncate drop-shadow-md">Image attached securely</span>
              </div>
            )}
          </div>

          <div className="flex-1 min-h-[600px] flex flex-col mt-4">
             <div className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3 flex justify-between items-center">
                <span>The Story</span>
             </div>
             <div className="flex-1 rounded-3xl overflow-hidden border border-border bg-background/50 shadow-inner flex flex-col quill-dark-theme group focus-within:border-gold transition-colors">
              <ReactQuill 
                ref={quillRef}
                theme="snow" 
                value={content} 
                onChange={setContent} 
                modules={modules}
                className="flex-1 flex flex-col"
                placeholder="Start typing your masterpiece..."
              />
            </div>
          </div>
        </div>

        {/* Live Preview Side */}
        {isPreview && (
          <div className="hidden lg:flex lg:w-1/2 flex-col gap-6 sticky top-[100px] h-[calc(100vh-140px)] overflow-y-auto scrollbar-hide border border-border/80 rounded-3xl bg-[#0F0A06] p-10 shadow-[0_0_50px_rgba(0,0,0,0.5)]">
            <h2 className="text-xs text-gold uppercase tracking-widest font-bold mb-6 pb-4 border-b border-white/5 flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span> Preview Mode Active
            </h2>

            <div className="prose prose-invert max-w-none font-body prose-headings:font-display prose-a:text-gold prose-img:rounded-2xl prose-img:border prose-img:border-white/10 w-full text-[1.1rem]">
               <h1 className="text-5xl font-display font-bold leading-[1.1] mb-10 text-white tracking-tight">{title || "Your brilliant title appears here"}</h1>
               
               {coverImage && <img src={coverImage} alt="Cover" className="w-full aspect-[21/9] object-cover rounded-3xl mb-12 shadow-2xl border border-white/5" />}
               
               <div className="text-foreground/90 leading-relaxed space-y-6">
                 {content ? parse(content) : <p className="text-muted-foreground/50 text-2xl font-display italic">Once upon a time in wealth creation...</p>}
               </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default BlogEditor;
