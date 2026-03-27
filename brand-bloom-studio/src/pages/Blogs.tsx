import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { format } from "date-fns";
import axios from "axios";
import { Search } from "lucide-react";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";

const API_URL = "http://localhost:5001/api/blogs";

interface Blog {
  _id: string;
  title: string;
  slug: string;
  coverImage: string;
  content: string;
  author: string;
  createdAt: string;
}

const BlogCard = ({ blog, isFeatured = false }: { blog: Blog, isFeatured?: boolean }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    whileHover={{ y: -5 }}
    className={isFeatured ? "col-span-1 md:col-span-2 lg:col-span-2" : ""}
  >
    <Link to={`/blogs/${blog.slug}`} className={`block flex flex-col ${isFeatured ? 'md:flex-row' : ''} h-full border border-border rounded-3xl overflow-hidden bg-secondary/50 group shadow-warm transition-all duration-300 hover:border-coffee-warm/50 hover:bg-secondary/70`}>
      <div className={`${isFeatured ? 'w-full md:w-1/2 min-h-[300px]' : 'aspect-[16/9] w-full'} bg-coffee-deep overflow-hidden relative`}>
        {blog.coverImage ? (
          <img src={blog.coverImage} alt={blog.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-gold/30">
            <span className="font-display text-5xl font-bold">CS</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      <div className={`p-6 md:p-8 flex flex-col flex-1 ${isFeatured ? 'justify-center' : ''}`}>
        <p className="text-xs text-gold font-semibold uppercase tracking-wider mb-3">{format(new Date(blog.createdAt), 'MMM dd, yyyy')}</p>
        <h2 className={`${isFeatured ? 'text-2xl lg:text-3xl' : 'text-xl'} font-display font-medium mb-4 text-foreground group-hover:text-gold transition-colors line-clamp-2`}>{blog.title}</h2>
        <div className="text-muted-foreground text-sm line-clamp-3 font-body flex-1" dangerouslySetInnerHTML={{ __html: blog.content.substring(0, 150) + '...' }} />
        <div className="mt-8 pt-4 border-t border-border/50 text-sm font-semibold text-gold inline-flex items-center">
          Read Article <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">→</span>
        </div>
      </div>
    </Link>
  </motion.div>
);

const Blogs = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const { data } = await axios.get(API_URL);
        setBlogs(data);
      } catch (error) {
        console.error("Failed to fetch blogs", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  const filteredBlogs = blogs.filter(b => b.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="min-h-screen bg-gradient-beige theme-beige flex flex-col">
      <Navbar />
      <div className="flex-1 pt-32 pb-20 px-6 md:px-12 max-w-7xl mx-auto w-full">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-display font-bold mb-6">Coffee Cup <span className="text-gradient-gold">Discussion</span></h1>
          <p className="text-muted-foreground font-body max-w-2xl mx-auto">Brew your intellect with our latest insights on wealth creation, investing, and financial freedom.</p>
        </motion.div>

        <div className="max-w-2xl mx-auto mb-16 relative">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
          <input 
            type="text" 
            placeholder="Search discussions by title..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-secondary/30 border border-border rounded-full py-4 pl-14 pr-6 text-foreground focus:outline-none focus:border-gold transition-colors shadow-inner"
          />
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-10 h-10 rounded-full border-t-2 border-r-2 border-gold animate-spin"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredBlogs.length > 0 ? (
              <>
                <BlogCard blog={filteredBlogs[0]} isFeatured={true} />
                {filteredBlogs.slice(1).map((blog) => (
                  <BlogCard key={blog._id} blog={blog} />
                ))}
              </>
            ) : (
               <div className="col-span-full text-center text-muted-foreground py-16 bg-secondary/20 rounded-3xl border border-border">
                 No discussions found. Try different keywords!
               </div>
            )}
          </div>
        )}
      </div>
      <FooterSection />
    </div>
  );
};
export default Blogs;
