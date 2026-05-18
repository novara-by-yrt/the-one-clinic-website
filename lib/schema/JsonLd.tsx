/**
 * Renders one or more schema.org objects as <script type="application/ld+json">.
 * Pass a single object or an array of objects — each becomes its own script tag.
 */
export default function JsonLd({
  schema,
}: {
  schema: Record<string, unknown> | Record<string, unknown>[];
}) {
  const items = Array.isArray(schema) ? schema : [schema];
  return (
    <>
      {items.map((item, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }}
        />
      ))}
    </>
  );
}
