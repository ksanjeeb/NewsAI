/* eslint-disable @typescript-eslint/no-explicit-any */
import { buttonVariants } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { config } from "@/config";
import { useStore } from "@/lib/store-proveider";
import { cn, formatDate } from "@/lib/utils";
import { ChevronLeft, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";





export default function Summarize() {
  const { state } = useStore();
  const [loading, setLoading] = useState(false);
  const [summarization, setSummarization] = useState("")
  const loadSummarization = async () => {
    try {
      setLoading(true);
      const response = await fetch(config.api_url+ `/summarize?url=${state?.data?.post?.url}`);
      if (!response.ok) {
        throw new Error('Failed to fetch news');
      }
      const data = await response.json();
      setSummarization(data?.summary)
    } catch (err: any) {
      console.error(err);
      toast.error(err?.message || "Failed.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadSummarization()
  }, []);


  return (
    <article className="container relative max-w-5xl py-6 lg:py-10">
      {state?.data.post && <div>
        <div className="flex  flex-row gap-4">
          <Link
            to="/"
            className={cn(
              buttonVariants({ variant: "outline", size: "icon" }),
              "self-center"
            )}
          >
            <ChevronLeft className=" h-4 w-4" />
          </Link>
          <div className="self-center">
            {state?.data?.post?.source?.name && (
              <p className="  text-muted-foreground text-xl font-bold">{state?.data?.post?.source?.name}</p>
            )}
            {state?.data.post.publishedAt && (
              <time
                dateTime={state?.data?.post.publishedAt}
                className="block text-sm text-muted-foreground"
              >
                Published on {formatDate(state?.data?.post?.publishedAt)}
              </time>
            )}
          </div>
        </div>

        <h1 className="mt-2 inline-block font-heading text-2xl font-medium leading-tight lg:text-3xl">
          {state?.data?.post?.title}
        </h1>

        <div className="pt-4">
          {
            loading ? <div className="space-y-2 ">
              <div className="flex flex-row gap-2 text-base mb-2"><Loader2 className="w-6 h-6 animate-spin" />Generating summary...</div>
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4  w-full" />
              <Skeleton className="h-4 w-2/3" />
            </div> : summarization ?
              <p className="text-bold text-xl text-muted-foreground  ">{summarization}
              </p> : <p className="text-muted-foreground text-lg font-semibold">No summary</p>
          }
        </div>
        {state?.data?.post?.urlToImage && (
          <img
            src={state?.data?.post?.urlToImage}
            alt={state?.data?.post.title}
            className="my-8 rounded-md border bg-muted transition-colors"
          />
        )}


        <hr className="mt-12" />
        <div className="flex justify-center py-6 lg:py-10">
          <Link to="/" className={cn(buttonVariants({ variant: "ghost" }))}>
            <ChevronLeft className="mr-2 h-4 w-4" />
            See all posts
          </Link>
        </div>
      </div>}

    </article>
  );
}
