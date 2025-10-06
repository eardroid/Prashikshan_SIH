import { render, screen, fireEvent } from '@testing-library/react';
import SkillCard from '@/components/SkillCard';

const mockCourse = {
  id: 'test-1',
  title: 'Test Course',
  duration: '2 hrs',
  badge: 'Test Badge',
  tasks: 5,
  completionRate: 80,
  category: 'technical',
  description: 'Test description',
};

describe('SkillCard', () => {
  it('renders course information', () => {
    render(<SkillCard {...mockCourse} />);
    expect(screen.getByText('Test Course')).toBeInTheDocument();
    expect(screen.getByText('2 hrs')).toBeInTheDocument();
    expect(screen.getByText('Test Badge')).toBeInTheDocument();
  });

  it('displays completion rate', () => {
    render(<SkillCard {...mockCourse} />);
    expect(screen.getByText('80%')).toBeInTheDocument();
  });

  it('flips card on click', () => {
    render(<SkillCard {...mockCourse} />);
    const card = screen.getByText('Test Course').closest('div');
    
    if (card) {
      fireEvent.click(card);
      // Card should flip and show assignment details
      expect(screen.getByText(/Assignment & Evidence/i)).toBeInTheDocument();
    }
  });

  it('shows correct category badge', () => {
    render(<SkillCard {...mockCourse} />);
    expect(screen.getByText(/technical/i)).toBeInTheDocument();
  });
});
