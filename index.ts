import NotionPageToHtml from "notion-page-to-html";

const styles = `
<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+Mono:wght@400&display=swap" rel="stylesheet">
<style>
*{
	// background-color: #333;
}



  body {
    font-family: 'Noto Sans Mono', monospace;
    background-color: #232323;
    color: white;
    margin: 0;
    padding: 0;
  }

  header {
    // background-color: #333;
    padding: 20px;
    text-align: center;
  }

  h1 {
    font-size: 36px;
    margin: 0;
    padding: 0;
  }

  a {
	color: #3391ff;
  }

  nav {
    text-align: center;
    margin-top: 20px;
  }

  nav a {
    color: white;
    text-decoration: none;
    margin: 0 20px;
  }

  nav a:hover {
    text-decoration: underline;
  }
</style>
`;

const homepage = `
<html>
${styles}
<body>
  <header>
    <h1>Subjects</h1>
    <nav>
      <a href="/math">Math</a>
      <a href="/bio">Biology</a>
      <a href="/gov">US Government</a>
      <a href="/lang">AP Language</a>
    </nav>
  </header>
</body>
</html>
`;

const pages = {
	math: "https://s1monlol.notion.site/Ap-Pre-calc-Content-29b034f9662b4cefadd30836dd32c980",
	bio: "https://s1monlol.notion.site/Biology-Content-1cd559c8ddd14680ba2c1385978c9d1a",
	gov: "https://s1monlol.notion.site/US-Gov-Content-fbe12c84c98a44ea80ea533f4333698b",
	lang: "https://s1monlol.notion.site/Ap-Lang-Content-9ba9422511c940c6bff023bb0ec071d6",
};

// using async/await
async function getPage(page: string) {
	const response = await NotionPageToHtml.convert(page, {
		excludeCSS: false,
	});

	const html = response.html;

	const htmlWithoutStyles = html.replace(/<style>[\s\S]*?<\/style>/g, "");

	return htmlWithoutStyles + styles;
}

Bun.serve({
	port: 8080,
	async fetch(req) {
		const url = new URL(req.url);

		if (url.pathname === "/")
			return new Response(homepage, {
				headers: { "Content-Type": "text/html" },
			});

		// get page from pages list
		const page = pages[url.pathname.slice(1)];

		if (!page) return new Response("No Subject Found!");

		return new Response(await getPage(page), {
			headers: {
				"Content-Type": "text/html",
			},
		});
	},
});
