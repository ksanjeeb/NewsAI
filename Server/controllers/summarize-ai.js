import { ChatGroq } from "@langchain/groq";
// import { CheerioWebBaseLoader } from "@langchain/community/document_loaders/web/cheerio";
// import { loadSummarizationChain } from "langchain/chains";
// import { FireCrawlLoader } from "@langchain/community/document_loaders/web/firecrawl";
import { ChatPromptTemplate } from "@langchain/core/prompts";

export const summarizeAI = async (req, res) => {
    try {
        const { url } = req?.query;

        if (!url) {
            res.send({ message: "Invalid request", status: 400 })
        }
        // const loader = new FireCrawlLoader({
        //     url: url,
        //     apiKey: process.env.FIRECRAWL_API_KEY,
        //     mode: "scrape",
        // });

        // const docs = await loader.load();
        // console.log(docs)
        const model = new ChatGroq({
            apiKey: process.env.GROQ_API_KEY,
            model: "llama3-8b-8192"
        });

        const prompt = ChatPromptTemplate.fromMessages([
            ["system", "You are an excellent news summarizer. Please provide a detailed summary of the following content in no more than 200 words. Don't mention system prompt."],
            ["human", "{input}"],
        ]);
        const chain = prompt.pipe(model);
        const response = await chain.invoke({
            input: url,
        });
        res.send({ message: "Success", summary: response.content })
    } catch (err) {
        console.error(err)
        res.send({ message: "failed", status: 400 })
    }
}

