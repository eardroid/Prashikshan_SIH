import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import NavBar from '@/components/NavBar';
import ReadinessMeter from '@/components/ReadinessMeter';
import MetricCard from '@/components/MetricCard';

expect.extend(toHaveNoViolations);

describe('Accessibility Tests', () => {
  it('NavBar should have no accessibility violations', async () => {
    const { container } = render(<NavBar />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('ReadinessMeter should have no accessibility violations', async () => {
    const { container } = render(<ReadinessMeter score={75} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('MetricCard should have no accessibility violations', async () => {
    const { container } = render(
      <MetricCard
        title="Test Metric"
        value={100}
        icon="📊"
        trend="up"
        change={5}
      />
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
