import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { format } from "date-fns";
import axios from "axios";
import parse from "html-react-parser";
import { ArrowLeft, Twitter, Linkedin, Link as LinkIcon, MessageCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";

const API_URL = `${import.meta.env.VITE_API_URL}/api/blogs`;

const BlogPost = () => {
  const { slug } = useParams();
  const [blog, setBlog] = useState<any>(null);
  const [recentBlogs, setRecentBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/${slug}`);
        setBlog(data);

        // Fetch recent blogs for sidebar
        const allRes = await axios.get(API_URL);
        const others = allRes.data.filter((b: any) => b.slug !== slug).slice(0, 4);
        setRecentBlogs(others);
      } catch (error) {
        console.error("Failed to fetch blog", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [slug]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    alert("Link copied to clipboard!");
  };

  if (loading) return (
     <div className="min-h-screen bg-background flex items-center justify-center">
       <div className="w-10 h-10 rounded-full border-t-2 border-r-2 border-gold animate-spin"></div>
     </div>
  );

  if (!blog) return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <div className="flex-1 flex flex-col items-center justify-center text-center px-6">
        <h1 className="text-4xl font-display font-bold mb-4">Discussion Not Found</h1>
        <p className="text-muted-foreground mb-8">The insightful read you're looking for could not be found.</p>
        <Link to="/blogs" className="px-6 py-3 rounded-full bg-primary text-primary-foreground font-semibold hover:bg-coffee-warm transition-colors">Return to Discussions</Link>
      </div>
      <FooterSection />
    </div>
  );

  const encodedUrl = encodeURIComponent(window.location.href);
  const encodedTitle = encodeURIComponent(blog.title);

  return (
    <div className="min-h-screen bg-gradient-beige theme-beige flex flex-col">
      <Navbar />
      <div className="flex-1 pt-32 pb-20 px-6 max-w-7xl mx-auto w-full">
        <Link to="/blogs" className="inline-flex items-center text-muted-foreground hover:text-gold transition-colors mb-8 group tracking-wide uppercase text-sm font-semibold">
          <ArrowLeft size={16} className="mr-2 transition-transform duration-300 group-hover:-translate-x-1" /> Back to all discussions
        </Link>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 xl:gap-20">
          <div className="lg:col-span-2">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <div className="mb-10">
                <p className="text-sm text-gold font-semibold uppercase tracking-wider mb-4">
                  {format(new Date(blog.createdAt), 'MMMM dd, yyyy')}
                </p>
                <h1 className="text-3xl md:text-5xl lg:text-5xl xl:text-6xl font-display font-bold leading-tight mb-8">
                  {blog.title}
                </h1>
              </div>

              {blog.coverImage && (
                <div className="w-full aspect-video rounded-3xl overflow-hidden mb-12 border border-border bg-secondary/30 shadow-warm">
                  <img src={blog.coverImage} alt={blog.title} className="w-full h-full object-cover" />
                </div>
              )}

              <div className="prose prose-lg max-w-none font-body text-foreground/90 
                              prose-headings:font-display prose-headings:text-foreground prose-headings:font-bold prose-h2:mt-12
                              prose-a:text-gold prose-a:no-underline hover:prose-a:underline
                              prose-img:rounded-2xl prose-img:shadow-warm prose-img:border prose-img:border-border
                              prose-blockquote:border-l-gold prose-blockquote:bg-secondary/20 prose-blockquote:py-2 prose-blockquote:px-6 prose-blockquote:rounded-r-xl prose-blockquote:font-display prose-blockquote:text-lg prose-blockquote:text-gold/80 prose-blockquote:not-italic
                              break-words">
                {parse(blog.content)}
              </div>
              
              <div className="mt-16 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-6">
                <p className="text-foreground font-display font-bold text-xl">Share this discussion</p>
                <div className="flex gap-4">
                  <button onClick={handleCopyLink} className="p-3 rounded-full bg-secondary/30 hover:bg-gold/20 hover:text-gold transition-all duration-300 border border-border hover:border-gold/30 hover:-translate-y-1">
                    <LinkIcon size={18} />
                  </button>
                  <a href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`} target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-secondary/30 hover:bg-[#1DA1F2]/20 hover:text-[#1DA1F2] transition-all duration-300 border border-border hover:border-[#1DA1F2]/30 hover:-translate-y-1">
                    <Twitter size={18} />
                  </a>
                  <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`} target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-secondary/30 hover:bg-[#0A66C2]/20 hover:text-[#0A66C2] transition-all duration-300 border border-border hover:border-[#0A66C2]/30 hover:-translate-y-1">
                    <Linkedin size={18} />
                  </a>
                  <a href={`https://api.whatsapp.com/send?text=${encodedTitle} ${encodedUrl}`} target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-secondary/30 hover:bg-[#25D366]/20 hover:text-[#25D366] transition-all duration-300 border border-border hover:border-[#25D366]/30 hover:-translate-y-1">
                    <MessageCircle size={18} />
                  </a>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-32">
              <h3 className="text-2xl font-display font-bold mb-8 flex items-center gap-4">
                Recent Posts
                <div className="h-px bg-border flex-1"></div>
              </h3>
              
              <div className="flex flex-col gap-6">
                {recentBlogs.map(rb => (
                  <Link key={rb._id} to={`/blogs/${rb.slug}`} className="group flex flex-col sm:flex-row gap-4 items-center bg-secondary/20 p-4 rounded-2xl border border-border hover:border-gold/30 hover:bg-secondary/40 transition-all shadow-sm">
                    <div className="w-full sm:w-24 aspect-video sm:aspect-square rounded-xl overflow-hidden bg-coffee-deep shrink-0">
                      {rb.coverImage ? (
                         <img src={rb.coverImage} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      ) : (
                         <div className="w-full h-full flex items-center justify-center text-gold/30 font-display font-bold text-2xl">CS</div>
                      )}
                    </div>
                    <div className="flex-1 w-full">
                      <p className="text-[10px] text-gold font-bold uppercase tracking-wider mb-1 m-0">{format(new Date(rb.createdAt), 'MMM dd, yyyy')}</p>
                      <h4 className="font-display font-medium text-sm group-hover:text-gold transition-colors line-clamp-2 m-0 text-foreground/90 leading-snug">{rb.title}</h4>
                    </div>
                  </Link>
                ))}
                {recentBlogs.length === 0 && (
                   <p className="text-muted-foreground text-sm italic">No other discussions yet.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <FooterSection />
    </div>
  );
};
export default BlogPost;
