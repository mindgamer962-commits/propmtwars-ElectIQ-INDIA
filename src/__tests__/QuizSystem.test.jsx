import { render, screen, fireEvent } from '@testing-library/react';
import QuizSystem from '../components/QuizSystem';
import { describe, it, expect } from 'vitest';

describe('QuizSystem', () => {
  it('renders the start screen correctly', () => {
    render(<QuizSystem />);
    expect(screen.getByText(/Civic Knowledge Hub/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Begin Challenge/i })).toBeInTheDocument();
  });

  it('starts the quiz when the begin button is clicked', () => {
    render(<QuizSystem />);
    const startButton = screen.getByRole('button', { name: /Begin Challenge/i });
    fireEvent.click(startButton);
    expect(screen.getByText(/Module progress:/i)).toBeInTheDocument();
  });

  it('navigates through questions', () => {
    render(<QuizSystem />);
    fireEvent.click(screen.getByRole('button', { name: /Begin Challenge/i }));
    
    // Select an option (any option)
    // Options: 16, 18, 21, 25
    fireEvent.click(screen.getByText(/18 Years/i));
    
    // Advance button should appear
    const nextButton = screen.getByRole('button', { name: /Advance to next question/i });
    expect(nextButton).toBeInTheDocument();
    fireEvent.click(nextButton);
    
    // Check if next question is rendered
    expect(screen.getByText(/Module progress: 2/i)).toBeInTheDocument();
  });
});
