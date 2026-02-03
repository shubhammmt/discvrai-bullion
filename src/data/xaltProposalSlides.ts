export interface XaltSlide {
  id: number;
  type: 'problem' | 'solution1' | 'solution2' | 'assistants' | 'paths' | 'roi' | 'timeline';
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
    type: 'solution1',
    title: 'Foundation Agents'
  },
  {
    id: 3,
    type: 'solution2',
    title: 'Scale Agents'
  },
  {
    id: 4,
    type: 'assistants',
    title: 'AI Assistants'
  },
  {
    id: 5,
    type: 'paths',
    title: 'Recommended Paths'
  },
  {
    id: 6,
    type: 'roi',
    title: 'The Value'
  },
  {
    id: 7,
    type: 'timeline',
    title: 'Timeline'
  }
];
