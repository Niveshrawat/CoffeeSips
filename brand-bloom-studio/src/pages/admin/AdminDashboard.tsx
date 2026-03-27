import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { Plus, Edit, Trash2 } from "lucide-react";
import axios from "axios";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";

const API_URL = `${import.meta.env.VITE_API_URL}/api/blogs`;

interface Blog {
  _id: string;
  title: string;
  slug: string;
  status: string;
  createdAt: string;
}

const AdminDashboard = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const { data } = await axios.get(API_URL);
      setBlogs(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const deleteBlog = async (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    if (window.confirm("Are you sure you want to delete this blog?")) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        setBlogs(blogs.filter(b => b._id !== id));
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-beige theme-beige flex flex-col">
      <Navbar />
      <div className="flex-1 pt-32 pb-20 px-6 max-w-7xl mx-auto w-full">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
          <h1 className="text-4xl font-display font-bold">Admin <span className="text-gradient-gold">Dashboard</span></h1>
          <Link to="/admin/blogs/new" className="flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-full font-semibold border border-transparent hover:bg-background hover:text-gold hover:border-gold transition-all duration-300">
            <Plus size={20} /> Write New Article
          </Link>
        </div>

        {loading ? (
          <div className="flex justify-center py-12"><div className="w-10 h-10 rounded-full border-t-2 border-r-2 border-gold animate-spin"></div></div>
        ) : (
          <div className="bg-secondary/20 rounded-3xl border border-border p-8 shadow-warm">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-border/50 text-muted-foreground">
                  <th className="py-4 font-body font-semibold uppercase text-xs tracking-wider">Article Title</th>
                  <th className="py-4 font-body font-semibold uppercase text-xs tracking-wider">Status</th>
                  <th className="py-4 font-body font-semibold uppercase text-xs tracking-wider">Date Published</th>
                  <th className="py-4 font-body font-semibold uppercase text-xs tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {blogs.map((blog) => (
                  <tr key={blog._id} className="border-b border-border/30 hover:bg-black/5 transition-colors group">
                    <td className="py-4 pr-6 font-display text-lg text-foreground group-hover:text-gold transition-colors">{blog.title}</td>
                    <td className="py-4">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${blog.status === 'published' ? 'bg-green-500/20 text-green-700' : 'bg-orange-500/20 text-orange-700'}`}>
                        {blog.status}
                      </span>
                    </td>
                    <td className="py-4 text-sm text-muted-foreground font-body">{format(new Date(blog.createdAt), 'MMM dd, yyyy')}</td>
                    <td className="py-4 text-right">
                      <div className="flex justify-end gap-3">
                        <Link to={`/admin/blogs/edit/${blog.slug}`} className="p-2 text-muted-foreground hover:text-gold hover:bg-black/10 rounded-full transition-all"><Edit size={18} /></Link>
                        <button onClick={(e) => deleteBlog(blog._id, e)} className="p-2 text-muted-foreground hover:text-red-600 hover:bg-black/10 rounded-full transition-all"><Trash2 size={18} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
                {blogs.length === 0 && (
                  <tr>
                    <td colSpan={4} className="p-12 text-center text-muted-foreground text-lg">No insightful articles written yet. Time to brew some!</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <FooterSection />
    </div>
  );
};
export default AdminDashboard;
