/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useStore } from "@/lib/store-proveider";
import { formatDate } from "@/lib/utils";
import { LoaderCircle, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const metadata = {
  title: "Blog",
};

function NewsList() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const {updateData} = useStore();

  const handleSummarize = (event: any, data: any) => {
    event.stopPropagation();
    updateData({post: data})
    navigate("/news/summarize?url=" + encodeURIComponent(data?.url));
  };

  const getNewsList = async (searchQuery: string, append: boolean = false) => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:3000/api/v1/news?page=${append ? page + 1 : page}${searchQuery ? `&topic=${searchQuery}` : ''}`);
      if (!response.ok) {
        throw new Error('Failed to fetch news');
      }
      const data = await response.json();
      const newArticles: any[] = data.articles || [];

      setPosts((prevPosts) => {
        if (append) {
          return [...prevPosts, ...newArticles];
        } else {
          return newArticles;
        }
      });

      if (append) {
        setPage((prevPage) => prevPage + 1);
      }
    } catch (err: any) {
      console.error(err);
      toast.error(err?.message || "Failed.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getNewsList("");
  }, []);

  useEffect(() => {
    const handler = setTimeout(() => {
      if (query !== "") {
        getNewsList(query);
      }
    }, 1000);

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
      const isNearBottom = scrollTop + clientHeight >= scrollHeight - 10;

      if (isNearBottom && !loading) {
        getNewsList(query, true);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      clearTimeout(handler);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [query, loading]);

  return (
    <div className="container max-w-5xl my-6 lg:py-10">
      <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between md:gap-8">
        <div className="flex flex-col lg:flex-row justify-between flex-1 gap-4">
          <div className="space-y-4">
            <h1 className="inline-block font-heading text-4xl font-semibold tracking-tight lg:text-5xl">
              NewsAI
            </h1>
            <p className="text-xl text-muted-foreground">
              This is a news AI website powered by Meta LLMA-7b and NewsAPI.
            </p>
          </div>
          <div className="w-64">
            <Input placeholder="Search" value={query} onChange={(e) => setQuery(e.target.value)} />
          </div>
        </div>
      </div>
      <hr className="my-8" />

      {posts.length ? (
        <div className="grid gap-10 sm:grid-cols-2">
          {posts.map((post, index) => (
            <article
              key={index}
              className="flex flex-col space-y-2 cursor-pointer"
              onClick={() => window.open(post?.url, "_blank")}
            >
              {post?.urlToImage && (
                <div className="relative">
                  <img
                    src={post.urlToImage}
                    alt={post.title}
                    width={804}
                    height={452}
                    className="rounded-md border bg-muted transition-colors"
                  />
                  <Button
                    variant={"outline"}
                    className="absolute bottom-4 right-4 border-none hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:text-white transition-all duration-300 ease-in-out"
                    onClick={(ev) => handleSummarize(ev, post)}
                  >
                    <Sparkles className="w-4 h-4 self-center mr-1" />
                    Summarize
                  </Button>
                </div>
              )}

              <h2 className="text-2xl font-extrabold">{post?.title}</h2>
              {post?.source?.name && (
                <p className="text-muted-foreground font-bold">{post?.source?.name}</p>
              )}
              {post.description && (
                <p className="text-muted-foreground">{post?.description}</p>
              )}

              {post.publishedAt && (
                <p className="text-sm text-muted-foreground">
                  {formatDate(post?.publishedAt)}
                </p>
              )}
            </article>
          ))}
        </div>
      ) : !loading && (
        <p>No posts published.</p>
      )}
      {loading && (
        <div className="flex flex-row gap-2 py-4">
          <LoaderCircle className="animate-spin self-center" />
          <p>Fetching news...</p>
        </div>
      )}
    </div>
  );
}

export default NewsList;