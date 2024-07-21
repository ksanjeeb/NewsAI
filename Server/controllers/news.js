import NewsAPI from 'newsapi';

export const getNews = async (req, res) => {
    try {
        const newsapi = new NewsAPI(process.env.NEWS_API);
        const { topic = 'technology', sources = 'bbc-news,the-verge', size=20, page=1 } = req.query;

        const response = await newsapi.v2.everything({
            q: topic,
            sources: sources,
            pageSize:size,
            page:page,
        });

        res.send({ ...response, status: 200, message: "Success" });

    } catch (err) {
        console.error(err);
        res.send({ error: err.message, status: 400, message: "Failed to retrieve data." });
    }
};
