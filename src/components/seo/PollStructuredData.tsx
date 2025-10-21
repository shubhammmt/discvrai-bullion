import { Helmet } from 'react-helmet-async';
import { Poll } from '@/types/engagement';

interface PollStructuredDataProps {
  poll: Poll;
}

export const PollStructuredData = ({ poll }: PollStructuredDataProps) => {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Question',
    name: poll.question,
    text: poll.question,
    suggestedAnswer: poll.options.map(option => ({
      '@type': 'Answer',
      text: option.text,
      upvoteCount: option.votes
    })),
    answerCount: poll.totalVotes,
    datePublished: poll.createdAt,
    author: {
      '@type': 'Organization',
      name: 'DISCVR',
      url: 'https://discvr.app'
    },
    about: {
      '@type': 'Thing',
      name: poll.category
    },
    keywords: poll.tags.join(', ')
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </Helmet>
  );
};
