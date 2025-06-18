import React, { useState } from 'react';
import styled from 'styled-components';
import placeholderImage from '../assets/images/placeholder.webp';
import { colors } from '../assets/styles/colors';

interface ReviewFormProps {
  // Props are no longer needed for modal functionality
}

interface Review {
  name: string;
  quote: string;
  rating: number;
  img?: string;
  person?: string;
}

interface FormState {
  yourName: string;
  companyName?: string;
  review: string;
  rating: number;
}

// This will be the main container for the static form
const FormContainer = styled.div`
  max-width: 500px;
  margin: 2rem auto; // Center the form on the page
  padding: 2rem;
  border: 1px solid ${colors.lightBlue};
  border-radius: 15px;
  background-color: ${colors.white};
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  color: ${colors.darkGrey};

  h2 {
    color: ${colors.royalBlue};
    margin-bottom: 1.5rem;
    text-align: center;
  }
`;

// The form element itself doesn't need extra styling if FormContainer handles it.
// If specific form styling is needed, FormWrapper can be a styled.form.
// For now, we'll use a standard form tag inside FormContainer.
/*
const FormWrapper = styled.form`
  // Styles for the form element itself, if needed
`;
*/

const FormGroup = styled.div`
  margin-bottom: 1rem;

  label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: bold;
  }

  input[type='text'],
  textarea,
  input[type='range'] { // Apply common styles to range input as well where appropriate
    width: 100%;
    padding: 0.75rem;
    border: 1px solid ${colors.lightBlue};
    border-radius: 8px;
    box-sizing: border-box;
    background-color: ${colors.white}; // Ensure inputs have a background
    color: ${colors.darkGrey}; // Text color for inputs
    margin-top: 0.25rem; // Add a little space above the input if label is multiline
  }

  textarea {
    min-height: 100px;
    resize: vertical;
  }

  input[type='range'] {
    padding: 0; // Range inputs often don't need vertical padding
    -webkit-appearance: none; // Override default appearance
    appearance: none;
    height: 8px; // Track height
    background: ${colors.lightBlue}; // Track color
    outline: none;
    opacity: 0.9;
    transition: opacity .2s;

    &:hover {
      opacity: 1;
    }

    &::-webkit-slider-thumb {
      -webkit-appearance: none;
      appearance: none;
      width: 20px;
      height: 20px;
      background: ${colors.limeGreen};
      border-radius: 50%;
      cursor: pointer;
    }

    &::-moz-range-thumb {
      width: 20px;
      height: 20px;
      background: ${colors.limeGreen};
      border-radius: 50%;
      cursor: pointer;
      border: none; // Remove default border in Firefox
    }
  }

  label { // Ensure label color is consistent
    color: ${colors.darkGrey};
    font-weight: 600; // Make labels a bit more prominent
  }
`;

// RatingGroup styled component is removed

const SubmitButton = styled.button`
  display: block;
  width: 100%;
  padding: 0.75rem 1.5rem; // Adjusted padding
  border: none;
  border-radius: 8px; // Match inputs
  background-color: ${colors.limeGreen}; // Primary action color
  color: ${colors.white};
  font-size: 1rem;
  font-weight: 600; // Make text bolder
  cursor: pointer;
  transition: background-color 0.2s ease-in-out, transform 0.2s ease;

  &:hover {
    background-color: #2aa42a; // Darker lime green
    transform: translateY(-2px); // Subtle lift
  }
  &:active {
    transform: translateY(0);
  }
`;

const ReviewForm: React.FC<ReviewFormProps> = (/* { isOpen, onClose } */) => { // Props removed
  const [formState, setFormState] = useState<FormState>({
    yourName: '',
    companyName: '',
    review: '',
    rating: 3, // Default rating set to 3
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormState(prevState => ({
      ...prevState,
      [name]: name === 'rating' ? parseInt(value, 10) : value, // Parse rating to int
    }));
  };

  // handleRatingChange function is removed

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newReview: Review = {
      name: formState.yourName, // Map yourName to name
      quote: formState.review,
      rating: formState.rating,
      img: placeholderImage, // Using imported placeholder image
      person: formState.companyName, // Map companyName to person
    };

    try {
      const existingReviewsRaw = localStorage.getItem('userReviews');
      const existingReviews: Review[] = existingReviewsRaw ? JSON.parse(existingReviewsRaw) : [];

      // Basic validation to ensure existingReviews is an array
      if (!Array.isArray(existingReviews)) {
        console.error('Existing reviews data is not an array. Initializing with new review.');
        localStorage.setItem('userReviews', JSON.stringify([newReview]));
      } else {
        existingReviews.push(newReview);
        localStorage.setItem('userReviews', JSON.stringify(existingReviews));
      }

      console.log('Review saved successfully!', newReview);
      // Reset form to initial state for all new fields
      setFormState({ yourName: '', companyName: '', review: '', rating: 3 }); // Reset rating to default 3
      // onClose(); // Removed call to onClose
    } catch (error) {
      console.error('Failed to save review to localStorage:', error);
      // Potentially handle error with user feedback
    }
  };

  // No longer conditionally rendering based on isOpen
  return (
    <FormContainer> {/* Using the new FormContainer as the main wrapper */}
      {/* The form tag can be standard or a styled.form if FormWrapper is used */}
      <form onSubmit={handleSubmit}>
        <h2>Leave a Review</h2>
        <FormGroup>
          <label htmlFor="yourName">Your Name</label>
          <input
            type="text"
            id="yourName"
            name="yourName"
            value={formState.yourName}
            onChange={handleChange}
            required
          />
        </FormGroup>
        <FormGroup>
          <label htmlFor="companyName">Company Name (Optional)</label>
          <input
            type="text"
            id="companyName"
            name="companyName"
            value={formState.companyName || ''} // Ensure value is not undefined
            onChange={handleChange}
          />
        </FormGroup>
        <FormGroup>
          <label htmlFor="review">Review</label>
          <textarea
            id="review"
            name="review"
            value={formState.review}
            onChange={handleChange}
            required
          />
        </FormGroup>
        <FormGroup>
          <label htmlFor="rating">Rating: {formState.rating} star{formState.rating === 1 ? '' : 's'}</label>
          <input
            type="range"
            id="rating"
            name="rating"
            min="1"
            max="5"
            value={formState.rating}
            onChange={handleChange}
          />
        </FormGroup>
        <SubmitButton type="submit">Submit Review</SubmitButton>
      </form>
    </FormContainer>
  );
};

export default ReviewForm;
