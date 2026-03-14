import type { Metadata } from "next";

import { SchemaScript } from "@/components/seo/SchemaScript";
import { LinkCard } from "@/components/ui/LinkCard";
import { SectionContainer } from "@/components/ui/SectionContainer";
import { getAllBlogPosts } from "@/lib/content";
import { buildPageMetadata } from "@/lib/metadata-builders";
import {
  buildBreadcrumbSchema,
  buildCollectionPageSchema,
  buildItemListSchema,
} from "@/lib/schema-builders";
import { blogPath } from "@/lib/routes";
import { formatUpdatedAt } from "@/lib/utils";

export const revalidate = 3600;

export const metadata: Metadata = buildPageMetadata({
  title: "Blog sobre ahorro de combustible | Gas Ahorro",
  description:
    "Artículos evergreen sobre gasolina barata, ahorro en carretera y decisiones de repostaje mejor informadas.",
  path: "/blog",
});

export default function BlogIndexPage() {
  const posts = getAllBlogPosts();

  return (
    <>
      <SchemaScript
        data={[
          buildBreadcrumbSchema([
            { name: "Inicio", href: "/" },
            { name: "Blog", href: "/blog" },
          ]),
          buildCollectionPageSchema(
            "Blog Gas Ahorro",
            "Artículos evergreen relacionados con repostaje, ahorro y viajes en coche.",
            "/blog",
          ),
          buildItemListSchema(
            "Artículos Gas Ahorro",
            posts.map((post) => ({
              name: post.title,
              url: `https://www.gasahorro.es${blogPath(post.slug)}`,
              description: post.excerpt,
            })),
          ),
        ]}
      />

      <SectionContainer>
        <div className="section-heading">
          <span className="eyebrow">Blog evergreen</span>
          <h1>Contenido SEO de apoyo para captar y convertir mejor</h1>
          <p>
            Estructura preparada para reforzar topical authority, enlazar a páginas
            transaccionales y crecer sin rehacer layouts ni metadata.
          </p>
        </div>
      </SectionContainer>

      <SectionContainer>
        <div className="index-grid">
          {posts.map((post) => (
            <LinkCard
              key={post.slug}
              href={blogPath(post.slug)}
              eyebrow={`${post.readingTimeMinutes} min`}
              title={post.title}
              description={post.excerpt}
              meta={`Actualizado ${formatUpdatedAt(post.updatedAt)}`}
            />
          ))}
        </div>
      </SectionContainer>
    </>
  );
}
