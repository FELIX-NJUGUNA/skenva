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
  name: string;
  review: string;
  rating: number;
}

// This will be the main container for the static form
const FormContainer = styled.div`
  max-width: 500px;
  margin: 2rem auto; // Center the form on the page
  padding: 2rem;
  border: 1px solid #ccc; // Using a light grey border
  border-radius: 8px;
  background-color: ${colors.lightGrey}; // Using lightGrey from palette
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1); // Subtle shadow for depth
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
  textarea {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    box-sizing: border-box;
  }

  textarea {
    min-height: 100px;
    resize: vertical;
  }
`;

const RatingGroup = styled.div`
  margin-bottom: 1rem;
  label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: bold;
  }
  div {
    display: flex;
    align-items: center;
  }
  input[type='radio'] {
    margin-right: 0.25rem;
  }
  span {
    margin-right: 0.75rem;
  }
`;

const SubmitButton = styled.button`
  display: block;
  width: 100%;
  padding: 0.75rem;
  border: none;
  border-radius: 4px;
  background-color: ${colors.royalBlue}; // Use color from palette
  color: ${colors.white};
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: ${colors.darkBlue}; // Darken on hover
  }
`;

const ReviewForm: React.FC<ReviewFormProps> = (/* { isOpen, onClose } */) => { // Props removed
  const [formState, setFormState] = useState<FormState>({
    name: '',
    review: '',
    rating: 0,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormState(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleRatingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState(prevState => ({
      ...prevState,
      rating: parseInt(e.target.value, 10),
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newReview: Review = {
      name: formState.name,
      quote: formState.review,
      rating: formState.rating,
      img: placeholderImage, // Using imported placeholder image
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
      setFormState({ name: '', review: '', rating: 0 }); // Reset form
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
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formState.name}
            onChange={handleChange}
            required
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
        <RatingGroup>
          <label>Rating</label>
          <div>
            {[1, 2, 3, 4, 5].map(star => (
              <React.Fragment key={star}>
                <input
                  type="radio"
                  id={`star-${star}`}
                  name="rating"
                  value={star}
                  checked={formState.rating === star}
                  onChange={handleRatingChange}
                  required
                />
                <span
                  style={{ marginLeft: '0.25rem', marginRight: '0.75rem', cursor: 'pointer' }}
                  onClick={() => setFormState(prev => ({...prev, rating: star}))}
                >
                   {star} star{star > 1 ? 's' : ''}
                </span>
              </React.Fragment>
            ))}
          </div>
        </RatingGroup>
        <SubmitButton type="submit">Submit Review</SubmitButton>
      </form>
    </FormContainer>
  );
};

export default ReviewForm;
