import { Helmet } from 'react-helmet-async';
import { Quiz } from '@/types/engagement';

interface QuizStructuredDataProps {
  quiz: Quiz;
}

export const QuizStructuredData = ({ quiz }: QuizStructuredDataProps) => {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Quiz',
    name: quiz.title,
    description: quiz.description,
    educationalLevel: quiz.difficulty.charAt(0).toUpperCase() + quiz.difficulty.slice(1),
    about: {
      '@type': 'Thing',
      name: quiz.category
    },
    hasPart: quiz.questions.map(question => ({
      '@type': 'Question',
      eduQuestionType: 'Multiple choice',
      text: question.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: typeof question.correctAnswer === 'number' 
          ? question.options[question.correctAnswer]
          : question.options[question.correctAnswer[0]]
      },
      suggestedAnswer: question.options.map(option => ({
        '@type': 'Answer',
        text: option
      }))
    })),
    datePublished: quiz.createdAt,
    author: {
      '@type': 'Organization',
      name: 'DISCVR',
      url: 'https://discvr.app'
    },
    keywords: quiz.tags.join(', '),
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: quiz.averageScore / 20, // Convert percentage to 5-star
      bestRating: 5,
      ratingCount: quiz.completionCount
    }
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </Helmet>
  );
};
