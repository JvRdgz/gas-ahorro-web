interface SchemaScriptProps {
  data: Record<string, unknown> | Array<Record<string, unknown>>;
}

export function SchemaScript({ data }: SchemaScriptProps) {
  const schemas = Array.isArray(data) ? data : [data];

  return (
    <>
      {schemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}
