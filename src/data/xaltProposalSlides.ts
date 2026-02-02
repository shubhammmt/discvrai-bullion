export interface XaltSlide {
  id: number;
  type: 'problem' | 'assistants' | 'paths' | 'roi' | 'timeline' | 'cta';
  title: string;
}

export const xaltProposalSlides: XaltSlide[] = [
  {
    id: 1,
    type: 'problem',
    title: 'The Problem'
  },
  {
    id: 2,
    type: 'assistants',
    title: 'AI Assistants'
  },
  {
    id: 3,
    type: 'paths',
    title: 'Recommended Paths'
  },
  {
    id: 4,
    type: 'roi',
    title: 'The Value'
  },
  {
    id: 5,
    type: 'timeline',
    title: 'Timeline'
  },
  {
    id: 6,
    type: 'cta',
    title: 'Next Steps'
  }
];
