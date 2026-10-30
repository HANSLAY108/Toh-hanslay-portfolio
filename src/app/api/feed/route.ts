import { NextRequest, NextResponse } from "next/server";
import { getBlogPosts } from "@/lib/supabase/db";

export async function GET(_request: NextRequest) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://hanslay.dev";

  const posts = await getBlogPosts({ publishedOnly: true });

  const rssItems = posts
    .map((post) => {
      const pubDate = post.published_at
        ? new Date(post.published_at).toUTCString()
        : new Date().toUTCString();
      return `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${baseUrl}/blog/${post.slug}</link>
      <guid isPermaLink="true">${baseUrl}/blog/${post.slug}</guid>
      <description><![CDATA[${post.excerpt}]]></description>
      <pubDate>${pubDate}</pubDate>
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Hanslay — Technical Writing</title>
    <link>${baseUrl}</link>
    <description>Technical articles on autonomous AI, distributed systems, and editorial design by Hanslay.</description>
    <language>en-US</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${baseUrl}/feed.xml" rel="self" type="application/rss+xml"/>
    ${rssItems}
  </channel>
</rss>`;

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "s-maxage=3600, stale-while-revalidate",
    },
  });
}
