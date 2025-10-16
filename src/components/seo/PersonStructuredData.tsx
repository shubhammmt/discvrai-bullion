import { Helmet } from 'react-helmet-async';

interface PersonStructuredDataProps {
  name: string;
  authorId: string;
  image: string;
  jobTitle: string;
  description: string;
  education?: string;
  expertise: string[];
  socialLinks?: {
    twitter?: string;
    linkedin?: string;
  };
  awards?: string[];
}

export const PersonStructuredData = ({
  name,
  authorId,
  image,
  jobTitle,
  description,
  education,
  expertise,
  socialLinks,
  awards
}: PersonStructuredDataProps) => {
  const authorUrl = `${window.location.origin}/news/author/${authorId}`;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": name,
    "url": authorUrl,
    "image": image,
    "jobTitle": jobTitle,
    "description": description,
    ...(education && {
      "alumniOf": {
        "@type": "EducationalOrganization",
        "name": education
      }
    }),
    "knowsAbout": expertise,
    "worksFor": {
      "@type": "Organization",
      "name": "DISCVR"
    },
    ...(socialLinks && {
      "sameAs": [
        ...(socialLinks.twitter ? [socialLinks.twitter] : []),
        ...(socialLinks.linkedin ? [socialLinks.linkedin] : [])
      ]
    }),
    ...(awards && awards.length > 0 && { "award": awards })
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </Helmet>
  );
};
