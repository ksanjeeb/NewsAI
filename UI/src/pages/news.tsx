import { Input } from "@/components/ui/input";
import { formatDate } from "@/lib/utils";
import { Link } from "react-router-dom";

export const metadata = {
  title: "Blog",
};

const posts = [
  {
    _id: 1,
    title: "hello",
    description: "A sample description",
    date: new Date(),
    slug: "/post/hello",
    image: "https://via.placeholder.com/804x452"
  },
  {
    _id: 2,
    title: "hello",
    description: "A sample description",
    date: new Date(),
    slug: "/post/hello",
    image: "https://via.placeholder.com/804x452"
  },
  {
    _id: 3,
    title: "hello",
    description: "A sample description",
    date: new Date(),
    slug: "/post/hello",
    image: "https://via.placeholder.com/804x452"
  },
  {
    _id: 4,
    title: "hello",
    description: "A sample description",
    date: new Date(),
    slug: "/post/hello",
    image: "https://via.placeholder.com/804x452"
  }
];

function NewsList() {
  return (
    <div className="container max-w-5xl py-6 lg:py-10">
      <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between md:gap-8">
        <div className="flex  flex-col lg:flex-row justify-between flex-1 gap-4">
          <div className=" space-y-4">
            <h1 className="inline-block font-heading text-4xl font-semibold tracking-tight lg:text-5xl">
              NewsAI
            </h1>
            <p className="text-xl text-muted-foreground">
            This is a news AI website powered by Meta LLMA-7b and NewsAPI.            
            </p>
          </div>
          <div className="w-64">
            <Input placeholder="Search"/>
          </div>
        </div>

      </div>
      <hr className="my-8" />
      {posts?.length ? (
        <div className="grid gap-10 sm:grid-cols-2">
          {posts.map((post) => (
            <article
              key={post._id}
              className="group relative flex flex-col space-y-2"
            >
              {post.image && (
                <img
                  src={post.image}
                  alt={post.title}
                  width={804}
                  height={452}
                  className="rounded-md border bg-muted transition-colors"
                />
              )}
              <h2 className="text-2xl font-extrabold">{post.title}</h2>
              {post.description && (
                <p className="text-muted-foreground">{post.description}</p>
              )}
              {post.date && (
                <p className="text-sm text-muted-foreground">
                  {formatDate(post?.date)}
                </p>
              )}
              <Link to={post.slug} className="absolute inset-0">
                <span className="sr-only">View Article</span>
              </Link>
            </article>
          ))}
        </div>
      ) : (
        <p>No posts published.</p>
      )}
    </div>
  );
}

export default NewsList;
