const fetch = require("node-fetch");

exports.handler = async () => {
  const NOTION_TOKEN = process.env.NOTION_TOKEN;
  const PAGE_ID = process.env.NOTION_PAGE_ID;

  const response = await fetch(
    `https://api.notion.com/v1/blocks/${PAGE_ID}/children`,
    {
      headers: {
        "Authorization": `Bearer ${NOTION_TOKEN}`,
        "Notion-Version": "2022-06-28"
      }
    }
  );

  const data = await response.json();

  let html = "";

  data.results.forEach(block => {
    if (block.type === "paragraph") {
      const text = block.paragraph.rich_text
        .map(t => t.plain_text)
        .join("");
      html += `<p>${text}</p>`;
    }

    if (block.type === "bulleted_list_item") {
      const text = block.bulleted_list_item.rich_text
        .map(t => t.plain_text)
        .join("");
      html += `<li>${text}</li>`;
    }
  });

  return {
    statusCode: 200,
    body: html
  };
};
