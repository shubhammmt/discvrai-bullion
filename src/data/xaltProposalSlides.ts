export interface XaltSlide {
  id: number;
  type: 'title' | 'strategic' | 'painpoints' | 'aimodel' | 'value' | 'solution1' | 'solution2' | 'assistants' | 'paths' | 'roi' | 'timeline';
  title: string;
}

export const xaltProposalSlides: XaltSlide[] = [
  {
    id: 1,
    type: 'title',
    title: 'AI-First Transformation'
  },
  {
    id: 2,
    type: 'strategic',
    title: 'The Strategic Question'
  },
  {
    id: 3,
    type: 'painpoints',
    title: 'Pain Points'
  },
  {
    id: 4,
    type: 'aimodel',
    title: 'AI-First Operating Model'
  },
  {
    id: 5,
    type: 'value',
    title: 'Value-at-Stake'
  },
  {
    id: 6,
    type: 'solution1',
    title: 'Foundation Agents'
  },
  {
    id: 7,
    type: 'solution2',
    title: 'Scale Agents'
  },
  {
    id: 8,
    type: 'assistants',
    title: 'AI Assistants'
  },
  {
    id: 9,
    type: 'paths',
    title: 'Recommended Paths'
  },
  {
    id: 10,
    type: 'roi',
    title: 'The Value'
  },
  {
    id: 11,
    type: 'timeline',
    title: 'Timeline'
  }
];
