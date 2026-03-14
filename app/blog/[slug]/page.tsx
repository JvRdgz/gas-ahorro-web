import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { SchemaScript } from "@/components/seo/SchemaScript";
import { BlogPostTemplate } from "@/components/templates/BlogPostTemplate";
import {
  getAllBlogPosts,
  getBlogPostBySlug,
  getCitiesBySlugs,
  getHighwaysBySlugs,
  getRoutesBySlugs,
} from "@/lib/content";
import { buildPageMetadata } from "@/lib/metadata-builders";
import {
  buildArticleSchema,
  buildBreadcrumbSchema,
  buildFaqSchema,
} from "@/lib/schema-builders";
import { blogPath } from "@/lib/routes";

export const revalidate = 3600;

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllBlogPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    return {};
  }

  return buildPageMetadata({
    title: `${post.title} | Gas Ahorro`,
    description: post.excerpt,
    path: blogPath(post.slug),
    type: "article",
  });
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <>
      <SchemaScript
        data={[
          buildBreadcrumbSchema([
            { name: "Inicio", href: "/" },
            { name: "Blog", href: "/blog" },
            { name: post.title, href: blogPath(post.slug) },
          ]),
          buildArticleSchema(
            post.title,
            post.excerpt,
            blogPath(post.slug),
            post.publishedAt,
            post.updatedAt,
          ),
          buildFaqSchema(post.faqs),
        ]}
      />

      <BlogPostTemplate
        post={post}
        relatedCities={getCitiesBySlugs(post.relatedCitySlugs)}
        relatedRoutes={getRoutesBySlugs(post.relatedRouteSlugs)}
        relatedHighways={getHighwaysBySlugs(post.relatedHighwaySlugs)}
      />
    </>
  );
}
