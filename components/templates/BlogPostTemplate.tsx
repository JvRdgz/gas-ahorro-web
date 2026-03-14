import { AppDownloadCTA } from "@/components/sections/AppDownloadCTA";
import { FaqBlock } from "@/components/sections/FaqBlock";
import { RelatedCities } from "@/components/sections/RelatedCities";
import { RelatedHighways } from "@/components/sections/RelatedHighways";
import { RelatedRoutes } from "@/components/sections/RelatedRoutes";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { SectionContainer } from "@/components/ui/SectionContainer";
import { blogPath } from "@/lib/routes";
import { formatUpdatedAt } from "@/lib/utils";
import type { BlogPost, City, Highway, RouteEntity } from "@/types/domain";

interface BlogPostTemplateProps {
  post: BlogPost;
  relatedCities: City[];
  relatedRoutes: RouteEntity[];
  relatedHighways: Highway[];
}

export function BlogPostTemplate({
  post,
  relatedCities,
  relatedRoutes,
  relatedHighways,
}: BlogPostTemplateProps) {
  return (
    <>
      <SectionContainer>
        <div className="article-layout">
          <Breadcrumbs
            items={[
              { name: "Inicio", href: "/" },
              { name: "Blog", href: "/blog" },
              { name: post.title, href: blogPath(post.slug) },
            ]}
          />
          <header className="article-header">
            <span className="eyebrow">Artículo evergreen</span>
            <h1>{post.title}</h1>
            <p className="lead">{post.excerpt}</p>
            <div className="last-updated">
              Publicado: <strong>{formatUpdatedAt(post.publishedAt)}</strong> · Actualizado:{" "}
              <strong>{formatUpdatedAt(post.updatedAt)}</strong>
            </div>
          </header>
        </div>
      </SectionContainer>

      <SectionContainer>
        <article className="article-body">
          {post.sections.map((section) => (
            <section key={section.heading}>
              <h2>{section.heading}</h2>
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </section>
          ))}
        </article>
      </SectionContainer>

      <SectionContainer>
        <FaqBlock items={post.faqs} />
      </SectionContainer>

      <SectionContainer>
        <AppDownloadCTA />
      </SectionContainer>

      <SectionContainer>
        <div className="content-stack">
          <RelatedRoutes routes={relatedRoutes} />
          <RelatedCities cities={relatedCities} />
          <RelatedHighways highways={relatedHighways} />
        </div>
      </SectionContainer>
    </>
  );
}
