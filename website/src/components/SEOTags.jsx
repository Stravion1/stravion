import { Helmet } from 'react-helmet-async'

export default function SEOTags({ 
  title = 'STRAVION Construction Group | Luxury Construction London',
  description = 'STRAVION Construction Group delivers world-class luxury residential, commercial, and structural construction across the United Kingdom. Precision. Excellence. Built to Impress.',
  image = 'https://stravion.co.uk/logo.jpeg',
  url = 'https://stravion.co.uk/',
  type = 'website'
}) {
  return (
    <Helmet>
      {/* Standard SEO */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      {/* OpenGraph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />
    </Helmet>
  )
}
