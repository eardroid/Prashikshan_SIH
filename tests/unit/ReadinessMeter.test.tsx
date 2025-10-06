import { render, screen } from '@testing-library/react';
import ReadinessMeter from '@/components/ReadinessMeter';

describe('ReadinessMeter', () => {
  it('renders with correct score', () => {
    render(<ReadinessMeter score={78} />);
    expect(screen.getByText('78')).toBeInTheDocument();
  });

  it('displays correct label', () => {
    render(<ReadinessMeter score={85} label="Test Score" />);
    expect(screen.getByText('Test Score')).toBeInTheDocument();
  });

  it('shows excellent status for high scores', () => {
    render(<ReadinessMeter score={90} />);
    expect(screen.getByText('Excellent')).toBeInTheDocument();
  });

  it('shows needs improvement for low scores', () => {
    render(<ReadinessMeter score={35} />);
    expect(screen.getByText('Needs Improvement')).toBeInTheDocument();
  });

  it('renders different sizes correctly', () => {
    const { rerender } = render(<ReadinessMeter score={75} size="sm" />);
    expect(screen.getByText('75')).toBeInTheDocument();
    
    rerender(<ReadinessMeter score={75} size="lg" />);
    expect(screen.getByText('75')).toBeInTheDocument();
  });
});
